title: Fiscal Data Package - Budget Standard Taxonomy
---
slug: fiscal-data-package--budgets
---
version: 1.0rc1
---
updated: 22 April 2018
---
created: 14 March 2014
---
abstract:

The Budget Taxonomy is a set of ClumnTypes to be used in the context of a Fiscal Data Package to describe budget data of organisations (governments or otherwise.)  
---
body:


!! NOTE: This is a draft specification and still under development. If you have comments or suggestions please file them in the [issue tracker][issues]. If you have explicit changes please fork the [git repo][repo] and submit a pull request.


[issues]: https://github.com/frictionlessdata/specs/issues
[repo]: https://github.com/frictionlessdata/specs/issues

## Changelog

- `1.0.0rc1`: Initial text

[toc]

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
- [The Fiscal Data Package Spec](/specs/fiscal-data-package/)

## Location 

The canonic location for this taxonomy's _ColumnType_ definition - to be used in fiscal data package descriptors - is

`https://frictionlessdata.io/taxonomies/fiscal/budgets.json`

## The Taxonomy

#### Amounts and their properties

##### `value`

Numeric value depicting a fiscal amount related to the budget item, spending transaction etc.
 - *dataType*: number

##### `value-kind:code`

Unique identifier for the amount kind
 - *dataType*: string
 - *unique*: True

##### `value-kind:label`

Display name for the amount kind
 - *dataType*: string
 - *labelOf*: `value-kind:code`

##### `value-currency:code`

Unique identifier for the amount currency
 - *dataType*: string
 - *unique*: True

##### `value-currency:label`

Display name for the amount currency
 - *dataType*: string
 - *labelOf*: `value-kind:code`

#### Time Indication

##### `date:fiscal-year`

The fiscal-year for which the values in this record are relevant
 - *dataType*: integer
 - *unique*: True

##### `date:fiscal:activity-approval`

The approval date of a specific activity
 - *dataType*: date
 - *unique*: True

##### `date:fiscal:activity-end`

The ending date of a specific activity
 - *dataType*: date
 - *unique*: True

##### `date:fiscal:activity-start`

The starting date of a specific activity
 - *dataType*: date
 - *unique*: True

##### `date:fiscal:final-payment`

The date of the last payment for a specific activity
 - *dataType*: date
 - *unique*: True

##### `date:fiscal:first-payment`

The date of the first payment for a specific activity
 - *dataType*: date
 - *unique*: True

##### `date:generic`

An non-specific date related to the values in this record (e.g. transaction date etc.)
 - *dataType*: date
 - *unique*: True

#### Classifications: Functional (COFOG)


##### `functional-classification:cofog:class:code`

The COFOG 'Class' Level code
 - *dataType*: string
 - *prior*: `functional-classification:cofog:group:code`
 - *unique*: True

##### `functional-classification:cofog:class:description`

A more detailed textual description for this class
 - *dataType*: string

##### `functional-classification:cofog:class:label`

A label or display name for this class
 - *dataType*: string
 - *labelOf*: `functional-classification:cofog:class:code`

##### `functional-classification:cofog:code`

The complete COFOG classification code, non level-specific
 - *dataType*: string
 - *unique*: True

##### `functional-classification:cofog:description`

Description for this COFOG classification, non level-specific
 - *dataType*: string

##### `functional-classification:cofog:division:code`

The COFOG 'Division' Level code
 - *dataType*: string
 - *unique*: True

##### `functional-classification:cofog:division:description`

A more detailed textual description for this division
 - *dataType*: string

##### `functional-classification:cofog:division:label`

A label or display name for this division
 - *dataType*: string
 - *labelOf*: `functional-classification:cofog:division:code`

##### `functional-classification:cofog:group:code`

The COFOG 'Group' Level code
 - *dataType*: string
 - *prior*: `functional-classification:cofog:division:code`
 - *unique*: True

##### `functional-classification:cofog:group:description`

A more detailed textual description for this group
 - *dataType*: string

##### `functional-classification:cofog:group:label`

A label or display name for this group
 - *dataType*: string
 - *labelOf*: `functional-classification:cofog:group:code`

##### `functional-classification:cofog:label`

Display name for this COFOG classification, non level-specific
 - *dataType*: string
 - *labelOf*: `functional-classification:cofog:code`

#### Classifications: Functional (non-specific)

##### `functional-classification:generic:code`

A code or unique identifier for the classification (not level specific)
 - *dataType*: string
 - *unique*: True

##### `functional-classification:generic:description`

A longer descriptive text for this classification
 - *dataType*: string

##### `functional-classification:generic:label`

A label, title or display name for the classification
 - *dataType*: string
 - *labelOf*: `functional-classification:generic:code`

##### `functional-classification:generic:level{1..8}:code`

A code or unique identifier for the top level of the classification
 - *dataType*: string
 - *unique*: True

##### `functional-classification:generic:level{1..8}:description`

A longer descriptive text for this level of the classification
 - *dataType*: string

##### `functional-classification:generic:level{1..8}:label`

A label, title or display name for this level of the classification
 - *dataType*: string
 - *labelOf*: `functional-classification:generic:level1:code`

#### Classifications: Economic (GFSM)

##### `economic-classification:gfsm:level{1..4}:code`

A code or unique identifier for the top level of the classification
 - *dataType*: string
 - *unique*: True

##### `economic-classification:gfsm:level{1..4}:description`

A longer descriptive text for this level of the classification
 - *dataType*: string

##### `economic-classification:gfsm:level{1..4}:label`

A label, title or display name for this level of the classification
 - *dataType*: string
 - *labelOf*: `economic-classification:gfsm:level1:code`

#### Classifications: Economic (non-specific)

##### `economic-classification:generic:code`

A code or unique identifier for the classification (not level specific)
 - *dataType*: string
 - *unique*: True

##### `economic-classification:generic:description`

A longer descriptive text for this classification
 - *dataType*: string

##### `economic-classification:generic:label`

A label, title or display name for the classification
 - *dataType*: string
 - *labelOf*: `economic-classification:generic:code`

##### `economic-classification:generic:level{1..4}:code`

A code or unique identifier for the top level of the classification
 - *dataType*: string
 - *unique*: True

##### `economic-classification:generic:level{1..4}:description`

A longer descriptive text for this level of the classification
 - *dataType*: string

##### `economic-classification:generic:level{1..4}:label`

A label, title or display name for this level of the classification
 - *dataType*: string
 - *labelOf*: `economic-classification:generic:level1:code`

#### Classifications: Administrative

##### `administrative-classification:generic:code`

A code or unique identifier for the classification (not level specific)
 - *dataType*: string
 - *unique*: True

##### `administrative-classification:generic:description`

A longer descriptive text for this classification
 - *dataType*: string

##### `administrative-classification:generic:label`

A label, title or display name for the classification
 - *dataType*: string
 - *labelOf*: `administrative-classification:generic:code`

##### `administrative-classification:generic:level{1..8}:code`

A code or unique identifier for the top level of the classification
 - *dataType*: string
 - *unique*: True

##### `administrative-classification:generic:level{1..8}:description`

A longer descriptive text for this level of the classification
 - *dataType*: string

##### `administrative-classification:generic:level{1..8}:label`

A label, title or display name for this level of the classification
 - *dataType*: string
 - *labelOf*: `administrative-classification:generic:level1:code`

#### Funded (or otherwise related) Activities

##### `activity:generic:contract:code`

A code or unique identifier for the contract
 - *dataType*: string
 - *prior*: `activity:generic:subproject:code`
 - *unique*: True

##### `activity:generic:contract:label`

A label, title or display name for this contract
 - *dataType*: string
 - *labelOf*: `activity:generic:contract:code`

##### `activity:generic:program:code`

A code or unique identifier for the program
 - *dataType*: string
 - *unique*: True

##### `activity:generic:program:label`

A label, title or display name for this program
 - *dataType*: string
 - *labelOf*: `activity:generic:program:code`

##### `activity:generic:project:code`

A code or unique identifier for the project
 - *dataType*: string
 - *prior*: `activity:generic:subprogram:code`
 - *unique*: True

##### `activity:generic:project:label`

A label, title or display name for this project
 - *dataType*: string
 - *labelOf*: `activity:generic:project:code`

##### `activity:generic:subprogram:code`

A code or unique identifier for the subprogram
 - *dataType*: string
 - *prior*: `activity:generic:program:code`
 - *unique*: True

##### `activity:generic:subprogram:label`

A label, title or display name for this subprogram
 - *dataType*: string
 - *labelOf*: `activity:generic:subprogram:code`

##### `activity:generic:subproject:code`

A code or unique identifier for the sub-project
 - *dataType*: string
 - *prior*: `activity:generic:project:code`
 - *unique*: True

##### `activity:generic:subproject:label`

A label, title or display name for this sub-project
 - *dataType*: string
 - *labelOf*: `activity:generic:subproject:code`

#### Other Budgeting-related Properties

##### `budget-line-id`

A unique identifier for this budget line
 - *dataType*: string
 - *unique*: True

##### `budgetary-transfers`

Extra properties regarding whether the expenditure contains budgetary transfers
 - *dataType*: string

##### `direction`

Specifies whether the values in this line are expenditure or revenues
 - *dataType*: string
 - *unique*: True

##### `phase:id`

The phase identifier
 - *dataType*: string
 - *unique*: True

##### `phase:label`

The phase display name
 - *dataType*: string
 - *labelOf*: `phase:id`

##### `expenditure-type:code`

Unique identifier for the expenditure type
 - *dataType*: string
 - *unique*: True

##### `expenditure-type:label`

Display name for the expenditure type
 - *dataType*: string
 - *labelOf*: `expenditure-type:code`

##### `fin-source:generic:code`

A code or unique identifier for the financial source
 - *dataType*: string
 - *unique*: True

##### `fin-source:generic:label`

Display name or title for the financial source
 - *dataType*: string
 - *labelOf*: `fin-source:generic:code`

##### `fin-source:generic:level{1..3}:code`

A code or unique identifier for the top level of the financial source hierarchy
 - *dataType*: string
 - *unique*: True

##### `fin-source:generic:level{1..3}:label`

Display name or title for the top level of the financial source hierarchy
 - *dataType*: string
 - *labelOf*: `fin-source:generic:level1:code`

#### Geographic Information

##### `geo:generic:code`

Unique identifier or code for Geographic feature specified in the data
 - *dataType*: string
 - *unique*: True

##### `geo:generic:codeList`

Indicates a specific code list from which a Geographic identifier is drawn
 - *dataType*: string
 - *unique*: True

##### `geo:generic:title`

The display name of the geographic feature
 - *dataType*: string
 - *labelOf*: `geo:generic:code`

##### `geo:source:code`

Unique identifier or code for Geographic feature specified in the data
 - *dataType*: string
 - *unique*: True

##### `geo:source:codeList`

Indicates a specific code list from which a Geographic identifier is drawn
 - *dataType*: string
 - *unique*: True

##### `geo:source:title`

The display name of the geographic feature
 - *dataType*: string
 - *labelOf*: `geo:source:code`

##### `geo:target:code`

Unique identifier or code for Geographic feature specified in the data
 - *dataType*: string
 - *unique*: True

##### `geo:target:codeList`

Indicates a specific code list from which a Geographic identifier is drawn
 - *dataType*: string
 - *unique*: True

##### `geo:target:level{1..2}:code`

Unique identifier or code for the Top Level Geographic feature specified in the data
 - *dataType*: string
 - *unique*: True

##### `geo:target:level{1..2}:title`

The display name for the Top Level Geographic feature specified in the data
 - *dataType*: string
 - *labelOf*: `geo:target:level1:code`

##### `geo:target:title`

The display name of the geographic feature
 - *dataType*: string
 - *labelOf*: `geo:target:code`

