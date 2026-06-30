"use client";

import { useState } from "react";
import Landing from "@/components/screens/Landing";
import Welcome from "@/components/screens/Welcome";
import Question from "@/components/screens/Question";
import CountriesQuestion from "@/components/screens/CountriesQuestion";
import BudgetQuestion from "@/components/screens/BudgetQuestion";
import PriorityQuestion from "@/components/screens/PriorityQuestion";
import Loading from "@/components/screens/Loading";
import Results from "@/components/screens/Results";
import { QUESTIONS } from "@/lib/questions";
import { Answers, INITIAL_ANSWERS, MatchResult, Step } from "@/lib/types";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [matches, setMatches] = useState<MatchResult[]>([]);

  switch (step) {
    case "landing":
      return <Landing onStart={() => setStep("welcome")} />;
    case "welcome":
      return <Welcome onStart={() => setStep("q1")} />;
    case "q1":
      return (
        <Question
          config={QUESTIONS[0]}
          selected={answers.qualification}
          onSelect={(value) => {
            setAnswers({ ...answers, qualification: value });
            setStep("q2");
          }}
          onBack={() => setStep("welcome")}
        />
      );
    case "q2":
      return (
        <Question
          config={QUESTIONS[1]}
          selected={answers.ielts}
          onSelect={(value) => {
            setAnswers({ ...answers, ielts: value });
            setStep("q3");
          }}
          onBack={() => setStep("q1")}
        />
      );
    case "q3":
      return (
        <Question
          config={QUESTIONS[2]}
          selected={answers.field}
          onSelect={(value) => {
            setAnswers({ ...answers, field: value });
            setStep("q4");
          }}
          onBack={() => setStep("q2")}
        />
      );
    case "q4":
      return (
        <CountriesQuestion
          selected={answers.countries}
          onContinue={(countries) => {
            setAnswers({ ...answers, countries });
            setStep("q5");
          }}
          onBack={() => setStep("q3")}
        />
      );
    case "q5":
      return (
        <BudgetQuestion
          value={answers.budget}
          onConfirm={(budget) => {
            setAnswers({ ...answers, budget });
            setStep("q6");
          }}
          onBack={() => setStep("q4")}
        />
      );
    case "q6":
      return (
        <PriorityQuestion
          value={answers.priorities}
          onConfirm={(priorities) => {
            setAnswers({ ...answers, priorities });
            setStep("q7");
          }}
          onBack={() => setStep("q5")}
        />
      );
    case "q7":
      return (
        <Question
          config={QUESTIONS[3]}
          selected={answers.timeline}
          onSelect={(value) => {
            setAnswers({ ...answers, timeline: value });
            setStep("loading");
          }}
          onBack={() => setStep("q6")}
        />
      );
    case "loading":
      return (
        <Loading
          answers={answers}
          onComplete={(result) => {
            setMatches(result);
            setStep("results");
          }}
        />
      );
    case "results":
      return <Results matches={matches} />;
  }
}
