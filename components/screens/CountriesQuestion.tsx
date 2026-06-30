"use client";

import { useState } from "react";
import { COUNTRY_OPTIONS } from "@/lib/questions";

type CountriesQuestionProps = {
  selected: string[];
  onContinue: (countries: string[]) => void;
  onBack: () => void;
};

export default function CountriesQuestion({
  selected,
  onContinue,
  onBack,
}: CountriesQuestionProps) {
  const [picked, setPicked] = useState<string[]>(selected);
  const [showCustom, setShowCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const toggle = (label: string) => {
    setPicked((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const submitCustom = () => {
    if (customValue.trim().length === 0) return;
    onContinue([...picked, customValue.trim()]);
  };

  return (
    <div className="scr agent-screen">
      <div className="agent-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <span style={{ fontSize: 12, color: "var(--slate)" }}>Question 4 of 7</span>
      </div>
      <div className="progress-bar">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`progress-dot${i < 4 ? " done" : ""}`}></div>
        ))}
      </div>
      <div className="ally-bubble">
        <div className="ally-avatar">🤝</div>
        <div className="ally-msg">
          Which <strong>countries</strong> are you open to?
        </div>
      </div>
      {!showCustom && (
        <>
          <div className="options-grid">
            {COUNTRY_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                className={`option-card${picked.includes(opt.label) ? " selected" : ""}`}
                onClick={() => toggle(opt.label)}
              >
                <div className="flag-text">{opt.flag}</div>
                <div className="option-label">{opt.label}</div>
              </button>
            ))}
            <button className="option-card custom-card" onClick={() => setShowCustom(true)}>
              <div className="option-icon">💬</div>
              <div>
                <div className="option-label">Tell Ally directly</div>
                <div className="option-sub">Not sure? Describe what you want</div>
              </div>
            </button>
          </div>
          <button
            className="next-btn"
            disabled={picked.length === 0}
            onClick={() => onContinue(picked)}
          >
            Continue →
          </button>
        </>
      )}
      {showCustom && (
        <div className="custom-input-wrap">
          <input
            className="custom-input"
            autoFocus
            value={customValue}
            placeholder="Type your answer..."
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitCustom();
            }}
          />
          <button className="custom-submit" onClick={submitCustom}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
