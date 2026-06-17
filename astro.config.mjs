// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { unified } from "@astrojs/markdown-remark"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import cloudflare from "@astrojs/cloudflare";

// Update this to your deployed domain.
const SITE = "https://muhammadabdullah.dev"

// Wrap the text of each h2/h3 in <span class="heading-text"> so the inline
// divider line and the TOC-jump highlight can target the text only, not the
// whole flex row. Skips the sr-only footnotes label.
function rehypeHeadingText() {
  const wrap = (/** @type {any} */ node) => {
    if (!node) return
    if (
      node.type === "element" &&
      (node.tagName === "h2" || node.tagName === "h3")
    ) {
      const cls = node.properties?.className
      const srOnly = Array.isArray(cls) ? cls.includes("sr-only") : false
      if (!srOnly && node.children?.length) {
        node.children = [
          {
            type: "element",
            tagName: "span",
            properties: { className: ["heading-text"] },
            children: node.children,
          },
        ]
        return
      }
    }
    for (const child of node.children ?? []) wrap(child)
  }
  return (/** @type {any} */ tree) => wrap(tree)
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [mdx(), react(), sitemap()],

  // Astro 6.4+ API: custom plugins go through `processor: unified({...})`.
  // GFM (incl. footnotes) and SmartyPants stay on by default inside unified().
  markdown: {
    processor: unified({ rehypePlugins: [rehypeHeadingText] }),
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare()
})