import JsonSchema from "@apidevtools/json-schema-ref-parser"
import fs from "fs-extra"
import { glob } from "glob"
import yaml from "js-yaml"
import nodePath from "path"
import process from "process"

const VERSION = "2.0"
const SOURCE_DIR = "profiles/source"
const TARGET_DIR = `profiles/target`
const VERSION_DIR = `${TARGET_DIR}/${VERSION}`
const BUILD_DIR = "build/profiles"
const EXCLUDE_FILES = ["dictionary.json"]

// Ensure directories
fs.ensureDirSync(VERSION_DIR)
fs.ensureDirSync(BUILD_DIR)
fs.emptyDirSync(BUILD_DIR)

// Init dictionary
const dictionary = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {},
}

// Fill dictionary
for (const path of glob.sync(`${SOURCE_DIR}/dictionary/*.yaml`)) {
  const contents = fs.readFileSync(path)
  Object.assign(dictionary.definitions, yaml.load(contents))
}

// Save dictionary
const contents = JSON.stringify(dictionary, null, 2)
fs.writeFileSync(`${VERSION_DIR}/dictionary.json`, contents)

// Save profiles
for (const path of glob.sync(`${SOURCE_DIR}/*.json`)) {
  const name = nodePath.basename(path)
  fs.copySync(path, `${VERSION_DIR}/${name}`)
}

// Dereference profiles
for (const path of glob.sync(`${VERSION_DIR}/*.json`)) {
  const name = nodePath.basename(path)
  if (EXCLUDE_FILES.includes(name)) continue
  const rawSchema = JSON.parse(fs.readFileSync(path))
  const cwd = process.cwd()
  process.chdir(VERSION_DIR)
  const schema = await JsonSchema.dereference(rawSchema)
  process.chdir(cwd)
  const contents = JSON.stringify(schema, null, 2)
  fs.writeFileSync(path, contents)
}

// Delete dictionary
fs.removeSync(`${VERSION_DIR}/dictionary.json`)

// Copy to build
fs.cpSync(TARGET_DIR, BUILD_DIR, { recursive: true })
