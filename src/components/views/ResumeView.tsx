import "./ResumeView.css";

export default function ResumeView() {
  const resumeUrl = new URL(`${import.meta.env.BASE_URL}Elizabeth_Hsu_Resume.pdf`, window.location.origin).href;

  return (
    <main className="resume-view" aria-labelledby="resume-heading">
      <h1 id="resume-heading">Resume</h1>
      <p>Fill out this form to open my resume as a PDF. Your responses will be emailed to me.</p>
      <form action="https://formsubmit.co/lchsu@andrew.cmu.edu" method="post">
        <input type="hidden" name="_subject" value="RESUME REQUEST" />
        <input type="hidden" name="_next" value={resumeUrl} />
        <label>
          Name (required)
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Email (required)
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Why do you need my resume? (required)
          <textarea name="message" rows={4} required />
        </label>
        <button type="submit">Open resume PDF</button>
      </form>
    </main>
  );
}
