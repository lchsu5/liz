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
        <p className="font-body text-[9px] tracking-[0.28em] uppercase text-accent mb-2 font-medium">
          {label}
        </p>
      )}
      <h2 className="font-body text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground leading-none">
        {renderTitle()}
      </h2>
      {description && (
        <p className="font-body text-muted-foreground mt-4 max-w-2xl text-[13px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
