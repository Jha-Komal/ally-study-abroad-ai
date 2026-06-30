"use client";

import { FormEvent, useState } from "react";

type UnlockModalProps = {
  onClose: () => void;
  onUnlock: () => void;
};

export default function UnlockModal({ onClose, onUnlock }: UnlockModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const canSubmit = name.trim().length > 0 && email.trim().length > 0 && phone.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onUnlock();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal-title">Unlock your full shortlist</div>
        <p className="modal-sub">
          Share your details and we&apos;ll reveal every locked match - no spam calls, ever.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label className="modal-label" htmlFor="unlock-name">
              Full name
            </label>
            <input
              id="unlock-name"
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="modal-field">
            <label className="modal-label" htmlFor="unlock-email">
              Email
            </label>
            <input
              id="unlock-email"
              type="email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="modal-field">
            <label className="modal-label" htmlFor="unlock-phone">
              Phone number
            </label>
            <input
              id="unlock-phone"
              type="tel"
              className="modal-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          <button type="submit" className="modal-submit" disabled={!canSubmit}>
            Unlock my shortlist
          </button>
        </form>
      </div>
    </div>
  );
}
