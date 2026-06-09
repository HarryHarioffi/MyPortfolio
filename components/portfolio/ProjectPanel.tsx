"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export function ProjectPanel({ p }: { p: Project }) {
  return (
    <article
      className="relative shrink-0 w-screen h-screen flex flex-col md:flex-row overflow-hidden"
      style={{ background: p.bg, color: p.fg }}
    >
      {/* Index watermark */}
      <div
        className="pointer-events-none absolute -top-6 -right-4 font-display font-extrabold leading-none opacity-[0.08] select-none"
        style={{ fontSize: "clamp(260px, 42vw, 720px)", color: p.fg }}
      >
        {p.index}
      </div>

      {/* Left text column */}
      <div className="relative z-[2] flex flex-col justify-between p-8 md:p-16 md:w-[55%] gap-8">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest opacity-70">
          <span>case · {p.index} / 06</span>
          <span>{p.meta}</span>
        </div>

        <div>
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(56px, 8vw, 140px)" }}
          >
            {p.title}
          </motion.h2>
          <p className="mt-4 text-lg md:text-2xl font-display opacity-90 max-w-xl">
            {p.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl text-[15px] leading-relaxed">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-2">
              the problem
            </p>
            <p>{p.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-2">
              what i designed
            </p>
            <p>{p.designed}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-[11px]">
          {p.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full border"
              style={{ borderColor: p.accent, color: p.accent }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right art column */}
      <div className="relative z-[1] flex-1 flex items-center justify-center p-8 md:p-12">
        {p.artKind === "3d" && p.art && (
          <motion.img
            src={p.art}
            alt={`${p.title} visual`}
            width={1024}
            height={1024}
            loading="lazy"
            initial={{ scale: 0.92, opacity: 0, rotate: -4 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[78vh] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)] select-none"
          />
        )}

        {p.artKind === "lettering" && (
          <div
            className="font-display font-extrabold leading-[0.85] tracking-[-0.04em] text-center select-none"
            style={{ fontSize: "clamp(120px, 18vw, 320px)", color: p.accent }}
          >
            ERP
            <div
              className="font-mono text-base tracking-widest mt-4"
              style={{ color: p.fg, opacity: 0.7 }}
            >
              bom · procurement · components issued
            </div>
          </div>
        )}

        {p.artKind === "screens" && (
          <div className="relative w-full max-w-md aspect-[4/5] select-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="absolute inset-0 rounded-2xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] border border-black/5 overflow-hidden"
                style={{
                  transform: `translate(${i * 28}px, ${i * 28}px) rotate(${(i - 1) * 2}deg)`,
                }}
              >
                <div className="h-8 border-b border-black/5 flex items-center px-3 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                  <span className="h-2 w-2 rounded-full bg-black/10" />
                  <span className="ml-auto font-mono text-[10px] text-black/40">
                    twc · {2024 + i}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-3 w-2/3 bg-black/80 rounded-sm" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 bg-black/5 rounded" />
                    <div className="h-12 bg-black/5 rounded" />
                    <div className="h-12 bg-black/80 rounded" />
                  </div>
                  <div className="h-24 bg-gradient-to-br from-black/5 to-black/15 rounded-md relative overflow-hidden">
                    <svg viewBox="0 0 200 80" className="absolute inset-0 w-full h-full">
                      <polyline
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        points="0,60 30,40 60,50 90,20 120,35 150,10 200,25"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1.5">
                    {[80, 60, 70, 45].map((w, k) => (
                      <div
                        key={k}
                        className="h-2 bg-black/10 rounded"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Outcome ribbon */}
      {p.outcome && (
        <div
          className="absolute bottom-0 left-0 right-0 z-[3] border-t px-8 md:px-16 py-4 font-mono text-[12px] flex flex-col md:flex-row gap-2 md:gap-8 items-start md:items-center"
          style={{ borderColor: `${p.accent}55`, background: "rgba(0,0,0,0.12)" }}
        >
          <span className="uppercase tracking-widest opacity-60 shrink-0">
            outcome ↓
          </span>
          <span className="opacity-90">{p.outcome}</span>
        </div>
      )}
    </article>
  );
}
