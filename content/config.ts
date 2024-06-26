import { docsSchema } from "@astrojs/starlight/schema"
import { defineCollection } from "astro:content"
import { blogSchema } from "starlight-blog/schema"

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: context => blogSchema(context),
    }),
  }),
}
