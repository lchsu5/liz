interface SectionHeaderProps {
  label: string;
  title: string;
  italicWord?: string;
  description?: string;
}

export default function SectionHeader({ label, title, italicWord, description }: SectionHeaderProps) {
  const words = title.split(" ");
  return (
    <div className="mb-12">
      <p className="font-body text-[11px] tracking-[0.28em] uppercase text-accent mb-3">
        {label}
      </p>
      <h2 className="font-display text-[34px] md:text-[44px] leading-[1.05] text-foreground tracking-tight">
        {italicWord ? (
          words.map((w, i) => (
            <span key={i}>
              {w === italicWord ? <span className="italic text-accent">{w}</span> : w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="font-body text-muted-foreground mt-4 max-w-2xl text-[14px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
