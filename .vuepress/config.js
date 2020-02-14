module.exports = {
  title: 'Frictionless Data Specs',
  description: '',
  markdown: {
    linkify: true,
    typographer: true,
    breaks: true,
    html: true,
    toc: {
      includeLevel: [2, 3, 4]
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-footnote'))
    }
  },
  themeConfig: {
    repo: 'https://github.com/frictionlessdata/specs',
    editLinks: true,
    sidebar: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: "Specifications",
        items: [
          { text: "CSV Dialect", link: "/specifications/csv-dialect/" },
          { text: "Data Package", link: "/specifications/data-package/" },
          { text: "Data Package Identifier", link: "/specifications/data-package-identifier/" },
          { text: "Data Resource", link: "/specifications/data-resource/" },
          { text: "Fiscal Data Package", link: "/specifications/fiscal-data-package/" },
          { text: "Fiscal Data Package - Budgets", link: "/specifications/fiscal-data-package--budgets/" },
          { text: "Fiscal Data Package - Spending", link: "/specifications/fiscal-data-package--spending/" },
          { text: "Profiles", link: "/specifications/profiles/" },
          { text: "Security", link: "/specifications/security/" },
          { text: "Table Schema", link: "/specifications/table-schema/" },
          { text: "Tabular Data Package", link: "/specifications/tabular-data-package/" },
          { text: "Tabular Data Resource", link: "/specifications/tabular-data-resource/" },
          { text: "Views", link: "/specifications/views/" },
        ]
      },
      { text: 'Changelog', link: '/changelog/' },
      { text: 'Patterns', link: '/patterns/' },
      { text: 'Implementation', link: '/implementation/' }
    ]
  }
}
