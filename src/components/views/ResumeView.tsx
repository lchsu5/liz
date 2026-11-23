import { useRef, useState, type FormEvent } from "react";
import "./ResumeView.css";

const requestEndpoint = "https://script.google.com/macros/s/AKfycbxgROJv8-aqhFkHiVzP2LSL9wBYA12rsxo2T04aujKjD_NV2r9ElMLzKp61Ab3w1ZXmXg/exec";

export default function ResumeView() {
  const resumeUrl = new URL(`${import.meta.env.BASE_URL}Elizabeth_Hsu_Resume.pdf`, window.location.origin).href;
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const pending = useRef(false);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || status === "saved") return;

    const form = event.currentTarget;
    const reason = form.elements.namedItem("reason") as HTMLTextAreaElement;
    reason.value = reason.value.trim();
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const tab = window.open("about:blank", "_blank");
    if (tab) tab.opener = null;
    pending.current = true;
    setStatus("saving");

    try {
      const response = await fetch(requestEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({
          requestId: crypto.randomUUID(),
          name: fields.get("name"),
          email: fields.get("email"),
          reason: reason.value,
          message: reason.value,
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.status !== "success" || result.saved !== true) {
        throw new Error("Request save was not confirmed");
      }
      if (tab && !tab.closed) tab.location.replace(resumeUrl);
      setStatus("saved");
    } catch {
      tab?.close();
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  return (
    <main className="resume-view" aria-labelledby="resume-heading">
      <h1 id="resume-heading">Resume</h1>
      <form method="post" onSubmit={submitRequest}>
        <label>
          <span>Name <span title="*Required" aria-hidden="true">*</span></span>
          <input name="name" type="text" autoComplete="name" maxLength={120} pattern=".*\S.*" required />
        </label>
        <label>
          <span>Email <span title="*Required" aria-hidden="true">*</span></span>
          <input name="email" type="email" autoComplete="email" maxLength={254} pattern="[^\s@]+@[^\s@]+\.[^\s@]+" required />
        </label>
        <label>
          <span>Why do you need my resume? <span title="*Required" aria-hidden="true">*</span></span>
          <textarea name="reason" rows={4} maxLength={2000} placeholder="A role, project, event…" required />
        </label>
        {status === "saved" ? (
          <a className="resume-pdf-link" href={resumeUrl} target="_blank" rel="noopener noreferrer">Open resume PDF</a>
        ) : (
          <button className="resume-pdf-link" disabled={status === "saving"} type="submit">
            {status === "saving" ? "Saving request…" : "Open resume PDF"}
          </button>
        )}
      </form>
      {status === "error" && <p role="alert">Couldn’t confirm your request was saved. Please try again.</p>}
      {status === "saved" && <p role="status">Request saved.</p>}
    </main>
  );
}
