import { NextResponse } from "next/server";

interface ItineraryFormData {
  title: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  dailyBudget?: number;
  currency?: string;
}

// Pick a model: "gemini-2.5-flash" (fast/cheap) or "gemini-2.5-pro" (stronger)
const MODEL = "models/gemini-2.5-flash";

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

    // Build a tight prompt
    const prompt = `
You are a travel planner. Create a day-by-day itinerary.

Constraints:
- Trip title: ${body.title}
- Start date: ${body.startDate}
- End date: ${body.endDate}
- Destinations (in order): ${body.destinations.join(", ")}
- Daily budget: ${body.dailyBudget ?? "unspecified"}
- Currency: ${body.currency ?? "USD"}

Requirements:
- Distribute days across destinations in order.
- Include morning, afternoon, evening activities per day.
- Suggest realistic costs (estCost per day) and totalEstimatedCost.
- Optimize for travel time and local highlights.
    `.trim();

    // REST call to Gemini generateContent (v1beta)
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY!, // keep server-side
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          // Ask for strict JSON via JSON Mode + schema
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                summary: { type: "STRING" },
                currency: { type: "STRING" },
                totalEstimatedCost: { type: "NUMBER" },
                days: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      date: { type: "STRING" },
                      destination: { type: "STRING" },
                      morning: { type: "STRING" },
                      afternoon: { type: "STRING" },
                      evening: { type: "STRING" },
                      estCost: { type: "NUMBER" },
                      notes: { type: "STRING" },
                    },
                    required: [
                      "date",
                      "destination",
                      "morning",
                      "afternoon",
                      "evening",
                    ],
                  },
                },
              },
              required: ["title", "summary", "days"],
            },
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini error:", res.status, errText);
      return NextResponse.json({ error: "Gemini API error." }, { status: 500 });
    }

    const data = await res.json();

    // The text is in candidates[0].content.parts[*].text even in JSON mode.
    // JSON Mode returns a JSON string in .text — parse it:
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const itinerary = text ? JSON.parse(text) : null;

    return NextResponse.json({ itinerary });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to generate itinerary." },
      { status: 500 }
    );
  }
}
