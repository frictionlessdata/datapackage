---
layout: spec
title: Tabular Data Resource
slug: tabular-dataresource
mediatype: application/vnd.dataresource+json
subtitle: A simple format to describe tabular data with a schema and metadata.
version: 1.0-alpha-1
updated: 18 December 2017
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
properties:
  required:
    - name
    - path
    - data
    - schema
    - profile
  recommended:
  optional:
    - title
    - description
    - format
    - mediatype
    - encoding
    - bytes
    - hash
    - sources
    - licenses
    - web
examples:
  - examples/tabular-dataresource_1.md
  - examples/tabular-dataresource_2.md
  - examples/tabular-dataresource_3.md
changelog:
abstract: >
  Data Resource is a simple container format used to describe and package a data source with additional metadata about that data source. By providing a minimum set of required properties and a range of recommended and optional properties, the format enables a simple contract for data interoperability that is governed by minimalism.
---

A **{{ page.title }}** is a simple container format that describes and packages a data source with additional information about that source.

At a minimum, a {{ page.title }} requires a `name` property, and one of the `path` or `data` properties. `name` provides a human and machine-readable identifier for the {{ page.title }}. `data` provides the data source inlined directly into the descriptor. `path` is a URI or an array of URIs: to a file(s) on a file system, or over HTTP.

A range of other properties can be declared to provide a richer set of metadata.

Full information on **required**, **recommended**, and **optional** properties for a {{ page.title }} descriptor is provided in the [**Properties**](#properties) section below.
