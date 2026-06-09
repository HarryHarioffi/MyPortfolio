"use client";

import { motion } from "framer-motion";
import { Sticker } from "./Sticker";
import { Marquee } from "./Marquee";

const word = "HARRY".split("");

export function Hero() {
  return (
    <section
      id="intro"
      className="relative min-h-screen w-full overflow-hidden grain flex flex-col"
      style={{ background: "var(--color-room-pink)", color: "var(--color-ink)" }}
    >
      {/* Floating stickers */}
      <div className="absolute top-[16%] left-[6%] z-[5]">
        <Sticker rotate={-6} bg="#0e0e10" color="#f4efe6">
          ● currently open to full-time
        </Sticker>
      </div>
      <div className="absolute bottom-[28%] right-[8%] z-[5]">
        <Sticker rotate={4} bg="#ff3b8a" color="#fff8ec">
          tamil nadu · india
        </Sticker>
      </div>
      <div className="absolute top-[58%] left-[10%] z-[5]">
        <Sticker rotate={-2} bg="#19d27d" color="#0e0e10">
          ui/ux · systems · motion
        </Sticker>
      </div>
      <div className="absolute top-[22%] right-[12%] z-[5] hidden md:block">
        <Sticker rotate={8} bg="#4d6dff" color="#fff8ec">
          enterprise · ai-native
        </Sticker>
      </div>

      {/* Main lettering */}
      <div className="relative z-[3] flex-1 flex flex-col justify-center items-center px-6">
        <p className="font-mono text-xs sm:text-sm tracking-widest text-ink/60 mb-6">
          ⌘ hariharasudhan shanmugam — 2026
        </p>
        <h1
          aria-label="HARRY"
          className="font-display font-extrabold text-ink leading-[0.82] tracking-[-0.04em] text-center select-none"
          style={{ fontSize: "clamp(120px, 28vw, 460px)" }}
        >
          {word.map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.15 + i * 0.08,
                type: "spring",
                stiffness: 80,
                damping: 16,
              }}
              className="inline-block"
            >
              {c}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 max-w-2xl text-center text-lg sm:text-xl leading-snug text-ink/80"
        >
          I design complex systems that feel simple to use — enterprise SaaS,
          AI-native platforms and the kind of data-dense experiences that break
          if you get the hierarchy wrong.
        </motion.p>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-[3] border-y border-ink/15 bg-ink text-bone py-3">
        <Marquee
          items={[
            "enterprise saas",
            "ai platforms",
            "erp workflows",
            "dashboards",
            "design systems",
            "motion direction",
            "figma · react · framer",
          ]}
        />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[6] font-mono text-[11px] tracking-widest text-ink/60 flex flex-col items-center gap-2">
        <span>scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="block h-6 w-px bg-ink/50"
        />
      </div>
    </section>
  );
}
