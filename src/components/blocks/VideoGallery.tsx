import * as React from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from "lucide-react";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  video: string;
  audio?: boolean;
  category?: string;
}

interface VideoGalleryProps {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

function VideoCard({ item, onOpen }: { item: Gallery4Item; onOpen: () => void }) {
  const ref = React.useRef<HTMLVideoElement | null>(null);

  const handleEnter = () => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {});
  };
  const handleLeave = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <button
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group text-left block w-full"
    >
      <div className="relative rounded-2xl overflow-hidden bg-card aspect-[3/4] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <video
          ref={ref}
          src={item.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-background/85 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-5 h-5 text-foreground ml-0.5" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <div className="pt-4 px-1">
        {item.category && (
          <p className="font-body text-[10px] tracking-[0.22em] uppercase text-accent mb-1.5">
            {item.category}
          </p>
        )}
        <h3 className="font-display text-xl text-foreground leading-tight">
          {item.title}
        </h3>
        {item.description && (
          <p className="font-body text-[13px] text-muted-foreground mt-1">
            {item.description}
          </p>
        )}
      </div>
    </button>
  );
}

function PlayerModal({ item, onClose }: { item: Gallery4Item; onClose: () => void }) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const [progressHover, setProgressHover] = React.useState(false);
  const idleTimer = React.useRef<number | null>(null);

  const showControls = () => {
    setControlsVisible(true);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setControlsVisible(false), 2000);
  };

  React.useEffect(() => {
    showControls();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (s: number) => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = Math.max(0, Math.min(duration, pct * duration));
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) v.play().catch(() => setIsPlaying(false));
    else v.pause();
  }, [isPlaying]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-foreground/85 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-background/80 hover:text-background transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" strokeWidth={1.5} />
      </button>

      <div
        ref={containerRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsPlaying((p) => !p);
        }}
        onMouseMove={showControls}
        className="relative w-full max-w-[420px] aspect-[9/16] bg-black rounded-2xl overflow-hidden"
      >
        <video
          ref={videoRef}
          src={item.video}
          muted={isMuted}
          loop
          playsInline
          autoPlay
          preload="metadata"
          onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
          onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
          className="w-full h-full object-cover"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-7 h-7 text-white ml-0.5" strokeWidth={1.5} />
            </div>
          </div>
        )}

        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute inset-x-0 bottom-0 px-3 pb-2 pt-6 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300",
            controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div
            className="w-full flex items-center cursor-pointer py-2"
            onMouseEnter={() => setProgressHover(true)}
            onMouseLeave={() => setProgressHover(false)}
            onClick={seek}
          >
            <div className={cn("w-full bg-white/30 transition-all duration-150", progressHover ? "h-1" : "h-0.5")}>
              <div
                className="h-full bg-accent"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors rounded"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} strokeWidth={1.5} className="text-white" /> : <Play size={20} strokeWidth={1.5} className="text-white" />}
              </button>
              <span className="font-mono text-[11px] text-white tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMuted((m) => !m)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors rounded"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} strokeWidth={1.5} className="text-white" /> : <Volume2 size={20} strokeWidth={1.5} className="text-white" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors rounded"
                aria-label="Fullscreen"
              >
                <Maximize2 size={20} strokeWidth={1.5} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoGallery({ title = "Video Gallery", description, items }: VideoGalleryProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");
  const [openItem, setOpenItem] = React.useState<Gallery4Item | null>(null);

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = React.useMemo(
    () => (activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory)),
    [items, activeCategory]
  );

  return (
    <section id="work" className="py-[100px] px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mt-3 max-w-2xl">
            My Work
          </h2>
          {description && (
            <p className="font-body text-muted-foreground mt-4 max-w-xl text-[15px]">
              {description}
            </p>
          )}
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-6 md:gap-8 mb-12">
            {categories.map((c) => {
              const isActive = c === activeCategory;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    "font-body text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 pb-1",
                    isActive
                      ? "text-foreground border-b border-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filtered.map((item) => (
            <VideoCard key={item.id} item={item} onOpen={() => setOpenItem(item)} />
          ))}
        </div>
      </div>

      {openItem && <PlayerModal item={openItem} onClose={() => setOpenItem(null)} />}
    </section>
  );
}