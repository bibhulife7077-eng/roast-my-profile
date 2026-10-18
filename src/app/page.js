"use client";

import { useState } from "react";

const examples = [
"CEO of overthinking. Professional napper. Replying mentally since 2019.",
"Gym 5x a week. Still running from my responsibilities.",
"Entrepreneur | Dreamer | Currently ignoring 47 unread messages.",
];

const roasts = [
"Your bio has the confidence of a TED Talk and the execution of a group project where nobody showed up.",
"You put 'CEO of overthinking' in your bio like your brain has a LinkedIn account and still can't get hired.",
"Your unread messages have formed a government. You're no longer the main character in your own inbox.",
];

export default function Home() {
const [profile, setProfile] = useState("");
const [style, setStyle] = useState("Savage");
const [result, setResult] = useState("");
const [copied, setCopied] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

async function generateRoast() {
const text = profile.trim();

if (text.length < 5) {
  setError("Give us a little more material. At least 5 characters.");
  return;
}
if (text.length > 500) {
  setError("Keep it under 500 characters.");
  return;
}

setError("");
setResult("");
setCopied(false);
setLoading(true);

try {
  const response = await fetch("/api/roast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profileText: text, style }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Couldn't generate a roast. Please try again.");
  }

  setResult(data.roast);
} catch (err) {
  setError(err.message || "Couldn't connect. Please try again.");
} finally {
  setLoading(false);
}
}

async function copyResult() {
try {
await navigator.clipboard.writeText(result);
setCopied(true);
} catch {
setError("Copy isn't available here. Select the result text and copy it manually.");
}
}

async function shareResult() {
const text = "I just got roasted by Roast My Profile 🔥\n\n" + result;
try {
if (navigator.share) {
await navigator.share({ title: "Roast My Profile", text });
} else {
await navigator.clipboard.writeText(text);
setCopied(true);
}
} catch (e) {
if (e.name !== "AbortError") {
setError("Couldn't share automatically. Try Copy Roast instead.");
}
}
}

return (
<main className="site-shell">
<nav className="nav">
<a href="#" className="brand"><span className="brand-mark">R</span> roast<span className="brand-light">myprofile</span></a>
<span className="nav-pill"><span className="live-dot" /> THE INTERNET'S MIRROR</span>
</nav>

  <section className="hero">
    <div className="eyebrow"><span>✳</span> YOUR PROFILE. NO MERCY.</div>
    <h1>We roast.<br />You <span className="gradient-text">recover.</span></h1>
    <p className="hero-copy">That bio you spent 40 minutes writing? Let&apos;s see what the internet thinks of it.</p>

    <div className="roast-card">
      <div className="card-top">
        <div className="card-label"><span className="spark">✳</span> THE ROAST MACHINE</div>
        <span className="version-tag">BETA · V1.0</span>
      </div>

      <label htmlFor="profile" className="input-label">DROP YOUR BIO OR PROFILE TEXT</label>
      <textarea
        id="profile"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
        placeholder="I'm a future billionaire, gym enthusiast, and professional overthinker..."
        maxLength={500}
      />
      <div className="input-footer">
        <span>Keep it public. Keep it fun.</span>
        <span>{profile.length}/500</span>
      </div>

      <div className="examples">
        <span className="examples-label">TRY ONE:</span>
        {examples.map((example, i) => (
          <button key={example} className="example-chip" onClick={() => { setProfile(example); setError(""); }}>
            Example {i + 1}
          </button>
        ))}
      </div>

      <div className="style-label">CHOOSE YOUR DAMAGE</div>
      <div className="styles">
        {[
          ["Playful", "😏", "A little spice"],
          ["Savage", "🔥", "No chill"],
          ["Brutal", "💀", "You asked for it"],
        ].map(([name, emoji, description]) => (
          <button
            key={name}
            className={`style-option ${style === name ? "selected" : ""}`}
            onClick={() => setStyle(name)}
            aria-pressed={style === name}
          >
            <span className="style-emoji">{emoji}</span>
            <span className="style-name">{name}</span>
            <span className="style-description">{description}</span>
          </button>
        ))}
      </div>

      <button className="roast-button" onClick={generateRoast}>
        Roast me <span>↗</span>
      </button>
      <p className="privacy-note"><span>◇</span> Just for laughs. Don&apos;t submit private information.</p>

      {error && <p className="error-message" role="alert">{error}</p>}

      {result && (
        <section className="result-card" aria-live="polite">
          <div className="result-heading"><span>🔥 YOUR ROAST</span><span className="result-style">{style.toUpperCase()}</span></div>
          <p className="result-text">{result}</p>
          <div className="result-actions">
            <button className="secondary-button" onClick={copyResult}>{copied ? "✓ Copied" : "Copy roast"}</button>
            <button className="secondary-button share-button" onClick={shareResult}>Share ↗</button>
          </div>
          
        </section>
      )}
    </div>
    <div className="social-proof"><span>✳</span> Your friends are not safe either.</div>
  </section>

  <section className="how-section">
    <p className="section-kicker">IT&apos;S NOT THAT DEEP</p>
    <h2>Three steps to emotional damage.</h2>
    <div className="steps">
      <article><span className="step-number">01</span><h3>Drop the bio</h3><p>Paste the profile you think is iconic.</p></article>
      <article><span className="step-number">02</span><h3>Take the hit</h3><p>Pick your spice level and face the verdict.</p></article>
      <article><span className="step-number">03</span><h3>Pass it on</h3><p>Share the roast. Challenge your friends.</p></article>
    </div>
  </section>

  <footer className="footer">
    <a href="#" className="brand"><span className="brand-mark">R</span> roast<span className="brand-light">myprofile</span></a>
    <span>Built for laughs, not life advice.</span>
    <span>V1.0 · Preview</span>
  </footer>
</main>

);
}
