export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const full = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="marquee-track inline-flex gap-10 font-mono text-sm">
        {full.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            <span>{t}</span>
            <span aria-hidden>—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
