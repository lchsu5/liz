import { useRef, useState, type FormEvent } from "react";
import "./ResumeView.css";

const requestEndpoint = "https://script.google.com/macros/s/AKfycbxgROJv8-aqhFkHiVzP2LSL9wBYA12rsxo2T04aujKjD_NV2r9ElMLzKp61Ab3w1ZXmXg/exec";

function getFieldErrors(form: HTMLFormElement) {
  const name = form.elements.namedItem("name") as HTMLInputElement;
  const email = form.elements.namedItem("email") as HTMLInputElement;
  const reason = form.elements.namedItem("reason") as HTMLTextAreaElement;

  return {
    name: name.value.trim() ? undefined : "Enter your name.",
    email: email.validity.valueMissing ? "Enter your email address."
      : email.validity.valid ? undefined : "Enter a valid email address.",
    reason: reason.value.trim() ? undefined : "Tell me why you need my resume.",
  };
}

export default function ResumeView() {
  const resumeUrl = new URL(`${import.meta.env.BASE_URL}Elizabeth_Hsu_Resume.pdf`, window.location.origin).href;
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errors, setErrors] = useState<ReturnType<typeof getFieldErrors>>();
  const [showPdfLink, setShowPdfLink] = useState(false);
  const pending = useRef(false);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || status === "saved") return;

    const form = event.currentTarget;
    const fieldErrors = getFieldErrors(form);
    setErrors(fieldErrors);
    const firstInvalid = Object.entries(fieldErrors).find(([, message]) => message);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid[0]) as HTMLElement).focus();
      return;
    }

    const fields = new FormData(form);
    const reason = String(fields.get("reason")).trim();
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
          reason,
          message: reason,
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.status !== "success" || result.saved !== true) {
        throw new Error("Request save was not confirmed");
      }
      const tab = window.open(resumeUrl, "_blank");
      if (tab) tab.opener = null;
      setShowPdfLink(!tab);
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  if (status === "saved") {
    return (
      <main className="resume-view" aria-labelledby="resume-saved">
        <div className="resume-confirmation">
          <h1 id="resume-saved" role="status">Request saved</h1>
          {showPdfLink && <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Open resume PDF</a>}
          <button type="button" onClick={() => {
            setErrors(undefined);
            setStatus("idle");
          }}>Resubmit the form</button>
        </div>
      </main>
    );
  }

  return (
    <main className="resume-view" aria-labelledby="resume-heading">
      <h1 id="resume-heading">Resume</h1>
      <form method="post" noValidate onSubmit={submitRequest} onInput={event => {
        if (errors) setErrors(getFieldErrors(event.currentTarget));
      }}>
        <label>
          <span id="resume-name-label">Name</span>
          <input name="name" type="text" autoComplete="name" maxLength={120} placeholder="Liz Hsu" required
            aria-labelledby="resume-name-label" aria-invalid={!!errors?.name} aria-describedby={errors?.name ? "resume-name-error" : undefined} />
          {errors?.name && <span className="resume-field-error" id="resume-name-error">{errors.name}</span>}
        </label>
        <label>
          <span id="resume-email-label">Email</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} pattern="[^\s@]+@[^\s@]+\.[^\s@]+" placeholder="lchsu@andrew.cmu.edu" required
            aria-labelledby="resume-email-label" aria-invalid={!!errors?.email} aria-describedby={errors?.email ? "resume-email-error" : undefined} />
          {errors?.email && <span className="resume-field-error" id="resume-email-error">{errors.email}</span>}
        </label>
        <label>
          <span id="resume-reason-label">Why do you need my resume?</span>
          <textarea name="reason" rows={4} maxLength={2000} placeholder="A role, project, event…" required
            aria-labelledby="resume-reason-label" aria-invalid={!!errors?.reason} aria-describedby={errors?.reason ? "resume-reason-error" : undefined} />
          {errors?.reason && <span className="resume-field-error" id="resume-reason-error">{errors.reason}</span>}
        </label>
        <button className="resume-pdf-link" disabled={status === "saving"} type="submit">
          {status === "saving" ? "Saving request…" : "Open resume PDF"}
        </button>
      </form>
      {status === "error" && <p role="alert">Couldn’t confirm your request was saved. Please try again.</p>}
    </main>
  );
}
