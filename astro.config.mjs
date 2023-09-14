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
        light: "/assets/logo-light-orange.png",
        dark: "/assets/logo-dark-orange.png",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/frictionlessdata/open-data-editor",
      },
      customCss: ["/assets/styles.css"],
      sidebar: [
        {
          label: "Documentation",
          autogenerate: { directory: "documentation" },
        },
        {
          label: "Contributing",
          autogenerate: { directory: "contributing" },
        },
      ],
    }),
  ],
})
