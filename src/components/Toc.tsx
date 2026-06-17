import { useEffect, useMemo, useState } from "react"

export type Heading = { depth: number; slug: string; text: string }

interface Props {
  headings: Heading[]
}

/**
 * Sticky table of contents with scroll-spy. Highlights the section currently
 * in view and smooth-scrolls on click. Renders the h2 and h3 of the article.
 */
export function Toc({ headings }: Props) {
  const items = useMemo(
    () =>
      headings.filter(
        (h) =>
          (h.depth === 2 || h.depth === 3) && h.slug !== "footnote-label",
      ),
    [headings],
  )
  const [active, setActive] = useState<string>(items[0]?.slug ?? "")

  useEffect(() => {
    if (items.length === 0) return

    const elements = items
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost heading currently intersecting the trigger band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // Trigger band near the top of the viewport.
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 },
    )

    // The observer's trigger band sits near the top of the viewport, so the
    // last sections can never scroll into it. Force the final item active once
    // we've reached the bottom of the page.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) setActive(items[items.length - 1].slug)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    elements.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [items])

  function handleClick(e: React.MouseEvent, slug: string) {
    e.preventDefault()
    const el = document.getElementById(slug)
    if (!el) return
    setActive(slug)
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    history.replaceState(null, "", `#${slug}`)
    // Flash the heading, restarting the animation if it's mid-flight.
    el.classList.remove("heading-flash")
    void el.offsetWidth
    el.classList.add("heading-flash")
  }

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="space-y-1 text-sm">
      {items.map((h) => {
        const isActive = active === h.slug
        return (
          <a
            key={h.slug}
            href={`#${h.slug}`}
            onClick={(e) => handleClick(e, h.slug)}
            className={[
              "block py-1 transition-colors",
              h.depth === 3 ? "pl-4" : "",
              isActive
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {h.text}
          </a>
        )
      })}
    </nav>
  )
}
