"use client";

import { usePathname } from "next/navigation";

type Copy = { heading: string; body: string };

/** The closing line changes with the page: /about gets its own; everywhere else shares one. */
export function FooterHeading({ fallback, about }: { fallback: Copy; about: Copy }) {
  const copy = usePathname().startsWith("/about") ? about : fallback;
  return (
    <>
      <h2 className="display max-w-[20ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.025em]">
        {copy.heading}
      </h2>
      <p className="mt-5 max-w-[34em] text-pretty text-copy-lg text-body">{copy.body}</p>
    </>
  );
}
