import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://datapackage.org",
  srcDir: ".",
  outDir: "build",
  integrations: [
    starlight({
      title: "Data Package Standard",
      logo: {
        light: "/assets/logo-light.png",
        dark: "/assets/logo-dark.png",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/frictionlessdata/open-data-editor",
      },
      favicon: "favicon.png",
      // TODO: enable when this issue is resolved
      // https://github.com/withastro/starlight/issues/718
      // editLink: {
      // baseUrl: "https://github.com/frictionlessdata/datapackage.org/edit/main/",
      // },
      // lastUpdated: true,
      customCss: ["/assets/styles.css"],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
      sidebar: [
        { label: "Standard", autogenerate: { directory: "standard" } },
        {
          label: "Specifications",
          autogenerate: { directory: "specifications" },
        },
        {
          label: "Extensions",
          collapsed: true,
          autogenerate: { directory: "extensions" },
        },
        {
          label: "Patterns",
          collapsed: true,
          autogenerate: { directory: "patterns" },
        },
        {
          label: "Guides",
          collapsed: true,
          autogenerate: { directory: "guides" },
        },
      ],
    }),
  ],
})
