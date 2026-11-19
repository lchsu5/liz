import type { FormEvent } from "react";
import "./ResumeView.css";

export default function ResumeView() {
  const requestResume = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const context = String(fields.get("context")).trim();
    const body = [
      context ? `Someone requested your resume for ${context}.` : "Someone requested your resume.",
      `Email: ${fields.get("email")}`,
    ].filter(Boolean).join("\r\n\r\n");

    window.location.href = `mailto:lchsu@andrew.cmu.edu?subject=RESUME%20REQUEST&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="resume-view" aria-labelledby="resume-heading">
      <h1 id="resume-heading">Resume</h1>
      <p>Drop your email and I'll send it to you.</p>
      <form onSubmit={requestResume}>
        <label>
          Email (required)
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Context
          <textarea name="context" rows={4} />
        </label>
        <button type="submit" aria-describedby="resume-hint">Send me the resume</button>
        <p id="resume-hint">Opens a draft in your email app for you to send.</p>
      </form>
    </main>
  );
}
