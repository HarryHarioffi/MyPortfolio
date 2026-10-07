import Link from "next/link";
import { home } from "@/content/home";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/** The door to /about: the full name, set big, with the part the stage name kept picked out. */
export function AboutTeaser() {
  const t = home.aboutTeaser;
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-24 lg:grid-cols-12 lg:gap-x-10">
        <div className="min-w-0 lg:col-span-12">
          <h2 className="text-[14px] font-medium text-accent">{t.heading}</h2>
          <p className="display mt-4 text-[clamp(40px,10.2vw,150px)] font-semibold leading-[0.95] tracking-[-0.035em]">
            <span className="text-accent">Hari</span>
            <span>harasudhan</span>
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="max-w-[30em] text-pretty text-copy-lg text-body">{t.body}</p>
          <Link href="/about" className="group mt-6 inline-flex items-center gap-2 text-[17px] font-medium text-ink">
            <span className="link-draw">{t.linkLabel}</span>
            <ArrowIcon className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
