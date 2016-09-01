---
layout: spec
title: Specification - Budget Data Package
version: 0.2.0
updated: 25 August 2015
created: 14 March 2014
author:
 - Tryggvi Björgvinsson (Open Knowledge)
 - Rufus Pollock (Open Knowledge)
 - Neil Ashton (Open Knowledge)
summary: Budget Data Package is a lightweight and user-oriented format for budget data and associated metadata.
redirect_from: /fiscal-data-package/spec/0.2/
---

## Abstract

Budget Data Package is a lightweight and user-oriented format for budget data and associated metadata.

Budget data packages are made of simple and universal components. They can be produced from ordinary spreadsheet software and used in any environment.

## Definitions

* **Budget:** A term used to refer to both planned and actual revenues and expenditures. In that sense, a budget also refers to "spending" data.

## Overview

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

A budget is over a year-long process of planning, execution, and oversight of a government's expenditures and revenues. At multiple stages in the process, *quantitative data* is generated, data which specifies the sums of money spent or collected by the government. This data can represent either plans/projections or actual transactions.

In a typical budget process, a government authority, e.g. the executive arm, will put together a **proposed** budget and submit that for approval, e.g. by the country's legislative arm. The approval process might involve making changes to the proposal before the **approved** version is accepted. As time goes by there is a possibility that some projects, institutions etc. will require more money to fulfill their task so adjustments need to be made to the approved budget. The **adjustment** is then approved by the original budget entity, e.g. the legislative arm. This usually requires reasoning for why the original budget was not sufficient. The **executed** budget is the actual money spent or collected which can then be compared to the approved and adjusted plan.

By recognizing the following distinctions between data types, Budget Data Package is expressive enough to cover the data generated at every stage:

* Data can represent either *expenditures* or *revenues*.
* Data can be either *aggregated* or *transactional*. An item of aggregated data represents a whole category of spending (e.g. spending on primary education). An item of transactional data represents a single transaction at some specific point in time.
* Data can come from any stage in the budget cycle (proposal, approval, adjustment, execution). This includes three different types of planned / projected budget items (proposal, approval, adjustment) and one representing actual completed transactions (execution).

### Budget hierarchy and categorizations

Budget data has various degrees of hierarchy, depending on the perspective. From a functional perspective it can use a functional classification. The functional classification can be set up as a few levels (a hierarchy). An economical classification is not compatible with the functional hierarchy and has a different hierarchy. Another possible hierarchy would be a program project hierarchy where many projects are a part of a program.

All of these hierarchies give a picture of how the budget line fits into the bigger picture, but none of them can give the whole picture. Budget data usually only includes general classification categories or the top few hierarchies. For example a project can usually be broken down into tasks, but budget data usually would not go into so much detail. It might not even be divided into projects.

Categorizing and organizing the data is more about describing it from the bigger perspective than breaking it down into detailed components and the Budget Data Package specification tries to take that into account by including top level hierarchies and generalised classification systems but there is still a possibility to go into details by supplying a good description of every row in the budget data.

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
| name | string | a URL-compatible short name (or "slug") for the budget data package. It may be used as an identifier and therefore SHOULD be unique in relation to any registry in which this package will be deposited (and preferably globally unique). |
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
| dateModified | string | the date when the dataset was last updated, represented as an ISO 8601 date, e.g. 1982-04-22 |
| datePublished | string | the date when the dataset was published, represented as an ISO 8601 date, e.g. 1982-04-22 |
| fiscalPeriod | string | the fiscal period of the dataset, represented in the ISO 8601 time interval convention, that is two ISO dates separated by a solidus (/), e.g. 1982-04-22/1983-04-21 |
| granularity | string | the level of disaggregation in the data; value is one of `"aggregated"` or `"transactional"` |
| standard | string | the version of the budget data package specification used by the budget data package |
| status | string | the stage in the budget cycle represented by the data in the budget data package; value may be `"proposed"`, `"approved"`, `"adjusted"`, or `"executed"`. Each data represented by a single status MUST be a standalone version, i.e. `"adjusted"` data must show the complete budget and thus also include budget items that did not change (but retain their unique ids). |
| financialStatement | string | the statement type of data represented by the resource; value is one of `"expenditure"` or `"revenue"` |

Additionally, each metadata object SHOULD include, where relevant:

| Attribute | Type | Description|
| --------- | ---- | ---------- |
| countryCode | string | the two-letter country code (ISO 3166-1 alpha-2) associated with the budget data package |


The values of the two attributes `granularity` and `financialStatement` together determine the required and recommended fields associated with the data resource.

### Code sheets

Further information about specific data fields (described below) is provided in external data packages, referred to using [the native data package's foreign keys schema](http://dataprotocols.org/json-table-schema/#foreign-keys).

It is recommended that all ID data fields (a data field which includes either a code or an id) have an associated code sheet, wrapped in a data package, with more detailed information about the ID data field. The code sheet data package should include [a schema](http://dataprotocols.org/json-table-schema/#schema).

## Data

Budget data packages are required to include at least one data resource that describes budget data. This resource can consist of either expenditures or revenues, and it can be either aggregated or transactional. The category of the data resource is given by the combination of the `financialStatement` and `granularity` attributes of its `budgetDescription` metadata. Each category is associated with its own set of required and recommended fields.

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

The values of three fields (`cofogCode`, `gfsmExpenditure`, and `gfsmRevenue`) are required to follow a particular format.

Each field corresponds to a standard or codesheet for a dimension of classification:

* `cofogCode`: the United Nations [Classification of the Functions of Government][cofog]
* `gfsmExpense`: the IMF [Government Finance Statistics Manual (2001)][gfsm2001] classification of expense (Table 6.1)
* `gfsmRevenue`: the IMF [Government Finance Statistics Manual (2001)][gfsm2001] classification of revenue (Table 5.1)

The licit values for each field consist of the numerical codes from the appropriate codesheet, with hierarchical levels separated by periods. `1.1.4.1.3` is a licit value for `gfsmRevenue`, for example, corresponding to the code for "Turnover and other general taxes on goods and services".


### Aggregated expenditure data

Aggregated expenditure data (financialStatement `expenditure`, granularity `aggregated`) describes planned or executed government expenditures. These planned expenditures are disaggregated to at least the *functional category* level, and they can optionally be disaggregated up to the level of individual projects.

Aggregated data is in many cases the proposed, approved or adjusted budget (but can also be an aggregated version of actual expenditure). For this reason there are fields in aggregated data which are not applicable to transactional data, and vice versa.

#### Required fields

In addition to the general required fields, aggregated expenditure data MUST include the following fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| administrator | string | The name of the government entity legally responsible for spending the budgeted amount. |

#### Recommended fields

Wherever appropriate, aggregated expenditure datasets SHOULD include the following fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| administratorGeographicCode | string | Name of the geographical region where administrative entity is located. |
| administratorID | string | The internal code for the administrative entity. |
| cofogCode | string; special | The COFOG functional classification for the budget item. |
| economicClassification | string | Human-readable name of the economic classification of the budget item (i.e. the type of expenditure, e.g. purchases of goods, personnel expenses, etc.), drawn from the publisher's chart of accounts. |
| economicClassificationID | string | The internal code identifier for the economic classification. |
| financingMeans | string | Classification of the means of financing the expenditure (to distinguish those financed by loans, grants, aid, etc. from those drawn from a general fund). |
| functionalClassification | string | Human-readable ame of the (non-COFOG) functional classification of the budget item (i.e. the socioeconomic objective or policy goal of the spending; e.g. "secondary education"), drawn from the publisher's chart of account. |
| functionalClassificationID | string | The internal code identifier for the functional classification. |
| account | string | The fund from which the budget item will be drawn. (This refers to a named revenue stream.) |
| accountID | string | The internal code identifier for the fund. |
| gfsmExpense | string; special | The GFSM 2001 economic classification for the budget item. |
| program | string | Name of the government program underwriting the budget item. A program is a set of goal-oriented activities, such as projects, that has been reified by the government and made the responsibility of some ministry. A program can, e.g. be a government commitment to reducing unemployment. |
| programID | string | The internal code identifier for the government program. |
| project | string | Name of the project underwriting the budget item. A project is an indivisible activity with a dedicated budget and fixed schedule. A project can be a part of a bigger program and can include multiple smaller tasks. A project in an unemployment reduction program can e.g. be increased education opportunities for adults. |
| projectID | string | The internal code identifier for the project. |
| procuringEntityID | string | The government entity acting as the procurer for the transaction, if different from the institution controlling the project. |
| recipientGeographicCode | string | Name of the geographical region targeted by the budget item. |
| budgetaryClassification | string | Budgetary classification of item. Valid values: "personnel", "non-personnel recurrent", "capital", "other". |

#### Optional fields

| Field | Type | Description|
| ----- | ---- | ---------- |
| administratorGeographicCodeID | string | The internal or local geographicCode id based for the geographical region where the administrative entity is based. |
| administratorGeographicCodeOCDID | string | The [Open Civic Data Division Identifier](http://docs.opencivicdata.org/en/latest/proposals/0002.html), if it exists, for the geographical region where the administrative entity is based. |
| recipientGeographicCodeID | string | The internal or local geographicCode id based for the geographical region targeted by the budget item. |
| recipientGeographicCodeOCDID | string | The [Open Civic Data Division Identifier](http://docs.opencivicdata.org/en/latest/proposals/0002.html), if it exists, for the geographical region targeted by the budget item. |

### Aggregated revenue data

Aggregated revenue data (finacialStatement `revenue`, granularity `aggregated`) describes projected or actual government revenues, disaggregated to the *economic category* level.

Aggregated data is in many cases the proposed, approved or adjusted budget (but can also be an aggregated version of actual revenue). For this reason there are fields in aggregated data which are not applicable to transactional data, and vice versa.

#### Required fields

There are no required fields for aggregated revenue data.

#### Recommended fields

| Field | Type | Description|
| ----- | ---- | ---------- |
| economicClassification | string | Name of the economic classification of the revenue item, drawn from the publisher's chart of account. |
| economicClassificationID | string | The internal code identifier for the economic classification. |
| account | string | The fund into which the revenue item will be deposited. (This refers to a named revenue stream.) |
| accountID | string | The internal code identifier for the fund. |
| gfsmRevenue | string; special | The GFSM 2001 economic classification of revenues for the revenue item. |
| recipientGeographicCode | string | Name of the geographical region targeted by the revenue item. |
| sourceGeographicCode | string | Name of the geographical region from which the revenue item originates. |

#### Optional fields

| Field | Type | Description|
| ----- | ---- | ---------- |
| recipientGeographicCodeID | string | The internal or local geographicCode id based for the geographical region targeted by the revenue item. |
| recipientGeographicCodeOCDID | string | The [Open Civic Data Division Identifier](http://docs.opencivicdata.org/en/latest/proposals/0002.html), if it exists, for the geographical region targeted by the revenue item. |
| sourceGeographicCodeID | string | The internal or local geographicCode id based for the geographical region from which the revenue item originates. |
| sourceGeographicCodeOCDID | string | The [Open Civic Data Division Identifier](http://docs.opencivicdata.org/en/latest/proposals/0002.html), if it exists, for the geographical region from which the revenue item originates. |

### Transactional expenditure data

Transactional expenditure data (financialStatement `expenditure`, granularity `transactional`) describes government expenditures at the level of individual transactions, exchanges of funds taking place at a specific time between two entities. 
#### Required fields

In addition to the general required fields, transactional expenditure data MUST include the following fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| administrator | string | The name of the government entity responsible for spending the amount. |
| date | date | The date on which the transaction took place. |
| supplier | string | The name of the recipient of the expenditure. |

#### Recommended fields

Wherever appropriate, transactional expenditure datasets SHOULD include the following fields:

| Field | Type | Description|
| ----- | ---- | ---------- |
| administratorGeographicCode | string | Name of the geographical region where administrative entity is located. |
| administratorID | string | The internal code for the administrative entity. |
| amountAdjusted | number | The monetary amount allocated for expenditure for this transaction, after adjustments. |
| amountApproved | number | The monetary amount initially budgeted for this transaction. |
| budgetLineItem | string | The unique ID of budget line item (value of id column for budget line) authorizing the expenditure. The budget line can either come from an approved or adjusted budget, depending on if the transaction takes place after the related budget item has been adjusted or not. |
| contractID | string | The contract ID associated with the transaction. |
| cofogCode | string; special | The COFOG functional classification for the budget item. |
| dateAdjusted | date | The date on which the amount budgeted for the transaction was adjusted to the allocated amount. |
| dateApproved | date | The date on which the initial budget plan authorizing the transaction was made. |
| dateReported | date | The date on which the transaction was reported to the publishing body. This is not the same as date of transaction. The administrative entity responsible might not report transactions immediately when they happen (or they might). |
| economicClassification | string | Human-readable ame of the economic classification of the transaction (i.e. the type of expenditure, e.g. purchases of goods, personnel expenses, etc.), drawn from the publisher's chart of account. |
| economicClassificationID | string | The internal code identifier for the economic classification. |
| functionalClassification | string | Human-readable ame of the (non-COFOG) functional classification of the transaction (i.e. the socioeconomic objective or policy goal of the spending; e.g. "secondary education"), drawn from the publisher's chart of account. |
| functionalClassificationID | string | The internal code identifier for the functional classification. |
| account | string | The fund from which the transaction is be drawn. (This refers to a named revenue stream.) |
| accountID | string | The internal code identifier for the fund. |
| gfsmExpense | string; special | The GFSM 2001 economic classification for the transaction. |
| invoiceID | string | The invoice number given by the vendor or supplier. |
| program | string | Name of the government program underwriting the budget item. A program is a set of goal-oriented activities, such as projects, that has been reified by the government and made the responsibility of some ministry. A program can, e.g. be a government commitment to reducing unemployment. |
| programID | string | The internal code identifier for the government program. |
| project | string | Name of the project underwriting the budget item. A project is an indivisible activity with a dedicated budget and fixed schedule. A project can be a part of a bigger program and can include multiple smaller tasks. A project in an unemployment reduction program can e.g. be increased education opportunities for adults. |
| projectID | string | The internal code identifier for the project. |
| procuringEntityID | string | The government entity acting as procurer for the transaction, if different from the institution controlling the project. |
| recipientGeographicCode | string | Name of the geographical region targeted by the transaction. |

#### Optional fields

| Field | Type | Description|
| ----- | ---- | ---------- |
| administratorGeographicCodeID | string | The internal or local geographicCode id based for the geographical region where the administrative entity is based. |
| administratorGeographicCodeOCDID | string | The [Open Civic Data Division Identifier](http://docs.opencivicdata.org/en/latest/proposals/0002.html), if it exists, for the geographical region where the administrative entity is based. |
| recipientGeographicCodeID | string | The internal or local geographicCode id based for the geographical region targeted by the transaction. |
| recipientGeographicCodeOCDID | string | The [Open Civic Data Division Identifier](http://docs.opencivicdata.org/en/latest/proposals/0002.html), if it exists, for the geographical region targeted by the transaction. |

### Transactional revenue data

Transactional revenue data (financialStatement `revenue`, granularity `transactional`) describes government revenues disaggregated to individual transactions.

#### Required fields

In addition to the general required fields, transactional revenue data MUST include the following field:

| Field | Type | Description|
| ----- | ---- | ---------- |
| date | date | The date on which the transaction took place. |
| gfsmRevenue | string; special | The GFSM 2001 economic classification of revenues for the revenue item. |

#### Recommended fields

| Field | Type | Description|
| ----- | ---- | ---------- |
| economicClassification | string | Name of the economic classification of the revenue item, drawn from the publisher's chart of account. |
| economicClassificationID | string | The internal code identifier for the economic classification. |
| account | string | The fund into which the revenue item will be deposited. (This refers to a named revenue stream.) |
| accountID | string | The internal code identifier for the fund. |
| recipientGeographicCode | string | Name of the geographical region targeted by the revenue transaction. |
| sourceGeographicCode | string | Name of the geographical region from which the revenue transaction originates. |

#### Optional fields

| Field | Type | Description|
| ----- | ---- | ---------- |
| recipientGeographicCodeID | string | The internal or local geographicCode id based for the geographical region targeted by the revenue transaction. |
| recipientGeographicCodeOCDID | string | The [Open Civic Data Division Identifier](http://docs.opencivicdata.org/en/latest/proposals/0002.html), if it exists, for the geographical region targeted by the revenue transaction. |
| sourceGeographicCodeID | string | The internal or local geographicCode id based for the geographical region from which the revenue transaction originates. |
| sourceGeographicCodeOCDID | string | The [Open Civic Data Division Identifier](http://docs.opencivicdata.org/en/latest/proposals/0002.html), if it exists, for the geographical region from which the revenue transaction originates. |

## Recommended publication flow

Budget data package metadata is recorded for each resource file. This does make it possible to publish only a single budget data package for all budget data in the world. For practical reasons, publishers of budget data are encouraged to break budget data into logical budget data packages, each with a distinct and unique ``name``.

* A budget data package should represent only one fiscal period.
* A budget data package should represent only one granularity.
* Different publication statuses for the same fiscal period, granularity and fiscal statement should be available in the same budget data package as different resources.
* Different fiscal statements for the same fiscal period, granularity and statuses should be available in the same budget data package as different resources.
* Each resource in a budget data package should have a descriptive, unique and URL friendly ``name``.

Each budget data package should be made available at a permanent URI (web address) to allow others to refer to it but it can be published in more than one location. Each location should be a permanent URI.

Updating a resource in a budget data package should be avoided except for corrections made to the data. Adding resources to a budget data package is on the other hand preferred as new data becomes available, given that it follows the recommended flow described above. In both cases ``version`` of the top-level document should be upgraded in a way that conforms with [Semantic Versioning](http://semver.org)

## Acknowledgements

Thanks to Vitor Baptista, Sarah Bird, Samidh Chakrabarti, Pierre Chrzanowski, Andrew Clarke, Velichka Dimitrova, Friedrich Lindenberg, James McKinney, Rufus Pollock, Paolo de Renzio, Martin Tisne and Paul Walsh.
