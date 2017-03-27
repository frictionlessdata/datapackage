# Frictionless Data Specifications

[![Build Status](http://travis-ci.org/frictionlessdata/specs.svg?branch=master)](http://travis-ci.org/frictionlessdata/specs)

This site is the home for *specifications* related to **Frictionless Data.**

**Frictionless Data** is about removing the friction in working with data through the development of a set of tools, specifications, and best practices for publishing data. The heart of Frictionless Data is *Data Package*, a containerization format for any kind of data based on existing practices for publishing open-source software.

For more info about the project as a whole, please visit [frictionlessdata.io](http://frictionlessdata.io).

## How to contribute

### Overview

This repository is the canonical repository for the core Frictionless Data specifications. The repository features:

- [JSON Schema](http://json-schema.org) representations of all specifications. These are used both in the site itself, to generate the specification pages, and likewise in the *schema registry* that is used by a range of libraries that implement the specifications.
- A static site that builds out content for the specifications, from the above mentioned JSON Schemas, other sets of meta data, and narrative texts. 
- The site is built using [Lektor](https://www.getlektor.com), and is deployed to and served from an S3 bucket.

### Quick start

- Clone the repository
- `pip install lektor` # install the static site generator
- `npm install` # install the dependencies to build the specifications
- `npm run compile` # compile the specifications
- `lektor server` # serve the site on 127.0.0.1:5000

### Contribute to the specifications

All the source data for the specifications is in the `/sources` directory. In there, you will find a `.json` file for each specification, a set of YAML files under `dictionary/*`, and a `compile.js` file.

- `.json` files are JSON Schemas for each spec, normalised using the `$ref` feature of JSON Schema. This normalisation ensures consistency in the way the specifications are written and validated, but is only used directly by the `compile.js` script, which generated denormalised versions.
- `compile.js` creates denormalised versions of each specification be dereferencing each `$ref` in the source schemas, and then saves these denormalised versions to two places:
  - `databags/schemas.json` as a single file for use in the static site.
  - `assets/schemas/*` as a file for each specification for use by the *schema registry*.
- `dictionary/*` has all the property definitions for each specification. This is the place to add new properties or property collections, to edit contextual information and descriptive examples, and so on. See how this information is rendered in the [macros template](https://github.com/frictionlessdata/specs/blob/master/templates/macros.html).

### Contribute to the site in general

Just follow the quickstart, and then work with the jinja templates.

### Adding a new specification

Yes we welcome and encourage additions to the registry! Any spec that is added must meet the following criteria:

- Be related to the Data Packages family of specifications.
- Have a publicly-accessible web page describing the specification.
- Have a JSON Schema file that describes the specification.

See the existing entries in the registry, and then take the following steps to add a new entry:

1. Make a new pull request called `registry/{NAME_OF_SPECIFICATION}`
2. The pull request features a JSON Schema file for the new specification, and adds the spec to `registry.csv`
3. Write a brief description of the spec as part of the pull request.
