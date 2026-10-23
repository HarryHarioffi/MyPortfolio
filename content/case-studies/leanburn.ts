import type { CaseStudy } from "../types";

// Figma: page "06 · Leanburn". Boards are in "03 · Case study boards", the cover in
// "02 · Motion cover".
// Early work, kept in its original style on purpose.
export const leanburn: CaseStudy = {
  slug: "leanburn",
  title: "Leanburn",
  company: "The Cloud Company",
  year: 2023,
  status: "Internship",
  card: {
    tagline: "The fuel savings were already inside the engines. I designed the dashboards that showed fleets where.",
    domain: "Fleet fuel analytics",
    contribution: "Dashboard design, as an intern",
  },
  overview: {
    hook: "The fuel savings were already inside the engines. Fleets just couldn't see them",
    summary:
      "Leanburn helps fleet managers find the fuel they're wasting: how far each fleet is from its potential fuel economy, which engine settings would close the gap, and whether anyone is acting on it. It's early work from my internship, kept in its original style.",
    nda: "Internship work at The Cloud Company for an engine manufacturer. Names and data are changed.",
    mission: "So my job, as an intern, was to put the savings first, where a fleet manager would see them.",
    cover: {
      src: "/work/leanburn/loop.mp4",
      video: true,
      tint: "#131922",
      poster: "/work/leanburn/loop.webp",
      alt: "A fleet's current fuel economy bar, with the gap to its potential filling in orange and turning into the share of fuel it could save",
      width: 1144,
      height: 800,
    },
    snapshot: {
      role: "UI/UX Design Intern",
      timeline: "Jul 2023 to May 2024",
      team: "[Who you worked with]",
      skills: ["Dashboard design", "Data visualisation", "Charts", "Design handoff"],
      myPart:
        "I designed the KPI dashboards and charts: the overview, the fleet table, feature adoption and the fleet drill-down.",
    },
    glance: {
      problem: "The engine settings that save fuel existed but were rarely switched on, and the data sat in spreadsheets.",
      did: "Designed dashboards that lead with gallons saved, rank fleets by the gap to their potential, and show which settings each fleet is missing.",
      result: "Built so a fleet manager can see where the fuel is going and which setting to change first.",
    },
  },
  problem: {
    lead: "Fleets were paying for fuel their own engines could have saved…",
    body: "Modern engines ship with settings that cut fuel use, like gear-down protection, road speed governors and predictive gear shifting, but they're often left off. Recommendations to turn them on were made in spreadsheets and rarely followed up.",
    turn: "but the settings that save it were rarely switched on.",
    stakes:
      "Every truck running without them burns fuel it doesn't need to, and nobody could see which fleets had the most to gain.",
    media: {
      src: "/work/leanburn/problem-overview.webp",
      width: 3200,
      height: 1800,
      caption: "The overview",
      alt: "Overview dashboard: estimated yearly savings, open recommendations, fleets with room to improve, and latest fuel economy",
    },
  },
  decisions: {
    lead: "Three calls shaped the dashboards.",
    items: [
      {
        title: "Lead with gallons saved, not miles per gallon",
        short: "Gallons saved",
        body: "MPG is what the engine reports, but gallons saved is what a manager acts on. The overview opens with estimated yearly savings, open recommendations and the fleets with the most room to improve.",
        media: {
          src: "/work/leanburn/decision-kpis.webp",
          width: 3200,
          height: 1800,
          caption: "Headline KPIs",
          alt: "KPI cards: estimated yearly savings in gallons, open recommendations, fleets above the improvement threshold, latest fuel economy",
        },
      },
      {
        title: "Current and potential in one chart",
        short: "Current vs potential",
        body: "Each fleet's current fuel economy sits against its potential, ranked by the gap. The longest gaps are the best opportunities, so the chart doubles as a to-do list.",
        media: {
          src: "/work/leanburn/decision-chart.webp",
          width: 3200,
          height: 1800,
          caption: "Current against potential, per fleet",
          alt: "Bar chart of fleets ranked by the gap between current and potential fuel economy",
        },
      },
      {
        title: "Adoption shown against the whole fleet",
        short: "Adoption",
        body: "Each fuel-saving feature shows its adoption in the filtered fleets next to all fleets, so a manager can see where they lag the average.",
        media: {
          src: "/work/leanburn/decision-adoption.webp",
          width: 3200,
          height: 1800,
          caption: "Feature adoption",
          alt: "Adoption of gear-down protection, road speed governor, predictive shifting, engine brake and load-based speed control, filtered against all fleets",
        },
      },
    ],
  },
  solution: {
    lead: "A fleet manager can see the opportunity, find the fleet behind it, and drill down to the engines.",
    walkthrough: "Here is the overview, then the fleet drill-down.",
    annotated: {
      media: {
        src: "/work/leanburn/solution-overview.webp",
        width: 3200,
        height: 1800,
        markers: [{ x: 3.3, y: 32.3 }, { x: 3.3, y: 48.9 }, { x: 60.5, y: 29.6 }, { x: 60.5, y: 59.3 }],
        caption: "The overview dashboard",
        alt: "Overview with KPI cards, the current-against-potential chart, the fleet table and feature adoption",
      },
      notes: [
        "Headline KPIs: estimated yearly savings, open recommendations, fleets with room to improve, latest fuel economy.",
        "Current against potential fuel economy, per fleet, ranked by the gap.",
        "The fleet table: manager, savings, current and optimal fuel economy, engine count.",
        "Feature adoption, filtered fleets against all fleets.",
      ],
    },
    details: [
      {
        label: "Drill-down",
        title: "One fleet, down to its engines",
        body: "Engine types, savings, top recommendations with their status, build years and transmission types, then one row per engine.",
        media: {
          src: "/work/leanburn/detail-drilldown.webp",
          width: 3200,
          height: 1800,
          caption: "Fleet drill-down",
          alt: "Fleet page: engine types, savings, top recommendations with status, build years, transmissions and an engine table",
        },
      },
      {
        label: "Follow-up",
        title: "Follow-ups stay with the fleet",
        body: "A comments tab sits beside each fleet's overview, so the follow-up on a recommendation stays with its data instead of in an email thread.",
        media: {
          src: "/work/leanburn/detail-comments.webp",
          width: 3200,
          height: 1800,
          caption: "Comments",
          alt: "The comments tab: a thread of notes from the fleet's team, and a box to add one",
        },
      },
    ],
  },
  users: [
    { role: "Fleet managers", need: "Find the fleets and engines with the most fuel to save." },
    { role: "Engineers", need: "Check each engine's settings against the suggested and simulated values." },
  ],
  gallery: {
    lead: "From the fleet down to one engine",
    items: [
      {
        src: "/work/leanburn/gallery-fleets.webp",
        width: 3200,
        height: 1800,
        caption: "Every fleet, ranked by savings",
        alt: "Fleet overview table with savings, current and optimal fuel economy, and engine counts",
      },
      {
        src: "/work/leanburn/gallery-engines.webp",
        width: 3200,
        height: 1800,
        caption: "One row per engine",
        alt: "Engines table with serial numbers, fleet, build date and fuel economy",
      },
      {
        src: "/work/leanburn/gallery-cluster.webp",
        width: 3200,
        height: 1800,
        caption: "A cluster's settings: current, suggested, simulated",
        alt: "Fleet cluster page: parameter changes compared across current, suggested and simulated settings",
      },
      {
        src: "/work/leanburn/gallery-esn.webp",
        width: 3200,
        height: 1800,
        caption: "One engine against its fleet",
        alt: "Single engine page: its performance figures beside the fleet's",
      },
    ],
  },
  shifts: {
    lead: "From a spreadsheet of recommendations to a list that gets done.",
    items: [
      { from: "Recommendations kept in spreadsheets", to: "Recommendations with a status on each fleet’s page" },
      { from: "Miles per gallon, as the engine reports it", to: "Gallons saved, which a manager acts on" },
      { from: "Every fleet looked alike in a table", to: "Fleets ranked by the gap to their potential" },
      { from: "Follow-ups lost in email threads", to: "Comments that stay with the fleet’s data" },
    ],
  },
  model: {
    label: "The savings gap",
    lead: "The opportunity is the gap between what a fleet does and what it could do.",
    body: "The dashboards rank every fleet by that gap, so the longest bar is also the first job.",
    parts: [
      { name: "Potential economy", text: "Fuel economy with the saving settings switched on." },
      { name: "Current economy", text: "What the engines report today.", op: "−" },
    ],
    result: { name: "The gap", text: "Ranked across fleets, it becomes the to-do list, shown as gallons saved." },
  },
  journey: {
    lead: "From the overview down to one engine.",
    steps: [
      { title: "See the opportunity", text: "Estimated yearly savings and open recommendations, first." },
      { title: "Pick the fleet", text: "Fleets ranked by the gap between current and potential." },
      { title: "Check the settings", text: "Each fuel-saving feature’s adoption, against all fleets." },
      { title: "Drill to the engine", text: "Engine types and build years, then one row per engine." },
      { title: "Follow it up", text: "Comments stay beside the fleet’s data." },
    ],
  },
  outcome: {
    lead: "Built so fuel-saving settings get switched on, not just recommended.",
    expected: true,
    results: [
      { metric: "Recommendations get followed up", how: "Open recommendations closed each month." },
      { metric: "More engines run with fuel-saving features on", how: "Feature adoption across fleets, before and after." },
      { metric: "Fleets move toward their potential", how: "The gap between current and potential fuel economy, per fleet." },
    ],
  },
  reflection: {
    learned:
      "This was my first data-heavy product. A dashboard is only as good as the decision it leads to, and the charts that worked best were the ones that ranked something.",
    different:
      "Today I'd design the follow-up, not just the insight: who owns a recommendation and what happens after it's made. The dashboards showed the gap; they didn't do enough to close it.",
  },
};
