---
title: Contributing
---

Contributions, comments and corrections are warmly welcomed. Most work proceeds in an RFC-style manner with discussion in the [issue tracker][issues].

Material is kept in a [git repo on GitHub][repo] - fork and submit a pull request to add material. There is also an [issue tracker][issues] which can be used for specific issues or suggestions.

[forum]: https://discuss.okfn.org/c/frictionless-data
[repo]: https://github.com/frictionlessdata/specs
[issues]: https://github.com/frictionlessdata/specs/issues
[site]: http://frictionlessdata.io

## For Editors

This repository is the canonical repository for the core Frictionless Data specifications. The repository features:

- [JSON Schema](http://json-schema.org) representations of all specifications. These are used both in the site itself, to generate the specification pages, and likewise in the _schema registry_ that is used by a range of libraries that implement the specifications.

### Quick start

- Clone the repository
- `npm install` # install the dependencies to build the specifications
- `npm run build` # build the specifications
- `npm run test` # test the specifications
- `npm start` # start the local server

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

<mermaid/>
