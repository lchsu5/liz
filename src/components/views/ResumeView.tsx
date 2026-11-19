import type { FormEvent } from "react";
import { useLocation } from "react-router-dom";
import "./ResumeView.css";

export default function ResumeView() {
  const { search } = useLocation();
  const submitted = new URLSearchParams(search).get("submitted") === "1";

  const prepareRequest = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const context = (form.elements.namedItem("resume-context") as HTMLTextAreaElement).value.trim();
    (form.elements.namedItem("message") as HTMLInputElement).value = context
      ? `Someone requested your resume for ${context}.`
      : "Someone requested your resume.";
  };

  return (
    <main className="resume-view" aria-labelledby="resume-heading">
      <h1 id="resume-heading">Resume</h1>
      <p>Drop your email and I'll send it to you.</p>
      {submitted && <p className="resume-status" role="status">Thanks for requesting my resume.</p>}
      <form action="https://formsubmit.co/lchsu@andrew.cmu.edu" method="post" onSubmit={prepareRequest}>
        <input type="hidden" name="_subject" value="RESUME REQUEST" />
        <input type="hidden" name="_next" value={new URL(`${import.meta.env.BASE_URL}resume/?submitted=1`, window.location.origin).href} />
        <input type="hidden" name="message" defaultValue="Someone requested your resume." />
        <label>
          Email (required)
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Context
          <textarea id="resume-context" rows={4} />
        </label>
        <button type="submit">Send me the resume</button>
      </form>
    </main>
  );
}
