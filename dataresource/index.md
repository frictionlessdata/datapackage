---
title: Data Resource
slug: dataresource
subtitle: A simple format to describe data and metadata.
layout: basespec
listed: true
version: 1.0-alpha-1
mediatype: application/vnd.dataresource+json
updated: 11 December 2017
created: 11 December 2017
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
  recommended:
  optional:
    - title
    - description
    - format
    - mediatype
    - encoding
    - bytes
    - hash
    - schema
    - sources
    - licenses
examples:
  - examples/dataresource_1.md
  - examples/dataresource_2.md
  - examples/dataresource_3.md
notes:
  - Prior to Nov 17 2016, there was a `url` property distinct from `path`. In order to support backwards compatability, implementors `MAY` want to automatically convert a `url` property to a `path` property and issue a warning.
  - When `path` is an array, all data sources in the array `MUST` be of the same type (i.e.: all http URLs, or all file paths).
  - When `path` is an all data sources in the array `MUST` be similar in terms of structure and format. Implementations `SHOULD` be able to simply concatenate the files together and treat the result as one large file.
abstract: >
  Data Resource is a simple container format used to describe and package a data source with additional metadata about that data source. By providing a minimum set of required properties and a range of recommended and optional properties, the format enables a simple contract for data interoperability that is governed by minimalism.
---

## Contents

A **{{ page.title }}** is a simple container format that describes and packages a data source with additional information about that source.

At a minimum, a {{ page.title }} requires a `name` property, and one of the `path` or `data` properties. `name` provides a human and machine-readable identifier for the {{ page.title }}. `data` provides the data source inlined directly into the descriptor. `path` is a URI or an array of URIs: to a file(s) on a file system, or over HTTP.

A range of other properties can be declared to provide a richer set of metadata.

Full information on **required**, **recommended**, and **optional** properties for a {{ page.title }} descriptor is provided in the [**Properties**](#properties) section below.
