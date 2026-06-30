export type Step =
  | "landing"
  | "welcome"
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "loading"
  | "results";

export type Answers = {
  qualification?: string;
  ielts?: string;
  field?: string;
  countries: string[];
  budget: number;
  priorities: string[];
  timeline?: string;
};

export const INITIAL_ANSWERS: Answers = {
  countries: [],
  budget: 25,
  priorities: ["University ranking", "Job outcomes", "Scholarship availability"],
};

export type MatchResult = {
  university: string;
  country: string;
  course: string;
  matchPercent: number;
  tuitionPerYearINR: number;
  placementPercent: number;
  qsRank: number;
  reason: string;
};

export type MatchApiResponse =
  | { matches: MatchResult[] }
  | { error: string };
