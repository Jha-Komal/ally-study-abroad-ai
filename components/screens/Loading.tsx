"use client";

import { useEffect, useState } from "react";
import { Answers, MatchApiResponse, MatchResult } from "@/lib/types";

type LoadingProps = {
  answers: Answers;
  onComplete: (matches: MatchResult[]) => void;
};

const STEPS = [
  "Analysing your profile",
  "Scanning 500+ universities",
  "Checking scholarships",
  "Building your shortlist",
];

const MIN_DISPLAY_MS = 2500;
const STEP_INTERVAL_MS = 700;

export default function Loading({ answers, onComplete }: LoadingProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => Math.min(s + 1, STEPS.length));
    }, STEP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [attempt]);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();

    fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then(async (res) => {
        const body = (await res.json()) as MatchApiResponse;
        if (!res.ok || "error" in body) {
          throw new Error("error" in body ? body.error : "Failed to fetch matches.");
        }
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(() => {
          if (!cancelled) onComplete(body.matches);
        }, remaining);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [answers, attempt, onComplete]);

  return (
    <div className="scr loading-screen">
      <div className="loading-icon">🔍</div>
      <div className="loading-title">
        Ally is finding
        <br />
        your best matches...
      </div>
      {!error && (
        <div className="loading-steps">
          {STEPS.map((text, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            return (
              <div key={text} className="loading-step">
                <div className={`loading-dot${done ? " done" : active ? " active" : ""}`}></div>
                <div className={`loading-step-text${done ? " done" : ""}`}>{text}</div>
              </div>
            );
          })}
        </div>
      )}
      {error && (
        <>
          <p className="loading-error">Something went wrong: {error}</p>
          <button
            className="loading-retry-btn"
            onClick={() => {
              setActiveStep(0);
              setError(null);
              setAttempt((a) => a + 1);
            }}
          >
            Try again
          </button>
        </>
      )}
    </div>
  );
}
