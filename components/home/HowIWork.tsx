import Link from "next/link";
import { home } from "@/content/home";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/** Three habits, each with a link to where it actually happened. Claims with receipts. */
export function HowIWork() {
  const { heading, items } = home.howIWork;
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-28">
      <h2 className="display border-b border-line pb-6 text-[clamp(32px,4vw,40px)] font-medium leading-[1.2] tracking-[-0.6px]">
        {heading}
      </h2>
      <ol className="mt-10 grid gap-12 md:grid-cols-3 md:gap-10">
        {items.map((item, i) => (
          <li key={item.title} className="reveal flex flex-col">
            <span className="text-[14px] font-medium tabular-nums text-accent">0{i + 1}</span>
            <h3 className="display mt-3 text-[24px] font-medium leading-[30px] tracking-[-0.12px]">{item.title}</h3>
            <p className="mt-3 text-pretty text-copy text-body">{item.body}</p>
            <Link
              href={item.href}
              className="group mt-5 inline-flex items-center gap-2 self-start text-[15px] font-medium text-ink"
            >
              <span className="link-quiet">{item.linkLabel}</span>
              <ArrowIcon className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
