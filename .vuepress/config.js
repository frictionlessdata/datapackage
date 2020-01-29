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
      { text: 'Home', link: '/' }
    ]
  }
}
