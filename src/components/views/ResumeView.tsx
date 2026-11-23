import "./ResumeView.css";

export default function ResumeView() {
  const resumeUrl = new URL(`${import.meta.env.BASE_URL}Elizabeth_Hsu_Resume.pdf`, window.location.origin).href;

  return (
    <main className="resume-view" aria-labelledby="resume-heading">
      <h1 id="resume-heading">Resume</h1>
      <form action="https://formsubmit.co/lchsu@andrew.cmu.edu" method="post">
        <input type="hidden" name="_subject" value="RESUME REQUEST" />
        <input type="hidden" name="_next" value={resumeUrl} />
        <label>
          <span>Name <span title="*Required" aria-hidden="true">*</span></span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email <span title="*Required" aria-hidden="true">*</span></span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Why do you need my resume? <span title="*Required" aria-hidden="true">*</span></span>
          <textarea name="message" rows={4} placeholder="A role, project, event…" required />
        </label>
        <button type="submit">Open resume PDF</button>
      </form>
    </main>
  );
}
