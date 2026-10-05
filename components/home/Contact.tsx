import { site } from "@/content/site";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-28 md:grid-cols-[200px_1fr]">
        <h2 className="pt-3.5 text-base font-medium text-accent">Contact</h2>
        <div>
          <p className="display max-w-[20ch] text-[clamp(32px,5vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em]">
            Have a product that needs design and code?
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-10 inline-flex items-center gap-3 text-[clamp(18px,2.4vw,28px)] font-medium text-ink"
          >
            <span className="link-draw">{site.email}</span>
            <ArrowIcon className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
