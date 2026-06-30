"use client";

import { useState } from "react";

type PriorityQuestionProps = {
  value: string[];
  onConfirm: (priorities: string[]) => void;
  onBack: () => void;
};

export default function PriorityQuestion({ value, onConfirm, onBack }: PriorityQuestionProps) {
  const [order, setOrder] = useState<string[]>(value);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  return (
    <div className="scr agent-screen">
      <div className="agent-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <span style={{ fontSize: 12, color: "var(--slate)" }}>Question 6 of 7</span>
      </div>
      <div className="progress-bar">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`progress-dot${i < 6 ? " done" : ""}`}></div>
        ))}
      </div>
      <div className="ally-bubble">
        <div className="ally-avatar">🤝</div>
        <div className="ally-msg">
          Drag to <strong>rank</strong> what matters most.
        </div>
      </div>
      <div className="rank-wrap">
        <div className="rank-instruction">
          Use the arrows to reorder - top of the list matters most
        </div>
        {order.map((label, i) => (
          <div key={label} className="rank-item">
            <div className="rank-number">{i + 1}</div>
            <div className="rank-label">{label}</div>
            <div className="rank-controls">
              <button
                className="rank-arrow-btn"
                disabled={i === 0}
                onClick={() => move(i, -1)}
                aria-label={`Move ${label} up`}
              >
                ↑
              </button>
              <button
                className="rank-arrow-btn"
                disabled={i === order.length - 1}
                onClick={() => move(i, 1)}
                aria-label={`Move ${label} down`}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="rank-confirm" onClick={() => onConfirm(order)}>
        Confirm ranking →
      </button>
    </div>
  );
}
