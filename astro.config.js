import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { remarkHeadingId } from "remark-custom-heading-id"
import starlightBlog from "starlight-blog"

// import starlightLinksValidator from "starlight-links-validator"

// https://astro.build/config
export default defineConfig({
  site: "https://datapackage.org",
  srcDir: ".",
  outDir: "build",
  integrations: [
    starlight({
      title: "Data Package Standard",
      description:
        "Data Package is a standard consisting of a set of simple yet extensible specifications to describe datasets, data files and tabular data. It is a data definition language (DDL) and data API that facilitates findability, accessibility, interoperability, and reusability (FAIR) of data.",
      logo: {
        light: "/assets/logo-light.svg",
        dark: "/assets/logo-dark.svg",
        alt: "Data Package Logo",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/frictionlessdata/datapackage",
      },
      favicon: "favicon.svg",
      editLink: {
        baseUrl: "https://github.com/frictionlessdata/datapackage/edit/main/",
      },
      lastUpdated: true,
      customCss: ["/assets/styles.css"],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
      components: {
        MarkdownContent: "./components/MarkdownContent.astro",
        SocialIcons: "./components/SocialIcons.astro",
      },
      plugins: [
        starlightBlog({
          authors: {
            sapetti9: {
              name: "sapetti9",
              title: "Sara Petti",
              picture: "https://avatars.githubusercontent.com/u/74717970?v=4",
              url: "https://github.com/sapetti9",
            },
          },
        }),
        // The link validator is useful for debugging but it cleates a lot of false positives
        // starlightLinksValidator(),
      ],
      sidebar: [
        { label: "Overview", autogenerate: { directory: "overview" } },
        { label: "Standard", autogenerate: { directory: "standard" } },
        {
          label: "Extensions",
          collapsed: true,
          autogenerate: { directory: "extensions" },
        },
        {
          label: "Recipes",
          collapsed: true,
          autogenerate: { directory: "recipes" },
        },
        {
          label: "Guides",
          collapsed: true,
          autogenerate: { directory: "guides" },
        },
      ],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.png",
            sizes: "256x256",
          },
        },
        {
          tag: "script",
          attrs: {
            src: "https://plausible.io/js/script.js",
            "data-domain": "datapackage.org",
            defer: true,
          },
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
  },
})
