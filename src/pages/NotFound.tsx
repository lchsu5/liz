import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center rounded-2xl border border-border bg-card/40 px-10 py-12 md:px-16 md:py-16 lift-card">
        <h1 className="font-display text-[56px] md:text-[72px] text-foreground leading-none mb-4">
          404
        </h1>
        <p className="font-body text-[15px] text-muted-foreground mb-6">
          Oops! Page not found
        </p>
        <a
          href="/"
          className="font-body text-[11px] tracking-[0.18em] uppercase text-accent hover:text-foreground transition-colors duration-300"
        >
          Return to Home →
        </a>
      </div>
    </div>
  );
};

export default NotFound;
