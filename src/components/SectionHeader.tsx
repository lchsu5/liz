interface SectionHeaderProps {
  title: string;
  description?: string;
  label?: string;
  italicWord?: string;
}

export default function SectionHeader({
  title,
  description,
  label,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="border-t border-foreground/[0.12] pt-3">
        <span className="font-body text-[10px] tracking-[0.32em] uppercase text-foreground/40">
          {label || title}
        </span>
      </div>
      {description && (
        <p className="font-body text-[14px] text-foreground/55 mt-5 leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
