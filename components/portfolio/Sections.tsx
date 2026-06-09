"use client";

import { motion } from "framer-motion";
import { extras } from "@/data/projects";
import { Sticker } from "./Sticker";

const pillars = [
  {
    h: "Enterprise & ERP",
    p: "Multi-step workflows, approval chains, procurement, inventory, governance. Where power users need speed, precision and zero visual noise.",
  },
  {
    h: "AI Platform UX",
    p: "Designing for agentic systems — surfaces that communicate what an AI has done, decided, and where it needs human judgement.",
  },
  {
    h: "Design Systems",
    p: "Components and tokens, not screens. Every pattern built to scale — dark, light, all states, all edges.",
  },
  {
    h: "Dashboards & Motion",
    p: "Data-dense layouts for long-session use. Plus AI-assisted visual design and prompt direction — Kling, Runway, Midjourney.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen px-6 md:px-16 py-24"
      style={{ background: "var(--color-room-sage)", color: "var(--color-ink)" }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest opacity-70">03 — about</p>
        <h2
          className="font-display font-extrabold mt-3 tracking-[-0.03em] leading-[0.9]"
          style={{ fontSize: "clamp(56px, 9vw, 160px)" }}
        >
          Systems thinker, <br />
          motion-aware.
        </h2>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 mt-12 items-start">
          <p className="text-xl md:text-2xl leading-snug max-w-2xl">
            I'm <strong>Harry</strong> — a UI/UX designer with 2+ years at{" "}
            <em>The Cloud Company</em>, an AI-native product engineering firm in
            Tamil Nadu. I work on hard problems: ERP workflows, cybersecurity
            dashboards, AI platform interfaces, and the kind of data-dense
            experiences that break if you get the hierarchy wrong.
          </p>
          <div className="flex flex-wrap gap-2">
            <Sticker bg="#0e0e10" color="#f4efe6" rotate={-3}>
              2+ years shipping
            </Sticker>
            <Sticker bg="#f4efe6" color="#0e0e10" rotate={3}>
              figma workshops delivered
            </Sticker>
            <Sticker bg="#ff6fa5" color="#0e0e10" rotate={-2}>
              react · tailwind · framer
            </Sticker>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-px mt-16 bg-ink/15 border border-ink/15 rounded-2xl overflow-hidden">
          {pillars.map((pl) => (
            <div key={pl.h} className="p-8 bg-[var(--color-room-sage)]">
              <h3 className="font-display text-2xl font-extrabold tracking-tight">
                {pl.h}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed opacity-90">{pl.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 font-mono text-xs">
          <p className="uppercase tracking-widest opacity-60 mb-3">tools</p>
          <p className="opacity-90 leading-relaxed">
            Figma (advanced) · React · Tailwind · Framer Motion · Kling AI ·
            Runway · Midjourney · DALL·E 3 · Gemini API · Git · macOS
          </p>
        </div>
      </div>
    </section>
  );
}

const steps = [
  ["01", "Understand the workflow", "Not just the screen — the operational context before and after it."],
  ["02", "Map the information", "What does the user need to see, in what order, at what level of detail."],
  ["03", "Design the system", "Components, states, tokens, patterns — before individual screens."],
  ["04", "Spec for developers", "Implementation notes detailed enough that the handoff meeting is optional."],
  ["05", "Iterate on edge cases", "Empty, error, loading and boundary conditions are where good design lives."],
];

export function Process() {
  return (
    <section
      id="process"
      className="relative w-full px-6 md:px-16 py-24"
      style={{ background: "var(--color-bone)" }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest opacity-60">04 — process</p>
        <h2
          className="font-display font-extrabold mt-3 tracking-[-0.03em] leading-[0.9]"
          style={{ fontSize: "clamp(56px, 9vw, 160px)" }}
        >
          How I work.
        </h2>

        <p className="mt-6 max-w-2xl text-lg opacity-80">
          I don't start with screens. I start with the workflow — understanding
          what the business is trying to accomplish, what decisions users are
          making, and where the experience creates friction.
        </p>

        <ol className="mt-14 grid md:grid-cols-5 gap-px bg-ink/10 border border-ink/10 rounded-2xl overflow-hidden">
          {steps.map(([n, h, p], i) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-bone p-6 flex flex-col gap-4"
            >
              <span className="font-mono text-[11px] tracking-widest opacity-50">
                step {n}
              </span>
              <h3 className="font-display text-2xl font-extrabold leading-tight">
                {h}
              </h3>
              <p className="text-sm opacity-75 leading-relaxed">{p}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Extras() {
  return (
    <section
      id="extras"
      className="relative w-full px-6 md:px-16 py-24"
      style={{ background: "var(--color-room-pink)", color: "var(--color-ink)" }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-widest opacity-70">05 — extras</p>
        <h2
          className="font-display font-extrabold mt-3 tracking-[-0.03em] leading-[0.9]"
          style={{ fontSize: "clamp(56px, 9vw, 160px)" }}
        >
          Side work,
          <br /> for fun.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {extras.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 24, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              whileHover={{ rotate: 0, y: -6 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 150 }}
              className="bg-bone text-ink rounded-2xl p-6 border border-ink/10 shadow-[0_20px_50px_rgba(14,14,16,0.12)]"
            >
              <div className="font-mono text-[10px] tracking-widest opacity-50">
                0{i + 1}
              </div>
              <h3 className="font-display text-2xl font-extrabold mt-3 leading-tight">
                {e.title}
              </h3>
              <p className="text-sm opacity-80 mt-3 leading-relaxed">{e.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full min-h-screen px-6 md:px-16 py-24 flex flex-col justify-between"
      style={{ background: "var(--color-ink)", color: "var(--color-bone)" }}
    >
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        <p className="font-mono text-xs tracking-widest opacity-60">06 — contact</p>

        <h2
          className="font-display font-extrabold mt-4 tracking-[-0.04em] leading-[0.82]"
          style={{ fontSize: "clamp(72px, 14vw, 280px)" }}
        >
          let's build
          <br />
          <span style={{ color: "var(--color-room-echo-accent)" }}>something</span>
          <br />
          that works.
        </h2>

        <p className="mt-10 max-w-2xl text-lg opacity-80">
          Currently open to full-time opportunities. If you're working on a
          complex product — enterprise software, AI tools, data-heavy
          platforms — I'd like to hear about it.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="mailto:shariharasudhan2002@gmail.com"
            className="px-6 py-3 rounded-full bg-bone text-ink font-mono text-sm hover:opacity-90 transition cursor-pointer"
          >
            shariharasudhan2002@gmail.com →
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-bone/30 font-mono text-sm hover:bg-bone/10 transition cursor-pointer"
          >
            linkedin ↗
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-full border border-bone/30 font-mono text-sm hover:bg-bone/10 transition cursor-pointer"
          >
            download cv ↓
          </a>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-3 font-mono text-xs opacity-60">
        <span>designed by harry · built with clarity</span>
        <span>tamil nadu, india · 2026</span>
      </footer>
    </section>
  );
}
