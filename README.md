# Portfolio

Minimal, fast personal site. Astro (static) + a React island for the TOC +
Tailwind 4. Single dark theme.

## Develop

```bash
bun dev          # local dev server at localhost:4321
bun run build    # static build to dist/ (also validates content frontmatter)
bun run preview  # serve the built dist/
bun run typecheck
bun run lint
```

## Where things live

- **Name, intro, social links, homepage section order** — `src/config.ts`
- **Frontmatter rules (source of truth)** — `src/content.config.ts`
- **Logos** — `src/assets/logos/` · **other images** — `src/assets/` · **favicons** — `public/`
- **Styling / theme** — `src/styles/global.css`

## Adding content

Two separate collections:

- **`src/content/work/`** — timeline rows for the homepage (Experience,
  Achievements, Education). Facts only; these never become pages.
- **`src/content/writing/`** — the only articles. Each renders at
  `/writing/<slug>` (the filename is the slug) and is listed on `/writing`.

To attach a writeup to a job/project, write a post in `writing/` and point the
work row's `href` at it (e.g. `href: /writing/bidscents`). See `bidscents` for
the worked pair.

### Add a writing post (article)

Create `src/content/writing/<slug>.md` (or `.mdx`):

```yaml
---
title: My Post
date: 2026-06-17          # full date on the article, DD/MM on the list
description: Lead paragraph under the title; also the list + link preview text.  # optional
hero: ../../assets/my-post-hero.png    # optional, top of article + link preview
links:                   # optional outbound links in the article header
  - { label: App Store, href: "https://..." }
  - { label: GitHub, href: "https://..." }
draft: false             # optional, true hides it everywhere
---

Body in Markdown (use .mdx if you want the components below).
```

Shows up automatically on `/writing` and at `/writing/<slug>`, sorted by `date`.

### Add a homepage row

Create `src/content/work/<slug>.mdx`:

```yaml
---
section: main            # main = Experience, awards = Achievements, education = Education
order: 1                 # lower sorts higher within the section
title: Project Name
subtitle: Your role      # optional
tab: BSc Maths           # optional indented sub-line (e.g. a degree)
icon: ../../assets/logos/project.png   # optional row icon
date: 2026-01-01         # sort key; right-hand label = its month
year: 2026               # left-gutter year group
displayDate: Winner ×3   # optional override of the right-hand label
badge: Incoming          # optional accent badge
href: /writing/my-post   # optional: makes the row clickable (internal path or URL)
draft: false             # optional, true hides it
---
```

### Images & components

Reference images with a relative path (`../../assets/...`); Astro optimizes them.
In `.mdx` bodies you can `import` and use:

- `<Figure src={img} alt="..." caption="..." />` — optimized image with caption
- `<LinkCard href="..." title="..." description="..." />` — link preview card
- `<Video src="..." />` — video embed

Plain `.md` files can't use these — use `.mdx` if you need components.

Run `bun run build` after adding content to catch frontmatter or image-path errors.
