# Frictionless Data Specifications

[![Build Status](http://travis-ci.org/frictionlessdata/specs.svg?branch=master)](http://travis-ci.org/frictionlessdata/specs)

This site is the home for *specifications* related to **Frictionless Data.**

**Frictionless Data** is about removing the friction in working with data through the development of a set of tools, specifications, and best practices for publishing data. The heart of Frictionless Data is *Data Package*, a containerization format for any kind of data based on existing practices for publishing open-source software.

For more info about the project as a whole, please visit [frictionlessdata.io](http://frictionlessdata.io).

## Design Philosophy

Our specifications follow our design philosophy:

* **Simplicity:** seek zen-like simplicity in which there is nothing to add and nothing to take away.
* **Extensibility:** design for extensibility and customisation. This makes hard things possible and allows for future evolution -- nothing we build will be perfect.
* **Human-editable and machine-usable:** specs should preserve human readability and editability whilst making machine-use easy.
* **Reuse:** reuse and build on existing standards and formats wherever possible.
* **Cross technology:** support a broad range of languages, technologies and infrastructures -- avoid being tied to any one specific system.

This philosophy is itself based on the overall design principles of the Frictionless Data project:

* **Focused:** We have a sharp focus on one part of the data chain, one specific feature – packaging – and a few specific types of data (e.g. tabular).
* **Web Oriented:** We build for the web using formats that are web "native" such as JSON, work naturally with HTTP such as plain text CSVs (which stream).
* **Distributed:** we design for a distributed ecosystem with no centralized, single point of failure or dependence.
* **Open:** Anyone should be able to freely and openly use and reuse what we build. Our community is open to everyone.
* **Existing Tooling:** Integrate as easily as possible with existing tools both by building integrations and designing for direct use – for example we like CSV because everyone has a tool that can access CSV.
* **Simple, Lightweight:** Add the minimum, do the least required, keep it simple. For example, use the most basic formats, require only the most essential metadata, data should have nothing extraneous.

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
