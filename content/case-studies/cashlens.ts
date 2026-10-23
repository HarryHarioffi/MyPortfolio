import type { CaseStudy } from "../types";

// Figma: page "04 · Cashlens". Boards are in "03 · Case study boards", the cover in
// "02 · Motion cover".
export const cashlens: CaseStudy = {
  slug: "cashlens",
  title: "Cashlens",
  company: "The Cloud Company",
  year: 2026,
  status: "Shipped",
  card: {
    tagline: "Finance could see how much cash moved, not why. I designed dashboards that trace each number to a cause.",
    domain: "Working-capital analytics in Power Pages",
    contribution: "Product design within Power Pages",
  },
  overview: {
    hook: "Finance could see how much cash moved. Not why",
    summary:
      "Cashlens brings a finance team's working-capital reporting into one Power Pages app: cash performance, debtors, creditors, inventories and capex, each with its comparisons and the drivers behind every change.",
    nda: "Client work, shown with a new name, made-up data and a new visual identity. Views are my own.",
    mission: "So my job was to let a finance lead follow any number back to its cause.",
    cover: {
      src: "/work/cashlens/loop.mp4",
      video: true,
      tint: "#E8F4EB",
      poster: "/work/cashlens/loop.webp",
      alt: "A working capital figure opens into a cash flow bridge that builds bar by bar, and the debtors bar is picked out with its regions",
      width: 1280,
      height: 800,
    },
    snapshot: {
      role: "Product Designer (sole designer)",
      timeline: "[Month] 2025 to [Month] 2026",
      team: "[N] Power Platform developers, finance leads, me",
      skills: ["Data visualisation", "Information architecture", "Dashboard design", "Designing within a platform"],
      myPart:
        "I designed the landing page, the global filters and every module: cash performance, the cash-flow contribution statement, debtors, creditors, inventories, capex and closing balance.",
    },
    glance: {
      problem: "Working-capital numbers were spread across static reports, and leaders couldn't trace a movement back to its cause.",
      did: "Designed a landing page that maps questions to modules, one filter bar for every page, and module pages where each number sits next to its comparison and its drivers.",
      result: "Built so a finance lead can go from “cash dropped” to the customer or region behind it without stitching reports together.",
    },
  },
  problem: {
    lead: "Finance had every number it needed…",
    body: "Cash, debtors, creditors and inventory each lived in their own report, with their own filters and their own idea of “last year”. A finance team spent its time lining reports up before anyone could ask why something had changed.",
    turn: "but not the story behind them.",
    stakes:
      "Leaders were making working-capital calls on numbers they couldn't trace, and reviews started with an argument about which report was right.",
  },
  discovery: {
    question: "What does finance actually ask?",
    lead: "Every question finance asked had the same shape: what changed, compared with what, and why.",
    method:
      "The questions finance leads brought to a review shaped the landing page more than the list of existing reports did. [Add your research: sessions with finance leads, and which reports Cashlens replaced.]",
    constraints: [
      { label: "Platform", text: "Power Pages: page-based navigation, embedded reports and a filter bar across the top." },
      { label: "Comparisons", text: "Each figure needs year to date, last year, last month, forecast and target, with consistent signs." },
      { label: "Scale", text: "Currency, scale, scenario and forecast version change every number on the page at once." },
    ],
  },
  options: {
    lead: "The landing page went through many layouts. Two of them show the turning point.",
    items: [
      {
        name: "A map of every page",
        what: "A tree of modules and their pages, each one a link.",
        verdict: "rejected",
        why: "It showed where everything was, but not why you'd go there. People still had to know which report answered their question.",
        media: {
          src: "/work/cashlens/option-tree.webp",
          width: 3200,
          height: 1800,
          alt: "Landing page as a tree: module headers with their pages hanging beneath, each a link",
        },
      },
      {
        name: "A directory of questions",
        what: "Cards grouped by what they track (cash performance, creditors, debtors, inventory and capex, slice and dice), with headline KPIs beside them.",
        verdict: "chosen",
        why: "Each card says what it tracks, its links go straight to the view that answers it, and the KPI rail shows the headline numbers before you click anything.",
        media: {
          src: "/work/cashlens/option-directory.webp",
          width: 3200,
          height: 1800,
          alt: "Landing page as a directory: a KPI rail on the left and cards describing each area with links to its views",
        },
      },
    ],
  },
  decisions: {
    lead: "Three calls made the numbers readable.",
    items: [
      {
        title: "Every number comes with its comparison",
        short: "Comparisons",
        body: "KPIs show the current figure with last year and last month beside it, coloured by whether the change helps cash. Tables keep the same column order everywhere: year to date, same period last year, forecast, target.",
        media: {
          src: "/work/cashlens/decision-statement.webp",
          width: 3200,
          height: 1800,
          caption: "One column order, on every table",
          alt: "Cash contribution statement with year to date, same period last year, forecast and target columns",
        },
      },
      {
        title: "One filter bar for every page",
        short: "One filter bar",
        body: "Currency, scale, scenario, forecast version, period, organisation, customer and product sit in the same bar on every module, so a view you set up carries across pages.",
        media: {
          src: "/work/cashlens/decision-filters.webp",
          width: 3200,
          height: 1800,
          caption: "The global filter bar",
          alt: "Header filter bar with currency, scale, scenario, forecast version, period, organisation, calendar, customer and product",
        },
      },
      {
        title: "Show the drivers, not just the totals",
        short: "Drivers",
        body: "Debtor and creditor pages break a change into what drove it: as a waterfall, by customer or vendor, and by geography. “Why did receivables move?” is answered on the same page that shows they did.",
        media: {
          src: "/work/cashlens/decision-geography.webp",
          width: 3200,
          height: 1800,
          caption: "Debtors by geography",
          alt: "Debtors by geography: closing balances, days on hand and overdue share by region and country, against last year",
        },
      },
    ],
  },
  solution: {
    lead: "A finance lead can open one app, set the filters once, and follow a number to its cause.",
    walkthrough: "Here is the landing page, then the statement and the breakdowns behind it.",
    annotated: {
      media: {
        src: "/work/cashlens/solution-landing.webp",
        width: 3200,
        height: 1800,
        markers: [{ x: 50, y: 20.7 }, { x: 34.2, y: 26.4 }, { x: 46.7, y: 28.6 }, { x: 93.5, y: 27 }],
        caption: "The landing page",
        alt: "Landing page: a greeting with the actuals and forecast period, a KPI rail, and a directory of modules",
      },
      notes: [
        "A greeting with the actuals and forecast period, so you know which data you're reading.",
        "A KPI rail: operating cash, working-capital movement, cash contribution and productivity, against last year and last month.",
        "The directory: each card says what it tracks and links straight to its views.",
        "Request access, for modules your role can't see yet.",
      ],
    },
    details: [
      {
        label: "Trends",
        title: "Cash performance, with the trend behind each number",
        body: "Operating cash, working-capital movement, cash contribution and productivity each show this year, last year and last month, over a twelve-month trend line.",
        media: {
          src: "/work/cashlens/detail-performance.webp",
          width: 3200,
          height: 1800,
          caption: "Cash performance",
          alt: "Cash performance: cards for operating cash, working-capital movement, cash contribution and productivity, each with year-to-date figures and a trend line",
        },
      },
      {
        label: "Breakdown",
        title: "From a total to the customers behind it",
        body: "Customer and vendor breakdowns rank who drives the balance and the overdue share, so the follow-up call goes to the right person.",
        media: {
          src: "/work/cashlens/detail-customers.webp",
          width: 3200,
          height: 1800,
          caption: "Customer breakdown",
          alt: "Customer breakdown table: contribution, overdue share, days over ninety and days on hand per customer",
        },
      },
    ],
  },
  users: [
    { role: "Finance leads", need: "Explain working-capital movements in the monthly review." },
    { role: "Business-unit controllers", need: "Track debtors, creditors and inventory for their own markets." },
    { role: "Leadership", need: "See the headline numbers, and drill in when something moves." },
  ],
  gallery: {
    lead: "Every module follows the same pattern",
    items: [
      {
        src: "/work/cashlens/gallery-inventories.webp",
        width: 3200,
        height: 1800,
        caption: "Inventories: finished goods, raw and packaging material",
        alt: "Inventories table with the same comparison columns as the statement",
      },
      {
        src: "/work/cashlens/gallery-capex.webp",
        width: 3200,
        height: 1800,
        caption: "Capex: KPI cards with trends, then the table",
        alt: "Capex page: KPI cards with sparklines over a capex table",
      },
      {
        src: "/work/cashlens/gallery-closing.webp",
        width: 3200,
        height: 1800,
        caption: "Closing balance by month",
        alt: "Working capital closing statement, month by month",
      },
      {
        src: "/work/cashlens/gallery-filters.webp",
        width: 3200,
        height: 1800,
        caption: "Picking an organisation from the hierarchy",
        alt: "Organisation filter: a searchable hierarchy of groups and business units",
      },
    ],
  },
  shifts: {
    lead: "From lining reports up to following one number.",
    items: [
      { from: "Each report had its own filters and its own idea of last year", to: "One filter bar, the same on every page" },
      { from: "A number on its own", to: "Every number beside last year and last month" },
      { from: "A map of every page", to: "A directory of the questions finance asks" },
      { from: "Totals that said what moved", to: "Drivers that say why: by customer, by vendor, by geography" },
    ],
  },
  model: {
    label: "The working-capital formula",
    lead: "Working capital is three balances pulling against each other.",
    body: "Each one has its own module, and each module breaks its movement down to the drivers behind it.",
    parts: [
      { name: "Debtors", text: "Cash customers still owe." },
      { name: "Inventory", text: "Cash sitting in stock: finished goods, raw and packaging material.", op: "+" },
      { name: "Creditors", text: "Cash still owed to suppliers.", op: "−" },
    ],
    result: { name: "Working capital", text: "The cash tied up in running the business. Cashlens explains why it moved." },
  },
  journey: {
    lead: "From “cash dropped” to the customer behind it.",
    steps: [
      { title: "Start from a question", text: "The landing page groups modules by what they track, with headline KPIs." },
      { title: "Set the filters once", text: "Currency, scenario, period and organisation carry across every page." },
      { title: "See what changed", text: "Each figure against last year, last month, forecast and target." },
      { title: "Find what drove it", text: "The movement broken down as a waterfall, and by geography." },
      { title: "Call the right person", text: "Customers and vendors ranked by balance and overdue share." },
    ],
  },
  outcome: {
    lead: "Built so working-capital reviews start from the cause, not from reconciling reports.",
    expected: true,
    results: [
      { metric: "One version of the numbers in every review", how: "Static reports retired, and reviews run from Cashlens." },
      { metric: "Faster answers to “why did cash move?”", how: "Time from spotting a change to finding the customer, vendor or region behind it." },
      { metric: "Overdue debt spotted earlier", how: "Overdue share by region, tracked month on month in the geography views." },
    ],
  },
  reflection: {
    learned:
      "Inside Power Pages most of the design lived in the information, not the components. The biggest gains came from agreeing the order of comparisons and what colour means once, for every page.",
    different:
      "I'd settle the landing page's structure with finance leads before drawing cards. Many of the layout rounds were really the same question: how do they group their own work?",
  },
};
