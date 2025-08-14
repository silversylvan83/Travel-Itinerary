export type Activity = {
  id: string;
  time?: string;
  title: string;
  notes?: string;
  cost?: number;
};

export type DayPlan = {
  date: string;       // ISO yyyy-MM-dd
  activities: Activity[];
};

export type Trip = {
  _id?: string;       // Mongo ObjectId as string when serialized
  title: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  days: DayPlan[];
  currency: string;
  createdAt?: string;
  updatedAt?: string;
};
