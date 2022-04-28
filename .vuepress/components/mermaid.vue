// .vuepress/components/mermaid.vue

<template>
</template>

<style>
div.language-mermaid {
  background-color: inherit
}
</style>

<script>
export default {
  beforeMount() {
     let mermaidElements = document.querySelectorAll('.language-mermaid>pre>code')

     for (let e of mermaidElements) {
       // Get mermaid graph code that is inserted on <code><pre> generated 
       // by vuepress (markdown-it) and insert in a format that the new version
       // of mermaid can understand. I couldn't find a way to use a selector to pass
       // to mermaid init() that worked and by their docs, this way of using their
       // API is not really recommended and looks like it's not even supported anymore
       let elmGraphCode = e.textContent
       e.parentElement.parentElement.innerHTML = `<div class="mermaid">${elmGraphCode}</div>`
     }

     import("mermaid/dist/mermaid").then(m => {
       m.initialize({
         startOnLoad: true
       });
       m.init();
     });
  }
};
</script>
