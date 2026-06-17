import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// Timeline entries: each role, project, award, and education item is one file.
// `section` decides which homepage list it lands in. These are rows only; to
// attach a writeup, point `href` at a writing post (e.g. /writing/bidscents).
const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      // Which homepage list.
      section: z.enum(["main", "education", "awards"]),

      // Row content.
      title: z.string(),
      subtitle: z.string().optional(),
      // Indented sub-line under the title; part of the same (hover/link) element.
      tab: z.string().optional(),
      icon: image().optional(),

      // Timeline. `date` sorts; `year` is the left-gutter group; the right-hand
      // label defaults to the start month and can be overridden by displayDate.
      // Omit `date` entirely for dateless rows (e.g. education).
      date: z.coerce.date().optional(),
      year: z.coerce.number().optional(),
      displayDate: z.string().optional(),

      // Optional accent badge next to the title (e.g. "Incoming").
      badge: z.string().optional(),

      // Link target: an internal path (e.g. "/writing/bidscents") or a URL.
      // Omit for a plain, non-clickable row.
      href: z.string().optional(),

      // Manual ordering within a section (ascending). Falls back to date desc.
      order: z.number().optional(),

      draft: z.boolean().default(false),
    }),
})

// Writing posts: the only collection that renders articles, at /writing/[slug].
const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      // Article lead paragraph; also used for <meta description> / OG.
      description: z.string().optional(),
      // Hero image: rendered at the top and used as the OG / link-preview image.
      hero: image().optional(),
      // Outbound links shown in the article header (e.g. App Store, GitHub).
      links: z
        .array(z.object({ label: z.string(), href: z.string() }))
        .optional(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { work, writing }
