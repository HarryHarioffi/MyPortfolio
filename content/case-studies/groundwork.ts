import type { CaseStudy } from "../types";

// Figma: page "02 · Groundwork". Boards are in "03 · Case study boards", the cover in
// "02 · Motion cover".
export const groundwork: CaseStudy = {
  slug: "groundwork",
  title: "Groundwork",
  company: "The Cloud Company",
  year: 2025,
  status: "Shipped",
  card: {
    tagline: "Every team wanted AI. I designed the one front door: models, prompts, approvals and cost.",
    domain: "Enterprise AI platform",
    contribution: "Product design, end to end",
  },
  overview: {
    hook: "Every team wanted AI. Nobody could see what it cost, or which prompt actually worked",
    summary:
      "Groundwork is the platform a company's teams build AI apps on: one place to get access to models, write and test prompts, and see what it all costs. This case study follows a prompt from the playground into production.",
    nda: "Client work, shown with a new name, made-up data and a new visual identity. Views are my own.",
    mission: "So my job was to give every AI app one approved way in, with its cost in plain view.",
    cover: {
      src: "/work/groundwork/loop.mp4",
      video: true,
      tint: "#EEE9FA",
      poster: "/work/groundwork/loop.webp",
      alt: "One prompt runs against three model setups side by side, the best answer is picked, and the setup is saved to the prompt library",
      width: 1144,
      height: 800,
    },
    snapshot: {
      role: "Product Designer (sole designer)",
      timeline: "[Month] to [Month] 2025",
      team: "[N] engineers, [1] PM, me",
      skills: ["Platform design", "Information architecture", "Data visualisation", "Design systems"],
      myPart:
        "I designed the platform end to end: app onboarding and approvals, the model library, the prompt library, the playground and compare, and the analytics pages.",
    },
    glance: {
      problem:
        "Each team wired up AI on its own, with its own keys and prompts kept in documents, and nobody could see the total cost.",
      did: "Designed one platform where teams register apps, pick a tier, test prompts side by side and save the winner, while admins approve and finance sees the cost.",
      result: "Built so every AI app comes through one approved door, and its cost lands on the team that spends it.",
    },
  },
  problem: {
    lead: "Every team was building with AI on its own…",
    body: "Each team got its own keys, kept prompts in documents and chat threads, and asked for access over email. Admins couldn't tell who used which model, and finance couldn't tell which team spent what.",
    turn: "but nobody had the full picture: not the admins, and not finance.",
    stakes:
      "The risks were spend nobody could trace, the same prompt written again in every team, and no single place to enforce safety checks like PII detection and prompt-injection screening.",
  },
  discovery: {
    question: "Who is the platform really for?",
    lead: "Three groups use the platform, and each needs a different answer from the same data.",
    method:
      "Builders want access and a place to test. Admins want a queue they can clear. Finance wants cost per app and per team. [Add how you learned this: interviews, tickets, workshops.]",
    constraints: [
      { label: "Providers", text: "Several model providers behind one front door, each with its own configuration and limits." },
      { label: "Cost", text: "Every token is charged back to a business unit through an internal cross-charge." },
      { label: "Governance", text: "Every app goes through approval, and its tier sets its quotas, support and available models." },
    ],
  },
  options: {
    lead: "The first compare view tested one prompt at a time. Side by side won.",
    items: [
      {
        name: "One at a time",
        what: "Run a prompt, then add each comparison in an empty slot.",
        verdict: "rejected",
        why: "Every comparison started from an empty slot, so testing three setups meant building each one by hand before seeing any difference.",
        media: {
          src: "/work/groundwork/before-compare.webp",
          width: 3200,
          height: 1800,
          caption: "Before: one prompt, then empty slots",
          alt: "The earlier compare view: one prompt with its response, and two empty slots asking you to add a comparison",
        },
      },
      {
        name: "Side by side",
        what: "One user prompt, up to three setups, each with its own export to the library.",
        verdict: "chosen",
        why: "Differences between setups show at a glance, and the winner goes to the library in one step.",
        media: {
          src: "/work/groundwork/decision-compare.webp",
          width: 3200,
          height: 1800,
          caption: "After: three setups side by side",
          alt: "Compare view: one user prompt run against three prompt setups, each with its model, parameters and response",
        },
      },
    ],
  },
  explorations: {
    lead: "The theme and the compare view each went through a few rounds.",
    items: [
      {
        title: "Four themes for one page",
        text: "The cost page, tried in four themes: two violets, a teal and an orange.",
        media: {
          src: "/work/groundwork/ex-themes.webp",
          width: 3200,
          height: 1800,
          alt: "The cost analytics page in four themes: light violet, violet with gradient cards, teal and orange",
        },
      },
      {
        title: "A history of past comparisons",
        text: "An earlier compare view kept past comparisons in a side panel, next to the setups and the app’s credit balance.",
        media: {
          src: "/work/groundwork/ex-history.webp",
          width: 3200,
          height: 1800,
          alt: "An earlier compare view: a comparison history on the left, three setups with their configuration and response, and the credit balance on the right",
        },
      },
    ],
  },
  decisions: {
    lead: "Three calls shaped the platform.",
    items: [
      {
        title: "Testing and saving are one flow",
        short: "Test and save",
        body: "Compare runs one user prompt across up to three setups (prompt, model and parameters) side by side. The setup that wins goes straight into the prompt library with its version and variables, so nothing is copied by hand. The cost: three columns of output is a dense screen on a laptop, so each column keeps only the essentials.",
      },
      {
        title: "Show the cost where the decision is made",
        short: "Cost in view",
        body: "The playground shows the credit balance of the app being billed, and the tier picker shows quotas and models before a team commits. People see the price while they can still change course, not in a report a month later.",
        media: {
          src: "/work/groundwork/decision-credit.webp",
          width: 3200,
          height: 1800,
          caption: "Credit balance, inside the playground",
          alt: "Playground side panel showing the app's credit balance above its index, tuning and variables",
        },
      },
      {
        title: "Approvals are a queue, not an inbox",
        short: "Approvals",
        body: "Requests sit in tabs by status (all, approved, pending, rejected), with the tier, models and environment on each row. Rejecting needs a comment, so a team always learns why and what to change.",
        media: {
          src: "/work/groundwork/decision-queue.webp",
          width: 3200,
          height: 1800,
          caption: "The app request queue",
          alt: "Manage app requests: status tabs with counts, and rows showing tier, models, environment, requester and approval status",
        },
      },
    ],
  },
  solution: {
    lead: "A team can get access, find the right prompt and ship it, while admins and finance see the same picture.",
    walkthrough: "Here is the playground where prompts are tested, then the pages admins and finance work from.",
    annotated: {
      media: {
        src: "/work/groundwork/solution-playground.webp",
        width: 3200,
        height: 1800,
        markers: [{ x: 29.2, y: 37 }, { x: 43.3, y: 32.7 }, { x: 41.7, y: 44.7 }, { x: 90.8, y: 38.2 }],
        caption: "The prompt playground",
        alt: "Prompt playground: session history, the system prompt, the conversation, and a side panel with credit balance and settings",
      },
      notes: [
        "History of every playground session, so a good run is never lost.",
        "The system prompt, editable in place, with variables for the parts that change.",
        "The conversation, with actions to copy or edit each message.",
        "Credit balance for the app being billed, with its index, tuning and variables.",
      ],
    },
    details: [
      {
        label: "Model library",
        title: "Each endpoint shows where its traffic goes",
        body: "An endpoint lists its active configuration, provider and traffic split, so admins can move traffic between model versions and see the result in one place.",
        media: {
          src: "/work/groundwork/detail-endpoint.webp",
          width: 3200,
          height: 1800,
          caption: "A model endpoint and its configuration",
          alt: "Model endpoint page: ready status, invocation URL, and two configurations each taking half the traffic",
        },
      },
      {
        label: "Analytics",
        title: "Cost by app, model and team",
        body: "Cost over time and by internal cross-charge, with averages per app, per model and per token. Finance can trace a spike to the app behind it.",
        media: {
          src: "/work/groundwork/detail-cost.webp",
          width: 3200,
          height: 1800,
          caption: "Cost analytics",
          alt: "Cost analytics: total cost and averages per app, model, retrieval and token, cost over time, and cost by cross-charge",
        },
      },
      {
        label: "Governance",
        title: "Safety checks, reported across every app",
        body: "Ethics and compliance analytics count what the guardrails caught (personal data, prompt injection, unsafe content) per app, so admins see risk across the platform instead of app by app.",
        media: {
          src: "/work/groundwork/detail-compliance.webp",
          width: 3200,
          height: 1800,
          caption: "Ethics and compliance analytics",
          alt: "Ethics and compliance analytics: compliant requests, policy violations, harmful content, jailbreak attempts and personal data detected, by category and by app",
        },
      },
    ],
  },
  users: [
    { role: "App teams", need: "Register an app, pick a tier, and test prompts before they ship." },
    { role: "Platform admins", need: "Approve apps, manage models and keep endpoints healthy." },
    { role: "Finance", need: "See what each app costs, and charge it to the right business unit." },
  ],
  gallery: {
    lead: "Around the playground",
    items: [
      {
        src: "/work/groundwork/gallery-leaderboard.webp",
        width: 3200,
        height: 1800,
        caption: "Comparing models on latency, cost and safety",
        alt: "Model leaderboard: provider, modality, context window, latency, cost, toxicity and personal-data detection",
      },
      {
        src: "/work/groundwork/gallery-rag.webp",
        width: 3200,
        height: 1800,
        caption: "Retrieval apps and their indexes",
        alt: "My RAG apps: versions of each index with billing status, sync status and actions",
      },
      {
        src: "/work/groundwork/gallery-subscription.webp",
        width: 3200,
        height: 1800,
        caption: "Picking a tier before onboarding",
        alt: "App onboarding: three tiers compared on token quotas, support hours, retrieval and models",
      },
      {
        src: "/work/groundwork/gallery-health.webp",
        width: 3200,
        height: 1800,
        caption: "API health by region and environment",
        alt: "API health analytics: endpoints monitored and down, lowest latency, and health by region",
      },
    ],
  },
  shifts: {
    lead: "From keys in email threads to one approved way in.",
    items: [
      { from: "Each team got its own keys and asked for access by email", to: "Apps register, pick a tier and wait in one approval queue" },
      { from: "Prompts lived in documents and chat threads", to: "The winning setup is saved to a shared prompt library" },
      { from: "Admins couldn’t tell who used which model", to: "Every endpoint shows its configuration, provider and traffic" },
      { from: "Nobody could say which team spent what", to: "Cost by app, model and team, charged to the business unit" },
    ],
  },
  model: {
    label: "The setup formula",
    lead: "Every test in the playground turns the same three dials.",
    body: "Compare runs one user prompt through up to three setups side by side, and the one that wins is saved whole, with its version and variables.",
    parts: [
      { name: "System prompt", text: "The instructions and variables the app sends every time." },
      { name: "Model", text: "Which provider and version answers the prompt." },
      { name: "Parameters", text: "Settings like temperature that shape how it answers." },
    ],
    result: { name: "A setup", text: "Tested side by side, then saved to the prompt library." },
  },
  journey: {
    lead: "How an app gets from an idea to production.",
    steps: [
      { title: "Register the app", text: "Each app is onboarded once, with the business unit its cost goes to." },
      { title: "Pick a tier", text: "Token quotas, support hours, retrieval and models, compared up front." },
      { title: "Get approved", text: "Admins approve or reject from one queue, with a comment." },
      { title: "Test and save", text: "Compare setups on one prompt, with the credit balance in view." },
      { title: "Run in production", text: "Admins watch endpoint health, traffic and safety checks." },
    ],
  },
  outcome: {
    lead: "Built so AI spend has an owner and good prompts get reused.",
    expected: true,
    results: [
      { metric: "One approved way in for every AI app", how: "Apps onboarded through Groundwork, against model keys requested outside it." },
      { metric: "Cost lands on the team that spends it", how: "Share of AI spend tagged to a business unit through cross-charge." },
      { metric: "Prompts get reused instead of rewritten", how: "Prompts saved to the library and used by more than one app." },
    ],
  },
  reflection: {
    learned:
      "A platform has three audiences reading the same numbers. Designing around one shared object, the app, with its tier, prompts and cost attached, kept builders, admins and finance talking about the same thing.",
    different:
      "I'd bring the safety checks into the playground itself, so builders see them while they test, not only in the compliance analytics afterwards.",
  },
};
