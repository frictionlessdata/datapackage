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
      customCss: ["/assets/styles.css"],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
      sidebar: [
        {
          label: "Specifications",
          autogenerate: { directory: "specs" },
        },
      ],
    }),
  ],
})
