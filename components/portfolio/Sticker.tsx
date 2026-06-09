"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Sticker({
  children,
  rotate = -4,
  color = "var(--ink)",
  bg = "var(--bone)",
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  color?: string;
  bg?: string;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0, rotate: rotate * 2 }}
      whileInView={{ scale: 1, opacity: 1, rotate }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      viewport={{ once: true, amount: 0.5 }}
      style={{ background: bg, color }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs border border-current/10 shadow-[0_4px_18px_rgba(0,0,0,0.08)] select-none ${className}`}
    >
      {children}
    </motion.span>
  );
}
