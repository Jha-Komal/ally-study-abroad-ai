"use client";

import { useState } from "react";

type BudgetQuestionProps = {
  value: number;
  onConfirm: (budget: number) => void;
  onBack: () => void;
};

function suggestionFor(budget: number): string {
  if (budget <= 10) {
    return "At this budget: Germany and other low-tuition countries are within reach. Scholarships will help a lot with the rest.";
  }
  if (budget <= 30) {
    return "At this budget: Canada, UK, and Australia are well within reach. Germany would leave room for a comfortable lifestyle too.";
  }
  return "At this budget: the US, UK, Canada, and Australia are all comfortably within reach, including top-ranked programs.";
}

export default function BudgetQuestion({ value, onConfirm, onBack }: BudgetQuestionProps) {
  const [budget, setBudget] = useState(value);

  return (
    <div className="scr agent-screen">
      <div className="agent-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <span style={{ fontSize: 12, color: "var(--slate)" }}>Question 5 of 7</span>
      </div>
      <div className="progress-bar">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`progress-dot${i < 5 ? " done" : ""}`}></div>
        ))}
      </div>
      <div className="ally-bubble">
        <div className="ally-avatar">🤝</div>
        <div className="ally-msg">
          What&apos;s your <strong>annual budget?</strong> Drag to set it.
        </div>
      </div>
      <div className="budget-slider-wrap">
        <div className="budget-display">
          <div className="budget-amount">₹{budget}L</div>
          <div className="budget-range-label">per year, tuition and living combined</div>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          step={5}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="budget-slider"
          style={{
            background: `linear-gradient(to right, var(--indigo) ${
              ((budget - 5) / 45) * 100
            }%, var(--card-border) ${((budget - 5) / 45) * 100}%)`,
          }}
        />
        <div className="budget-ticks">
          <span>₹5L</span>
          <span>₹50L+</span>
        </div>
        <div className="budget-suggest">
          <strong>{suggestionFor(budget).split(":")[0]}:</strong>
          {suggestionFor(budget).split(":")[1]}
        </div>
        <button className="budget-confirm" onClick={() => onConfirm(budget)}>
          Confirm budget →
        </button>
      </div>
    </div>
  );
}
