# Harry Hari, portfolio (V2)

Design engineer portfolio. Next.js 16 (App Router), React 19, Tailwind v4, TypeScript. No animation library: motion is CSS only.

```bash
npm run dev     # http://localhost:3000
npm run build   # every page is prerendered to static HTML
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `app/globals.css` | **Design tokens** (colors, type scale, easing), taken from the Figma "Case Study v2" template. Change a value here and the whole site follows. |
| `content/site.ts` | Name, legal name, role, email, links, nav. Placeholder LinkedIn/GitHub URLs are hidden automatically. |
| `content/home.ts` | Every line of home page copy (hero, facts, How I work, name teaser, contact). |
| `content/about.ts` | Every line of `/about` copy (name, intro, working with me, experience, off the clock). |
| `content/case-studies/*.ts` | One typed file per case study. Structure follows the Figma template. |
| `content/index.ts` | Order of case studies. The first `FEATURED_COUNT` (3) get large cards; the rest are "More work" rows. |
| `components/home/*` | Home page sections. |
| `components/case-study/*` | Case study page, one function per template section. |
| `components/ui/MediaSlot.tsx` | Renders your image or video. Without one, covers show `CoverArt` (a drawn schematic) and other slots show the dashed placeholder. |
| `components/home/AgentCardDemo.tsx` | The hero's design/code demo. Both views render from the same props. |
| `components/about/NameSpecimen.tsx` | The Legal / Stage name swap on `/about`. |

## Add a case study

1. Copy `content/case-studies/strata-ai.ts`, rename, fill it in.
2. Add it to the array in `content/index.ts`.

The route `/work/<slug>`, the sticky section index, the sitemap and the metadata are generated from the data. Optional sections (`discovery`, `options`, `decisions`, `solution.annotated`, `solution.flow`, `outcome.quote`) disappear cleanly when omitted.

## Add real media

Drop files in `public/work/<project>/` and set `src`, `width` and `height` on the media entry:

```ts
cover: { src: "/work/strata/cover.webp", width: 2400, height: 1240, alt: "StrataAI workspace builder" }
```

Images go through `next/image` (AVIF/WebP, responsive sizes, no layout shift). Set `video: true` for mp4/webm flow recordings.

## Before launch

- Replace every `[bracketed]` placeholder in `content/` (metrics, quotes, dates, team).
- Set `NEXT_PUBLIC_SITE_URL`, and the LinkedIn and GitHub links in `content/site.ts`.
- The resume lives at `public/Hariharasudhan-Shanmugam-Resume.pdf`. Replace the file to update it.
- Add real covers for StrataAI, Heimdall and Echo Desk (NDA-safe crops). Until then they show drawn schematics.
