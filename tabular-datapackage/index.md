---
layout: spec
title: Tabular Data Package
slug: tabular-datapackage
mediatype: application/vnd.datapackage+json
subtitle: A simple format to describe tabular data and its metadata.
version: 1.0.0-beta.18
updated: 18 December 2017
created: 7 May 2012
authors:
  -
    name: Rufus Pollock
    organisation: Open Knowledge International
  -
    name: Martin Keegan
    organisation: Open Knowledge Labs
  -
    name: Paul Walsh
    organisation: Open Knowledge International
descriptor:
  file: dataresource.json
properties:
  required:
    - name
    - resources
  recommended:
    - title
    - description
    - homepage
    - version
    - sources
    - licenses
    - author
    - contributors
  optional:
    - image
    - dataDependencies
    - schemas
examples:
  - examples/tabular-datapackage_1.md
  - examples/tabular-datapackage_2.md
  - examples/tabular-datapackage_3.md
changelog:
  - "`1.0-beta-4`: no substantive changes but clarify schema referencing ([#264](https://github.com/frictionlessdata/specs/issues/264)"
  - "`1.0-beta-3`: no substantive changes but clarify where we differ from CSV RFC ([#204](https://github.com/dataprotocols/dataprotocols/issues/204))"
  - "`1.0-beta-2`: renamed from Simple Data Format to Tabular Data Package"
abstract: >
  Data Resource is a simple container format used to describe and package a data source with additional metadata about that data source. By providing a minimum set of required properties and a range of recommended and optional properties, the format enables a simple contract for data interoperability (delivery, installation, management) that is governed by minimalism.
---

{{ page.title }} is a [Data Package profile](/datapackage/#profile) for publishing and sharing tabular data. {{ page.title }} has a focus on ease of use over the web, and on simplifying the production and consumption of tabular data to/from spreadsheets and data storage backends such as SQL databases.

{{ page.title }} builds directly on the [Data Package](/datapackage/) specification, anf therefore a valid {{ page.title }} `MUST` be a valid Data Package.

{{ page.title }} has the following requirements over and above those imposed by [Data Package](/datapackage):

- There `MUST` be at least one `resource` in the `resources` `array`
- Each `resource` `MUST` be a valid [Tabular Data Resource](/tabular-dataresource/)
- Each `resource.path` `MUST` point to a file in CSV format. The CSV file `MUST` conform to the constraints described in the [CSV dialect](/csvdialect/) specification
- Each `resource` `MUST` have a `schema` property whose value `MUST` be a valid [Table Schema](/tableschema/) (either inlined, or as a URI to a file)

### Why is CSV the preferred data serialisation format?

1.  CSV is very simple - it is perhaps *the* most simple data format
2.  CSV is tabular-oriented. Most data structures are either tabular or can be transformed to a tabular structure by some form of normalization
3.  It is open and the "standard" is well-known
4.  It is widely supported - practically every spreadsheet program, relational database and programming language in existence can handle CSV in some form or other
5.  It is text-based and therefore amenable to manipulation and access from a wide range of standard tools (including revision control systems such as git, mercurial and subversion)
6.  It is line-oriented which means it can be incrementally processed - you do not need to read an entire file to extract a single row. For similar reasons it means that the format supports streaming.

More informally:

> CSV is the data Kalashnikov: not pretty, but many wars have been
fought with it and kids can use it.
[[@pudo](https://twitter.com/pudo/status/248473299741446144) (Friedrich
Lindenberg)]

> CSV is the ultimate simple, standard data format - streamable,
text-based, no need for proprietary tools etc [@rufuspollock (Rufus
Pollock)]


