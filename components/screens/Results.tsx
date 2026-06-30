"use client";

import { useState } from "react";
import UnlockModal from "@/components/UnlockModal";
import { MatchResult } from "@/lib/types";

type ResultsProps = {
  matches: MatchResult[];
};

function formatINR(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

function ringDashoffset(percent: number, radius: number): number {
  const circumference = 2 * Math.PI * radius;
  return circumference * (1 - percent / 100);
}

export default function Results({ matches }: ResultsProps) {
  const [top, second, ...rest] = matches;
  const locked = rest.slice(0, 10);
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="scr">
      <div className="results-header">
        <h2>Your top matches ✦</h2>
        <p>Based on your profile, here&apos;s where you fit best</p>
      </div>
      <div className="match-count-banner">
        <div>
          <div className="count-num">{matches.length}</div>
          <div style={{ fontSize: 11, opacity: 0.85, marginTop: 3 }}>results found</div>
        </div>
        <div className="count-text">2 visible · {locked.length} more to unlock</div>
      </div>
      <div className="free-label">Shown now</div>
      <div className="free-results-grid-desktop">
        {[top, second].map((m, i) =>
          m ? (
            <div key={m.university} className={`uni-card${i === 0 ? " rank-1" : ""}`}>
              <div className={`uni-badge ${i === 0 ? "r1" : "r2"}`}>
                {i === 0 ? `✦ Best match · ${m.matchPercent}% fit` : `2nd best · ${m.matchPercent}% fit`}
              </div>
              <div className="uni-inner">
                <div className="uni-top">
                  <div className="uni-ring">
                    <svg viewBox="0 0 56 56">
                      <circle className="ring-bg" cx={28} cy={28} r={24} />
                      <circle
                        className="ring-fill"
                        cx={28}
                        cy={28}
                        r={24}
                        style={{ strokeDashoffset: ringDashoffset(m.matchPercent, 24) }}
                      />
                    </svg>
                    <div className="uni-pct">{m.matchPercent}%</div>
                  </div>
                  <div>
                    <div className="uni-name">{m.university}</div>
                    <div className="uni-loc">{m.country}</div>
                    <div className="uni-course">{m.course}</div>
                  </div>
                </div>
                <div className="uni-stats">
                  <div className="uni-stat-item">
                    <div className="uni-stat-val">{formatINR(m.tuitionPerYearINR)}</div>
                    <div className="uni-stat-label">per year</div>
                  </div>
                  <div className="uni-stat-item">
                    <div className="uni-stat-val">{m.placementPercent}%</div>
                    <div className="uni-stat-label">placement</div>
                  </div>
                  <div className="uni-stat-item">
                    <div className="uni-stat-val">#{m.qsRank}</div>
                    <div className="uni-stat-label">QS rank</div>
                  </div>
                </div>
                <div className="uni-reason">
                  <strong>Why Ally picked this:</strong> {m.reason}
                </div>
                <a
                  className="uni-expert-link"
                  href="https://leapscholar.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Know more, talk to an expert
                </a>
              </div>
            </div>
          ) : null
        )}
      </div>
      <div className="locked-section">
        <div className="locked-header">
          <div className="locked-title">
            {unlocked ? `${locked.length} more results, unlocked ✓` : `${locked.length} more results, locked`}
          </div>
          <div className="locked-count">
            {unlocked ? "Thanks for sharing your details" : "Share your details to unlock"}
          </div>
        </div>
        <div className="locked-grid-desktop">
          {locked.map((m) => (
            <div key={m.university} className="full-row">
              <div className="full-ring">
                <svg viewBox="0 0 38 38">
                  <circle className="ring-bg" cx={19} cy={19} r={16} />
                  <circle
                    className="ring-fill"
                    cx={19}
                    cy={19}
                    r={16}
                    style={{ strokeDashoffset: ringDashoffset(m.matchPercent, 16) }}
                  />
                </svg>
                <div className="full-pct">{m.matchPercent}%</div>
              </div>
              <div className={`full-info${unlocked ? " unlocked" : ""}`}>
                <div className="full-name">{m.university}</div>
                <div className="full-meta">
                  {m.country} · {m.course} · {formatINR(m.tuitionPerYearINR)}/yr
                </div>
              </div>
              {!unlocked && <div className="row-lock-icon">🔒</div>}
            </div>
          ))}
        </div>
        {!unlocked && (
          <button className="unlock-btn" onClick={() => setShowModal(true)}>
            Unlock all {locked.length} with your details
          </button>
        )}
      </div>
      <div className="results-cta-area">
        <div className="bottom-expert-bar">
          <div className="bex-text">Want a human opinion on your shortlist?</div>
          <button>Talk to expert</button>
        </div>
      </div>
      {showModal && (
        <UnlockModal
          onClose={() => setShowModal(false)}
          onUnlock={() => {
            setUnlocked(true);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
