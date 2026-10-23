# Case study plan: decisions, status and what's left

Last updated 2026-10-22. Figma file: `Clu0i5txhdccOtstyo5CUK`. The case study text itself now lives in `content/case-studies/*.ts`.

## Decisions (agreed)

| # | Product | Was | Figma page | Accent | Site slug |
|---|---|---|---|---|---|
| 1 | **Groundwork**: the AI platform teams build on | AI Foundation | Case Study - 1 (`0:1`) | violet #6941E0 | `groundwork` |
| 2 | **Skillset**: a no-code builder for AI assistants | Ally | Case Study - 2 (`42:262141`) | teal #0F8F86 | `skillset` |
| 3 | **Leanburn**: fleet fuel analytics (older look kept) | Fuel Economy Optimization | Case Study - 3 (`2:6011`) | orange #E8620C on slate | `leanburn` |
| 4 | **Logic.dev**: a visual logic builder on React Flow | Logic.dev | Case Study - 4 (`44:69156`) | blue #2F73FB, spark #FF6700 | `logic-dev` |
| 5 | **Cashlens**: working-capital analytics in Power Pages | Cash IQ | Case Study - 5 (`42:208899`) | green #159A4C | `cashlens` |
| 6 | **Folio**: a report library, desktop plus an iOS concept | Report portal | Case Study - 6 (`42:297426`) | gold #E3A21A / #A86A05 | `folio` |

- **Site order:** Skillset, Groundwork and Logic.dev are featured, then Cashlens, Folio and Leanburn.
- **Client:** never named. Each page says "client work, shown with a new name, made-up data and a new visual identity".
- **Sample data:**
  - Emails are plain `@gmail.com`.
  - One cast across every project: Arjun Mehta, Daniel Reyes, Rahul Verma and Priya Nair.
  - Business units are Foods, Home & Hygiene, Self Care, Beauty, Snacks and Fragrance.
- **Fonts:**
  - Inter everywhere the client's fonts were.
  - The logos use Poppins.
  - The iOS screens use Inter. SF Pro can't be laid out by the Figma plugin environment, so it was swapped for Inter, which sits close to it.
- **Outcomes:** these are the effects each design was built for, with the signal that would show each one. There are no invented numbers. The page states this above the list (`outcome.expected: true`).
- **"Case Study - 2 Old" (StrataAI):** kept in Figma as a style reference only. It is no longer on the site.

## Figma status

All six pages are clean: no client fonts, logos, colours, names, people, emails, codes or library links.

**Page order:** 01 Skillset, 02 Groundwork, 03 Logic.dev, 04 Cashlens, 05 Folio, 06 Leanburn. The StrataAI page is last, as "99 · Archive · StrataAI (old reference)". It still has the client font and a hidden client logo layer, so leave it out of anything you share.

**Every page uses the same section order:**

- **00 · Cover:** a 1920×1080 title frame with the logo, headline, meta line and cover art. Set Skillset's as the file thumbnail by hand: right-click the frame, then "Set as thumbnail". The plugin API can't do it.
- **01 · Brand:** the logo set and palette.
- **02 · Motion cover:** the 7-second animated cover, exported to the site as `cover.mp4`.
- **03 · Case study boards:** board stacks exported to `public/work/<slug>/`. Each page has a main stack and a "more" stack.
- **04 · Screens:** the real product screens.
- **05 · Components:** component sets and local copies.
- **06 · Archive:** old explorations, plus every loose layer that was outside a section. Nothing was deleted.

**Before sharing the Figma file, duplicate it.** Its version history still contains the client's data.

## Site status

- **Case study layout:** a single calm column modelled on rachelchen.tech. Each section has a small label, a statement heading, short paragraphs and full-width figures. The left index tracks the sections.
- **New sections, built only from real screens:**
  - "Who it's for" on every study.
  - "Before and after" for Logic.dev and Folio.
  - "More screens" galleries on all six.
  - Groundwork's options: its old compare view against the side-by-side one.
- **Covers:** six seamless 6-second loops (under 200 KB each) in `public/work/<slug>/loop.mp4`, posters in `loop.webp`. Modelled on rachelchen.tech: each opens on a meaningful start state and ends exactly there (never an empty frame), shows one large element readable at thumbnail size, and has no logo. The slot shows the cover's own tint while it loads. Wide covers (Skillset, Cashlens, Folio) are 16:10; narrow ones (Groundwork, Logic.dev, Leanburn) are about 1.43:1.
- **Richer sections:** a Core idea equation (with a mono label like "The skill formula"), What had to change, and an End to end journey. The diagrams build in as they scroll into view, and stay still with reduced motion. The left index opens subsections under the section you're reading.
- **Varied headings:** "My role" as a first-person line; the problem as a two-part "…but" heading; discovery as a question with its answer quoted; options prefixed "Dropped:" and "Chosen:"; decisions with big condensed numerals; a light bridge line into the solution; Before and After labels; reflection as two questions.
- **Explorations:** older versions from the Figma archive, figure with a note beside it: Groundwork (themes, comparison history), Logic.dev (first canvas, first home, light theme), Skillset (data-source step, early analytics).
- **Images:** 78 references, all of them present, and no unused files.

## Open questions for you

These show on the site as dashed placeholders until you answer them.

- **Timeline and team** for each project (months, number of engineers, whether there was a PM).
- **Research:** what you actually did on Skillset, Groundwork, Logic.dev and Cashlens. The pages say so where it's missing.
- **Logic.dev:** what you built in code, if anything.
- **Status labels:** I used Shipped for Skillset, Groundwork and Cashlens; Internal product for Logic.dev; Mobile concept for Folio; and Internship for Leanburn. Correct any that are wrong.
- **Leanburn:** who you worked with.
