"use client";

type LandingProps = {
  onStart: () => void;
};

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="scr">
      <div className="nav">
        <div className="logo">
          LEAP<span>SCHOLAR</span>
        </div>
        <div className="nav-links">
          <span>Study Abroad ⌄</span>
          <span>Exams ⌄</span>
          <span>Resources ⌄</span>
          <span>Blogs</span>
          <span>Events</span>
        </div>
        <button className="signin-btn">Sign in</button>
      </div>

      <div className="hero-desktop">
        <div className="hero-desktop-left">
          <h1>
            Your global future,
            <br />
            <span className="accent">starts here</span>
          </h1>
          <p className="sub">
            Meet Ally - your AI mentor for the entire study abroad journey, from
            shortlist to visa. No commission bias, no spam calls.
          </p>
          <div className="badge-row">
            <div className="badge">
              <span className="dot"></span>No spam calls
            </div>
            <div className="badge">
              <span className="dot"></span>Zero commission bias
            </div>
          </div>
          <button className="cta-primary" style={{ width: 280 }} onClick={onStart}>
            Get your university shortlist
          </button>
        </div>
        <div className="hero-desktop-right">
          <div className="hexagon-deco"></div>
          <div className="desktop-preview-card">
            <div className="pc-top">
              <div className="pc-logo">UV</div>
              <div>
                <div className="pc-name">University of Virginia</div>
                <div className="pc-loc">Charlottesville, USA</div>
              </div>
            </div>
            <div className="pc-label">Admission chances</div>
            <div className="pc-bar-row">
              <div className="pc-bar-bg">
                <div className="pc-bar-fill"></div>
              </div>
              <span className="pc-pct">85%</span>
            </div>
            <div className="pc-divider"></div>
            <div className="pc-stats">
              <div>
                <div className="pc-stat-label">College rank</div>
                <div className="pc-stat-val">11 QS</div>
              </div>
              <div>
                <div className="pc-stat-label">Annual tuition</div>
                <div className="pc-stat-val">₹41,19,000</div>
              </div>
              <div>
                <div className="pc-stat-label">Application fees</div>
                <div className="pc-stat-val">₹0, waived</div>
              </div>
              <div>
                <div className="pc-stat-label">Duration</div>
                <div className="pc-stat-val">24 months</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stat-strip-wrap-d">
        <div className="stat-strip-d">
          <div className="big-stat">
            <div className="stat-num accent-num">12</div>
            <div className="stat-lbl">avg matches found</div>
          </div>
          <div className="stat-divider"></div>
          <div className="big-stat">
            <div className="stat-num">3 min</div>
            <div className="stat-lbl">to your shortlist</div>
          </div>
          <div className="stat-divider"></div>
          <div className="big-stat">
            <div className="stat-num accent-num">0</div>
            <div className="stat-lbl">spam calls</div>
          </div>
        </div>
      </div>

      <div className="section2-desktop">
        <h2>Expert guidance,</h2>
        <div className="accent-line">every step of the way</div>
      </div>

      <div className="feature-row-desktop">
        <div className="feature-item">
          <div className="feature-icon-circle" style={{ background: "var(--indigo-light)" }}>
            📋
          </div>
          <div className="feature-title">Get university shortlist</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-circle" style={{ background: "var(--orange-light)" }}>
            💰
          </div>
          <div className="feature-title">Secure your finances</div>
          <div className="feature-sub">Scholarship and loans</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-circle" style={{ background: "#E6F4EA" }}>
            📝
          </div>
          <div className="feature-title">Start your test prep</div>
          <div className="feature-sub">IELTS, PTE, DET, SAT</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-circle" style={{ background: "#FCE8F0" }}>
            🎯
          </div>
          <div className="feature-title">Maximise admit chances</div>
          <div className="feature-sub">SOPs, LORs, visa prep</div>
        </div>
      </div>

      <div className="trust-strip-desktop">
        <div className="trust-item-m">
          <div className="trust-icon-m">🔕</div>
          <div className="trust-title-m">No calls until you ask for one</div>
          <div className="trust-desc-m">We never share your number without your permission.</div>
        </div>
        <div className="trust-item-m">
          <div className="trust-icon-m">⚖️</div>
          <div className="trust-title-m">Zero commission bias</div>
          <div className="trust-desc-m">Ally recommends what fits you, not what pays Leap.</div>
        </div>
        <div className="trust-item-m">
          <div className="trust-icon-m">⚡</div>
          <div className="trust-title-m">3 minutes, not 3 weeks</div>
          <div className="trust-desc-m">7 questions. Instant results.</div>
        </div>
        <div className="trust-item-m">
          <div className="trust-icon-m">🎓</div>
          <div className="trust-title-m">Built on Leap&apos;s network</div>
          <div className="trust-desc-m">Backed by India&apos;s study abroad platform.</div>
        </div>
      </div>

      <div className="reviews-desktop-wrap">
        <div className="featured-review-d">
          <div className="quote-mark">&quot;</div>
          <p className="featured-review-d-text">
            My counsellor broke everything down - university options, rankings, career
            paths - and we planned each step around my own profile.
          </p>
          <div className="featured-reviewer">
            <div className="featured-reviewer-avatar">SP</div>
            <div className="featured-reviewer-info">
              <strong>Sahil P.</strong>Now at a university in Canada
            </div>
          </div>
        </div>
        <div className="mini-reviews-col">
          <div className="mini-review">
            <div className="mini-review-stars">★★★★★</div>
            <p className="mini-review-text">
              &quot;They helped me shortlist universities in Dubai based on my own goals.&quot;
            </p>
            <div className="mini-review-name">Riya M.</div>
            <div className="mini-review-loc">Now in Dubai</div>
          </div>
          <div className="mini-review">
            <div className="mini-review-stars">★★★★★</div>
            <p className="mini-review-text">
              &quot;Guided me through the whole visa process end to end.&quot;
            </p>
            <div className="mini-review-name">Aman K.</div>
            <div className="mini-review-loc">Now in the UK</div>
          </div>
        </div>
      </div>
    </div>
  );
}
