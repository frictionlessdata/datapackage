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
      { text: "Home", link: "/" },
      {
        text: "Specifications",
        items: [
          { text: "CSV Dialect", link: "/csv-dialect/" },
          { text: "Data Package", link: "/data-package/" },
          {
            text: "Data Package Identifier",
            link: "/data-package-identifier/",
          },
          { text: "Data Resource", link: "/data-resource/" },
          { text: "Fiscal Data Package", link: "/fiscal-data-package/" },
          {
            text: "Fiscal Data Package - Budgets",
            link: "/fiscal-data-package--budgets/",
          },
          {
            text: "Fiscal Data Package - Spending",
            link: "/fiscal-data-package--spending/",
          },
          { text: "Profiles", link: "/profiles/" },
          { text: "Security", link: "/security/" },
          { text: "Table Schema", link: "/table-schema/" },
          { text: "Tabular Data Package", link: "/tabular-data-package/" },
          { text: "Tabular Data Resource", link: "/tabular-data-resource/" },
          { text: "Tabular Diff Format", link: "/tabular-diff/" },
          { text: "Views", link: "/views/" },
        ],
      },
      // { text: 'Changelog', link: '/changelog/' },
      { text: "Patterns", link: "/patterns/" },
      { text: "Implementation", link: "/implementation/" },
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
