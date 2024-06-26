import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection } from "astro:content"
import { blogSchema } from "starlight-blog/schema"

// TODO:
// remove this file when starlight-blog is updated to support Astro's `srcDir`
// this file is just a copy of `content/config.ts`

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: context => blogSchema(context),
    }),
  }),
}
