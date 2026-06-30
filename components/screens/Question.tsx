"use client";

import { useState } from "react";
import { QuestionConfig } from "@/lib/questions";

type QuestionProps = {
  config: QuestionConfig;
  selected?: string;
  onSelect: (value: string) => void;
  onBack: () => void;
};

export default function Question({ config, selected, onSelect, onBack }: QuestionProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const submitCustom = () => {
    if (customValue.trim().length === 0) return;
    onSelect(customValue.trim());
  };

  return (
    <div className="scr agent-screen">
      <div className="agent-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <span style={{ fontSize: 12, color: "var(--slate)" }}>
          Question {config.index} of 7
        </span>
      </div>
      <div className="progress-bar">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`progress-dot${i < config.index ? " done" : ""}`}
          ></div>
        ))}
      </div>
      <div className="ally-bubble">
        <div className="ally-avatar">🤝</div>
        <div className="ally-msg">
          {config.prompt} <strong>{config.promptStrong}</strong>
        </div>
      </div>
      {!showCustom && (
        <div className="options-grid">
          {config.options.map((opt) => (
            <button
              key={opt.label}
              className={`option-card${selected === opt.label ? " selected" : ""}`}
              onClick={() => onSelect(opt.label)}
            >
              {opt.flag ? (
                <div className="flag-text">{opt.flag}</div>
              ) : (
                <div className="option-icon">{opt.icon}</div>
              )}
              <div>
                <div className="option-label">{opt.label}</div>
                {opt.sub && <div className="option-sub">{opt.sub}</div>}
              </div>
            </button>
          ))}
          <button
            className="option-card custom-card"
            onClick={() => setShowCustom(true)}
          >
            <div className="option-icon">💬</div>
            <div>
              <div className="option-label">Tell Ally directly</div>
              <div className="option-sub">{config.customSub}</div>
            </div>
          </button>
        </div>
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
