---
layout: spec
title: Data Package
slug: datapackage
mediatype: application/vnd.datapackage+json
subtitle: A simple format to describe data and its metadata.
version: 1.0.0-beta.18
updated: 18 December 2017
created: 12 November 2007
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
    - profile
    - title
    - description
    - web
    - version
    - sources
    - licenses
    - author
    - contributors
  optional:
    - image
    - schemas
examples:
  - examples/datapackage_1.md
  - examples/datapackage_2.md
  - examples/datapackage_3.md
profiles:
  - tabular-datapackage
  - fiscal-datapackage
changelog:
  - "`1.0.0-beta.18`: (!) merge resource property url with path [issues #250](https://github.com/frictionlessdata/specs/issues/250), allow for multiple data files per resource [issue #228](https://github.com/frictionlessdata/specs/issues/228)"
  - "`1.0.0-beta.17`: make resources property required as per [issues #253](https://github.com/dataprotocols/dataprotocols/issues/253)"
  - "`1.0.0-beta.16`: description is markdown formatted as per [issue #152](https://github.com/dataprotocols/dataprotocols/issues/152); MimeType for Data Packages is vnd.datapackage [issue #245](https://github.com/dataprotocols/dataprotocols/issues/245)"
  - "`1.0.0-beta.15`: only one of `url`, `path`, `data` present on as per [issue #223](https://github.com/dataprotocols/dataprotocols/issues/223); remove `base` property as per [issue #232](https://github.com/dataprotocols/dataprotocols/issues/232)"
  - "`1.0.0-beta.14`: drop `licenses` in favour of `license` as per [issue #214](https://github.com/dataprotocols/dataprotocols/issues/214)"
  - "`1.0.0-beta.13`: add support for sharing schemas across resources via schema references as per [issue #71](https://github.com/dataprotocols/dataprotocols/issues/71)"
  - "`1.0.0-beta.12`: remove `datapackage_version` as per [issue #140](https://github.com/dataprotocols/dataprotocols/issues/140)"
  - "`1.0.0-beta.11`: introduce `author`, integrate with `contributors` and remove `maintainers` and `publishers` as per this [issue](https://github.com/dataprotocols/dataprotocols/issues/130)"
  - "`1.0.0-beta.10`: `license` introduced and `licenses` updated as per this [issue](https://github.com/dataprotocols/data-packages/issues/1)"
  - "`1.0.0-beta.8`: `last_modified` and `modified` removed following this [issue](https://github.com/dataprotocols/dataprotocols/issues/83)"
  - "`1.0.0-beta.7`: `dependencies` renamed to `dataDependencies` following this [issue](https://github.com/dataprotocols/dataprotocols/issues/75)"
  - "`1.0.0-beta.5` -> `1.0-beta.6`: Moved `resources` from MUST to MAY"
abstract: >
  Data Resource is a simple container format used to describe and package a data source with additional metadata about that data source. By providing a minimum set of required properties and a range of recommended and optional properties, the format enables a simple contract for data interoperability (delivery, installation, management) that is governed by minimalism.
---

A {{ page.title }} consists of:

* Metadata that describes the structure and contents of the package
* Resources such as data files that form the contents of the package

Resources in a {{ page.title }} are declared on the `resources` property, which is an `array` of [Data Resource](/dataresource/) objects.

The {{ page.title }} specification does `NOT` impose any requirements on the form or structure of data described by a Data Resource. Therefore, {{ page.title }} can be used for packaging **any kind of data**.

The data included in the package may be provided as:

* Files bundled locally with the package descriptor
* Remote resources, referenced by URL
* "Inline" data (see below) which is included directly in the descriptor

A valid descriptor MUST contain both a `name` property and a `resources` property. The definition of these properties is described below.

## Customisation

A {{ page.title }}, like any Frictionless Data descriptor, `MAY` add any number of additional properties beyond those listed in its specification.

For example, suppose you were storing time series data and want to list the temporal coverage of the data in the {{ page.title }} you could add a property `temporal` (cf. [Dublin Core](http://dublincore.org/documents/usageguide/qualifiers.shtml#temporal)):

```
"temporal": {
  "name": "19th Century",
  "start": "1800-01-01",
  "end": "1899-12-31"
}
```

This flexibility enables specific communities to extend Data Packages as appropriate for the data they manage.
