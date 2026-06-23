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
    <div className="mb-10 md:mb-12">
      {label && (
        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-accent mb-3">
          {label}
        </p>
      )}
      <h2 className="font-heading font-medium uppercase text-[22px] md:text-[30px] tracking-[0.04em] text-foreground leading-tight">
        {renderTitle()}
      </h2>
      <div className="relative mt-5 h-px bg-foreground/[0.12]">
        <div className="absolute left-0 -top-[0.5px] w-8 h-[2px] bg-accent" />
      </div>
      {description && (
        <p className="font-body text-muted-foreground mt-4 max-w-2xl text-[14px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
