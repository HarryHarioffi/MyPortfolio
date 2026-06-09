export type Project = {
  index: string;
  title: string;
  subtitle: string;
  meta: string;
  problem: string;
  designed: string;
  outcome?: string;
  tags: string[];
  bg: string;
  fg: string;
  accent: string;
  art?: string;
  artKind?: "3d" | "lettering" | "screens";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Echo Desk",
    subtitle: "Contextual Side Panel for an AI Management Platform",
    meta: "Shipped · 2025 · Enterprise SaaS",
    problem:
      "Users had to constantly navigate away from their primary task to look up AI requisition details — a context-switch that added friction and slowed decisions.",
    designed:
      "A contextual side panel that surfaces detailed AI requisition data inline. Glanceable at first, deep on demand — supporting quick decisions and thorough review in a single persistent surface.",
    outcome:
      "Improved data visibility, reduced context-switching, and established a reusable side-panel pattern across the platform.",
    tags: ["Enterprise SaaS", "Agentic AI", "Interaction Design", "Component Systems"],
    bg: "var(--room-echo)",
    fg: "#f4efe6",
    accent: "var(--room-echo-accent)",
    art: "/assets/project-echo.png",
    artKind: "3d",
  },
  {
    index: "02",
    title: "StrataAI",
    subtitle: "Modular AI Collaboration System",
    meta: "Shipped · 2025 · AI Platform",
    problem:
      "Teams using AI tools worked in shared, undifferentiated environments — no clear ownership, no governance, no way to scope an agent to a purpose or dataset.",
    designed:
      "A modular workspace where users build agent-specific environments — each with its own system prompt, data sources and access levels. Structured context control for teams.",
    outcome:
      "Shipped a system that gave teams meaningful control over their AI environments — governance without bureaucracy.",
    tags: ["AI Platform", "Design Systems", "Collaboration UX", "Access Control"],
    bg: "var(--room-strata)",
    fg: "#d9d2ff",
    accent: "var(--room-strata-accent)",
    art: "/assets/project-strata.png",
    artKind: "3d",
  },
  {
    index: "03",
    title: "Heimdall",
    subtitle: "CTI DevSecOps platform powered by AI agents",
    meta: "Enterprise · Cybersecurity",
    problem:
      "Security engineers work under time pressure with high cognitive load. The existing experience created visual noise exactly where users needed clarity.",
    designed:
      "UX architecture for a Cyber Threat Intelligence platform powered by agentic AI. A structural rethink of how a high-stakes security tool communicates — not a visual refresh.",
    outcome:
      "Every element precise and deliberate. In security tooling, visual noise isn't just ugly — it's dangerous.",
    tags: ["Cybersecurity", "Agentic AI", "Dashboard UX", "High-Stakes Interfaces"],
    bg: "var(--room-heimdall)",
    fg: "#f4efe6",
    accent: "var(--room-heimdall-accent)",
    art: "/assets/project-heimdall.png",
    artKind: "3d",
  },
  {
    index: "04",
    title: "ERP Modules",
    subtitle: "BOM Upload · Procurement UI · Components Issued",
    meta: "Enterprise ERP · Multi-module",
    problem:
      "A manufacturing and procurement ERP with a fragmented experience — each module felt designed in isolation. Power users needed speed and precision, not guided onboarding.",
    designed:
      "Three interconnected modules: BOM document upload with full edge-case coverage, procurement & linked-PR management with progressive disclosure, and a Components Issued view connecting requests, inventory and GRN inline.",
    outcome:
      "Consistent component system. Information depth without cognitive overload. Make vs. Bought-Out workflows separated but unified.",
    tags: ["ERP", "Procurement", "Manufacturing", "Information Architecture"],
    bg: "var(--room-erp)",
    fg: "#0e0e10",
    accent: "#0e0e10",
    artKind: "lettering",
  },
  {
    index: "05",
    title: "The Cloud Company",
    subtitle: "Scroll-Driven 3D Video Landing & Design System",
    meta: "Web · Brand · Motion",
    problem:
      "The Cloud Company needed a web presence that communicated its AI-native identity immediately — not through copy, but through experience.",
    designed:
      "An end-to-end website with a scroll-driven 3D video hero as the centrepiece. Motion as a storytelling layer, not decoration. Full design system in dark and light, implementation-level animation spec, and prompt briefs for Kling AI and Runway covering camera, material, lighting and loop behaviour.",
    outcome:
      "Every animation tied to a narrative beat in the scroll flow. If it wasn't telling the story, it wasn't in the design.",
    tags: ["Landing Page", "Motion Design", "Design Systems", "AI Tools"],
    bg: "var(--room-cloud)",
    fg: "#0e0e10",
    accent: "#0e0e10",
    art: "/assets/project-cloud.png",
    artKind: "3d",
  },
  {
    index: "06",
    title: "Financial Dashboards",
    subtitle: "TWC Analysis · Inventory & Capex · Slice & Dice",
    meta: "Dashboard · Analytics · Enterprise",
    problem:
      "Finance and ops teams needed one interface to track working capital, inventory and capex — and to explore the data at different levels of granularity without switching tools.",
    designed:
      "An analytics dashboard embedded in the ERP with three connected views. Scannable TWC layout, visual hierarchy that ties inventory to capex, and an interactive slice-and-dice module where empty and loading states are designed as carefully as the default.",
    outcome:
      "Colour encodes meaning. Typography does the heavy lifting. Density done right.",
    tags: ["Financial Analytics", "Dashboard Design", "Data Visualisation"],
    bg: "var(--room-dash)",
    fg: "#0e0e10",
    accent: "#0e0e10",
    artKind: "screens",
  },
];

export const extras = [
  {
    title: "Folio",
    desc: "Fictional studio portfolio concept — case studies, process docs, and a naming exercise that landed on the name itself.",
  },
  {
    title: "Figma Workshop",
    desc: "Designed and facilitated an intermediate Figma workshop for corporate employees. Dark-themed reference guide, exercise briefs, facilitator materials.",
  },
  {
    title: "Hiring Process",
    desc: "Four-round hiring experience for The Cloud Company with two original game-like rounds — Red Flag and Lightning Round.",
  },
  {
    title: "Gmail Auto-Labeler",
    desc: "Gemini-powered Gmail classifier with a queue-based architecture designed around free-tier quota constraints.",
  },
];
