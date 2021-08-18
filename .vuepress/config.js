const webpack = require("webpack");

module.exports = {
  title: "Frictionless Standards",
  description: "",
  postcss: {
    plugins: [
      require("tailwindcss")("./tailwind.config.js"),
      require("autoprefixer"),
    ],
  },
  configureWebpack: (config) => {
    return { plugins: [new webpack.EnvironmentPlugin({ ...process.env })] };
  },
  markdown: {
    linkify: true,
    typographer: true,
    breaks: true,
    html: true,
    toc: {
      includeLevel: [2, 3, 4],
    },
    extendMarkdown: (md) => {
      md.use(require("markdown-it-footnote"));
    },
  },
  themeConfig: {
    logo: "/img/frictionless-color-logo.svg",
    // repo: "https://github.com/frictionlessdata",
    // repoLabel: "GitHub",
    docsRepo: "https://github.com/frictionlessdata/specs",
    lastUpdated: "Last Updated",
    editLinks: true,
    sidebar: "auto",
    navbar_icon1_link: "https://discordapp.com/invite/Sewv6av",
    navbar_icon1_image: "/img/discord-icon.svg",
    navbar_icon1_title: "Discord",
    navbar_icon2_link: "https://twitter.com/frictionlessd8a",
    navbar_icon2_image: "/img/twitter-icon.svg",
    navbar_icon2_title: "Twitter",
    navbar_icon3_link: "https://github.com/frictionlessdata/specs",
    navbar_icon3_image: "/img/github-icon.svg",
    navbar_icon3_title: "GitHub",
    nav: [
      { text: "Table Schema", link: "/table-schema/" },
      {
        text: "Data Resource",
        items: [
          { text: "Data Resource", link: "/data-resource/" },
          { text: "Tabular Data Resource", link: "/tabular-data-resource/" },
        ],
      },
      {
        text: "Data Package",
        items: [
          { text: "Data Package", link: "/data-package/" },
          { text: "Tabular Data Package", link: "/tabular-data-package/" },
          { text: "Fiscal Data Package", link: "/fiscal-data-package/" },
          {
            text: "Fiscal Data Package - Budgets",
            link: "/fiscal-data-package--budgets/",
          },
          {
            text: "Fiscal Data Package - Spending",
            link: "/fiscal-data-package--spending/",
          },
        ],
      },
      {
        text: "Other Specs",
        items: [
          {
            text: "Data Package Identifier",
            link: "/data-package-identifier/",
          },
          { text: "Tabular Diff Format", link: "/tabular-diff/" },
          { text: "CSV Dialect", link: "/csv-dialect/" },
          { text: "Security", link: "/security/" },
          { text: "Profiles", link: "/profiles/" },
          { text: "Views", link: "/views/" },
        ],
      },
      { text: "Patterns", link: "/patterns/" },
      {
        text: "Guides",
        items: [
          {
            text: "Data Package",
            link: "/guides/data-package/",
          },
          { text: "Implementation", link: "/guides/implementation/" },
        ],
      },
      { text: "Back to the main site", link: "https://frictionlessdata.io/" },
    ],
  },
  plugins: [
    // [
    // "@vuepress/plugin-google-analytics",
    // {
    // ga: "UA-33874954-38",
    // },
    // ],
    ["@vuepress/back-to-top"],
  ],
};
