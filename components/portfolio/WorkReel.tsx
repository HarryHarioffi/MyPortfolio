"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectPanel } from "./ProjectPanel";

export function WorkReel() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  // Translate the track horizontally across (projects.length - 1) viewports
  const x = useTransform(
    smooth,
    [0, 1],
    [`0vw`, `-${(projects.length - 1) * 100}vw`]
  );

  const progressW = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Section label (vertical scroll) */}
      <div
        id="work"
        className="bg-bone text-ink py-10 px-6 md:px-12 flex items-end justify-between border-t border-ink/10"
      >
        <div>
          <p className="font-mono text-xs tracking-widest opacity-60">02 — work</p>
          <h2 className="font-display font-extrabold text-5xl md:text-7xl tracking-[-0.03em] mt-2">
            Selected projects.
          </h2>
        </div>
        <p className="hidden md:block font-mono text-xs opacity-60 max-w-xs text-right">
          six shipped & in-flight pieces — scroll to ride the reel left to right.
        </p>
      </div>

      {/* Pin zone: tall scrollable container, sticky inner */}
      <section
        ref={ref}
        className="relative bg-bone"
        style={{ height: `${projects.length * 100}vh` }}
        aria-label="Project reel"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x }} className="flex h-full will-change-transform">
            {projects.map((p) => (
              <ProjectPanel key={p.index} p={p} />
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-3 left-6 right-6 z-[40] flex items-center gap-3 font-mono text-[10px] text-white mix-blend-difference">
            <span>reel</span>
            <div className="flex-1 h-px bg-white/30 relative overflow-hidden">
              <motion.div
                style={{ width: progressW }}
                className="absolute inset-y-0 left-0 bg-white"
              />
            </div>
            <span>01 / 06</span>
          </div>
        </div>
      </section>
    </>
  );
}
