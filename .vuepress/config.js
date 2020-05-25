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
    logo: "/logo-dot.svg",
    repo: 'https://github.com/frictionlessdata/specs',
    editLinks: true,
    sidebar: [ 
      {
        title: 'Home',
        collapsable: false,
        children: [
          '/'
        ]

      },
      {
       title: 'Specifications', 
       collapsable: false,
       children: [
        '/csv-dialect/',
        '/data-package/',
        '/data-package-identifier/',
        '/data-resource/',
        '/fiscal-data-package/',
        '/fiscal-data-package--budgets/',
        '/fiscal-data-package--spending/',
        '/profiles/',
        '/security/',
        '/table-schema/',
        '/tabular-data-package/',
        '/tabular-data-resource/',
        '/tabular-diff/',
        '/views/',
        ]
      }
    ],
    nav: [
      { text: 'Home', link: '/' },
      {
        text: "Specifications",
        items: [
          { text: "CSV Dialect", link: "/csv-dialect/" },
          { text: "Data Package", link: "/data-package/" },
          { text: "Data Package Identifier", link: "/data-package-identifier/" },
          { text: "Data Resource", link: "/data-resource/" },
          { text: "Fiscal Data Package", link: "/fiscal-data-package/" },
          { text: "Fiscal Data Package - Budgets", link: "/fiscal-data-package--budgets/" },
          { text: "Fiscal Data Package - Spending", link: "/fiscal-data-package--spending/" },
          { text: "Profiles", link: "/profiles/" },
          { text: "Security", link: "/security/" },
          { text: "Table Schema", link: "/table-schema/" },
          { text: "Tabular Data Package", link: "/tabular-data-package/" },
          { text: "Tabular Data Resource", link: "/tabular-data-resource/" },
          { text: "Tabular Diff Format", link: "/tabular-diff/" },
          { text: "Views", link: "/views/" },
        ]
      },
      // { text: 'Changelog', link: '/changelog/' },
      { text: 'Patterns', link: '/patterns/' },
      { text: 'Implementation', link: '/implementation/' }
    ]
  }
}
