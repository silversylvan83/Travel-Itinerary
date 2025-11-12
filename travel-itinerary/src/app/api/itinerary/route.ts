import { NextResponse } from "next/server";

interface ItineraryFormData {
  title: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  dailyBudget?: number;
  currency?: string;
}

// Primary Groq model and a lighter fallback
const PRIMARY_MODEL = "llama-3.3-70b-versatile";
const FALLBACK_MODEL = "llama-3.1-8b-instant";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: Request) {
  try {
    const body: ItineraryFormData = await req.json();
    if (
      !body?.title ||
      !body?.startDate ||
      !body?.endDate ||
      !body?.destinations?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Build prompt (system + user). We ask for strict JSON via response_format.
    const systemPrompt = `
You are a disciplined travel planner.
Return ONLY a single JSON object that matches this TypeScript-like schema:

{
  "title": string,
  "summary": string,
  "currency": string,
  "totalEstimatedCost": number,
  "days": Array<{
    "date": string,               // ISO or readable date
    "destination": string,
    "morning": string,
    "afternoon": string,
    "evening": string,
    "estCost": number,
    "notes"?: string
  }>
}

Rules:
- No markdown, no prose outside the JSON.
- Populate all required fields.
- Costs should be realistic for the region and add up.
- Distribute days across the given destinations in order.
- Include morning/afternoon/evening activities each day.
`.trim();

    const userPrompt = `
Create a day-by-day itinerary.

Constraints:
- Trip title: ${body.title}
- Start date: ${body.startDate}
- End date: ${body.endDate}
- Destinations (in order): ${body.destinations.join(", ")}
- Daily budget: ${body.dailyBudget ?? "unspecified"}
- Currency: ${body.currency ?? "USD"}

Requirements:
- Distribute days across destinations in order.
- Include morning, afternoon, and evening activities per day.
- Suggest realistic per-day costs ("estCost") and a "totalEstimatedCost".
- Optimize for travel time and local highlights.
`.trim();

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    async function callGroq(model: string) {
      const res = await fetch(GROQ_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY!}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.2,
          // Request strict JSON output
          response_format: { type: "json_object" },
        }),
      });
      return res;
    }

    // Simple retry with exponential backoff, then fallback model
    async function callWithRetryAndFallback() {
      const maxRetries = 2;
      let res = null;

      // Try primary with retries
      for (let i = 0; i <= maxRetries; i++) {
        res = await callGroq(PRIMARY_MODEL);
        if (res.ok) return res;
        if (![429, 500, 502, 503, 504].includes(res.status)) return res;
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i))); // 1s, 2s, 4s
      }

      // Fallback model with a single attempt
      res = await callGroq(FALLBACK_MODEL);
      return res;
    }

    const res = await callWithRetryAndFallback();

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Groq error:", res.status, errText);
      return NextResponse.json(
        { error: errText || `Groq API error: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content ?? "";

    // response_format: json_object should give a JSON string as content
    let itinerary = null;
    try {
      itinerary = content ? JSON.parse(content) : null;
    } catch (e) {
      console.error("Failed to parse Groq JSON content:", e, content);
      return NextResponse.json(
        { error: "Model returned non-JSON content." },
        { status: 502 }
      );
    }

    // Optional: lightweight server-side validation (required keys)
    if (
      !itinerary ||
      typeof itinerary !== "object" ||
      !itinerary.title ||
      !itinerary.summary ||
      !Array.isArray(itinerary.days)
    ) {
      return NextResponse.json(
        { error: "Model JSON missing required fields." },
        { status: 502 }
      );
    }

    return NextResponse.json({ itinerary });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to generate itinerary." },
      { status: 500 }
    );
  }
}
