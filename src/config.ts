// One-off site data that doesn't belong in the content collection.
// Edit your name, intro, and links here.

export const site = {
  name: "Muhammad Abdullah",
  title: "Muhammad Abdullah",
  description:
    "Software engineer studying CS & Maths at the University of Manchester. I build products people actually use.",
  // Used for OG tags and canonical URLs (must match astro.config `site`).
  url: "https://muhammadabdullah.dev",
  email: "muhammadabdullaham24@gmail.com",
  location: "Manchester, UK",
} as const

// The intro is rendered as segments so inline links stay typed. Segments
// without an href render as plain text.
export type IntroSegment = { text: string; href?: string }

// Each inner array is a paragraph; segments with `href` render as inline links.
export const intro: IntroSegment[][] = [
  [
    { text: "Currently in London interning @ " },
    { text: "HubSpot", href: "https://www.hubspot.com/" },
    {
      text: ". Previously I've shipped web and native apps to over 20,000 users combined.",
    },
  ],
]

export type SocialLink = {
  label: string
  href: string
  // lucide icon name, resolved in the Socials component.
  icon: "github" | "linkedin" | "mail"
}

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Shawarmaa", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammadabdull",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:muhammadabdullaham24@gmail.com", icon: "mail" },
]

// Homepage section order. Maps to an entry's `section`. A null label renders
// the list with no heading (the combined top section).
export const sections: {
  key: "main" | "education" | "awards"
  label: string | null
}[] = [
  { key: "main", label: "Experience" },
  { key: "awards", label: "Achievements" },
  { key: "education", label: "Education" },
]
