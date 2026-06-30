"use client";

type WelcomeProps = {
  onStart: () => void;
};

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="scr welcome-screen desktop-welcome">
      <div className="welcome-avatar">🤝</div>
      <h2>Hi, I&apos;m Ally.</h2>
      <p className="welcome-name">Your AI mentor for study abroad</p>
      <div className="welcome-points">
        <div className="welcome-point">
          <div className="welcome-check">✓</div>7 quick questions
        </div>
        <div className="welcome-point">
          <div className="welcome-check">✓</div>Personalised university matches
        </div>
        <div className="welcome-point">
          <div className="welcome-check">✓</div>No calls or spam - ever
        </div>
      </div>
      <button className="welcome-cta" onClick={onStart}>
        Let&apos;s go
      </button>
      <p className="welcome-privacy">
        We&apos;ll only ask for contact details once you want your full shortlist.
      </p>
    </div>
  );
}
