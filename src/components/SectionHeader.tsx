interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <h2 className="font-heading font-medium uppercase text-[22px] md:text-[30px] tracking-[0.04em] text-foreground leading-tight">
        {title}
      </h2>
      {/* Hairline rule with 32px maroon accent overlapping from the left */}
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
