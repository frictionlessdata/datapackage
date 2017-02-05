# Frictionless Data Specifications

[![Build Status](http://travis-ci.org/frictionlessdata/specs.svg?branch=master)](http://travis-ci.org/frictionlessdata/specs)

This site is the home for *specifications* related to **Frictionless Data.**

**Frictionless Data** is about removing the friction in working with data through the development of a set of tools, specifications, and best practices for publishing data. The heart of Frictionless Data is *Data Package*, a containerization format for any kind of data based on existing practices for publishing open-source software.

For more info about the project as a whole, please visit [frictionlessdata.io](http://frictionlessdata.io).

## How to contribute

This repository contains the canonical representations of all Frictionless Data specifications and a registry for those specifications, the website for the specifications powered by Lektor, and some scripts to compile the specifications in [JSON Schema](http://json-schema.org/).

- If you want to update the specifications, start in `sources/dictionary.json`.
- If you want to update the registry, start in `sources/registry.csv`.
- If you want to update the website, install lektor and run the project.
- If you want to compile the source JSON Schemas to build out the full objects, then run `npm install` followed by `npm run compile`

Yes we welcome and encourage additions to the registry! Any spec that is added must meet the following criteria:

* Be related to the Data Packages family of specifications.
* Have a publicly-accessible web page describing the specification.
* Have a JSON Schema file that describes the specification.

See the existing entries in the registry, and then take the following steps to add a new entry:

1. Make a new pull request called `registry/{NAME_OF_SPECIFICATION}`
2. The pull request features a JSON Schema file for the new specification, and adds the spec to `registry.csv`
3. Write a brief description of the spec as part of the pull request.
