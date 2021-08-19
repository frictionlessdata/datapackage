export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const redirectList = {
      "/simple-data-format": "/tabular-data-package/",
      "/simple-data-format/": "/tabular-data-package/",
      "/implementation": "/guides/implementation",
    };
    const redirect = redirectList[to.path];

    if (redirect) {
      next({ path: redirect });
    } else next();
  });
};
