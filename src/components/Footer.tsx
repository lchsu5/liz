export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          © 2026 Elizabeth Hsu
        </p>
        <p className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          Last updated June 2026
        </p>
      </div>
    </footer>
  );
}
