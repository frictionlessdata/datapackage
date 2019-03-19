# Frictionless Data Specifications

[![Build Status](http://travis-ci.org/frictionlessdata/specs.svg?branch=master)](http://travis-ci.org/frictionlessdata/specs)

This site is the home for *specifications* related to **Frictionless Data.**

**Frictionless Data** is about removing the friction in working with data through the development of a set of tools, specifications, and best practices for publishing data. The heart of Frictionless Data is *Data Package*, a containerization format for any kind of data based on existing practices for publishing open-source software.

For more info about the project as a whole, please visit [frictionlessdata.io](http://frictionlessdata.io).

## How to contribute

### Overview

This repository is the canonical repository for the core Frictionless Data specifications. The repository features:

- [JSON Schema](http://json-schema.org) representations of all specifications. These are used both in the site itself, to generate the specification pages, and likewise in the *schema registry* that is used by a range of libraries that implement the specifications.

### Quick start

- Clone the repository
- `npm install` # install the dependencies to build the specifications
- `npm run build` # build the specifications
- `npm run test` # test the specifications

### Contribute to the specifications

All the source data for the specifications is in the `/schemas` directory. In there, you will find a `.json` file for each specification and a set of YAML files under `/schemas/dictionary/*`. There is a `build.js` script to build the specifications.

- `.json` files are JSON Schemas for each spec, normalised using the `$ref` feature of JSON Schema. This normalisation ensures consistency in the way the specifications are written and validated, but is only used directly by the `build.js` script, which generated denormalised versions.
- `/build.js` creates denormalised versions of each specification be dereferencing each `$ref` in the source schemas, and then saves these denormalised versions to `/build/schemas` directory.
- `/schemas/dictionary/*` has all the property definitions for each specification. This is the place to add new properties or property collections, to edit contextual information and descriptive examples, and so on. See how this information is rendered in the [macros template](https://github.com/frictionlessdata/specs/blob/master/templates/macros.html).

### Adding a new specification

Yes we welcome and encourage additions to the registry! Any spec that is added must meet the following criteria:

- Be related to the Data Packages family of specifications.
- Have a publicly-accessible web page describing the specification.
- Have a JSON Schema file that describes the specification.

See the existing entries in the registry, and then take the following steps to add a new entry:

1. Make a new pull request called `registry/{NAME_OF_SPECIFICATION}`
2. The pull request features a JSON Schema file for the new specification, and adds the spec to `registry.csv`
3. Write a brief description of the spec as part of the pull request.
