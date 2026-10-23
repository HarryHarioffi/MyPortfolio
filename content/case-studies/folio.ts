import type { CaseStudy } from "../types";

// Figma: page "05 · Folio". Boards are in "03 · Case study boards", the cover in
// "02 · Motion cover".
// Desktop screens are client work; the iOS app is a concept built on them.
export const folio: CaseStudy = {
  slug: "folio",
  title: "Folio",
  company: "The Cloud Company",
  year: 2026,
  status: "Mobile concept",
  card: {
    tagline: "Leaders needed the daily report before their first meeting. I took our desktop report library to iOS.",
    domain: "Report library, desktop and iOS",
    contribution: "Product design, plus a mobile concept",
  },
  overview: {
    hook: "The daily sales report, before the first meeting of the day",
    summary:
      "Folio is a report library: shelves of folders holding every pack, deck and dashboard a finance team publishes, with access managed per folder. I designed the desktop library, then extended it into an iOS app as my own concept.",
    nda: "The desktop library is client work, shown with a new name, made-up data and a new visual identity. The iOS app is my own concept built on it.",
    mission: "So my job was to get the right report open before the meeting starts.",
    cover: {
      src: "/work/folio/loop.mp4",
      video: true,
      tint: "#FAF1E0",
      poster: "/work/folio/loop.webp",
      alt: "A tap opens a report folder, its papers fan out, and the PDF becomes its detail sheet before Open report is tapped; then the folder closes",
      width: 1280,
      height: 800,
    },
    snapshot: {
      role: "Product Designer (sole designer)",
      timeline: "[Month] to [Month] 2026",
      team: "[N] engineers, me",
      skills: ["Mobile design", "Information architecture", "Access UX", "Component design"],
      myPart:
        "I redesigned the desktop library (shelves, folders, report info, request access and admin mode), then designed the iOS app, its folder component and its states on my own.",
    },
    glance: {
      problem:
        "Reports sat several folders deep in a desktop portal, and the leaders who needed them on the move had no good way in.",
      did: "Designed shelves of folders that show what's inside before you open them, report details in a sheet, and access requests in two taps.",
      result:
        "A concept built so a leader can get from a notification to the right report, and ask for access, without a laptop.",
    },
  },
  problem: {
    lead: "The report was always there…",
    body: "Folders were deep, names were long, and access was all or nothing: a locked report only said so after you'd found it. On a phone, the desktop portal meant pinching and guessing.",
    turn: "but finding it, and getting into it, on a phone was the hard part.",
    stakes:
      "Leaders read these packs before meetings. A report you can't open in time might as well not exist, and asking for access by email meant waiting with no idea where the request had got to.",
    media: {
      src: "/work/folio/problem-desktop.webp",
      width: 3200,
      height: 1800,
      caption: "Where it started: the desktop library",
      alt: "Desktop report library: tabs for all reports, favourites and publish, with shelves of folder cards and a locked folder",
    },
  },
  discovery: {
    question: "How do people use reports on a phone?",
    lead: "On a phone people rarely browse. They come back to the same few reports, and they want to know they can open one before they tap it.",
    method:
      "I started from the desktop library's structure (shelves, folders, report info, access) and the two iOS screens that already existed, then designed the rest of the app around three moments: finding a report, checking it, and opening it. [Add any feedback you had from people who use the library.]",
    constraints: [
      { label: "Structure", text: "The same shelves, folders and permissions as the desktop library. Mobile couldn't invent its own." },
      { label: "Access", text: "Folders and reports can be restricted. Owners approve requests; the app can only ask." },
      { label: "Files", text: "PDFs, decks, spreadsheets and Power BI dashboards, which open in different places." },
    ],
  },
  decisions: {
    lead: "Three calls shaped the app.",
    items: [
      {
        title: "Folders show what's inside before you open them",
        short: "Folder states",
        body: "The folder component has states for closed, peek (its files rise when you press) and open, plus a locked variant that shows who manages access. You know what you'll find, and whether you can open it, before you commit to a tap.",
        media: {
          src: "/work/folio/decision-folder.webp",
          width: 3200,
          height: 1800,
          caption: "One folder, four states",
          alt: "The folder component closed, peeking with files rising, open with files fanned out, and locked",
        },
      },
      {
        title: "Report details live in a sheet",
        short: "Report sheet",
        body: "The info button opens a sheet over the folder: owner, publish date, frequency, security level and versions. Close it and you're exactly where you were.",
        media: {
          src: "/work/folio/decision-sheet.webp",
          width: 3200,
          height: 1800,
          caption: "Report details in a sheet",
          alt: "A report's detail sheet over its folder: file type, description, owner, last upload, frequency, security and versions",
        },
      },
      {
        title: "Access in two taps, with a status you can see",
        short: "Access",
        body: "Request access opens a short form with the approver already filled in. The report then shows Pending, the Requests tab tracks it, and a notification says when it's approved.",
        media: {
          src: "/work/folio/decision-access.webp",
          width: 3200,
          height: 1800,
          caption: "Request, pending, approved",
          alt: "Three screens: the request access form, the request sent with the report marked pending, and a lock-screen notification that access was approved",
        },
      },
    ],
  },
  solution: {
    lead: "A leader can find a report, check it, and ask for access, all from a phone.",
    walkthrough: "Here are the home shelves, then the flow from folder to report and the states around it.",
    annotated: {
      media: {
        src: "/work/folio/solution-home.webp",
        width: 3200,
        height: 1800,
        markers: [{ x: 38.8, y: 28.7 }, { x: 38.8, y: 44.4 }, { x: 61.3, y: 48.4 }, { x: 38.8, y: 88.6 }],
        caption: "Home",
        alt: "Folio home on iOS: search, a switch between all reports and my access, shelves of folders, and the tab bar",
      },
      notes: [
        "Search, and a switch between all reports and the ones you can open.",
        "Shelves of folders, each showing how many reports are inside.",
        "A locked folder says so before you tap it.",
        "Tabs for reports, favourites and your access requests.",
      ],
    },
    flow: {
      src: "/work/folio/flow-folder.webp",
      width: 3200,
      height: 1800,
      caption: "From a folder to a report",
      alt: "Flow: a folder peeking when pressed on the home shelf, the folder open with its sub-folders and reports, then a report's detail sheet",
    },
    details: [
      {
        label: "Edge states",
        title: "Every dead end says what to do next",
        body: "No search results suggests a broader term. An empty favourites list explains the star. Offline, saved reports still open and the rest are marked, instead of failing when you tap them.",
        media: {
          src: "/work/folio/detail-edge.webp",
          width: 3200,
          height: 1800,
          caption: "No results, no favourites, offline",
          alt: "Three iOS screens: search with no results, an empty favourites list, and home while offline",
        },
      },
      {
        label: "Opening",
        title: "Open it, save it for offline, or keep it close",
        body: "Documents open in a viewer with share and save-offline actions; dashboards hand off to the browser, and the row says so before you tap. Favourites keep the few reports people return to one tap away, and a swipe removes one.",
        media: {
          src: "/work/folio/detail-viewer.webp",
          width: 3200,
          height: 1800,
          caption: "The viewer and favourites",
          alt: "A PDF report open in the viewer with page count and save-offline, beside the favourites list with one row swiped to remove",
        },
      },
      {
        label: "Desktop",
        title: "The same library, at a desk",
        body: "On desktop, report info opens in a modal with the full path, owners and version history, and admins switch into a mode for publishing and editing reports. The mobile app reuses its structure and its access rules.",
        media: {
          src: "/work/folio/detail-desktop.webp",
          width: 3200,
          height: 1800,
          caption: "Desktop report info",
          alt: "Desktop report info modal: breadcrumb path, description, owner, uploader, access contact, frequency, security and versions",
        },
      },
    ],
  },
  users: [
    { role: "Leaders", need: "Read packs and dashboards, often on a phone before a meeting." },
    { role: "Publishers", need: "Upload new versions and keep folders tidy." },
    { role: "Business owners", need: "Decide who can open a folder, and approve requests." },
  ],
  beforeAfter: {
    lead: "From two screens to a whole app",
    body: "The iOS work started from two screens: a report list and its detail sheet. The concept keeps their structure, then rebuilds them around the folder, the sheet and an access state you can see.",
    before: {
      src: "/work/folio/before-ios.webp",
      width: 3200,
      height: 1800,
      caption: "Before: the two original iOS screens",
      alt: "The two original iOS screens: a flat report list and a report detail sheet with a request access button",
    },
    after: {
      src: "/work/folio/after-ios.webp",
      width: 3200,
      height: 1800,
      caption: "After: the folder and its report sheet",
      alt: "The redesigned folder screen with sub-folders and reports, beside the new report detail sheet",
    },
  },
  gallery: {
    lead: "Requests, dead ends and the moments in between",
    items: [
      {
        src: "/work/folio/gallery-access.webp",
        width: 3200,
        height: 1800,
        caption: "Requests, a locked folder, and search",
        alt: "Three screens: the requests tab, a locked folder with a request button, and search results",
      },
      {
        src: "/work/folio/gallery-states.webp",
        width: 3200,
        height: 1800,
        caption: "Loading, a folder by year, and the approval",
        alt: "Three screens: home while loading, a sub-folder grouped by year, and the lock-screen notification",
      },
    ],
  },
  shifts: {
    lead: "From a desktop portal on a small screen to an app made for it.",
    items: [
      { from: "Deep folders and long names", to: "Shelves of folders that show what’s inside" },
      { from: "A locked report only said so after you’d found it", to: "The lock shows before you tap, with who manages access" },
      { from: "Access was all or nothing", to: "A request in two taps, with a status you can track" },
      { from: "Pinching and guessing on the desktop portal", to: "Details in a sheet, favourites one tap away" },
    ],
  },
  model: {
    label: "The report checklist",
    lead: "A report is only useful if you know three things before you tap it.",
    body: "Every screen answers them in the same order: what it is, who stands behind it, and whether you can open it.",
    parts: [
      { name: "The file", text: "Its name, its type and the folder it lives in." },
      { name: "The owner", text: "Who publishes it, how often, and when it last went out." },
      { name: "The access", text: "Its security level, and a request if it’s locked." },
    ],
    result: { name: "A report you can trust", text: "Found, checked and opened from a phone." },
  },
  journey: {
    lead: "From the home shelf to an open report.",
    steps: [
      { title: "Open the shelf", text: "Folders peek to show what’s inside before you open them." },
      { title: "Find the report", text: "Browse sub-folders by year, or search." },
      { title: "Check the details", text: "Owner, publish date, frequency and security, in a sheet." },
      { title: "Ask for access", text: "The approver is filled in, and the report shows Pending." },
      { title: "Get notified", text: "A notification says it’s approved, and the report opens." },
    ],
  },
  outcome: {
    lead: "Built so the report is open before the meeting starts.",
    expected: true,
    results: [
      { metric: "Leaders open reports from their phones, not only at a desk", how: "Share of report opens that come from mobile." },
      { metric: "Access requests stop going by email", how: "Requests raised in the app, and the time from request to approval." },
      { metric: "Fewer dead ends on locked reports", how: "Taps on locked folders that turn into requests instead of exits." },
    ],
  },
  reflection: {
    learned:
      "Designing the folder as one component with states made the whole app simpler. The same object appears on the shelves, in search and in the access flow, and it behaves the same way everywhere.",
    different:
      "This is a concept. Before building it I'd test the peek state with real users: a press that previews content feels natural on iOS, but it must never slow down someone who just wants to open the folder.",
  },
};
