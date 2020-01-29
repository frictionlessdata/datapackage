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
    import("mermaid/dist/mermaid").then(m => {
      m.initialize({
        startOnLoad: true
      });
      m.init('div.language-mermaid>pre>code');
    });
  }
};
</script>
