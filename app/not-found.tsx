import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-32">
      <p className="text-base font-medium text-accent">404</p>
      <h1 className="display mt-6 max-w-[16ch] text-[clamp(38px,6vw,76px)] font-semibold leading-[1.08] tracking-[-0.025em]">
        That page is not here.
      </h1>
      <Link href="/" className="link-draw mt-10 inline-block text-[17px] font-medium text-ink">
        Back to the work
      </Link>
    </div>
  );
}
