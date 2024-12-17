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

## Property Comparison

A [MediaWiki tabular data page](https://www.mediawiki.org/wiki/Help:Tabular_data) describes and contains an individual table of data similar to a [Data Resource](/standard/data-resource/) with inline tabular data. Both are serialized as JSON objects, but the former comes as a page with unique name in a MediaWiki instance (such as Wikimedia Commons).

### Top-level Properties

MediaWiki Tabular Data has three required and two optional top-level properties. Most of these properties map to corresponding properties of a Data Resource:

| MediaWiki Tabular Data                                                                                                                     | Data Package Table Schema                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| - (implied by page name)                                                                                                                   | [name](/standard/data-resource/#name) (required) is a string                          |
| [description](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields) (optional) is a localized string                          | [description](/standard/data-resource/#description) (optional) is a CommonMark string |
| [data](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields) (required)                                                       | [data](/standard/data-resource/#name) (optional)                                      |
| [license](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields) (required) is the string `CC0-1.0` or another known identifier | [licenses](/standard/data-resource/#licenses) (optional) is an array                  |
| [schema](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields) (required) as [described below](#schema-properties)            | [schema](/standard/data-resource/#schema) (optional) can have multiple forms          |
| [sources](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields) (optional) is a string with Wiki markup                       | [sources](/standard/data-resource/#sources) (optional) is an array of objects       |

The differences are:

- property `name` does not exist but can be implied from page name
- property `description` and `sources` have another format
- property `data` is always an array of arrays and [data types](#data-types) of individual values can differ
- property `schema` is required but it differs in definion of [schema properties](#schema-properties)
- there is no property `licenses` but `license` fixed to plain string value `CC0-1.0` (other license indicators may be possible)

### Data Types

Tabular Data supports four data types that overlap with [Table Schema data types](/standard/table-schema/#field-types):

- `number` subset of Table Schema [number](/standard/table-schema/#number) (no NaN, INF, or -INF)
- `boolean` same as Table Schema [boolean](/standard/table-schema/#boolean)
- `string` subset of Table Schema [string](/standard/table-schema/#string) (limited to 400 characters at most and must not include `\n` or `\t`)
- `localized ` refers to an object that maps language codes to strings with same limitations as `string` type.
  This type is not supported in Table Schema.

Indiviual values in a MediaWiki Tabular Data table can always be `null`, while in Table Schema you need to explicitly list values that should be considered missing in [schema.missingValues](/standard/table-schema/#missingValues).

### Schema Properties

The `schema` property of MediaWiki tabular contains an object with property `fields` just like [Table Schema](/standard/table-schema/) but no other properties are allowed. Elements of this array are like Table Schema [field descriptors](/standard/table-schema/#field) limited to three properties and different value spaces:

| MediaWiki Tabular Data                                                                                                                   | Data Package Table Schema                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [name](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields) (required) must be a string matching `^[a-zA-Z_][a-zA-Z_0-9]*` | [name](/standard/table-schema/#name) (required) can be any string                        |
| [type](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields) (required) is one of the [Data Types above](#data-types)       | [type](/standard/table-schema/#type) (optional) with [different data types](#data-types) |
| [title](https://www.mediawiki.org/wiki/Help:Tabular_data#Top-level_fields) (optional) is a localized string                              | [title](/standard/table-schema/#title) (optional) is a plain string                      |
