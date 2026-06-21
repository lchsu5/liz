import SectionHeader from "./SectionHeader";

const courses = [
  "Prompt Engineering & AI Fundamentals",
  "JLL Data Centers Workshop Series",
  "Real Estate Capital Markets Workshop",
  "ICSC Retail Real Estate Bridge Program",
  "Commercial Real Estate Fundamentals Certificate Program",
];

export default function CoursesSection() {
  return (
    <section id="courses" className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="§05" title="Courses & Certificates" italicWord="Certificates" />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 border-y border-border py-2">
          {courses.map((c) => (
            <li
              key={c}
              className="font-body text-[14px] text-foreground/80 py-3 border-b border-border/60 last:border-b-0 md:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 flex items-baseline gap-3"
            >
              <span className="text-accent text-[12px]">—</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
