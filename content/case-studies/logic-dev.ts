import type { CaseStudy } from "../types";

// Figma: page "03 · Logic.dev". Boards are in "03 · Case study boards", the cover in
// "02 · Motion cover".
export const logicDev: CaseStudy = {
  slug: "logic-dev",
  title: "Logic.dev",
  company: "The Cloud Company",
  year: 2025,
  status: "Internal product",
  card: {
    tagline: "Draw app logic as a flow and get the code. I designed the canvas, its nodes and the hand-off to code.",
    domain: "Visual logic builder on React Flow",
    contribution: "Product design for a node canvas",
  },
  overview: {
    hook: "Draw the logic once. Get the code for free",
    summary:
      "Logic.dev is an internal tool where a project's app logic (state, API calls, data transforms) is drawn as a flow on a React Flow canvas and turned into code. This case study covers the canvas: its nodes, its wires and the panel you configure them in.",
    nda: "An internal product at The Cloud Company. The sample data is made up.",
    mission: "So my job was to make an app’s logic something the whole team could read.",
    cover: {
      src: "/work/logic-dev/loop.mp4",
      video: true,
      tint: "#0B1014",
      poster: "/work/logic-dev/loop.webp",
      alt: "Three nodes, form sent, email valid and create account, turn into the TypeScript they generate, line by line, then back into the flow",
      width: 1144,
      height: 800,
    },
    snapshot: {
      role: "Product Designer, Design Engineer",
      timeline: "[Month] to [Month] 2025",
      team: "[N] engineers, me",
      skills: ["Interaction design", "Node-based UI", "Design systems", "React Flow"],
      myPart:
        "I designed the project structure, the logic canvas (node anatomy, handles, edges and the node palette), the docked config panel, and the Flow, Prompt and Code views. [Say what you built in code, if anything.]",
    },
    glance: {
      problem:
        "Every project rebuilt the same plumbing by hand, and the logic lived in developers' heads, where PMs and designers couldn't read it.",
      did: "Designed a canvas where logic is built from typed nodes, wired with success and error paths, and shown as a flow, a prompt or code.",
      result: "Built so everyone on a project can read an app's logic, and its boilerplate is generated instead of typed.",
    },
  },
  problem: {
    lead: "Every client app needed the same kind of logic…",
    body: "State, API calls and data transforms were rebuilt for each client app. When a developer moved on, the reasoning went with them, and PMs and designers had no way to check what a screen actually did.",
    turn: "but it was written by hand each time, and only its author could read it.",
    stakes:
      "That meant slow starts on new projects, long ramp-ups for new developers, and bugs in logic nobody else had reviewed.",
  },
  discovery: {
    question: "Who has to read a canvas?",
    lead: "The canvas had to make sense to two kinds of people: developers, who think in code, and everyone else, who thinks in steps.",
    method:
      "React Flow set the ground rules. Nodes, handles and edges are its building blocks, so I designed within that model instead of against it, and every interaction I drew was one the engineers could build. [Add how you tested the canvas with developers and PMs.]",
    constraints: [
      { label: "Canvas", text: "React Flow's model of nodes, handles and edges. Anything custom had to fit inside it." },
      { label: "Output", text: "Every node had to map to code the generator could write, such as a Zustand store." },
      { label: "Comfort", text: "Light and dark themes, because developers would spend whole days in it." },
    ],
    media: {
      src: "/work/logic-dev/node-anatomy.webp",
      width: 3200,
      height: 1800,
      caption: "Anatomy of a node",
      alt: "A selected Get State node: its icon, title and body, with the handles that wire it in and out",
    },
  },
  explorations: {
    lead: "Before the canvas you see now, there were two earlier ones.",
    items: [
      {
        title: "The first canvas",
        text: "Blocks sat in a grid in the side panel, and every wire was the same colour.",
        media: {
          src: "/work/logic-dev/ex-first-canvas.webp",
          width: 3200,
          height: 1800,
          alt: "The first logic canvas, in a dark theme: a grid of blocks on the left and nodes joined by blue wires",
        },
      },
      {
        title: "The first home",
        text: "Each project listed its logic files, with its SQL and API work beside them.",
        media: {
          src: "/work/logic-dev/ex-first-home.webp",
          width: 3200,
          height: 1800,
          alt: "The first home screen: a project's logic files as cards, with SQL and API sections below",
        },
      },
      {
        title: "The earlier canvas, in light",
        text: "Flow, Prompt and Code tabs had arrived, and the blocks were grouped into general, data and control.",
        media: {
          src: "/work/logic-dev/ex-light.webp",
          width: 3200,
          height: 1800,
          alt: "The earlier canvas in a light theme: grouped blocks on the left, Flow, Prompt and Code tabs, and a flow with a for-each node",
        },
      },
    ],
  },
  decisions: {
    lead: "Three calls shaped the canvas.",
    items: [
      {
        title: "Nodes are grouped by what you want to do",
        short: "Grouped blocks",
        body: "The palette groups blocks by intent: general (events, UI updates, custom tasks), data (get and set state, transform, filter, lookup, call an API), control (if/else, switch, for-each, until) and functions. Each group has its own icon colour, so you find a block by its job, not its name.",
        media: {
          src: "/work/logic-dev/decision-palette.webp",
          width: 3200,
          height: 1800,
          caption: "The node palette",
          alt: "Node palette with four groups, General, Data, Control and Functions, each with colour-coded icons",
        },
      },
      {
        title: "Success and error are separate wires",
        short: "Error paths",
        body: "A node that can fail has two outputs, drawn in different colours. Error handling is visible on the canvas instead of buried in a setting, and a missing error path is easy to spot in review.",
        media: {
          src: "/work/logic-dev/decision-branches.webp",
          width: 3200,
          height: 1800,
          caption: "Success and error paths",
          alt: "A flow where a ForEach node sends its success path, in green, to a UI update and its error path, in red, to a data transform",
        },
      },
      {
        title: "Configure a node without losing the canvas",
        short: "Docked config",
        body: "The config panel docks under the canvas (endpoint, HTTP method, query parameters, payload and response structure), so the node and its neighbours stay in view while you edit. The cost: less height for the flow itself.",
        media: {
          src: "/work/logic-dev/decision-config.webp",
          width: 3200,
          height: 1800,
          caption: "The docked config panel",
          alt: "A selected Get State node with its config panel docked below: URL endpoint, HTTP method, query params, payload and response structure",
        },
      },
    ],
  },
  solution: {
    lead: "A developer can draw a feature's logic, a PM can read it, and the code comes out the other end.",
    walkthrough: "Here is the canvas with a flow being configured, then the views and the project around it.",
    annotated: {
      media: {
        src: "/work/logic-dev/solution-canvas.webp",
        width: 3200,
        height: 1800,
        markers: [{ x: 18.3, y: 20.6 }, { x: 60, y: 52.1 }, { x: 71.7, y: 38.8 }, { x: 40, y: 69.6 }, { x: 50, y: 23.2 }],
        caption: "The logic canvas",
        alt: "Logic canvas: node palette on the left, a flow of connected nodes, a config panel docked below and view tabs above",
      },
      notes: [
        "The node palette, grouped by intent.",
        "A ForEach node with success and error outputs.",
        "Edges coloured by outcome.",
        "The config panel, docked under the canvas.",
        "Flow, Prompt and Code tabs, with Generate Code.",
      ],
    },
    details: [
      {
        label: "Views",
        title: "Flow, Prompt and Code show the same logic",
        body: "Developers read the code, PMs read the prompt, and everyone reads the flow. Generate Code turns the flow into a store the developer drops into the app.",
        media: {
          src: "/work/logic-dev/detail-code.webp",
          width: 3200,
          height: 1800,
          caption: "The Code view of a flow",
          alt: "The Code tab: a generated Zustand store and the functions that run the flow, with a copy button",
        },
      },
      {
        label: "Project",
        title: "Logic lives next to the rest of the project",
        body: "Each project has an overview, requirements, features (each with build and design views), front end, logic, data model and back end, so a flow is always tied to the feature it serves.",
        media: {
          src: "/work/logic-dev/detail-project.webp",
          width: 3200,
          height: 1800,
          caption: "Projects",
          alt: "The projects list, each project with its initial and when it was last edited",
        },
      },
      {
        label: "Themes",
        title: "Light and dark, from one set of tokens",
        body: "Both themes come from the same tokens, so node colours keep their meaning, and their contrast, in either mode.",
        media: {
          src: "/work/logic-dev/detail-themes.webp",
          width: 3200,
          height: 1800,
          caption: "The canvas in light and dark",
          alt: "The same flow shown in the light theme and the dark theme",
        },
      },
    ],
  },
  users: [
    { role: "Developers", need: "Build a feature's logic once and generate the boilerplate." },
    { role: "PMs and designers", need: "Read what a feature actually does without reading code." },
    { role: "New joiners", need: "Learn a feature from its flow, not from someone's memory." },
  ],
  beforeAfter: {
    lead: "The canvas grew up with the product",
    body: "The earlier canvas, from when the product had another name, already had nodes and wires. The current one adds blocks grouped by intent, separate success and error paths, and a config panel docked under the canvas.",
    before: {
      src: "/work/logic-dev/before-canvas.webp",
      width: 3200,
      height: 1800,
      caption: "Before: the earlier canvas",
      alt: "The earlier logic canvas: a palette of blocks, a few connected nodes and the old header",
    },
    after: {
      src: "/work/logic-dev/gallery-config-light.webp",
      width: 3200,
      height: 1800,
      caption: "After: the current canvas, in the light theme",
      alt: "The current canvas in the light theme: grouped palette, a flow with success and error branches, and the docked config panel",
    },
  },
  gallery: {
    lead: "Around the canvas",
    items: [
      {
        src: "/work/logic-dev/gallery-login.webp",
        width: 3200,
        height: 1800,
        caption: "Sign in",
        alt: "The sign-in page: Features plus UI plus logic plus APIs plus storage plus AI code generation",
      },
      {
        src: "/work/logic-dev/gallery-home-light.webp",
        width: 3200,
        height: 1800,
        caption: "Projects, in the light theme",
        alt: "The projects list in the light theme, with organisations in the sidebar",
      },
    ],
  },
  shifts: {
    lead: "From logic in one developer’s head to logic the whole team can read.",
    items: [
      { from: "The same state and API calls rewritten for every client app", to: "Logic drawn once, with the boilerplate generated" },
      { from: "The reasoning left when its developer did", to: "The flow stays with the feature it serves" },
      { from: "PMs and designers couldn’t check what a screen did", to: "Flow, Prompt and Code views of the same logic" },
      { from: "Error handling buried in a setting", to: "Success and error drawn as separate wires" },
    ],
  },
  model: {
    label: "The flow formula",
    lead: "Every feature is an event, the data it touches, and the decisions in between.",
    body: "The palette is grouped the same way, so the first question on the canvas is what you want to happen, not what a block is called.",
    parts: [
      { name: "Events", text: "What starts it, and what it updates on screen." },
      { name: "Data", text: "What it reads and changes: state, transforms, filters and API calls." },
      { name: "Control", text: "How it decides: if/else, switch and loops, with a separate path for errors." },
    ],
    result: { name: "A flow", text: "One piece of logic, read as a flow, a prompt or code." },
  },
  journey: {
    lead: "From a feature to the code that runs it.",
    steps: [
      { title: "Start from the feature", text: "Each feature has build and design views, and its logic sits beside them." },
      { title: "Draw the flow", text: "Pick blocks by intent from the palette and wire them up." },
      { title: "Configure each node", text: "Endpoint, method, parameters and payload, docked under the canvas." },
      { title: "Review it together", text: "PMs read the prompt view, developers read the code." },
      { title: "Generate the code", text: "The flow becomes a store the developer drops into the app." },
    ],
  },
  outcome: {
    lead: "Built so app logic becomes something a whole team can read, and the boilerplate writes itself.",
    expected: true,
    results: [
      { metric: "New projects start from generated code, not a blank file", how: "Share of state and API code generated from flows in new projects." },
      { metric: "New developers learn a feature from its flow", how: "Time for a new developer to make their first change to a feature." },
      { metric: "Logic gets reviewed by more than its author", how: "Flows opened or commented on by PMs and designers." },
    ],
  },
  reflection: {
    learned:
      "Designing for a canvas library meant learning its model first. Once I designed in React Flow's terms (nodes, handles, edges), what I handed over was something engineering could build without translating.",
    different:
      "I'd test the node palette with people who aren't developers earlier. Names like setState and lookup are clear to engineers and opaque to everyone else, and the Prompt view only partly closes that gap.",
  },
};
