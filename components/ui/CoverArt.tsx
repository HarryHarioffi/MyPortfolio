/**
 * Drawn stand-ins for case-study covers, used until the motion covers are exported from Figma.
 * Each one is a schematic of the idea the case study is about, not a fake screenshot, and says
 * so in the corner. SVG, so it scales to any cover shape and stays crisp. Colours are each
 * product's own brand colour, the same ones used in its Figma file.
 */

type Props = { slug: string; title: string; domain: string };

const label = "fill-muted text-[12px] font-medium";

function Badge({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`absolute bottom-3 left-3 px-2 py-0.5 text-[11px] font-medium ${
        dark ? "bg-[rgb(252_253_253/0.08)] text-[#aab4ba]" : "bg-paper/80 text-muted"
      }`}
    >
      Schematic
    </span>
  );
}

/** Skillset: a skill is what it does plus what it knows, and a chat answers from it. */
function Skillset() {
  const teal = "#0F8F86";
  const soft = "#DDF1EF";
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      <g transform="translate(56 48)">
        <rect width="264" height="304" rx="12" className="fill-paper stroke-line" />
        <rect x="18" y="18" width="34" height="34" rx="9" fill={soft} />
        <path d="M35 25l2.6 6.4 6.4 2.6-6.4 2.6L35 43l-2.6-6.4-6.4-2.6 6.4-2.6z" fill={teal} />
        <text x="64" y="32" className="fill-ink text-[14px] font-semibold">Finance helper</text>
        <text x="64" y="48" className={label}>Skill · version 3 live</text>
        <line x1="0" x2="264" y1="70" y2="70" className="stroke-line" />
        <text x="18" y="96" className={label}>What it does</text>
        <rect x="18" y="106" width="220" height="7" rx="3.5" className="fill-chip" />
        <rect x="18" y="120" width="168" height="7" rx="3.5" className="fill-chip" />
        <text x="18" y="160" className={label}>What it knows</text>
        {[
          { x: 18, w: 82, t: "Policies.pdf" },
          { x: 106, w: 78, t: "SharePoint" },
          { x: 190, w: 58, t: "URL" },
        ].map((c) => (
          <g key={c.t}>
            <rect x={c.x} y="170" width={c.w} height="26" rx="6" fill={soft} />
            <text x={c.x + 10} y="187" fill={teal} className="text-[12px] font-semibold">{c.t}</text>
          </g>
        ))}
        <text x="18" y="232" className={label}>Owners</text>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={32 + i * 20} cy="260" r="13" className="fill-chip stroke-paper" strokeWidth="3" />
        ))}
        <text x="98" y="265" className={label}>+ Finance BU leads</text>
      </g>
      <g transform="translate(348 72)">
        <rect x="64" width="172" height="40" rx="12" fill={soft} />
        <rect x="80" y="16" width="120" height="7" rx="3.5" fill={teal} opacity="0.45" />
        <rect y="58" width="236" height="132" rx="12" className="fill-paper stroke-line" />
        {[148, 196, 172, 120].map((w, i) => (
          <rect key={i} x="16" y={78 + i * 18} width={w} height="7" rx="3.5" className="fill-chip" />
        ))}
        <rect x="16" y="156" width="96" height="20" rx="10" fill={soft} />
        <text x="26" y="170" fill={teal} className="text-[11px] font-semibold">From 2 sources</text>
        <rect y="210" width="236" height="44" rx="12" className="fill-paper stroke-line" />
        <text x="16" y="237" className={label}>Ask the skill</text>
      </g>
    </svg>
  );
}

/** Groundwork: one prompt, three setups side by side; the winner goes to the library. */
function Groundwork() {
  const violet = "#6941E0";
  const soft = "#ECE7FC";
  const cols = [
    { name: "Setup A", model: "Model 1" },
    { name: "Setup B", model: "Model 2", win: true },
    { name: "Setup C", model: "Model 3" },
  ];
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      <rect x="44" y="28" width="552" height="30" rx="8" className="fill-paper stroke-line" />
      <text x="58" y="48" className={label}>User prompt: what drove revenue growth in Asia last quarter?</text>
      {cols.map((c, i) => {
        const x = 44 + i * 188;
        return (
          <g key={c.name} transform={`translate(${x} 74)`}>
            <rect width="176" height="214" rx="12" className="fill-paper" stroke={c.win ? violet : undefined} strokeWidth={c.win ? 2 : 1} />
            {!c.win && <rect width="176" height="214" rx="12" className="fill-none stroke-line" />}
            <text x="16" y="28" className="fill-ink text-[13px] font-semibold">{c.name}</text>
            <text x="16" y="44" className={label}>{c.model}</text>
            {c.win && (
              <>
                <rect x="112" y="16" width="48" height="20" rx="10" fill={soft} />
                <text x="136" y="30" textAnchor="middle" fill={violet} className="text-[11px] font-semibold">Best</text>
              </>
            )}
            <line x1="0" x2="176" y1="58" y2="58" className="stroke-line" />
            {[132, 144, 104, 140, 88, 120].map((w, j) => (
              <rect key={j} x="16" y={76 + j * 18} width={c.win ? w : w * 0.86} height="7" rx="3.5" className="fill-chip" />
            ))}
          </g>
        );
      })}
      <path d="M320 292v28" stroke={violet} strokeWidth="2" strokeLinecap="round" />
      <path d="M313 314l7 8 7-8" fill="none" stroke={violet} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="200" y="330" width="240" height="44" rx="10" fill={soft} />
      <rect x="216" y="342" width="20" height="20" rx="5" fill={violet} />
      <text x="248" y="357" fill={violet} className="text-[13px] font-semibold">Saved to the prompt library</text>
    </svg>
  );
}

/** Logic.dev: an API call with separate success and error wires, and the code it becomes. */
function LogicDev() {
  const blue = "#2F73FB";
  const spark = "#FF6700";
  const ok = "#12B76A";
  const err = "#F04438";
  const node = (x: number, y: number, type: string, title: string, color: string) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="176" height="58" rx="10" className="fill-paper stroke-line" />
      <rect x="12" y="15" width="28" height="28" rx="7" fill={color} opacity="0.14" />
      <rect x="20" y="23" width="12" height="12" rx="3" fill={color} />
      <text x="52" y="26" className={label}>{type}</text>
      <text x="52" y="43" className="fill-ink text-[13px] font-semibold">{title}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 480 520" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      <path d="M240 106v52" stroke={blue} strokeWidth="2" />
      <path d="M200 236C200 270 120 262 120 300" fill="none" stroke={ok} strokeWidth="2.5" />
      <path d="M280 236C280 270 360 262 360 300" fill="none" stroke={err} strokeWidth="2.5" strokeDasharray="6 5" />
      {node(152, 48, "Event", "onSubmit", blue)}
      {node(152, 160, "Data", "callAPI · POST", blue)}
      {node(32, 300, "Data", "setState · orders", ok)}
      {node(272, 300, "General", "UI update · error", err)}
      <circle cx="240" cy="106" r="5" className="fill-paper" stroke={blue} strokeWidth="2" />
      <circle cx="200" cy="218" r="5" className="fill-paper" stroke={ok} strokeWidth="2" />
      <circle cx="280" cy="218" r="5" className="fill-paper" stroke={err} strokeWidth="2" />
      <text x="152" y="262" textAnchor="end" fill={ok} className="text-[11px] font-semibold">success</text>
      <text x="328" y="262" fill={err} className="text-[11px] font-semibold">error</text>
      <g transform="translate(32 392)">
        <rect width="416" height="96" rx="10" className="fill-ink" />
        <text x="16" y="24" fill={spark} className="text-[11px] font-semibold">Generate code</text>
        {[220, 300, 180, 260].map((w, i) => (
          <rect key={i} x={i % 2 ? 32 : 16} y={38 + i * 13} width={w} height="6" rx="3" fill="#5d6a72" />
        ))}
      </g>
    </svg>
  );
}

/** Cashlens: from last year's cash, through each driver, to this year's. */
function Cashlens() {
  const green = "#159A4C";
  const red = "#D92D20";
  const base = 320;
  const bars = [
    { t: "Last year", from: 0, to: 170, total: true },
    { t: "Debtors", from: 170, to: 214 },
    { t: "Creditors", from: 214, to: 182 },
    { t: "Stock", from: 182, to: 206 },
    { t: "Capex", from: 206, to: 160 },
    { t: "Tax", from: 160, to: 148 },
    { t: "This year", from: 0, to: 148, total: true, now: true },
  ];
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      <text x="56" y="52" className="fill-ink text-[14px] font-semibold">Why did cash move?</text>
      <text x="56" y="70" className={label}>Cash contribution, this year against last</text>
      <line x1="56" x2="584" y1={base} y2={base} className="stroke-line" />
      {bars.map((b, i) => {
        const x = 64 + i * 75;
        const top = base - Math.max(b.from, b.to);
        const h = Math.abs(b.to - b.from);
        const up = b.to >= b.from;
        const fill = b.total ? (b.now ? green : "#9DB8A8") : up ? green : red;
        return (
          <g key={b.t}>
            <rect x={x} y={top} width="48" height={h} rx="4" fill={fill} opacity={b.total || up ? 1 : 0.9} />
            {i < bars.length - 1 && (
              <line x1={x + 48} x2={x + 75} y1={base - b.to} y2={base - b.to} className="stroke-line" strokeDasharray="3 3" />
            )}
            <text x={x + 24} y={base + 22} textAnchor="middle" className={label}>{b.t}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Folio: shelves of folders on a phone; one is peeking, one is locked. */
function Folio() {
  const gold = "#E3A21A";
  const deep = "#A86A05";
  const folder = (x: number, y: number, state: "closed" | "peek" | "locked", name: string) => (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 8a8 8 0 0 1 8-8h22c2 0 3.6.8 4.8 2.3L38 6h36a8 8 0 0 1 8 8v54a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8z" fill={state === "locked" ? "#CFC6B6" : deep} />
      {state === "peek" && (
        <>
          <rect x="10" y="-4" width="58" height="40" rx="3" className="fill-paper" transform="rotate(-4 39 16)" />
          <rect x="16" y="2" width="58" height="40" rx="3" className="fill-paper stroke-line" />
          <rect x="24" y="10" width="34" height="5" rx="2.5" className="fill-chip" />
        </>
      )}
      <rect y={state === "peek" ? 28 : 18} width="82" height={state === "peek" ? 48 : 58} rx="8" fill={state === "locked" ? "#E6E0D4" : gold} />
      {state === "locked" && (
        <g transform="translate(60 26)">
          <circle r="9" fill="#D92D20" />
          <rect x="-4" y="-1" width="8" height="6" rx="1.5" fill="#fff" />
          <path d="M-2.4-1v-2a2.4 2.4 0 0 1 4.8 0v2" fill="none" stroke="#fff" strokeWidth="1.4" />
        </g>
      )}
      <text x="8" y="94" className="fill-ink text-[11px] font-semibold">{name}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      <rect x="216" y="20" width="208" height="380" rx="30" className="fill-paper stroke-line" strokeWidth="1.5" />
      <rect x="290" y="30" width="60" height="14" rx="7" className="fill-ink" />
      <text x="236" y="80" className="fill-ink text-[20px] font-bold">Reports</text>
      <rect x="236" y="92" width="168" height="22" rx="7" className="fill-chip" />
      <text x="236" y="138" className="fill-ink text-[12px] font-semibold">Global</text>
      {folder(236, 150, "peek", "Group Results")}
      {folder(326, 150, "locked", "Region Results")}
      <text x="236" y="276" className="fill-ink text-[12px] font-semibold">Help</text>
      {folder(236, 288, "closed", "User Guide")}
      {folder(326, 288, "closed", "Training")}
    </svg>
  );
}

/** Leanburn: each fleet's current fuel economy against its potential, ranked by the gap. */
function Leanburn() {
  const orange = "#E8620C";
  const fleets = [
    { n: "Northbound Freight", c: 0.58, p: 0.92 },
    { n: "Redline Haulage", c: 0.62, p: 0.9 },
    { n: "Copperline Logistics", c: 0.66, p: 0.89 },
    { n: "Prairie Express", c: 0.7, p: 0.88 },
    { n: "Summit Carriers", c: 0.74, p: 0.86 },
    { n: "Bayside Transport", c: 0.78, p: 0.85 },
  ];
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      <text x="48" y="54" className="fill-[#e9eef0] text-[14px] font-semibold">Current against potential fuel economy</text>
      <rect x="48" y="68" width="10" height="10" rx="2" fill="#5d6a72" />
      <text x="64" y="77" className="fill-[#aab4ba] text-[11px] font-medium">Current</text>
      <rect x="124" y="68" width="10" height="10" rx="2" fill={orange} />
      <text x="140" y="77" className="fill-[#aab4ba] text-[11px] font-medium">Potential</text>
      {fleets.map((f, i) => {
        const y = 106 + i * 44;
        const w = 380;
        return (
          <g key={f.n}>
            <text x="48" y={y + 15} className="fill-[#aab4ba] text-[12px] font-medium">{f.n}</text>
            <rect x="196" y={y + 2} width={w * f.p} height="18" rx="4" fill={orange} />
            <rect x="196" y={y + 2} width={w * f.c} height="18" rx="4" fill="#5d6a72" />
          </g>
        );
      })}
    </svg>
  );
}

export function CoverArt({ slug, title, domain }: Props) {
  const dark = slug === "leanburn";
  const art = {
    skillset: <Skillset />,
    groundwork: <Groundwork />,
    "logic-dev": <LogicDev />,
    cashlens: <Cashlens />,
    folio: <Folio />,
    leanburn: <Leanburn />,
  }[slug];

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
