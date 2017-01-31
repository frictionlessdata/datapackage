---
layout: spec
title: Tabular Data Resource
slug: tabular-dataresource
mediatype: application/vnd.dataresource+json
subtitle: A simple format to describe tabular data with a schema and metadata.
version: 1.0-rc.1
updated: 30 January 2017
created: 15 December 2017
authors:
  -
    name: Rufus Pollock
    organisation: Open Knowledge International
  -
    name: Paul Walsh
    organisation: Open Knowledge International
descriptor:
  file: dataresource.json
examples:
  - examples/tabular-dataresource_1.md
  - examples/tabular-dataresource_2.md
  - examples/tabular-dataresource_3.md
changelog:
abstract: >
  Tabular Data Resource is a simple container format used to describe and package a tabular data source with a schema that describes it, and additional metadata about that data source. By providing a minimum set of required properties and a range of optional properties, the format enables a simple contract for data interoperability that is governed by minimalism.
---

A **{{ page.title }}** is a simple container format that describes and packages a data source with additional information about that source.

At a minimum, a {{ page.title }} requires a `name` property, and one of the `path` or `data` properties. `name` provides a human and machine-readable identifier for the {{ page.title }}. `data` provides the data source inlined directly into the descriptor. `path` is a URI or an array of URIs: to a file(s) on a file system, or over HTTP.

A range of other properties can be declared to provide a richer set of metadata.

### CSV file requirements

CSV files in the wild come in a bewildering array of formats. There is a standard for CSV files described in [RFC 4180](https://tools.ietf.org/html/rfc4180), but unfortunately this standard does not reflect reality. In {{ page.title }}, CSV files `MUST` follow RFC 4180 with the following important exceptions allowed:

- Files are encoded as UTF-8 by default, or they must be encoded according to the `encoding` property of the {{ page.title }} (the RFC requires 7-bit ASCII encoding)
- Dialect conformance `SHOULD` be declared on the `dialect` property of the {{ page.title }}, which is a [CSV Dialect](/csvdialect/) descriptor


