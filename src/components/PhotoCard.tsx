import { useState } from "react";
import headshotImg from "@/assets/headshot.jpg";

export default function PhotoCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative select-none" style={{ width: 320, height: 370 }}>

      {/* Halftone dot circle — rearmost */}
      <div
        className="absolute rounded-full"
        style={{
          width: 210, height: 210, top: 48, left: 10,
          backgroundImage: "radial-gradient(circle, #7A253328 1.5px, transparent 1.5px)",
          backgroundSize: "9px 9px",
        }}
      />

      {/* Small solid oxblood square */}
      <div
        className="absolute rounded-[5px] z-10"
        style={{ width: 60, height: 60, bottom: 20, right: 14, background: "#7A2531" }}
      />

      {/* Oxblood outline rect, rotated opposite */}
      <div
        className="absolute rounded-[18px] z-10"
        style={{
          width: 258, height: 258, top: 74, left: 46,
          border: "2px solid #7A2531",
          transform: "rotate(2.5deg)",
        }}
      />

      {/* Main photo frame */}
      <div
        className="absolute rounded-[18px] overflow-hidden z-20 cursor-pointer"
        style={{
          width: 258, height: 258, top: 58, left: 30,
          transform: "rotate(-2.5deg)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
          background: "#FAF8F5",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((p) => !p)}
      >
        {/* PRO: real headshot */}
        <div
          className="absolute inset-0 transition-opacity duration-[250ms]"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          <img
            src={headshotImg}
            alt="Elizabeth Hsu"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* SOCIAL placeholder */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-[250ms]"
          style={{
            background: "linear-gradient(140deg, #F5E8DC 0%, #EDD5B8 100%)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <span
            className="text-[9px] tracking-[0.3em] uppercase mb-2"
            style={{ color: "#7A253166" }}
          >
            Social
          </span>
          <span
            className="text-4xl font-bold tracking-[0.15em]"
            style={{ color: "#7A253155" }}
          >
            SOCIAL
          </span>
        </div>

        {/* Caption pill */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center z-10">
          <div
            className="rounded-full px-4 py-1.5"
            style={{
              background: "rgba(255,255,255,0.84)",
              backdropFilter: "blur(6px)",
              minWidth: 172,
            }}
          >
            <div className="relative" style={{ height: "1.2em" }}>
              <span
                className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold whitespace-nowrap transition-opacity duration-[250ms]"
                style={{ color: "#7A2531", opacity: hovered ? 0 : 1 }}
              >
                Hi, nice to meet you!
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold whitespace-nowrap transition-opacity duration-[250ms]"
                style={{ color: "#7A2531", opacity: hovered ? 1 : 0 }}
              >
                I'm Liz Hsu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* "BASED IN" floating tag */}
      <div className="absolute z-30" style={{ top: 26, right: 0 }}>
        <div
          className="rounded-full px-3 py-1.5 shadow-sm"
          style={{ background: "rgba(255,255,255,0.93)", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <span className="block text-[8px] uppercase tracking-[0.2em] text-neutral-400 leading-tight">
            Based in
          </span>
          <span className="text-[11px] font-semibold" style={{ color: "#7A2531" }}>
            Irvine, CA
          </span>
        </div>
      </div>

      {/* Status pill */}
      <div className="absolute z-30" style={{ bottom: 14, left: 20 }}>
        <div
          className="rounded-full px-3 py-1 shadow-sm flex items-center gap-1.5"
          style={{ background: "rgba(255,255,255,0.93)", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="text-[11px] font-medium text-neutral-600">Open to roles</span>
        </div>
      </div>
    </div>
  );
}
