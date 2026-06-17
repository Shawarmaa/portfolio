import type { ImageMetadata } from "astro"
import type { CollectionEntry } from "astro:content"

// A single normalized timeline row. Both the homepage work lists and the
// writings list render through TimelineList using this shape.
export interface TimelineRow {
  title: string
  subtitle?: string
  tab?: string
  icon?: ImageMetadata
  badge?: string
  // Left-gutter group; null renders no year gutter (dateless rows).
  year: number | null
  // Right-hand label (usually a short month).
  right: string
  href?: string | null
  // Sort keys: order ascending, then sortDate descending.
  order?: number
  sortDate?: number
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

export function workRow(entry: CollectionEntry<"work">): TimelineRow {
  const d = entry.data.date
  return {
    title: entry.data.title,
    subtitle: entry.data.subtitle,
    tab: entry.data.tab,
    icon: entry.data.icon,
    badge: entry.data.badge,
    year: entry.data.year ?? d?.getFullYear() ?? null,
    right: entry.data.displayDate ?? (d ? MONTHS[d.getMonth()] : ""),
    // Rows link only when an explicit href is set; no auto-generated pages.
    href: entry.data.href ?? null,
    order: entry.data.order ?? 0,
    sortDate: d?.valueOf() ?? 0,
  }
}

// Day/month in numbers, e.g. "14/06" (year lives in the left gutter).
function dayMonth(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0")
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  return `${dd}/${mm}`
}

export function writingRow(entry: CollectionEntry<"writing">): TimelineRow {
  const d = entry.data.date
  return {
    title: entry.data.title,
    year: d.getFullYear(),
    right: dayMonth(d),
    href: `/writing/${entry.id}`,
    sortDate: d.valueOf(),
  }
}
