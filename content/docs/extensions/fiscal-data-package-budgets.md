---
title: Fiscal Data Package - Budget Standard Taxonomy
---

:::warning
This is a draft specification and still under development. If you have comments or suggestions please file them in the [issue tracker][issues]. If you have explicit changes please fork the [git repo][repo] and submit a pull request.
:::

[issues]: https://github.com/frictionlessdata/specs/issues
[repo]: https://github.com/frictionlessdata/specs/issues

The Budget Taxonomy is a set of ColumnTypes to be used in the context of a Fiscal Data Package to describe budget data of organizations (governments or otherwise.)

## Language

The key words <code>MUST</code>, <code>MUST NOT</code>, <code>REQUIRED</code>, <code>SHALL</code>, <code>SHALL NOT</code>, <code>SHOULD</code>, <code>SHOULD NOT</code>, <code>RECOMMENDED</code>, <code>MAY</code>, and <code>OPTIONAL</code> in this document are to be interpreted as described in <a href="https://www.ietf.org/rfc/rfc2119.txt" target="_blank" title="RFC 2119">RFC 2119</a>

## Changelog

- `1.0.0rc1`: Initial text

## Introduction

This document contains a _ColumnType_ taxonomy to be used for publishing budget data files.

The _ColumnTypes_ contained in this taxonomy contain:

- Generic value types
- Generic time types as well as the more specific 'fiscal year' type
- Classifications:
  - Functional: COFOG and Generic
  - Economic: GFSM and Generic
  - Administrative
  - Activity
- Other Budgeting-related Properties
- Geo-Related types

## References

- [The Fiscal Data Package Spec](/fiscal-data-package/)

## Location

The canonic location for this taxonomy's _ColumnType_ definition - to be used in fiscal data package descriptors - is

`https://specs.frictionlessdata.io/taxonomies/fiscal/budgets.json`

## The Taxonomy

#### Amounts and their properties

##### `value`

Numeric value depicting a fiscal amount related to the budget item, spending transaction etc.

- _dataType_: number

##### `value-kind:code`

Unique identifier for the amount kind

- _dataType_: string
- _unique_: True

##### `value-kind:label`

Display name for the amount kind

- _dataType_: string
- _labelOf_: `value-kind:code`

##### `value-currency:code`

Unique identifier for the amount currency

- _dataType_: string
- _unique_: True

##### `value-currency:label`

Display name for the amount currency

- _dataType_: string
- _labelOf_: `value-kind:code`

#### Time Indication

##### `date:fiscal-year`

The fiscal-year for which the values in this record are relevant

- _dataType_: integer
- _unique_: True

##### `date:fiscal:activity-approval`

The approval date of a specific activity

- _dataType_: date
- _unique_: True

##### `date:fiscal:activity-end`

The ending date of a specific activity

- _dataType_: date
- _unique_: True

##### `date:fiscal:activity-start`

The starting date of a specific activity

- _dataType_: date
- _unique_: True

##### `date:fiscal:final-payment`

The date of the last payment for a specific activity

- _dataType_: date
- _unique_: True

##### `date:fiscal:first-payment`

The date of the first payment for a specific activity

- _dataType_: date
- _unique_: True

##### `date:generic`

An non-specific date related to the values in this record (e.g. transaction date etc.)

- _dataType_: date
- _unique_: True

#### Classifications: Functional (COFOG)

##### `functional-classification:cofog:class:code`

The COFOG 'Class' Level code

- _dataType_: string
- _prior_: `functional-classification:cofog:group:code`
- _unique_: True

##### `functional-classification:cofog:class:description`

A more detailed textual description for this class

- _dataType_: string

##### `functional-classification:cofog:class:label`

A label or display name for this class

- _dataType_: string
- _labelOf_: `functional-classification:cofog:class:code`

##### `functional-classification:cofog:code`

The complete COFOG classification code, non level-specific

- _dataType_: string
- _unique_: True

##### `functional-classification:cofog:description`

Description for this COFOG classification, non level-specific

- _dataType_: string

##### `functional-classification:cofog:division:code`

The COFOG 'Division' Level code

- _dataType_: string
- _unique_: True

##### `functional-classification:cofog:division:description`

A more detailed textual description for this division

- _dataType_: string

##### `functional-classification:cofog:division:label`

A label or display name for this division

- _dataType_: string
- _labelOf_: `functional-classification:cofog:division:code`

##### `functional-classification:cofog:group:code`

The COFOG 'Group' Level code

- _dataType_: string
- _prior_: `functional-classification:cofog:division:code`
- _unique_: True

##### `functional-classification:cofog:group:description`

A more detailed textual description for this group

- _dataType_: string

##### `functional-classification:cofog:group:label`

A label or display name for this group

- _dataType_: string
- _labelOf_: `functional-classification:cofog:group:code`

##### `functional-classification:cofog:label`

Display name for this COFOG classification, non level-specific

- _dataType_: string
- _labelOf_: `functional-classification:cofog:code`

#### Classifications: Functional (non-specific)

##### `functional-classification:generic:code`

A code or unique identifier for the classification (not level specific)

- _dataType_: string
- _unique_: True

##### `functional-classification:generic:description`

A longer descriptive text for this classification

- _dataType_: string

##### `functional-classification:generic:label`

A label, title or display name for the classification

- _dataType_: string
- _labelOf_: `functional-classification:generic:code`

##### `functional-classification:generic:level{1..8}:code`

A code or unique identifier for the top level of the classification

- _dataType_: string
- _unique_: True

##### `functional-classification:generic:level{1..8}:description`

A longer descriptive text for this level of the classification

- _dataType_: string

##### `functional-classification:generic:level{1..8}:label`

A label, title or display name for this level of the classification

- _dataType_: string
- _labelOf_: `functional-classification:generic:level1:code`

#### Classifications: Economic (GFSM)

##### `economic-classification:gfsm:level{1..4}:code`

A code or unique identifier for the top level of the classification

- _dataType_: string
- _unique_: True

##### `economic-classification:gfsm:level{1..4}:description`

A longer descriptive text for this level of the classification

- _dataType_: string

##### `economic-classification:gfsm:level{1..4}:label`

A label, title or display name for this level of the classification

- _dataType_: string
- _labelOf_: `economic-classification:gfsm:level1:code`

#### Classifications: Economic (non-specific)

##### `economic-classification:generic:code`

A code or unique identifier for the classification (not level specific)

- _dataType_: string
- _unique_: True

##### `economic-classification:generic:description`

A longer descriptive text for this classification

- _dataType_: string

##### `economic-classification:generic:label`

A label, title or display name for the classification

- _dataType_: string
- _labelOf_: `economic-classification:generic:code`

##### `economic-classification:generic:level{1..4}:code`

A code or unique identifier for the top level of the classification

- _dataType_: string
- _unique_: True

##### `economic-classification:generic:level{1..4}:description`

A longer descriptive text for this level of the classification

- _dataType_: string

##### `economic-classification:generic:level{1..4}:label`

A label, title or display name for this level of the classification

- _dataType_: string
- _labelOf_: `economic-classification:generic:level1:code`

#### Classifications: Administrative

##### `administrative-classification:generic:code`

A code or unique identifier for the classification (not level specific)

- _dataType_: string
- _unique_: True

##### `administrative-classification:generic:description`

A longer descriptive text for this classification

- _dataType_: string

##### `administrative-classification:generic:label`

A label, title or display name for the classification

- _dataType_: string
- _labelOf_: `administrative-classification:generic:code`

##### `administrative-classification:generic:level{1..8}:code`

A code or unique identifier for the top level of the classification

- _dataType_: string
- _unique_: True

##### `administrative-classification:generic:level{1..8}:description`

A longer descriptive text for this level of the classification

- _dataType_: string

##### `administrative-classification:generic:level{1..8}:label`

A label, title or display name for this level of the classification

- _dataType_: string
- _labelOf_: `administrative-classification:generic:level1:code`

#### Funded (or otherwise related) Activities

##### `activity:generic:contract:code`

A code or unique identifier for the contract

- _dataType_: string
- _prior_: `activity:generic:subproject:code`
- _unique_: True

##### `activity:generic:contract:label`

A label, title or display name for this contract

- _dataType_: string
- _labelOf_: `activity:generic:contract:code`

##### `activity:generic:program:code`

A code or unique identifier for the program

- _dataType_: string
- _unique_: True

##### `activity:generic:program:label`

A label, title or display name for this program

- _dataType_: string
- _labelOf_: `activity:generic:program:code`

##### `activity:generic:project:code`

A code or unique identifier for the project

- _dataType_: string
- _prior_: `activity:generic:subprogram:code`
- _unique_: True

##### `activity:generic:project:label`

A label, title or display name for this project

- _dataType_: string
- _labelOf_: `activity:generic:project:code`

##### `activity:generic:subprogram:code`

A code or unique identifier for the subprogram

- _dataType_: string
- _prior_: `activity:generic:program:code`
- _unique_: True

##### `activity:generic:subprogram:label`

A label, title or display name for this subprogram

- _dataType_: string
- _labelOf_: `activity:generic:subprogram:code`

##### `activity:generic:subproject:code`

A code or unique identifier for the sub-project

- _dataType_: string
- _prior_: `activity:generic:project:code`
- _unique_: True

##### `activity:generic:subproject:label`

A label, title or display name for this sub-project

- _dataType_: string
- _labelOf_: `activity:generic:subproject:code`

#### Other Budgeting-related Properties

##### `budget-line-id`

A unique identifier for this budget line

- _dataType_: string
- _unique_: True

##### `budgetary-transfers`

Extra properties regarding whether the expenditure contains budgetary transfers

- _dataType_: string

##### `direction`

Specifies whether the values in this line are expenditure or revenues

- _dataType_: string
- _unique_: True

##### `phase:id`

The phase identifier

- _dataType_: string
- _unique_: True

##### `phase:label`

The phase display name

- _dataType_: string
- _labelOf_: `phase:id`

##### `expenditure-type:code`

Unique identifier for the expenditure type

- _dataType_: string
- _unique_: True

##### `expenditure-type:label`

Display name for the expenditure type

- _dataType_: string
- _labelOf_: `expenditure-type:code`

##### `fin-source:generic:code`

A code or unique identifier for the financial source

- _dataType_: string
- _unique_: True

##### `fin-source:generic:label`

Display name or title for the financial source

- _dataType_: string
- _labelOf_: `fin-source:generic:code`

##### `fin-source:generic:level{1..3}:code`

A code or unique identifier for the top level of the financial source hierarchy

- _dataType_: string
- _unique_: True

##### `fin-source:generic:level{1..3}:label`

Display name or title for the top level of the financial source hierarchy

- _dataType_: string
- _labelOf_: `fin-source:generic:level1:code`

#### Geographic Information

##### `geo:generic:code`

Unique identifier or code for Geographic feature specified in the data

- _dataType_: string
- _unique_: True

##### `geo:generic:codeList`

Indicates a specific code list from which a Geographic identifier is drawn

- _dataType_: string
- _unique_: True

##### `geo:generic:title`

The display name of the geographic feature

- _dataType_: string
- _labelOf_: `geo:generic:code`

##### `geo:source:code`

Unique identifier or code for Geographic feature specified in the data

- _dataType_: string
- _unique_: True

##### `geo:source:codeList`

Indicates a specific code list from which a Geographic identifier is drawn

- _dataType_: string
- _unique_: True

##### `geo:source:title`

The display name of the geographic feature

- _dataType_: string
- _labelOf_: `geo:source:code`

##### `geo:target:code`

Unique identifier or code for Geographic feature specified in the data

- _dataType_: string
- _unique_: True

##### `geo:target:codeList`

Indicates a specific code list from which a Geographic identifier is drawn

- _dataType_: string
- _unique_: True

##### `geo:target:level{1..2}:code`

Unique identifier or code for the Top Level Geographic feature specified in the data

- _dataType_: string
- _unique_: True

##### `geo:target:level{1..2}:title`

The display name for the Top Level Geographic feature specified in the data

- _dataType_: string
- _labelOf_: `geo:target:level1:code`

##### `geo:target:title`

The display name of the geographic feature

- _dataType_: string
- _labelOf_: `geo:target:code`
