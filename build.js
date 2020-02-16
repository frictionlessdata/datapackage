const util = require('util')
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')
const nodePath = require('path')
const glob = util.promisify(require('glob'))
const $RefParser = require('json-schema-ref-parser')
const csvParseSync = require('csv-parse/lib/sync');
const excludeOnOutput = ['dictionary.json']

BUILD_DIR = '.vuepress/dist/schemas'

// Helpers
function prepareDirectories() {
  fs.emptyDirSync(BUILD_DIR)
}


function compileDictionary() {
  // Init dictionary
  const dictionary = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    definitions: {}
  }
  // Fill dictionary
  for (const file of glob.sync('schemas/dictionary/*.yml')) {
    const contents = fs.readFileSync(file)
    Object.assign(dictionary.definitions, yaml.safeLoad(contents))
  }
  // Save dictionary
  const contents = JSON.stringify(dictionary, null, 2)
  fs.writeFileSync('schemas/dictionary.json', contents)
}


async function buildSchemas() {
  // Dereference and save every schema
  for (const file of glob.sync('schemas/*.json')) {
    const basename = nodePath.basename(file)
    if (excludeOnOutput.includes(basename)) continue
    const rawSchema = JSON.parse(fs.readFileSync(file))
    const schema = await $RefParser.dereference(rawSchema)
    const contents = JSON.stringify(schema, null, 2)
    fs.writeFileSync(`${BUILD_DIR}/${basename}`, contents)
  }
  console.log('Built Schemas')
}


function buildRegistry() {
  // Copy csv registry
  fs.copyFileSync('schemas/registry.csv', BUILD_DIR + '/registry.csv')
  // Convert csv registy to json
  const registry = csvParseSync(fs.readFileSync('schemas/registry.csv'), {columns: true})
  const contents = JSON.stringify(registry, null, 2)
  fs.writeFileSync(`${BUILD_DIR}/registry.json`, contents)
  console.log('Built registry')
}


// Main script
async function main() {
  prepareDirectories()
  compileDictionary()
  await buildSchemas()
  buildRegistry()
}

process.on('warning', (warning) => {
  console.error(warning)
  process.exit(1)
})

main()
  .then(() => console.log('Specs build is completed!'))
  .catch((error) => {throw error})
