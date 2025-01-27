---
title: Comparison with CSVW
sidebar:
  order: 3
---

<table>
  <tr>
    <th>Authors</th>
    <td>Peter Desmet, Evgeny Karev, Sara Petti</td>
  </tr>
</table>

In 2016, a working group chartered by W3C created a set of recommendations for documenting and accessing CSV files, collectively called [CSVW on the Web (CSVW)](https://www.w3.org/TR/2016/NOTE-tabular-data-primer-20160225/). These show extensive similarities with the Data Package standard.

Below we give an overview of the (dis)similarities between the CSVW and Data Package.

## Scope

CSVW is a set of specifications to describe delimited text files (CSV, TSV) only (i.e. [Model for Tabular Data and Metadata on the Web](https://www.w3.org/TR/2015/REC-tabular-data-model-20151217/) and [Metadata Vocabulary for Tabular Data](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/)).

Data Package is a set of specifications to describe datasets, data files and tabular data. It can describe data files that are not tabular and includes extra specifications for those that are (i.e. [Table Dialect](/standard/table-dialect/) and [Table Schema](/standard/table-schema/)).

## Maintenance

CSVW was published in 2016. Its working group was closed at the time. There is currently a community group, but it does [not have the mandate](https://github.com/w3c/csvw?tab=readme-ov-file#the-present) to make changes to the standard.

Data Package was published in 2012, updated to v1.0 in 2017 and v2.0 in 2024. It is maintained by the [Open Knowledge Foundation (OKFN)](https://okfn.org/). Requests for changes can be proposed by anyone as a [GitHub pull request](https://github.com/frictionlessdata/datapackage/pulls) and are [decided upon](/overview/governance/#decision-making) by a [working group](/overview/governance/) which includes members from several organizations.

## Adoption and Software Support

We could not find documentation on CSVW adoption, but Swirrl maintains a website at [csvw.org](https://csvw.org/) that explains the standard and provides an overview of [software tools](https://csvw.org/tools.html). A number of these are conversion tools, but software libraries are available for 4 programming languages (Java, Python, R, Ruby), with [Python](https://github.com/cldf/csvw) the most popular (37 stars). Of note is [CSV lint](https://csvlint.io/): an online tool to validate CSV files.

Data Package has been adopted by a wide range of [organizations and projects](/overview/adoption/), many of which have extended the standard and created software. [Software libraries](/overview/software/) are available for 9 programming languages (Go, Java, Javascript, Julia, PHP, Python, R, Ruby, Swift), with [Python](https://github.com/frictionlessdata/frictionless-py) the most popular (708 stars). These are all maintained as open source software under the [Frictionless Data organization](https://github.com/frictionlessdata) on GitHub. Of note is the [Open Data Editor](https://opendataeditor.okfn.org/): a fully-featured Data Package editor for non-technical users.

## Extensibility and Use of Other Standards

CSVW makes extensive use of other standards (such as [JSON-LD](https://www.w3.org/TR/json-ld/), [XML Schema Datatypes](https://www.w3.org/TR/xmlschema11-2/), Compact URIs) and defines how to use those. It also has specifications on how to transform CSVW to [JSON](https://www.w3.org/TR/2015/REC-csv2json-20151217/) and [RDF](https://www.w3.org/TR/2015/REC-csv2rdf-20151217/). CSVW is not defined as a JSON Schema.

Data Package defines its own properties for often-used properties (such as description, contributors, licences, sources), none of which are required. Users can include properties from other standards as [custom properties](/standard/glossary/#custom-properties). Data Package is defined as a JSON Schema and is designed to be extensible: developers can add or extend properties by referencing a JSON schema in [@schema](/standard/data-package/#dollar-schema), which are then automatically picked up by validation software. There is also [software](https://frictionlessdata.github.io/dplib-py/plugins/ckan/) available to convert Data Package to other metadata standards, such as DataCite and DCAT.

## Linking Data with Metadata

CSVW defines [different methods](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#locating-metadata) of locating metadata.

Data Package metadata are described in a [descriptor file](/standard/data-package/#descriptor) named `datapackage.json`. This file links to the data file(s) using [resource.path](/standard/data-resource/#path-or-data) and can reference external dialects, schemas, and (domain-specific) specifications.

## Property Comparison

Below is a list of all properties defined in CSVW’s [Metadata Vocabulary for Tabular Data](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/) (version 20151217) and how these are supported in Data Package (v2.0).

### Property Syntax

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [Array properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#array-properties) | Yes |  |
| [Link properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#link-properties) | Partial | [URLs and paths](/standard/glossary/#url-or-path) are supported, but not with a [@base](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dfn-base-url) URL in `@context` |
| [URI template properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#uri-template-properties) | No |  |
| [Column reference properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-reference-properties) | Yes | E.g. [schema.primaryKey](/standard/table-schema/#primaryKey) |
| [Object properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#object-properties) | Yes | E.g. [resource.schema](/standard/data-resource/#schema) |
| [Natural language properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#natural-language-properties) | Yes | E.g. [resource.path](/standard/data-resource/#path-or-data) |
| [Atomic properties](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#atomic-properties) | Yes |  |

### Top-level Properties

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [@context](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#context) | No |  |

### Table Groups

:::note
Data Package can define more than groups of tables. A [package](/standard/data-package/) can be a set of resources of any type. [Data Resource](/standard/data-resource/) therefore supports features that CSVW does not, such as [format](/standard/data-resource/#format), [mediatype](/standard/data-resource/#mediatype), and [hash](/standard/data-resource/#hash).
:::

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [tables](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-tables) | Yes | Tables can be defined as [package.resources](/standard/data-package/#resources) with `"type": "table"`.<br><br>Tables that are the same in terms of structure, format, dialect, etc. can be defined as a single resource with multiple files in [resource.path](/standard/data-resource/#path-or-data). Implementations will concatenate those tables. |
| [dialect](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-dialect) | Yes | As [resource.dialect](/standard/data-resource/#dialect) for multiple files in [resource.path](/standard/data-resource/#path-or-data) |
| [notes](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-notes) | Custom property |  |
| [tableDirection](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-direction) | No |  |
| [tableSchema](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-schema) | Yes | As [resource.schema](/standard/data-resource/#schema) for multiple files in [resource.path](/standard/data-resource/#path-or-data) |
| [transformations](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-transformations) | No |  |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-ld-id) | Custom property |  |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-group-ld-type) | No |  |

### Tables

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [url](http://table-url) | Yes | As [resource.path](/standard/data-resource/#path-or-data) |
| [dialect](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-dialect) | Yes | As [resource.dialect](/standard/data-resource/#dialect) |
| [notes](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-notes) | Custom property |  |
| [suppressOutput](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-suppressOutput) | No |  |
| [tableDirection](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#tableDirection) | No |  |
| [tableSchema](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-schema) | Yes | As [resource.schema](/standard/data-resource/#schema) |
| [transformations](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-transformations) | No |  |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-ld-id) | Custom property | Tables are identified by [resource.name](/standard/data-resource/#name) |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#table-ld-type) | Yes | As [resource.type](/standard/data-resource/#type) |

### Schemas

:::note
Data Package [Table Schema](/standard/table-schema/) has features that CSVW schema does not, including [fieldMatch](/standard/table-schema/#fieldsMatch) for matching a schema with data, [missingValues](/standard/table-schema/#missingValues) for multiple (and labelled) missing values, and [uniqueKeys](/standard/table-schema/#uniqueKeys).
:::

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [columns](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-columns) | Yes | As [schema.fields](/standard/table-schema/#fields) |
| [foreignKeys](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-foreignKeys) | Yes | As [schema.foreignKeys](/standard/table-schema/#foreignKeys) |
| [primaryKey](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-primaryKey) | Yes | As [schema.primaryKey](/standard/table-schema/#primaryKey) |
| [rowTitles](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-rowTitles) | No | Titles are defined per field as [field.title](/standard/table-schema/#title) |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-ld-id) | Custom property |  |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#schema-ld-type) | No |  |

### Columns

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [name](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-name) | Yes | As [field.name](/standard/table-schema/#name) |
| [suppressOutput](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-suppressOutput) | No |  |
| [titles](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-titles) | Partial | As [field.title](/standard/table-schema/#title) (a single value) |
| [virtual](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-virtual) | No |  |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-ld-id) | Custom property |  |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#column-ld-type) | No |  |

### Inherited Properties

Data Package properties do not inherit from their parent, unless otherwise specified (e.g. [resource.sources](/standard/data-resource/#sources)). The properties listed below only exist at one level in Data Package, except for `missingValues`.

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [aboutUrl](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-aboutUrl) | Custom property |  |
| [datatype](http://cell-datatype) | Yes | As [field.type](/standard/table-schema/#type-and-format) |
| [default](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-default) | No |  |
| [lang](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-lang) | No | Suggested as [recipe](/recipes/translation-support/) |
| [null](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-null) | Yes | As [field.missingValues](/standard/table-schema/#field-missingValues) and [schema.missingValues](/standard/table-schema/#missingValues) with options to define multiple values and labels |
| [ordered](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-ordered) | Yes | As [field.categoriesOrdered](/standard/table-schema/#categoriesOrdered) |
| [propertyUrl](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-propertyUrl) | Partial | As [field.rdfType](/standard/table-schema/#rdfType) |
| [required](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-required) | Yes | As [required](/standard/table-schema/#required) field constraint |
| [separator](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-separator) | Yes | As [delimiter](/standard/table-schema/#list) in `list` field type |
| [textDirection](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-textDirection) | No |  |
| [valueUrl](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#cell-valueUrl) | No |  |

### Common Properties

Common properties can be added in Data Package as [custom properties](/standard/glossary/#custom-properties), which just like CSVW recommends prefixed names. Note however that Data Package has its own definitions for often-used properties (e.g. description), which can exist at all levels.

### Dialect Descriptions

:::note
Data Package [Table Dialect](/standard/table-dialect/) was used as inspiration for CSVW dialect. It has features that CSVW dialect does not, since it covers tabular data formats beyond delimited text files, such as spreadsheets and databases. For delimited text files it supports [headerJoin](/standard/table-dialect/#headerJoin), [doubleQuote](/standard/table-dialect/#doubleQuote), [escapeChar](/standard/table-dialect/#escapeChar), and [nullSequence](/standard/table-dialect/#nullSequence), which CSVW does not.
:::

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [commentPrefix](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-commentPrefix) | Yes | As [dialect.commentChar](/standard/table-dialect/#commentChar) |
| [delimiter](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-delimiter) | Yes | As [dialect.delimiter](/standard/table-dialect/#delimiter) |
| [doubleQuote](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-doubleQuote) | Yes | As [dialect.doubleQuote](/standard/table-dialect/#doubleQuote) |
| [encoding](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-encoding) | Yes | As [resource.encoding](/standard/data-resource/#encoding) |
| [header](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-header) | Yes | As [dialect.header](/standard/table-dialect/#header) |
| [headerRowCount](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-headerRowCount) | Yes | As [dialect.headerRows](/standard/table-dialect/#headerRows) |
| [lineTerminators](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-lineTerminators) | Yes | As [dialect.lineTerminator](/standard/table-dialect/#lineTerminator) |
| [quoteChar](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-quoteChar) | Yes | As [dialect.quoteChar](/standard/table-dialect/#quoteChar) |
| [skipBlankRows](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-skipBlankRows) | No |  |
| [skipColumns](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-skipColumns) | No |  |
| [skipInitialSpace](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-skipInitialSpace) | Yes | As [dialect.skipInitialSpace](/standard/table-dialect/#skipInitialSpace) |
| [skipRows](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-skipRows) | No | As [dialect.commentRows](/standard/table-dialect/#commentRows) |
| [trim](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-trim) | No |  |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-ld-id) | Custom property |  |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#dialect-ld-type) | No |  |

### Transformation Definitions

Not supported in Data Package.

### Data Types

CSVW defines data types as built-in data types and derived data types. A derived data type extends a built-in data type with formats, constraints, etc. Data Package does not make that distinction, but rather defines a number of [Field Types](/standard/table-schema/#field-types). Depending on the type, it can be extended with a `format` and [constraints](/standard/table-schema/#field-constraints).

:::note
Data Package [Table Schema](/standard/table-schema/) supports data types that CSVW does not, such as (labelled) [categories](/standard/table-schema/#categories) and [geojson](/standard/table-schema/#geojson). It also supports a number of constraints that CSVW does not, such as [unique](/standard/table-schema/#unique) values, [pattern](/standard/table-schema/#pattern) for regex comparison and [enum](/standard/table-schema/#enum) for controlled values, which allow rigorous data validation.
:::

| CSVW property | Data Package support | Details |
| ---- | ---- | ---- |
| [base](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-base) | No | All types are defined as [field.type](/standard/table-schema/#type-and-format) |
| [format](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-format) | Yes | As [field.format](/standard/table-schema/#type-and-format) |
| [length](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-length) | No |  |
| [minLength](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-minLength) | Yes | As [minLength](/standard/table-schema/#minLength) field constraint |
| [maxLength](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-maxLength) | Yes | As [maxLength](/standard/table-schema/#maxLength) field constraint |
| [minimum](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-minimum) | Yes | As [minimum](/standard/table-schema/#minimum) field constraint |
| [maximum](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-maximum) | Yes | As [maximum](/standard/table-schema/#maximum) field constraint |
| [minInclusive](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-minInclusive) | Yes | As [minimum](/standard/table-schema/#minimum) field constraint |
| [maxInclusive](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-maxInclusive) | Yes | As [maximum](/standard/table-schema/#maximum) field constraint |
| [minExclusive](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-minExclusive) | Yes | As [exclusiveMinimum](/standard/table-schema/#exclusiveMinimum) field constraint |
| [maxExclusive](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-maxExclusive) | Yes | As [exclusiveMaximum](/standard/table-schema/#exclusiveMaximum) field constraint |
| [@id](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-id) | Custom property |  |
| [@type](https://www.w3.org/TR/2015/REC-tabular-metadata-20151217/#datatype-type) | No |  |
