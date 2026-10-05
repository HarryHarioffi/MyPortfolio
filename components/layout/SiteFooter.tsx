import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-6 text-[15px] font-medium text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="uppercase">
          Designed + Coded with{" "}
          <span aria-label="love" role="img" className="text-accent">
            ♥
          </span>{" "}
          by {site.name}
        </p>
        <ul className="flex gap-7">
          <li>
            <a href={site.links.linkedin} className="transition-colors hover:text-ink">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
              Email
            </a>
          </li>
          <li>
            <a href={site.links.github} className="transition-colors hover:text-ink">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
