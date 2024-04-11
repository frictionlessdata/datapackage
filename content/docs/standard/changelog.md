---
title: Changelog
sidebar:
  order: 10
---

This document includes all meaningful changes made to the **specifications** consisting the Data Package Standard. It does not track changes made to other documents like recipes or guides.

## v2.0.0-draft.1

> April 1, 2024

### Overview

The Data Package (v2) draft release includes a rich set of the specification improvements accepted by the Data Package Working Group during the active phase of the Data Package (v2) work.

### Changes

#### Specifications

##### Added `source.version` property

This change adds a new property to make possible of providing information about source version. Please read more about [`source.version`](../../specifications/data-package/#sources) property.

> [Pull Request -- #10](https://github.com/frictionlessdata/datapackage/pull/10)

##### Made `contributor/source.title` not required

This change allows omitting `title` property for the `contributor` and `source` objects making it more flexible for data producers.

> [Pull Request -- #7](https://github.com/frictionlessdata/datapackage/pull/7)

#### Data Package

##### Added `contributor.given/familyName`

This change adds two new properties to the `contributor` object: `givenName` and `familyName`. Please read more about [`package.contributors`](../../specifications/data-package/#contributors) property.

> [Pull Request -- #20](https://github.com/frictionlessdata/datapackage/pull/20)

##### Added `contributor.roles` property

This change adds a new `contributors.roles` property that replaces `contributor.role`. Please read more about [`package.contributors`](../../specifications/data-package/#contributors) property.

> [Pull Request -- #18](https://github.com/frictionlessdata/datapackage/pull/18)

##### Fixed `version` property in Data Package profile

This change adds omitted `version` property to the Data Package profiles.

> [Pull Request -- #3](https://github.com/frictionlessdata/datapackage/pull/3)

#### Data Resource

##### Relaxed `resource.name` rules but keep it required and unique

This change relaxes requirements to `resource.name` allowing it to be any string. This property still needs to present and be unique among resources. Please read more about [`resource.name`](../../specifications/data-resource/#name-required) property.

> [Pull Request -- #27](https://github.com/frictionlessdata/datapackage/pull/27)

##### Clarified `resource.encoding` property

This change updates the `resource.encoding` property definition to properly support binary file formats like Parquet. Please read more about [`resource.encoding`](../../specifications/data-resource/#encoding) property.

> [Pull Request -- #15](https://github.com/frictionlessdata/datapackage/pull/15)

##### Forbade hidden folders in paths

This change fixes definition in the Data Resource specification to explicitly forbid hidden folders.

> [Pull Request -- #19](https://github.com/frictionlessdata/datapackage/pull/19)

#### Table Dialect

##### First version of the specification

This change adds a new specification Table Dialect that superseeds and extends the CSV Dialect specification to work with other formats like JSON or Excel. Please refer to the [Table Dialect](../../specifications/table-dialect) specification.

> [Pull Request -- #41](https://github.com/frictionlessdata/datapackage/pull/41)

#### Table Schema

##### Added `schema.fieldsMatch` property

This change clarifies the default field matching behaviour and adds new modes for matching data source and Table Schema fields. Please read more about [`schema.fieldsMatch`](../../specifications/table-schema/#fieldsmatch) property.

> [Pull Request -- #39](https://github.com/frictionlessdata/datapackage/pull/39)

##### Made `any` be a default field type

This change makes field type to be `any` by default and ensures that the field type is not inferred if not provided. Please read more about [`any`](../../specifications/table-schema/#any) type.

> [Pull Request -- #13](https://github.com/frictionlessdata/datapackage/pull/13)

##### Added `uniqueKeys` property

This change adds `uniqueKeys` property directly modelled after corresponding SQL feature. Please read more about [`schema.uniqueKeys`](../../specifications/table-schema/#uniquekeys) property.

> [Pull Request -- #30](https://github.com/frictionlessdata/datapackage/pull/30)

##### Added `field.missingValues`

This change adds a property that allows to specify missing values individually per field. Please read more about [`field.missingValues`](../../specifications/table-schema/#missingvalues) property.

> [Pull Request -- #24](https://github.com/frictionlessdata/datapackage/pull/24)

##### Added `list` field type

This change adds a new field type `list` for typed collections, lexically delimiter-based. Please read more about [`list`](../../specifications/table-schema/#list) type.

> [Pull Request -- #38](https://github.com/frictionlessdata/datapackage/pull/38)

##### Added `jsonSchema` constraint to object and array fields

This change adds a new constraint for the `object` and `array` fields. Please read more about [`constraints.jsonSchema`](../../specifications/table-schema/#jsonschema) constraint.

> [Pull Request -- #32](https://github.com/frictionlessdata/datapackage/pull/32)

##### Support `groupChar` for integer field type

This change adds support for providing integers with group chars. Please read more about [`field.groupChar`](../../specifications/table-schema/#integer) property.

> [Pull Request -- #6](https://github.com/frictionlessdata/datapackage/pull/6)

##### Extended `datetime` default format

This change extends `default` format definition for the `datetime` field type allowing to provide optional milliseconds and timezone parts.

> [Pull Request -- #23](https://github.com/frictionlessdata/datapackage/pull/23)

##### Supported exclusive constraints

This change adds new `exclusiveMinimum` and `exclusiveMaximum` constraints to the Table Schema specification.

> [Pull Request -- #11](https://github.com/frictionlessdata/datapackage/pull/11)

##### Simplified self-referencing in foreign keys

This change allows omitting `foreignKey.resource.reference` in case of self-referencing. Previously it required setting resource to an empty string.

> [Pull Request -- #29](https://github.com/frictionlessdata/datapackage/pull/29)

##### Discouraged usage of unnecessary union types

This change discourages usage of mixed types for `schema.primaryKeys` and `schema.foreignKeys.fields` properties.

> [Pull Request -- #28](https://github.com/frictionlessdata/datapackage/pull/28)

##### Clarified that `geopoint` is number-based

This changes clarifies that `geopoint` field type can use floating point numbers for coordinate definitions.

> [Pull Request -- #14](https://github.com/frictionlessdata/datapackage/pull/14)

##### Fixed duration constraint

This change fixes `minimum` and `maximum` constraint for the `duration` field type.

> [Pull Request -- #8](https://github.com/frictionlessdata/datapackage/pull/8)

## v1.0.0

> September 5, 2017

Please refer to the the [Data Package (v1) website](https://specs.frictionlessdata.io/).
