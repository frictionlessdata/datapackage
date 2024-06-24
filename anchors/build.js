import { replaceInFile } from "replace-in-file"

// Currently, there is no way to specify the anchor ID in the markdown file in Starlight
// We tried using rehype plugins and other methods, but none of them worked
// ---
// https://github.com/frictionlessdata/specs/issues/942

const ANCHORS = [
  { spec: "data-package", from: "resources-required", to: "resources" },
  { spec: "data-package", from: "schema", to: "dollar-schema" },

  { spec: "data-resource", from: "name-required", to: "name" },
  { spec: "data-resource", from: "path-or-data-required", to: "path-or-data" },
  { spec: "data-resource", from: "schema", to: "dollar-schema" },
  { spec: "data-resource", from: "path-or-data-required-1", to: "tabular-path-or-data" },
  { spec: "data-resource", from: "schema-1", to: "schema" },

  { spec: "table-dialect", from: "schema", to: "dollar-schema" },

  { spec: "table-schema", from: "fields-required", to: "fields" },
  { spec: "table-schema", from: "schema-1", to: "dollar-schema" },
  { spec: "table-schema", from: "name-required", to: "name" },
]

for (const anchor of ANCHORS) {
  const fromId = new RegExp(`id="${anchor.from}"`, "g")
  const toId = `id="${anchor.to}"`

  const fromHref = new RegExp(`href="#${anchor.from}"`, "g")
  const toHref = `href="#${anchor.to}"`

  await replaceInFile({
    files: [`build/specifications/${anchor.spec}/index.html`],
    from: [fromId, fromHref],
    to: [toId, toHref],
  })
}
