---
title: Comparison with MediaWiki Tabular Data
sidebar:
  order: 3
---

<table>
  <tr>
    <th>Authors</th>
    <td>Jakob Voß</td>
  </tr>
</table>

[MediaWiki](https://www.mediawiki.org/) is the software used to run Wikipedia and related projects of the Wikimedia Foundation, including the media file repository [Wikimedia Commons](https://commons.wikimedia.org/). Commons hosts mostly images but also some records with tabular data. The [MediaWiki Tabular Data Model](https://www.mediawiki.org/wiki/Help:Tabular_data) was inspired by Data Package version 1 but it slightly differs from current Data Package specification, as described below.

## Comparison

A [MediaWiki tabular data page](https://www.mediawiki.org/wiki/Help:Tabular_data) describes and contains an individual table of data similar to a [Data Resource](/standard/data-resource/) with inline tabular data. Both are serialized as JSON objects, but the former comes as a page with unique name in a MediaWiki instance (such as Wikimedia Commons).

### Top-level fields

MediaWiki Tabular data has three required and two optional top-level fields. Most of these fields map to corresponding fields of a Data Resource:

Field | Data Resource | Tabular data
---|---|--|
name | required | - (page name is used instead)
description | optional (plain string)| optional ([localized strings](#data-types))
data | required (multiple forms) | required
license | - (there is `licenses` instead)| required (plain string `CC0-1.0`)
schema | optional (multiple forms) | required (array of arrays)
sources | optional (array of objects) | optional (Wiki markup)

The differences are:

- field `name` does not exist but can be implied from page name
- field `description` and `sources` have another format
- field `data` is always an array of arrays and [data types](#data-types) of individual values can differ
- field `schema` is required but it differs in definion of [schema fields](#schema-fields)
- there is no field `licenses` but `license` fixed to plain string value `CC0-1.0` (other license indicators may be possible)

### Data types

Tabular data supports four data types that overlap with [Table Schema data types](/standard/table-schema/#field-types):

- `number` subset of Table Schema
- `boolean` same as Table Schema
- `string` same as Table Schema but limited to 400 characters at most and must not include `\n` or `\t`.
- `localized ` not supported by Table Schema

The `localized` type refers to an object that maps language codes to strings with same limitations as `string` type.

Indiviual values in a table can always be `null` while Table Schema requires definition of special string values to indicate a missing value.

### Schema fields

The `schema` field of MediaWiki tabular contains an object with field `fields` just like [Table Schema](/standard/table-schema/) but no other fields are allowed. The definition of individual schema fields also differs as following:

Field | Table Schema | Tabular data
---|---|--|
name | required | required
type | required | required (different [data types](#data-types))
title | optional (plain string)| optional (localized string)

