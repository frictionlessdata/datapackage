---
layout: spec
title: Specification - Budget Data Package
version: 0.1.0
updated: 18 October 2014
created: 14 March 2014
author:
 - Tryggvi Björgvinsson (Open Knowledge)
 - Neil Ashton (Open Knowledge)
summary: Budget Data Package is a lightweight and user-oriented format for budget data and associated metadata.
redirect_from: /fiscal-data-package/spec/
---

## Abstract

Budget Data Package is a lightweight and user-oriented format for budget data and associated metadata.

Budget data packages are made of simple and universal components. They can be produced from ordinary spreadsheet software and used in any environment.

# Overview

Data on government budgets and spending is becoming available in unprecedented quantities. The practice of publishing budget information as machine-readable and openly licensed data is spreading rapidly and will soon become standard.

If open budget data is to be useful to citizens, it must be easy to process, transparently structured, well documented, and rich enough in content to be meaningful and understandable.

Budget Data Package is a format for budget data that ensures it meets these criteria. Budget data packages are:

* made from lightweight and easily processed components (CSV data, JSON metadata)
* structured according to a simple open standard
* self-documented with metadata
* required to include information that enables cross-dataset comparison


# Quick start

Budget Data Package is an open specification for quantitative data generated during the planning and execution of budgets. This includes data on both expenditures and revenues, as well as both data aggregated by meaningful categories and highly granular data recording individual transactions.

Budget Data Package is an open specification for the *form* and *content* of budget data. By giving a common *form* to budget data, Budget Data Package frees data users from the artificial obstacles created by the lack of a standard structure. By clarifying the *content* of budget data and requiring that budgets include crucial information, Budget Data Package ensures that data releases are actually useful.

## Budget data

A budget is a year-long process of planning, execution, and oversight of a government's expenditures and revenues. At multiple stages in the process, *quantitative data* is generated, data which specifies the sums of money spent or collected by the government. This data can represent either plans/projections or actual transactions.

By recognizing the following distinctions between data types, Budget Data Package is expressive enough to cover the data generated at every stage:

* Data can represent either *expenditures* or *revenues*.
* Data can be either *aggregated* or *transactional*. An item of aggregated data represents a whole category of spending (e.g. spending on primary education). An item of transactional data represents a single transaction at some specific point in time.
* Data can come from any stage in the budget cycle (proposal, approval, adjustment, execution). This includes three different types of planned / projected budget items (proposal, approval, adjustment) and one representing actual completed transactions (execution).

## Form

A minimal budget data package consists of two files, a CSV data file and `datapackage.json`:

* CSV data file: a table in which each row represents a single budget item
* `datapackage.json`: a metadata descriptor file explaining the structure of the data file and providing contextual information

The key data file in the package is a tabular data file such as any spreadsheet software can generate. Its structure is modeled on datasets already published by world governments.

The metadata descriptor, `datapackage.json`, is a JSON object structured according to the [Data Package specification][dp]. It describes the columns in the dataset(s) and provides contextual information including the country of origin and the stage of the budget cycle in which the data was generated.

## Content

Budget Data Package includes a standard set of fields which can be used to represent the most common attributes of budget items. This facilitates cross-dataset comparisons and makes the content of datasets easier to understand.

Budget Data Package also requires budgets to include certain fields that have been found to be crucial for interpreting budgets. This includes a requirement that aggregated expenditure data include a field for the United Nations' [Classification of the Functions of Government][cofog] (COFOG), a standard taxonomy for functional classifications, and that aggregated revenue data include the IMF's [Government Finance Statistics Manual 2001][gfsm2001] classification for revenues. Requiring the use of these widely used standards ensures that budget data is born interoperable. 

[cofog]: http://data.okfn.org/data/cofog
[gfsm2001]: http://www.imf.org/external/pubs/ft/gfs/manual/


# Specification

Budget Data Package is a [profile][profile] that extends the [Tabular Data Package specification][tdp]. Tabular Data Package is a generic data publication format that packages CSV tabular data with JSON metadata.

[profile]: http://www.rfc-editor.org/info/rfc6906
[tdp]: http://dataprotocols.org/tabular-data-package/

A budget data package is a valid Tabular Data Package, meaning that it MUST:

* contain a data package descriptor (`datapackage.json`)
* provide the minimum package metadata required by the [Data Package specification][dp]
* include at least one data file
* format all data files as CSVs, formatted according to [RFC 4180][csv-rfc]
* include a description of each data file in the `resources` array of the package descriptor
* include a [JSON Table Schema][jsontable] in the `schema` attribute of each resource in the `resources` array

[dp]: http://dataprotocols.org/data-packages/
[csv-rfc]: http://tools.ietf.org/html/rfc4180
[jsontable]: http://dataprotocols.org/json-table-schema/

Additionally, budget data packages MUST:

* include the additional metadata required by this specification
* include at least one data file that conforms to the schema defined in this specification

The remainder of the budget data package specification details the requirements that apply to the metadata in `datapackage.json` and to the form of data files.


## Metadata

The required metadata descriptor file, `datapackage.json`, MUST meet the requirements of the [Tabular Data Package specification][tdp]. In short, this requires that the top-level object include the following attributes:

| Attribute | Type | Description|
| --------- | ---- | ---------- |
| name | string | a URL-compatible short name (or "slug") for the budget data package |
| resources | array | an array containing a resource metadata object for each data file included in the budget data package |

Each object in `resources` must include a `schema` attribute, containing a [JSON Table Schema][jsontable] for the resource it describes. Each `schema` object MUST include a `primaryKey` attribute, the value of which MUST be `"id"`.

The budget metadata descriptor additionally SHOULD include the following attributes:

| Attribute | Type | Description|
| --------- | ---- | ---------- |
| licenses | array | array of objects describing the legal rights associated with the data package |
| sources | array | array of objects describing the sources for the data associated with the data package |

### Budget-specific metadata

Besides the generic requirements of the Tabular Data Package, budget data packages have their own requirements.

For each data file included in the package, its metadata object in the `resources` array MUST include the following attributes:

| Attribute | Type | Description|
| --------- | ---- | ---------- |
| currency | string | the currency of items in the data; value is an ISO 4217 currency code |
| dateLastUpdated | date | the date when the dataset was last updated |
| datePublished | date | the date when the dataset was published |
| fiscalYear | date | the fiscal year represented by the dataset |
| granularity | string | the level of disaggregation in the data; value is one of `"aggregated"` or `"transactional"` |
| standard | string | the version of the budget data package specification used by the budget data package |
| status | string | the stage in the budget cycle represented by the data in the budget data package; value may be `"proposed"`, `"approved"`, `"adjusted"`, or `"executed"` |
| type | string | the type of data represented by the resource; value is one of `"expenditure"` or `"revenue"` |

Additionally, each metadata object SHOULD include, where relevant:

| Attribute | Type | Description|
| --------- | ---- | ---------- |
| location | string | the two-letter country code (ISO 3166-1 alpha-2) associated with the budget data package |


The values of the two attributes `granularity` and `type` together determine the required and recommended fields associated with the data resource.

## Data

Budget data packages are required to include at least one data resource that describes budget data. This resource can consist of either expenditures or revenues, and it can be either aggregated or transactional. The category of the data resource is given by the combination of the `type` and `granularity` attributes of its `budgetDescription` metadata. Each category is associated with its own set of required and recommended fields.

The required data file contains a set of budget data. Each row in the data file MUST describe a single category of expenditure or revenue (or, for transactional data, a single transaction either to or from a government entity) at a single stage of the budget process.

Each data file is a valid CSV, following [RFC 4180][csv-rfc] conventions. Additionally, it MUST:

* include a header line as the first row of the file, containing the names of the corresponding fields
* include the fields listed in the "Required fields" for all dataset categories
* include the fields listed in the "Required fields" for the appropriate `datasetType` (see above, Metadata)
* assign values to the "Special fields" conforming to the requirements given below

The dataset SHOULD use the fields listed in the "Recommended fields" section of this specification wherever the semantics of the budget data make it appropriate to do so.

Additional fields not listed below MAY be included at the author's discretion. These additional fields MUST be described in the data resource's `schema` metadata.

Fields included in the dataset can be in any order, but the name of the field MUST match the name given in this specification for the corresponding field.


### Required fields (all categories)

Each field defined in this specification as required or recommended is given in the following form:

| Field | Type | Description|
| ----- | ---- | ---------- |
| name | type[; special] | prose description |

`type` is the data type of the field, drawn from the [JSON Table Schema's types][json-types]. If the keyword `special` is present, it indicates that the field is one of three types with special values described in the "Special fields" section of this specification.

[json-types]: http://dataprotocols.org/json-table-schema/#types

All datasets, both expenditure or revenue, MUST include these fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| amount | number | The amount of money associated with this budget item. |
| id | string | A globally unique identifier for the budget item. |


### Recommended fields (all categories)

The following fields SHOULD be included wherever possible:

| Field | Type | Description|
| ----- | ---- | ---------- |
| code | string | Internal identifier used by data publisher for budget / revenue item. |
| description | string | Human-readable description of budget / revenue item. | 


### Special fields

The values of four fields (`adminOrgID`, `cofog`, `gfsmExpenditure`, and `gfsmRevenue`) are required to follow a particular format.

Each field corresponds to a standard or codesheet for a dimension of classification:

* `adminOrgID`, `purchaserOrgID`: the IATI [organization identifier][iati-org]
* `cofog`: the United Nations [Classification of the Functions of Government][cofog]
* `gfsmExpense`: the IMF [Government Finance Statistics Manual (2001)][gfsm2001] classification of expense (Table 6.1)
* `gfsmRevenue`: the IMF [Government Finance Statistics Manual (2001)][gfsm2001] classification of revenue (Table 5.1)

[iati-org]: http://iatistandard.org/getting-started/organisation-data/organisation-identifiers/

The licit values for each field consist of the numerical codes from the appropriate codesheet, with hierarchical levels separated by periods. `1.1.4.1.3` is a licit value for `gfsmRevenue`, for example, corresponding to the code for "Turnover and other general taxes on goods and services".


### Aggregated expenditure data

Aggregated expenditure data (type `expenditure`, granularity `aggregated`) describes planned or executed government expenditures. These planned expenditures are disaggregated to at least the *functional category* level, and they can optionally be disaggregated up to the level of individual projects.

#### Required fields

In addition to the general required fields, aggregated expenditure data MUST include the following fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| admin | string | The name of the government entity legally responsible for spending the budgeted amount. |
| cofog | string; special | The COFOG functional classification for the budget item. |


#### Recommended fields

Wherever appropriate, aggregated expenditure datasets SHOULD include the following fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| adminID | string | The internal code for the administrative entity. |
| adminOrgID | string; special | The IATI organization identifier for the government entity legally responsible for spending the budgeted amount. |
| economic | string | Human-readable name of the economic classification of the budget item (i.e. the type of expenditure, e.g. purchases of goods, personnel expenses, etc.), drawn from the publisher's chart of accounts. |
| economicID | string | The internal code identifier for the economic classification. |
| financialSource | string | Classification of the means of financing the expenditure (to distinguish those financed by loans, grants, aid, etc. from those drawn from a general fund). Valid values *to be determined*. |
| functional | string | Human-readable ame of the (non-COFOG) functional classification of the budget item (i.e. the socioeconomic objective or policy goal of the spending; e.g. "secondary education"), drawn from the publisher's chart of account. |
| functionalID | string | The internal code identifier for the functional classification. |
| fund | string | The fund from which the budget item will be drawn. (This refers to a named revenue stream.) |
| fundID | string | The internal code identifier for the fund. |
| geocode | string | Name of the geographical region targeted by the budget item.
| gfsmExpense | string; special | The GFSM 2001 economic classification for the budget item. |
| program | string | Name of the government program underwriting the budget item. A program is a set of goal-oriented activities that has been reified by the government and made the responsibility of some ministry. |
| programID | string | The internal code identifier for the government program. |
| project | string | Name of the project underwriting the budget item. A project is an indivisible activity with a dedicated budget and fixed schedule. |
| projectID | string | The internal code identifier for the project. |
| purchaserID | string | The government entity acting as purchaser for the transaction, if different from the institution controlling the project. |
| purchaserOrgID | string; special | The IATI organization identifier for the government entity acting as purchaser for the transaction. |
| type | string | Budgetary classification of item. Valid values: "personnel", "non-personnel recurrent", "capital", "other". |


### Aggregated revenue data

Aggregated revenue data (type `revenue`, granularity `aggregated`) describes projected or actual government revenues, disaggregated to the *economic category* level.

#### Required fields

In addition to the general required fields, aggregated revenue data MUST include the following field:

| Field | Type | Description|
| ----- | ---- | ---------- |
| gfsmRevenue | string; special | The GFSM 2001 economic classification of revenues for the revenue item. |

#### Recommended fields

| Field | Type | Description|
| ----- | ---- | ---------- |
| economic | string | Name of the economic classification of the revenue item, drawn from the publisher's chart of account. |
| economicID | string | The internal code identifier for the economic classification. |
| fund | string | The fund into which the revenue item will be deposited. (This refers to a named revenue stream.) |
| fundID | string | The internal code identifier for the fund. |
| geocode | string | Name of the geographical region targeted by the transaction. |

### Transactional expenditure data

Transactional expenditure data (type `expenditure`, granularity `transactional`) describes government expenditures at the level of individual transactions, exchanges of funds taking place at a specific time between two entities. 
#### Required fields

In addition to the general required fields, transactional expenditure data MUST include the following fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| admin | string | The name of the government entity responsible for spending the amount. |
| date | date | The date on which the transaction took place. |
| supplier | string | The name of the recipient of the expenditure. |

#### Recommended fields

Wherever appropriate, transactional expenditure datasets SHOULD include the following fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| adminID | string | The internal code for the administrative entity. |
| adminOrgID | string; special | The IATI organization identifier for the government entity legally responsible for spending the amount. |
| amountAdjusted | number | The monetary amount allocated for expenditure for this transaction, after adjustments. |
| amountBudgeted | number | The monetary amount initially budgeted for this transaction. |
| budgetLineItem | string | The budget line item authorizing the expenditure. |
| contractID | string | The contract ID associated with the transaction. |
| cofog | string; special | The COFOG functional classification for the budget item. |
| dateAdjusted | date | The date on which the amount budgeted for the transaction was adjusted to the allocated amount. |
| dateBudgeted | date | The date on which the initial budget plan authorizing the transaction was made. |
| dateReported | date | The date on which the transaction was reported to the publishing body. |
| economic | string | Human-readable ame of the economic classification of the transaction (i.e. the type of expenditure, e.g. purchases of goods, personnel expenses, etc.), drawn from the publisher's chart of account. |
| economicID | string | The internal code identifier for the economic classification. |
| functional | string | Human-readable ame of the (non-COFOG) functional classification of the transaction (i.e. the socioeconomic objective or policy goal of the spending; e.g. "secondary education"), drawn from the publisher's chart of account. |
| functionalID | string | The internal code identifier for the functional classification. |
| fund | string | The fund from which the transaction is be drawn. (This refers to a named revenue stream.) |
| fundID | string | The internal code identifier for the fund. |
| geocode | string | Name of the geographical region targeted by the transaction. |
| gfsmExpense | string; special | The GFSM 2001 economic classification for the transaction. |
| invoiceID | string | The invoice number given by the vendor or supplier. |
| program | string | Name of the government program underwriting the transaction. A program is a set of goal-oriented activities that has been reified by the government and made the responsibility of some ministry. |
| programID | string | The internal code identifier for the government program. |
| project | string | Name of the project underwriting the transaction. A project is an indivisible activity with a dedicated budget and fixed schedule. |
| projectID | string | The internal code identifier for the project. |
| purchaserID | string | The government entity acting as purchaser for the transaction, if different from the institution controlling the project. |
| purchaserOrgID | string; special | The IATI organization identifier for the government entity acting as purchaser for the transaction. |


### Transactional revenue data

Transactional revenue data (type `revenue`, granularity `transactional`) describes government revenues disaggregated to individual transactions.

#### Required fields

In addition to the general required fields, transactional revenue data MUST include the following field:

| Field | Type | Description|
| ----- | ---- | ---------- |
| date | date | The date on which the transaction took place. |
| gfsmRevenue | string; special | The GFSM 2001 economic classification of revenues for the revenue item. |

#### Recommended fields

| Field | Type | Description|
| ----- | ---- | ---------- |
| economic | string | Name of the economic classification of the revenue item, drawn from the publisher's chart of account. |
| economicID | string | The internal code identifier for the economic classification. |
| fund | string | The fund into which the revenue item will be deposited. (This refers to a named revenue stream.) |
| fundID | string | The internal code identifier for the fund. |
| geocode | string | Name of the geographical region targeted by the transaction. |
