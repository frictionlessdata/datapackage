---
title: Changelog
sidebar:
  order: 10
---

This document includes all meaningful changes made to the Data Package Standard **specifications**. It does not cover changes made to other documents like Recipes or Guides.

## v2.0-draft

> April 1, 2024

### Overview

The Data Package (v2) draft release includes a rich set of the specification improvements accepted by the Data Package Working Group during the active phase of the Data Package (v2) work.

### Data Package

##### `version` (updated)

[`version`](../../specifications/data-package/#version) is now included in the specification, while in Data Package v1 it was erroneously only part of the documentation ([#3](https://github.com/frictionlessdata/datapackage/pull/3)).

##### `contributors` (updated)

[`contributors`](../../specifications/data-package/#contributors) was updated:

- `contributor.title` is no longer required ([#7](https://github.com/frictionlessdata/datapackage/pull/7)).
- `contributor.givenName` and `contributor.familyName` are new properties to specify the given and family name of contributor, if it is a person ([#20](https://github.com/frictionlessdata/datapackage/pull/20)).
- `contributor.role` has been deprecated in favour of `contributor.roles`, see further ([#18](https://github.com/frictionlessdata/datapackage/pull/18)).
- `contributor.roles` is a new property that allows to specify multiple roles per contributor, rather than having to duplicate the contributor. It recommendeds to follow an established vocabulary and has suggested values that are different from the deprecated `contributor.role` ([#18](https://github.com/frictionlessdata/datapackage/pull/18)).

##### `sources` (updated)

[`sources`](../../specifications/data-package/#sources) was updated:

- `source.title` is no longer required ([#7](https://github.com/frictionlessdata/datapackage/pull/7)).
- `source.version` is a new property to specify which version of a source was used ([#10](https://github.com/frictionlessdata/datapackage/pull/10)).

### Data Resource

##### `name` (updated)

[name](../../specifications/data-resource/#name-required) now allows any string. It previously required the name to only consist of lowercase alphanumeric characters plus `.`, `-` and `_`. The property is still required and must be unique among resources ([#27](https://github.com/frictionlessdata/datapackage/pull/27)).

##### `path` (updated)

[path](../../specifications/data-resource/#path-or-data-required) now explicitely forbids hidden folders (starting with dot `.`) ([#19](https://github.com/frictionlessdata/datapackage/pull/19)).

##### `encoding` (updated)

[encoding](../../specifications/data-resource/#encoding)'s definition has been updated to support binary formats like Parquet ([#15](https://github.com/frictionlessdata/datapackage/pull/15)).

### Table Dialect

[Table Dialect](../../specifications/table-dialect) is a new specification that superseeds and extends the CSV Dialect specification. It support other formats like JSON or Excel ([#41](https://github.com/frictionlessdata/datapackage/pull/41)).

### Table Schema

#### Schema

##### `fieldsMatch` (new)

[fieldsMatch](../../specifications/table-schema/#fieldsmatch) allows to specify how fields in a Table Schema match the fields in the data source. The default (`exact`) matches the Data Package v1 behaviour, but other values (e.g. `subset`, `superset`) allow to define fewer or more fields and match on field names. This new property extends and makes explicit the `schema_sync` option in Frictionless Framework ([#39](https://github.com/frictionlessdata/datapackage/pull/39)).

##### `primaryKey` (updated)

[`primaryKey`](../../specifications/table-schema/#primarykey) should now always be an array of strings, not a string ([#28](https://github.com/frictionlessdata/datapackage/pull/28)).

##### `uniqueKeys` (new)

[`uniqueKeys`](../../specifications/table-schema/#uniquekeys) allows to specify which fields are required to have unique logical values. It is an alternative to `field.contraints.unique` and is modelled after the corresponding SQL feature ([#30](https://github.com/frictionlessdata/datapackage/pull/30)).

##### `foreignKeys` (updated)

[`foreignKeys`](../../specifications/table-schema/#foreignkeys) was updated:

- It should now always be an array of strings, not a string ([#28](https://github.com/frictionlessdata/datapackage/pull/28)).
- `foreignKeys.reference.resource` can now be omitted for self-referencing foreign keys. Previously it required setting `resource` to an empty string ([#29](https://github.com/frictionlessdata/datapackage/pull/29)).

#### Fields

##### `missingValues` (new)

[`missingValues`](../../specifications/table-schema/#missingvalues) allows to specify missing values per field, and overwrites `missingValues` specified at a resource level ([#24](https://github.com/frictionlessdata/datapackage/pull/24)).

#### Field Types

##### `integer` (updated)

[`integer`](../../specifications/table-schema/#integer) now has a `groupChar` property. It was already available for `number` ([#6](https://github.com/frictionlessdata/datapackage/pull/6)).

##### `list` (new)

[`list`](../../specifications/table-schema/#list) allows to specify fields containing collections of primary values separated by a delimiter (e.g. `value1,value2`) ([#38](https://github.com/frictionlessdata/datapackage/pull/38)).

##### `datetime` (updated)

[`datetime`](../../specifications/table-schema/#datetime)'s default `format` is now extended to allow optional milliseconds and timezone parts ([#23](https://github.com/frictionlessdata/datapackage/pull/23)).

##### `geopoint` (updated)

[`geopoint`](../../specifications/table-schema/#geopoint)'s definition now clarifies that floating point numbers can be used for coordinate definitions ([#14](https://github.com/frictionlessdata/datapackage/pull/14)).

##### `any` (updated)

[`any`](../../specifications/table-schema/#any) is now the default field type and clarifies that the field type should not be inferred if not provided ([#13](https://github.com/frictionlessdata/datapackage/pull/13)).

#### Field Constraints

##### `minimum` and `maximum` (updated)

[`minimum`](../../specifications/table-schema/#minimum) and [`maximum`](../../specifications/table-schema/#maximum) are now extended to support the `duration` field type ([#8](https://github.com/frictionlessdata/datapackage/pull/8)).

##### `exclusiveMinimum` and `exclusiveMaximum` (new)

[`exclusiveMinimum`](../../specifications/table-schema/#exclusiveminimum) and [`exclusiveMaximum`](../../specifications/table-schema/#exclusivemaximum) can be used to specify exclusive minimum and maximum values ([#11](https://github.com/frictionlessdata/datapackage/pull/11)).

##### `jsonschema` (new)

[`jsonSchema`](../../specifications/table-schema/#jsonschema) can be used for the `object` and `array` field types ([#32](https://github.com/frictionlessdata/datapackage/pull/32)).

## v1.0

> September 5, 2017

Please refer to the [Data Package (v1) website](https://specs.frictionlessdata.io/).
