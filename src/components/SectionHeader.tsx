interface SectionHeaderProps {
  title: string;
  description?: string;
  /** Legacy: small caption above the title (e.g. "§ 02"). Optional. */
  label?: string;
  /** Legacy: a word inside the title to render italic + accent. Optional. */
  italicWord?: string;
}

export default function SectionHeader({
  title,
  description,
  label,
  italicWord,
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!italicWord) return title;
    const parts = title.split(italicWord);
    return (
      <>
        {parts[0]}
        <span className="italic text-accent">{italicWord}</span>
        {parts.slice(1).join(italicWord)}
      </>
    );
  };

  return (
    <div className="mb-12 md:mb-16">
      {label && (
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">
          {label}
        </p>
      )}
      <h2 className="font-display font-normal uppercase text-[28px] md:text-[40px] tracking-[0.01em] text-foreground leading-[1.05]">
        {renderTitle()}
      </h2>
      <div className="relative mt-6 h-px bg-foreground/[0.1]">
        <div className="absolute left-0 -top-[1px] w-10 h-[3px] rounded-full bg-accent" />
      </div>
      {description && (
        <p className="font-body text-muted-foreground mt-5 max-w-2xl text-[15px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
