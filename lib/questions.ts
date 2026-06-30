export type QuestionOption = {
  icon?: string;
  flag?: string;
  label: string;
  sub?: string;
};

export type QuestionConfig = {
  id: "qualification" | "ielts" | "field" | "timeline";
  step: "q1" | "q2" | "q3" | "q7";
  index: number;
  prompt: string;
  promptStrong: string;
  options: QuestionOption[];
  customSub: string;
};

export const QUESTIONS: QuestionConfig[] = [
  {
    id: "qualification",
    step: "q1",
    index: 1,
    prompt: "What's your",
    promptStrong: "current qualification?",
    options: [
      { icon: "📚", label: "12th grade", sub: "Undergrad pathway" },
      { icon: "🎓", label: "Undergraduate", sub: "Bachelor's degree" },
      { icon: "🏛", label: "Postgraduate", sub: "Master's or above" },
      { icon: "✏️", label: "Other", sub: "Diploma / cert" },
    ],
    customSub: "Type your own answer",
  },
  {
    id: "ielts",
    step: "q2",
    index: 2,
    prompt: "Where are you with",
    promptStrong: "IELTS or other English tests?",
    options: [
      { icon: "📜", label: "Already have a score", sub: "IELTS, TOEFL, PTE, or similar" },
      { icon: "📖", label: "Booked or studying for it now", sub: "In progress" },
      { icon: "⏱", label: "Haven't started yet", sub: "Not decided which exam" },
      { icon: "🚫", label: "Not required for my course", sub: "MOI waiver or similar" },
    ],
    customSub: "Type your own answer",
  },
  {
    id: "field",
    step: "q3",
    index: 3,
    prompt: "Which",
    promptStrong: "field do you want to study?",
    options: [
      { icon: "💻", label: "Engineering & Tech" },
      { icon: "📊", label: "Business" },
      { icon: "🏥", label: "Health Sciences" },
      { icon: "🎨", label: "Arts & Humanities" },
    ],
    customSub: "Type your own answer",
  },
  {
    id: "timeline",
    step: "q7",
    index: 7,
    prompt: "Last one -",
    promptStrong: "when are you planning to start?",
    options: [
      { icon: "📅", label: "Jan 2026" },
      { icon: "🌿", label: "Sep 2026" },
      { icon: "🗓", label: "2027" },
      { icon: "🔭", label: "Still exploring" },
    ],
    customSub: "Got a specific date? Type it",
  },
];

export const COUNTRY_OPTIONS: QuestionOption[] = [
  { flag: "US", label: "United States" },
  { flag: "UK", label: "United Kingdom" },
  { flag: "CA", label: "Canada" },
  { flag: "DE", label: "Germany" },
];
