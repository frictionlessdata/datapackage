import JsonSchema from "@apidevtools/json-schema-ref-parser"
import fs from "fs-extra"
import { glob } from "glob"
import yaml from "js-yaml"
import nodePath from "path"

const BUILD_DIR = "build/profiles"
const EXCLUDE_DIRS = ["dictionary.json"]

// Ensure build directory
fs.ensureDirSync(BUILD_DIR)
fs.emptyDirSync(BUILD_DIR)

// Init dictionary
const dictionary = {
  $schema: "http://json-schema.org/draft-04/schema#",
  definitions: {},
}

// Fill dictionary
for (const path of glob.sync("profiles/dictionary/*.yaml")) {
  const contents = fs.readFileSync(path)
  Object.assign(dictionary.definitions, yaml.load(contents))
}

// Save dictionary
const contents = JSON.stringify(dictionary, null, 2)
fs.writeFileSync(`${BUILD_DIR}/dictionary.json`, contents)

// Save profiles
for (const path of glob.sync("profiles/*.json")) {
  const name = nodePath.basename(path)
  fs.copySync(path, `${BUILD_DIR}/${name}`)
}

// Dereference profiles
for (const path of glob.sync(`${BUILD_DIR}/*.json`)) {
  const name = nodePath.basename(path)
  if (EXCLUDE_DIRS.includes(name)) continue
  const rawSchema = JSON.parse(fs.readFileSync(path))
  const schema = await JsonSchema.dereference(rawSchema)
  const contents = JSON.stringify(schema, null, 2)
  fs.writeFileSync(path, contents)
}

// Delete dictionary
fs.removeSync(`${BUILD_DIR}/dictionary.json`)
