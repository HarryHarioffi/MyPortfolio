import type { CSSProperties } from "react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { publicFileExists } from "@/lib/files";
import { AgentCardDemo } from "./AgentCardDemo";
import { PlainChip } from "./Chip";
import { Portrait } from "./Portrait";
import { SplitFlap } from "./SplitFlap";
import { TypedPrompt } from "./TypedPrompt";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The home intro: a short note in large type, with a few words to play with, and the design/code
 * card beside it on wide screens (under it on narrow ones). It fills about three quarters of the
 * screen, header included, so the first row of case studies shows beneath it. The type scales
 * with the screen's height too, so short laptop screens still get that peek.
 */
export function Intro() {
  const { intro } = home;
  const photo = publicFileExists(intro.photo) ? intro.photo : null;

  return (
    // 65px: the sticky header's height.
    <section className="mx-auto flex min-h-[calc(75svh-65px)] max-w-page flex-col justify-center px-6 py-10">
      <h1 className="sr-only">
        {site.name} ({site.legalName}), {site.role}
      </h1>
      <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] lg:gap-16">
        <div className="w-full max-w-[24em] font-display text-[clamp(22px,min(2.2vw,3.5svh),32px)] leading-[1.55] tracking-[-0.012em] text-ink">
          <p className="rise text-muted" style={stagger(0)}>
            {intro.greeting}
          </p>
          {/* The nowrap spans keep a chip from landing alone at the start of a line. */}
          <p className="rise mt-[0.7em] text-pretty" style={stagger(1)}>
            I&apos;m{" "}
            <span className="whitespace-nowrap">
              {site.name} <Portrait src={photo} name={site.name} />,
            </span>{" "}
            a <PlainChip>design engineer</PlainChip> at {site.company}, designing how people{" "}
            <span className="whitespace-nowrap">
              stay in control of <PlainChip>AI agents</PlainChip>.
            </span>
          </p>
          <p className="rise mt-[0.7em] text-pretty" style={stagger(2)}>
            Most of it starts in Figma. When an idea depends{" "}
            <span className="whitespace-nowrap">
              on <TypedPrompt phrases={intro.dependsOn} />,
            </span>{" "}
            <span className="whitespace-nowrap">
              I <SplitFlap word={intro.flap} />
            </span>{" "}
            it in React.
          </p>
          <p className="rise mt-[0.7em]" style={stagger(3)}>
            <PlainChip>{intro.signoff}</PlainChip>
          </p>
          {/* The availability line (home.hero.availability, with the pulsing dot) is hidden for now. */}
        </div>

        <div className="rise" style={stagger(4)}>
          <AgentCardDemo compact />
        </div>
      </div>
    </section>
  );
}
