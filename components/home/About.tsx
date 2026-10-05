const principles = [
  {
    title: "Decide with evidence",
    body: "I show the options I dropped, and why. A design is only as good as the reasons behind it.",
  },
  {
    title: "Prototype in code",
    body: "When an idea depends on timing or real data, I build it in React before anyone commits to it.",
  },
  {
    title: "Build systems, not screens",
    body: "A pattern earns its place when another team can use it without asking me how.",
  },
];

const experience = [
  { place: "The Cloud Company", role: "Design Engineer", time: "2023 to now" },
  { place: "[Previous role]", role: "[Title]", time: "[Years]" },
];

const toolkit = "Figma, React, Next.js, TypeScript, Tailwind, Motion, Git";

export function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-28 md:grid-cols-[200px_1fr]">
        <h2 className="pt-3.5 text-base font-medium text-accent">About</h2>

        <div className="max-w-[960px]">
          <p className="display text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.2] tracking-[-0.6px]">
            I got into design because I liked how things worked, and into code because I wanted
            mine to work too.
          </p>
          <p className="prose-copy mt-8 text-copy-lg text-muted">
            I design and build interfaces for enterprise and AI products. Most of my days are
            spent on the hard parts: dense workflows, permissions, and the places where an AI
            agent needs a human to decide. [Replace with your own story, in your own words.]
          </p>

          <dl className="mt-16 grid gap-9">
            {principles.map((p) => (
              <div key={p.title} className="grid gap-2 md:grid-cols-[200px_1fr] md:gap-6">
                <dt className="text-copy font-semibold text-ink">{p.title}</dt>
                <dd className="max-w-[34em] text-copy text-body">{p.body}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 border-t border-line pt-7">
            <h3 className="text-[14px] font-medium text-muted">Experience</h3>
            <ul className="mt-4">
              {experience.map((e) => (
                <li
                  key={e.place}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-line py-4 text-copy"
                >
                  <span className="text-ink">
                    {e.place} <span className="text-muted">, {e.role}</span>
                  </span>
                  <span className="text-muted tabular-nums">{e.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] text-muted">
              <span className="font-medium text-ink">Toolkit.</span> {toolkit}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
