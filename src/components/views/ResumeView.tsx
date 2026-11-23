import "./ResumeView.css";

export default function ResumeView() {
  const resumeUrl = new URL(`${import.meta.env.BASE_URL}Elizabeth_Hsu_Resume.pdf`, window.location.origin).href;

  return (
    <main className="resume-view" aria-labelledby="resume-heading">
      <h1 id="resume-heading">Resume</h1>
      <a className="resume-pdf-link" href={resumeUrl} target="_blank" rel="noopener noreferrer">Open resume PDF</a>
    </main>
  );
}
