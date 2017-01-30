---
layout: spec
title: Table Schema
slug: tableschema
mediatype: application/vnd.tableschema+json
subtitle: A simple format to declare a schema for tabular data.
version: 1.0.0-rc.1
updated: 30 January 2017
created: 12 November 2012
authors:
  -
    name: Rufus Pollock
    organisation: Open Knowledge International
  -
    name: Paul Walsh
    organisation: Open Knowledge International
descriptor:
  file: tableschema.json
examples:
  - examples/tableschema_1.md
  - examples/tableschema_2.md
  - examples/tableschema_3.md
changelog:
- "1.0.0-pre15: add calendar units `gyear` and `gyearmonth` ([#105](https://github.com/dataprotocols/dataprotocols/issues/105)), tweak pattern support for date/time types [#260](https://github.com/frictionlessdata/specs/issues/260)"
- "1.0.0-pre14: add support for `missingValue` ([#97](https://github.com/dataprotocols/dataprotocols/issues/97))"
- "1.0.0-pre13: remove `null` datatype ([#262](https://github.com/dataprotocols/dataprotocols/issues/262))"
- "1.0.0-pre12: add support for new number properties such as `decimalChar`([#246](https://github.com/dataprotocols/dataprotocols/issues/246))"
- "1.0.0-pre11: add new field property: rdfType ([#217](https://github.com/dataprotocols/dataprotocols/issues/217))"
- "1.0.0-pre10: add new field types: duration ([#210](https://github.com/dataprotocols/dataprotocols/issues/210))"
- "1.0.0-pre9: make date formats stricter for default [issue](https://github.com/dataprotocols/dataprotocols/issues/104). Define value of fmt:PATTERN for dates [issue](https://github.com/dataprotocols/dataprotocols/issues/200)"
- "1.0-pre8: Rename contraints.oneOf to contraints.enum [issue](https://github.com/dataprotocols/dataprotocols/issues/191)"
- "1.0-pre7: Add contraints.oneOf [issue](https://github.com/dataprotocols/dataprotocols/issues/175)"
- "1.0-pre6: clarify types and formats [issue](https://github.com/dataprotocols/dataprotocols/issues/159)"
- "1.0-pre5: add type validation [issue](https://github.com/dataprotocols/dataprotocols/issues/95)"
- "1.0-pre4: add foreign key support - see this [issue](https://github.com/dataprotocols/dataprotocols/issues/23)"
- "1.0-pre3.2: add primary key support (see this [issue](https://github.com/dataprotocols/dataprotocols/issues/21))"
- "1.0-pre3.1: breaking changes. `label` (breaking) changed to `title` - see [Closer alignment with JSON Schema](https://github.com/dataprotocols/dataprotocols/issues/46). `id` changed to `name` (with slight alteration in semantics - i.e. SHOULD be unique but no longer MUST be unique)"
abstract: >
  Table Schema is a simple, language and implementation agnostic, way to declare a schema for tabular data. The Table Schema specification has been designed to be expressible in JSON.
---

{{ page.title }} is a simple, language and implementation agnostic, way to declare a schema for tabular data. {{ page.title }} is well suited for use cases around handling and validating tabular data in text formats such as CSV, but its utility extends well beyond this core usage, towards a range of application a where data benefits from a portable schema format.

In its simplest form, {{ page.title }} is an `object` with a `fields` property as an array, and each item in the array is a **field descriptor**, with information on the expected **type** for data in each field. In this basis, {{ page.title }} also supports declaring more complex shapes for data via `format` and `constraints` options per field, as well as more advanced data structures with handling of `primaryKey` and `foreignKeys` constructs.

While **field descriptors** can support complex types via `type`, `format` and `constraints`, The only required property for a field is `name`, and the absence of the additional modifiers indicates that the field is a string of the `default` format (meaning, any format), and values are not required (`constraints.required == false`).

As a **foreign key** often needs to be able to reference other data resources, The referenced resources need to be in a specific structure in order to work. Therefore, foreign keys only work across valid [Tabular Data Resource](/tablar-dataresource/) objects. The special case of `reference.resource` as an empty string is a self-reference, for foreign keys to self.

{{ page.title }} is heavily based on similar specifications and implementations, in particular [XML Schema](http://www.w3.org/TR/xmlschema-2/#built-in-primitive-datatypes), [GoogleBigQuery](https://developers.google.com/bigquery/docs/import#jsonformat), [JSON Schema](http://json-schema.org), [DSPL](https://developers.google.com/public-data/docs/schema/dspl18), [HTML5 Forms](http://www.whatwg.org/specs/web-apps/current-work/#attr-input-type), and [Elasticsearch](http://www.elasticsearch.org/guide/reference/mapping/).

See below for examples, and a full description of the properties found on {{ page.title }}.
