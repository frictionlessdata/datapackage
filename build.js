const util = require('util')
const fs = require('fs-extra')
const yaml = require('js-yaml')
const nodePath = require('path')
const glob = util.promisify(require('glob'))
const $RefParser = require('json-schema-ref-parser')
const csvParseSync = require('csv-parse/lib/sync');
const excludeOnOutput = ['dictionary.json']


// Helpers

function prepareDirectories() {
  const dirs = [
    'build/schemas',
    'build/specs',
  ]

  // Ensure directories
  for (const dir of dirs) {
    fs.emptyDirSync(dir)
  }

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
    fs.writeFileSync(`build/schemas/${basename}`, contents)
    console.log(`[+] build/schemas/${basename}.json`)
  }

}


function buildRegistry() {

  // Copy csv registry
  fs.copyFileSync('schemas/registry.csv', 'build/schemas/registry.csv')
  console.log(`[+] build/schemas/registry.csv`)

  // Convert csv registy to json
  const registry = csvParseSync(fs.readFileSync('schemas/registry.csv'), {columns: true})
  const contents = JSON.stringify(registry, null, 2)
  fs.writeFileSync(`build/schemas/registry.json`, contents)
  console.log(`[+] build/schemas/registry.json`)

}


function buildSpecs() {

  // Convert specs files for `lektor`
  for (const file of glob.sync('specs/*.md')) {
    let name = nodePath.parse(file).name
    if (name === 'index') name = ''
    fs.ensureDirSync(`build/specs/${name}`)
    fs.copyFileSync(file, `build/specs/${name}/contents.lr`)
    console.log(`[+] build/schemas/specs/${name}/contents.lr`)
  }

}


// Main script

async function main() {
  prepareDirectories()
  compileDictionary()
  await buildSchemas()
  buildRegistry()
  buildSpecs()
}

process.on('warning', (warning) => {
  console.error(warning)
  process.exit(1)
})

main()
  .then(() => console.log('Specs build is completed!'))
  .catch((error) => {throw error})
