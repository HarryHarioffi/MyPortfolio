/**
 * Drawn stand-ins for case-study covers, used until real (NDA-safe) screens are added.
 * Each one is a schematic of the structure the case study describes, not a fake screenshot,
 * and says so in the corner. SVG, so it scales to any cover shape and stays crisp.
 */

type Props = { slug: string; title: string; domain: string };

const label = "fill-muted text-[12px] font-medium";

function Badge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`absolute bottom-3 left-3 rounded-[4px] px-2 py-0.5 text-[11px] font-medium ${
        dark ? "bg-[rgb(252_253_253/0.08)] text-[#aab4ba]" : "bg-paper/80 text-muted"
      }`}
    >
      Schematic
    </span>
  );
}

/** StrataAI: three agents built from the same three blocks; only the access differs. */
function Strata() {
  const agents = [
    { name: "Finance", level: "Can view" },
    { name: "Support", level: "Can edit" },
    { name: "Research", level: "Can manage" },
  ];
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      {agents.map((a, i) => {
        const x = 44 + i * 188;
        return (
          <g key={a.name} transform={`translate(${x} 56)`}>
            <rect width="176" height="288" rx="12" className="fill-paper stroke-line" />
            <circle cx="24" cy="28" r="10" className="fill-accent-soft" />
            <text x="42" y="33" className="fill-ink text-[14px] font-semibold">
              {a.name}
            </text>
            <line x1="0" x2="176" y1="56" y2="56" className="stroke-line" />
            {/* Instructions */}
            <text x="16" y="80" className={label}>Instructions</text>
            <rect x="16" y="90" width="144" height="7" rx="3.5" className="fill-chip" />
            <rect x="16" y="104" width="104" height="7" rx="3.5" className="fill-chip" />
            {/* Sources */}
            <text x="16" y="142" className={label}>Sources</text>
            <rect x="16" y="152" width="62" height="22" rx="5" className="fill-chip" />
            <rect x="84" y="152" width="46" height="22" rx="5" className="fill-chip" />
            {/* Access, the block admins scan */}
            <text x="16" y="208" className={label}>Access</text>
            <rect x="16" y="218" width="144" height="48" rx="8" className="fill-accent-soft" />
            <text x="30" y="247" className="fill-accent text-[13px] font-semibold">
              {a.level}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Heimdall: decision-first columns. Color is reserved for severity, as in the product. */
function Heimdall() {
  const col = (x: number, title: string, count?: string) => (
    <g transform={`translate(${x} 48)`}>
      <text x="0" y="14" className="fill-[#e9eef0] text-[13px] font-semibold">
        {title}
      </text>
      {count && (
        <>
          <rect x={title.length * 7.6 + 8} y="1" width="22" height="18" rx="9" className="fill-[#3a434a]" />
          <text x={title.length * 7.6 + 19} y="14" textAnchor="middle" className="fill-[#e9eef0] text-[11px] font-semibold">
            {count}
          </text>
        </>
      )}
    </g>
  );
  const row = (x: number, y: number, w: number, severity = false, conf?: number) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height="58" rx="8" className="fill-[#323a40]" />
      {severity && <rect width="4" height="58" rx="2" className="fill-severity" />}
      <rect x="16" y="16" width={w * 0.62} height="7" rx="3.5" className="fill-[#5d6a72]" />
      <rect x="16" y="32" width={w * 0.38} height="7" rx="3.5" className="fill-[#46515a]" />
      {conf !== undefined && (
        <>
          <rect x={w - 64} y="16" width="48" height="5" rx="2.5" className="fill-[#46515a]" />
          <rect x={w - 64} y="16" width={48 * conf} height="5" rx="2.5" className="fill-[#9fd3d0]" />
          <text x={w - 16} y="40" textAnchor="end" className="fill-[#aab4ba] text-[11px] font-medium">
            {Math.round(conf * 100)}%
          </text>
        </>
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      {col(40, "Needs a human", "3")}
      {row(40, 80, 196, true)}
      {row(40, 148, 196)}
      {row(40, 216, 196)}
      {col(256, "Agent handled")}
      {row(256, 80, 196, false, 0.92)}
      {row(256, 148, 196, false, 0.78)}
      {row(256, 216, 196, false, 0.64)}
      {col(472, "Context")}
      <g transform="translate(472 80)">
        <rect width="128" height="194" rx="8" className="fill-[#2f363c]" />
        {[20, 38, 56, 92, 110, 146].map((y, i) => (
          <rect key={y} x="16" y={y} width={i % 3 === 2 ? 56 : 96} height="7" rx="3.5" className="fill-[#46515a]" />
        ))}
      </g>
    </svg>
  );
}

/** Echo Desk: the review queue stays visible; the selected request docks beside it. */
function Echo() {
  return (
    <svg viewBox="0 0 480 520" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      <rect x="32" y="48" width="416" height="424" rx="12" className="fill-paper stroke-line" />
      {/* Queue */}
      <text x="52" y="80" className="fill-ink text-[13px] font-semibold">Review queue</text>
      {Array.from({ length: 7 }, (_, i) => {
        const y = 100 + i * 50;
        const selected = i === 2;
        return (
          <g key={i}>
            <rect x="44" y={y} width="196" height="42" rx="7" className={selected ? "fill-accent-soft" : "fill-paper"} />
            {selected && <rect x="44" y={y} width="3" height="42" rx="1.5" className="fill-accent" />}
            <rect x="58" y={y + 12} width={i % 2 ? 110 : 140} height="6" rx="3" className={selected ? "fill-accent/40" : "fill-chip"} />
            <rect x="58" y={y + 25} width="64" height="6" rx="3" className={selected ? "fill-accent/25" : "fill-chip"} />
          </g>
        );
      })}
      {/* Docked panel */}
      <line x1="252" x2="252" y1="48" y2="472" className="stroke-line" />
      <rect x="268" y="100" width="72" height="22" rx="11" className="fill-accent-soft" />
      <text x="304" y="115" textAnchor="middle" className="fill-accent text-[11px] font-semibold">Verdict</text>
      <rect x="268" y="136" width="156" height="8" rx="4" className="fill-[#c9d1d5]" />
      <rect x="268" y="152" width="120" height="8" rx="4" className="fill-[#c9d1d5]" />
      {["Evidence", "History", "Request data"].map((t, i) => {
        const y = 196 + i * 52;
        return (
          <g key={t}>
            <line x1="268" x2="432" y1={y} y2={y} className="stroke-line" />
            <text x="268" y={y + 30} className={label}>{t}</text>
            <path d={`M420 ${y + 22} l5 5 l5 -5`} className="fill-none stroke-muted" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

export function CoverArt({ slug, title, domain }: Props) {
  const dark = slug === "heimdall";
  const art = { "strata-ai": <Strata />, heimdall: <Heimdall />, "echo-desk": <Echo /> }[slug];

  return (
    <div
      className={`absolute inset-0 ${dark ? "dot-grid-ink" : "dot-grid"}`}
      role="img"
      aria-label={`Schematic of ${title}, ${domain}`}
    >
      {art ?? (
        <div className="flex size-full flex-col items-start justify-end p-[6%]">
          <p className="text-[14px] font-medium text-accent">{domain}</p>
          <p className="display mt-2 text-[clamp(28px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em]">
            {title}
          </p>
        </div>
      )}
      {art && <Badge dark={dark} />}
    </div>
  );
}
