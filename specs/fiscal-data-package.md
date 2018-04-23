title: Fiscal Data Package
---
slug: fiscal-data-package
---
version: 1.0rc1
---
updated: 22 April 2018
---
created: 14 March 2014
---
abstract:

Fiscal Data Package is a lightweight and user-oriented format for publishing and consuming fiscal data. Fiscal data packages are made of simple and universal components. They can be produced from ordinary spreadsheet software and used in any environment.
---
body:


!! NOTE: This is a draft specification and still under development. If you have comments or suggestions please file them in the [issue tracker][issues]. If you have explicit changes please fork the [git repo][repo] and submit a pull request.


[issues]: https://github.com/frictionlessdata/specs/issues
[repo]: https://github.com/frictionlessdata/specs/issues

## Changelog

- `1.0.0rc1`: Updated distinction between spec and standard
- `1.0.0rc`: A complete rewrite of the spec
- `0.3.0`: incorporates all changes up to `0.3.0-alpha9`
- `0.3.0-alpha9`: (!) rename mapping to model. Remove 'ocdid' as recommended attribute for location dimension.
- `0.3.0-alpha8`: remove transaction identifier
- `0.3.0-alpha7`: remove quality level guidance
- `0.3.0-alpha6`: dimension fields -> attributes, revert measures/dimensions/attributes to objects, add `parent` and `labelfor` keys on dimension attributes
- `0.3.0-alpha5`: variety of improvements and corrections including #35, #37 etc
- `0.3.0-alpha4`: reintroduce a lot of the content of data recommendations from v0.2
- `0.3.0-alpha3`: rework mapping structure in various ways
- `0.3.0-alpha2`: rename Budget Data Package to Fiscal Data Package
- `0.3.0-alpha`: very substantial rework of spec to use "mapping" approach between physical and logical model. Core framework, based on Tabular Data Package, is unchanged.
- [`0.2.0`](./0.2/): large numbers of changes and clarifications for particular fields but no substantive change to the overall spec
- [`0.1.0`](./0.1/): first complete version of the specification

[toc]

## Introduction

This document contains the "Fiscal Data Package" specification - a lightweight and user-oriented format for publishing and consuming fiscal data.

The motivation behind the fiscal data package was to create a specification which is _open by nature_ - based on other open standards, supported by open tools and software, modular, extensible and promoted transparently by a large community.

It is designed to be lightweight and simple to use - providing a small but flexible set of features, based on real-world requirements and not theoretical ones. All the while, the built-in extensibility allows this spec to adapt to  many different use cases and domains. It is also possible to gradually use more and more part of this specification - thus making it easier to implement this spec with existing data while slowly improving the data quality.

A main concern of this specification is the ability to work with data _as it is currently exists_, without forcing publishers to modify the contents or structure of their current data files in order to "adapt" them to the specification.

It concernes with how fiscal data should be packaged and providing means for publishers to best convey the meaning of the data - so it can be optimally used by consumers. This specification also provides details regarding file-formats, data-types, meta-data and structuring the data in files. 

On the othen hand, this specification is, _by design_, non-opinionated about which data _should_ be published by publishers - which data-sets, which fields and and the internal processes these reflect.

Along side this specification are two fiscal taxonomies which serve as standards for publishing _budget_ files and _spending_ files. These can be found here:
- [The Budget Fiscal Data Package Standard](./fiscal-data-package--budgets.md)
- [The Spending Fiscal Data Package Standard](./fiscal-data-package--spending.md)

### Lessons learned from v0.3 of this spec

Via a wide range of technical implementation, partner piloting, and fiscal data projects with other civic tech and data journalist partners, we've learned a lot about what works in Fiscal Data package v0.3, and what does not. We want to take these learnings and make a more robust and future proof v1.0 of the specification.

#### Modelling

Version 0.3 of the spec contained an elaborate system for modellling of the fiscal data. In practice, this system turned out to be too complicated for normal users and error prone (as inconsistent modelling could be created). 

To add to that, modelling was not versatile enough to account for the very different source files existing with real users, nor was it expressive enough to convey the specific semantics required by these users. 

A few examples of this strictness includes:
- The predefined set of classifications for dimensions. This hard-coded list did not capture the richness of fiscal data ‘in the wild’, as it contained too few and too broad options.
- Measure columns were assumed to be of a specific currency, disregarding datasets in which the currency is provided in a separate column (or non monetary measures).
- Measure columns were assumed to be of a specific budgeting phase (out of 4 options) and of a single direction (income/expenditure), ignoring data sets which have different phases, or that the phase or direction are provided in a separate column - or data sets which are not related to budgets altogether...

#### File structure

While machines will always prefer to read data files in their denormalised (or unpivoted) form - as it's the most verbose and straightforward one - publishers will often choose a more compact, pivoted form. Other publishers would take out from the file some of the data, and append it as a separate code list file.

Version 0.3 of the spec assumed data files would only be provided in a very specific pivoted form - which might apply to some cases, but practically failed on many other pivoting variations that were encountered. 

### What's different?

In a nutshell, the notable changes from v0.3 to v1 are as follows:

- Consistent usage of "fiscal concepts" to model fiscal data (i.e. _ColumnTypes_), instead of the mix of metadata properties, measures and dimensions in v0.3 (all concepts are either a measure or a dimension)
- The representation of concepts on data resources, instead of on a distinct `model` property
- Improve implementation and semantics around direction and phase
- Have explicit recommendations on the desirable concepts for given types of fiscal data (budget, spend, etc.)
- Update to be based on Tabular Data Package v1

## Terminology

### What is Fiscal Data?

In the context of this specification, we will define a fiscal dataset, at its core, to be one providing information on a series of fiscal transactions.

Each of these transactions consists of the following concepts:
- The *source* of the transaction
- The *recipient* of the transaction
- *When* the transaction occurred
- A single *amount* of money (or equivalent) that was transferred in the transaction
- Other properties describing the transaction

These concepts must appear in all fiscal data - there is no transaction without knowing who gave how much money, to whom and when. However, in some cases, the transactions are aggregated - either because the exact recipient is not known yet (which is usually the case when planning a budget) or because it's preferrable to present data aggregated over a period of time (usually a single fiscal year). 

In aggregated data sets, you would find only a subset of these concepts. For example, a planned budget file would aggregate transactions over a period of a fiscal year, indicating the source of the transaction and its amount but without specifying the exact recipients (which are still unknown at the time of planning).

Properties describing the transaction could be:
- Unique identifiers of the transaction
- Classifications of sorts, providing context for the source of the money or what is its purpose
- Details regarding the procurement or budgeting process related to the amount (e.g. allocated vs. executed budgeting phase)
- Information regarding the mechanism used to transfer the money
- Description of the amount itself - currency, multiplication factor

Other properties are naturally possible - all depending on the actual financial systems that are involved in the transaction.

#### Example

We'll demonstrate the theoretical concepts with a concrete example - the Smith Family Fiscal Data.

On September 30th, the family gathered and decided on a budget for the upcoming week:


| Week | ID | Buyer    | Purpose  | Payment Method   | Planned Amount |
|------|----|----------|----------|------------------|--------|
| 1-7/Oct   | 1  | George   | Food     | Credit Card      | $100   |
| 1-7/Oct   | 2  | George   | Books    | Paypal Account   | $15    |
| 1-7/Oct   | 3.1| Lorraine | Clothing | Shop Gift Card   | $25    |
| 1-7/Oct   | 3.2| Lorraine | Clothing | Credit Card      | $10    |
| 1-7/Oct   | 4  | Lorraine | Fuel     | Credit Card      | $40    |
| 1-7/Oct   | 5  | Marty    | Candy    | Allowance - Cash | $10    |
| 1-7/Oct   | 6  | George   | Taxes    | Credit Card      | $20    |

In this example we can see most of the concepts we'd often see in budget files:
- _Week_ is the _Fiscal Period_
- _Buyer_ serves as the _Administrative Classification_
- _Purpose_ would be the _Functional Classification_
- _Payment Method_ is the _Economic Classification_
- and the _Amount_ is, naturally, the budgeted amount.

This above data table is an example of an _aggregated data set_. We don't see individual purchases, but rather a plan of the purchases over the week, summed accoring to purpose, buyer and purchase method.

When the week ended, the family gathered once again and reviewed the actual spending that took place during that week:

| Date | Budget ID | Item      | Where       | Amount  |
|------|-----------|-----------|-------------|---------|
| 1/2  | 4         | 30L Fuel   | Gas Station | $15.5   |
| 1/2  | 6         | Housing Tax | City Hall   | $20     |
| 2/2  | 3.1       | Shirts     | Mall        | $25     |
| 2/2  | 3.2       | Trousers   | Mall        | $3.8    |
| 3/2  | 1         | Groceries  | Market      | $107.60 |
| 4/2  | 4         | 31L Fuel   | Gas Station | $16.2   |
| 6/2  | 5         | Bubble Gum | Candy Shop  | $8      |
| 7/2  | 4         | 28L Fuel   | Gas Station | $13.3   |

We can see that this data provides detailed information about the individual transactions that were made. In our example:
- _Where_ would be the _Recipient_ of the transaction, and
- _Item_ would be the _Purpose_ of the transaction

Combined with the original budget (using the _ID_ columns), we can know _Who_ did each purchase, for what purpose and with wich payment method.

We can then aggregate the transactions and get an _Executed Budget_ data set, which contains both the planned and executed figures for each aggregated row:

| Week | ID | Buyer    | Purpose  | Payment Method   | Planned| Executed |
|------|----|----------|----------|------------------|--------|----|
| 1-7/Oct   | 1  | George   | Food     | Credit Card      | $100   | $107.60 |
| 1-7/Oct   | 2  | George   | Books    | Paypal Account   | $15    | $0 | 
| 1-7/Oct   | 3.1| Lorraine | Clothing | Shop Gift Card   | $25    | $25 | 
| 1-7/Oct   | 3.2| Lorraine | Clothing | Credit Card      | $10    | $3.8 | 
| 1-7/Oct   | 4  | Lorraine | Fuel     | Credit Card      | $40    | $45 | 
| 1-7/Oct   | 5  | Marty    | Candy    | Allowance - Cash | $10    | $8 | 
| 1-7/Oct   | 6  | George   | Taxes    | Credit Card      | $20    | $20 |

### What is a Fiscal Data File?

In the context of this specification, a fiscal data file is a physical representation of fiscal data (as defined above), in a series of computer files.

This representation might consist of a single, denormalised, data-table (with one row per transaction) - or take a more normalised form, spanning multiple, separate tables.

Note: We use the terms 'normalised' and 'denormalised' in this document quite a bit, so it's best to take a moment and understand what they mean. In short, a normalised form is a way of structuring data so that redundancy is minimised. A denormalised form has the simplest form but also the most redundant one. More on this can be found in this [Wikipedia Page](https://en.wikipedia.org/wiki/Database_normalization).

Table columns will hold some property (or properties) of the above concepts - some will hold amounts, some will hold information regarding the recipient etc. As the exact nature of each of these concepts varies greatly by context, the possibilities for properties appearing in a fiscal data file column are also great.

A fiscal data file might contain all information necessary to reconstruct the fiscal data, or it might have some implicit information which is not part of the data. As an example, imagine the following scenarios:
 - A budget file named '2015_budget.csv', not including the 'year' column as it's already in the file name
 - A budget file with no 'year' column, instead having '2017', '2018', and '2019' columns.

In these two scenarios, we need to the file's metadata and augment the actual data records contained in the file - in order to be able to correctly reconstruct the original data.

As with any tabular data, a physical representation of data also includes selection of file formats, data formatting and locale specifics (which are out of scope for this specification and are handled in the Tabular Data Package specification).

#### Example

Let's imagine we asked Lorraine and George to email us their weekly family budget. Although working on the same data set, each took a very different approach as to how to represent the data in an actual data file.

George, which is an accountant, sent us an CSV file named `week_of_1_7_oct.csv`. The CSV file contained these cells:

| Who?     | What for? | How?            | Plan | Actual |
|----------|----------|------------------|--------|----|
| George   | Food     | Credit Card      | $100   | $107.60 |
| George   | Books    | Paypal Account   | $15    | $0 | 
| Lorraine | Clothing | Shop Gift Card   | $25    | $25 | 
| Lorraine | Clothing | Credit Card      | $10    | $3.8 | 
| Lorraine | Fuel     | Credit Card      | $40    | $45 | 
| Marty    | Candy    | Allowance - Cash | $10    | $8 | 
| George   | Taxes    | Credit Card      | $20    | $20 |

Lorraine, a Data Scientist, took a different approach. In the email that she sent, there were attached 5 different CSV files:

- `Budget.csv`:

| Week Start | ID | BuyerID | PurposeID | PaymentMethodID | PhaseID | Amount |
|------------|----|----|----|------------------|--------|----|
| 2015-10-01 | 1  | B1 | P1 | PM1 | P | $100   |
| 2015-10-01 | 1  | B1 | P1 | PM1 | A | $107.60 |
| 2015-10-01 | 2  | B1 | P2 | PM2 | P | $15    |
| 2015-10-01 | 2  | B1 | P2 | PM2 | A | $0 | 
| 2015-10-01 | 3.1| B2 | P3 | PM3 | P | $25 | 
| 2015-10-01 | 3.1| B2 | P3 | PM3 | A | $25 | 
| 2015-10-01 | 3.2| B2 | P3 | PM1 | P | $10 | 
| 2015-10-01 | 3.2| B2 | P3 | PM1 | A | $3.8 | 
| 2015-10-01 | 4  | B2 | P4 | PM1 | P | $40 | 
| 2015-10-01 | 4  | B2 | P4 | PM1 | A | $45 | 
| 2015-10-01 | 5  | B3 | P5 | PM4 | P | $10 | 
| 2015-10-01 | 5  | B3 | P5 | PM4 | A | $8 | 
| 2015-10-01 | 6  | B1 | P6 | PM1 | P | $20|
| 2015-10-01 | 6  | B1 | P6 | PM1 | A | $20|

- `Buyer.csv`:

| BuyerID | Buyer |
| ------- | ----- | 
| B1      | George | 
| B2      | Lorraine | 
| B3      | Marty | 

- `Purpose.csv`

| PurposeID | Purpose |
| ------- | ----- | 
| P1      | Food | 
| P2      | Books | 
| P3      | Clothing | 
| P4      | Fuel | 
| P5      | Candy | 
| P6      | Taxes | 

- `PaymentMethod.csv`:

| PaymentMethodID | Payment Method |
| ------- | ----- | 
| PM1 | Credit Card | 
| PM2 | Paypal Account | 
| PM3 | Shop Gift Card | 
| PM4 | Allowance - Cash | 

- `Phase.csv`

| PhaseID | Phase |
| ------- | ----- | 
| P      | Planned | 
| A      | Actual | 

___How is Lorraine's method different from Georges'?___

1. We can see that Lorraine's method has far less data duplication - all field values are mapped to unique identifiers and the full names are detailed in separate, smaller tables.
2. Another observation is that there is only one single amount column. The distinction between the two amount columns (_Planned_ and _Actual_) was transformed into a new _Phase_ column.
3. Unlike George's file, Lorraine has all the required information as part of the data - specifically, the time period has its own column and is not only mentioned in the name of the sheet
4. Finally, Lorraine chose a more common way of presenting the date - using the ISO standard YYYY-MM-DD format.

### What is the Fiscal Data Package?

A Fiscal Data Package is a means to _describe_ an existing fiscal data file so that data can be consistently and accurately extracted into its logical representation, without the need for any external assumptions or preconditions.

A rich taxonomy of fiscal concepts (_ColumnTypes_) allows these descriptors to provide some _meaning_ to the resulting data. The different columns in the data are mapped into common, generic fiscal concepts which allow users of the data to understand it without having to understand the very specifics of the financial system that produced it. Furthermore, users are allowed to extend that taxonomy in a way that allows them to provide these context specific details while still keeping the mapping to a common concept.

#### Example 1 - George's file

We'll go over the concepts of the Fiscal Data Package via a few examples.

First, we shall model George's file from the previous section. 

The Fiscal Data Package is an extention of a Tabular Data Package, so our output should be a valid `datapackage.json` file - the data package descriptor:

```yaml=
{
  "name": "smith-budget-by-george",
  "title": "Smith Family Budget (George's version)",
```
We start by providing a little metadata for the entire dataset...
```yaml=+
  "resources": [
    {
      "name": "budget",
      "path": "week_of_1_7_oct.csv",
```
And then some metadata on the resource itself.
Now we describe the different columns in the file:
```yaml=+
      "schema": {
        "fields": [
          {
            "name": "Who?",
            "type": "string",
            "columnType": "administrative-classification:generic:code"
          },
```
The first column is the "Who?" column - the administrative classification in our example dataset. We state that the column is of a _string_ type and we provide a proper _ColumnType_ to state that this is an _Administrative Classification Code_ (more on ColumnTypes later on).

We now continue to model the rest of the fields:
```yaml=+
          {
            "name": "What for?",
            "type": "string",
            "columnType": "functional-classification:generic:code"
          },
          {
            "name": "How?",
            "type": "string",
            "columnType": "economic-classification:generic:code"
          },
```

Finally we want to handle the amounts - also known as 'measures': 'Plan' and 'Actual'. How do we represent correctly the difference between the two?

```yaml=+
          {
            "name": "Plan",
            "type": "number",
            "bareNumber": false,
            "normalize": {
              "Phase": "Plan"
            }
          },
          {
            "name": "Actual",
            "type": "number",
            "bareNumber": false,
            "normalize": {
              "Phase": "Actual"
            }
          }
        ],
```

Although both planned and actual values appear in the same row, each one of them is, in fact, a separate data point. Conceptually, we could imagine a new table where each row is converted into two rows, for example

| George   | Food     | Credit Card      | $100   | $107.60 |
|----------|----------|------------------|--------|----|

 Would be converted to 

| George   | Food     | Credit Card      | $100   | Plan |
|----------|----------|------------------|--------|------|
| George   | Food     | Credit Card      | $107.60 | Actual | 

So that we're left with just one "measure" and an extra "phase" column.

The `normalize` attribute does exactly that - and it works together with the `extraField` property which declares all the columns which are not part of the physical source file:

```yaml=+
        "extraFields": [
          {
            "name": "Amount",
            "type": "number",
            "columnType": "value",
            "normalizationTarget": true
          },
```
The first extra field is the normalisation target.
Both amounts (from 'Plan' and 'Actual') will be placed here. Notice we gave this column the `value` ColumnType, denoting it as a value (or a _"Measure"_). 

```yaml=+
          {
            "name": "Phase",
            "type": "string",
            "columnType": "phase:id"
          },
```

The second extra field will hold the "phase" - based on the values in the `normalize` property in the table schema fields.
When denormalising, these two extra fields should replace the existing 'Plan' and 'Actual' columns.

Finally, we want to move the "fiscal period" from the filename to a proper column in the data itself. We do that by declaring a "constant" field. While we're at it we also add a proper currency column - just in case the Smith's decide one day to open an offshore bank account.

```yaml=+
          {
            "name": "Week Start",
            "type": "date",
            "columnType": "date:fiscal:activity-start",
            "constant": "1/10/2015",
            "format": "%d/%m/%Y"
          },
          {
            "name": "Currency",
            "type": "string",
            "columnType": "value-currency:code",
            "constant": "USD"
          },
        ]      
      }
    }
  ]
}
```

#### Example 2 - Lorraine's file

Let's model Lorraine's file now.

We'll start with the same metadata:

```yaml=
{
  "name": "smith-budget-by-lorraine",
  "title": "Smith Family Budget (Lorraine's version)",
```

And then we start describing the different resources - in Lorraine's case, we've got 5 of them.
The first one is the "buyer" table:
```yaml=+
  "resources": [
    {
      "name": "buyer",
      "path": "Buyer.csv",
      "schema": {
        "fields": [
          {
            "name": "BuyerID", 
            "type": "string"
          },
          {
            "name": "Buyer", 
            "type": "string",
            "columnType": "administrative-classification:generic:code"
          }
        ]
      }
    },
```
This resource is pretty simple - we have only two columns, one of which is an identifier and the other is the actual buyer - which we mapped to a proper fiscal concept (_Administrative Classification_).

Let's map a few more resources - these are pretty much the same:
```yaml=+
    {
      "name": "purpose",
      "path": "Purpose.csv",
      "schema": {
        "fields": [
          {
            "name": "PurposeID", 
            "type": "string"
          },
          {
            "name": "Purpose", 
            "type": "string",
            "columnType": "functional-classification:generic:code"
          }
        ]
      }
    },
    {
      "name": "payment_method",
      "path": "PaymentMethod.csv",
      "schema": {
        "fields": [
          {
            "name": "PaymentMethodID", 
            "type": "string"
          },
          {
            "name": "Payment Method", 
            "type": "string",
            "columnType": "economic-classification:generic:code"
          }
        ]
      }
    },
    {
      "name": "phase",
      "path": "Phase.csv",
      "schema": {
        "fields": [
          {
            "name": "PhaseID", 
            "type": "string"
          },
          {
            "name": "Phase", 
            "type": "string",
            "columnType": "phase:id"
          }
        ]
      }
    },
```
Finally we tie all of these resources together into the main table (also known as the "facts table" - the "fact" in our case being a single transaction or budget item):

```yaml=+
    {
      "name": "budget",
      "path": "Budget.csv",
      "schema": {
        "fields": [
          {
            "name": "Week Start",
            "type": "date",
            "columnType": "date:fiscal:activity-start",
            "format": "%Y-%m-%d"
          },
          {
            "name": "ID", 
            "type": "string",
            "columnType": "budget-line-id"
          },
          {
            "name": "BuyerId", 
            "type": "string"
          },
          {
            "name": "PurposeID", 
            "type": "string"
          },
          {
            "name": "PaymentMethodID", 
            "type": "string"
          },
          {
            "name": "PhaseID", 
            "type": "string"
          },
          {
            "name": "Amount",
            "type": "number",
            "bareNumber": false,
            "columnType": "value"
          },
        ],
```
Now, let's use the magic of [foreign keys](http://frictionlessdata.io/specs/table-schema/#foreign-keys) to connect the main table to all the secondary tables:
```yaml=+
        "foreignKeys": [
          {
            "fields": "BuyerID",
            "reference": {
              "resource": "buyer",
              "fields": "BuyerID"
            }
          },
          {
            "fields": "PurposeID",
            "reference": {
              "resource": "purpose",
              "fields": "PurposeID"
            }
          },
          {
            "fields": "PaymentMethodID",
            "reference": {
              "resource": "payment_method",
              "fields": "PaymentMethodID"
            }
          },
          {
            "fields": "PhaseID",
            "reference": {
              "resource": "phase",
              "fields": "PhaseID"
            }
          }
        ],
```

Finally, all is left is to add the currency column (as in George's file) and to wrap up.

```yaml=+
        "extraFields": [
          {
            "name": "Currency",
            "type": "string",
            "columnType": "value-currency:code",
            "constant": "USD"
           }
        ]
      }
    }
  ]
}
```


## The Fiscal Data Package Descriptor

### Overview

The Fiscal Data Descriptor is a fully-compatible extension of the Tabular Data Package specification (i.e., any fiscal data package should be fully readable by any tabular data package compatible software).

The purpose of this extension is to provide a domain specific modelling of a fiscal dataset. 

There are quite a few motivations for such modelling:

- Allowing fiscal data consumers to better understand the actual fiscal concept each column in the data set refers to
- Provide means to re-structure the data in a predictable form: normalised, denormalised or other
- Enabling smart and contextual comparisons of different datasets from different sources

However, **by design**, all parts of this extension are optional. In other words, the extent of modelling provided by the publisher of a fiscal data package is fully flexible and could range from the simple case of a tabular data package (with no modelling) - all through to a fully modelled dataset.

It is left to the implementors to place any restrictions, if any, on the minimal level of modelling that they require or on how to treat missing parts of the model (e.g. ignore, infer etc.)

### Fiscal Modelling

This specification allows modelling of fiscal data in two distinct levels: the structural level and the semantic level.

**Structural Level**

We want to properly describe the structure of a dataset - so that data consumers are able to restructure the dataset based on their own needs and requirements.

The method for describing a dataset's structure is to detail the difference between the provided form a dataset to its fully denormalised form. Essentially we're listing a set of transformations, that when applied, would convert the dataset from the former to the latter.

Using the knowledge of how the denormalised data looks like, consumers can then better understand how to read, store or otherwise manipulate the data so it fits their existing systems and processes.

A denormalised presentation of a data set needs to fulfill these conditions:
   - all data is contained in a single data table
   - each row contains just one single data point with a single value
   - all data and metadata is provided within the data table 

The specification provides 3 possible transformations that might be used to describe how the dataset could be denormalised:
 1. *Foreign Keys* - connect separate data tables via an ID column present in both tables. This method is already part of the Tabular Data Package specification and will not be covered here.
 2. *Denormalising Measures* - convert a row with multiple measures in the source data into multiple rows, each with a single value.
 3. *Constant Fields* - represent metadata as constant columns in the data table

**Semantic Mapping**

Semantic mapping is the process of assigning meaning to the data. Basically we want to map each column in the dataset to a "real-world" fiscal concept, so that data consumers have better understanding of the data itself - and the data might be compared to other datasets (which share a semantic similarity).

This specification provides means for mapping each column in the original data (or its denormalised form) onto a fiscal concept, using a taxonomy of _ColumnTypes_ which cover a wide range of real-world fiscal concepts (and can be easily extended to cover custom cases).

### The `extraFields` property

The main vehicle for the structural modelling is the `extraFields` property -  a property added to a tabular resource schema (as a sibling to the `fields` property), similarly containing field definitions.

All the fields that are listed in the `extraFields` property are ones that appear in the denormalised form but not on the original data. The contents of these columns is derived from the dataset itself (or from the descriptor). Each of these fields there also specifies how their content relates to the original dataset.

### Denormalising Measures

In many cases, publishers will prefer to have Approved, Modified and Executed values of a budget as separate columns, instead of duplicating the same line just to provide 3 figures. It is more readable to humans and more concise (i.e. creates a smaller file size).

In other cases, the budget figures for the current, next and after next years will appear as separate columns instead of in separate rows. This allows readers to more easily compare the budget figures across consecutive years.

In fact, we might even encounter data-set where both phase and year columns were reduced in the same way.

This practice is very common as a simple form of normalisation being done on a published dataset. However, some data is lost along the way - in our examples, we've lost the 'Budget Phase' column in the former, and 'Fiscal Year' column in the latter.

We want to describe this process to allow data consumers to potentially undo it - and to the least resurrect the data that was lost in the process.

In order to do so we need to:
- Add to the `extraFields` property a field definition for each column that was reduced (budget phase or fiscal year in our scenario), for example:
```yaml
"extraFields": [
   { "name": "Budget Phase", "type": "string", ... },
   { "name": "Fiscal Year", "type": "integer", ... },
   ...
]
```
- We add a `normalize` property to _each_ measure in the schema. The value of this property is a mapping between _every_ 'reduced column' name to a value, for example:

```yaml
...
"schema": {
  "fields": [
     ...
   { 
      "name": "Approved 2015", 
      "type": "number", 
      "normalize": {
          "Budget Phase": "approved",
          "Fiscal Year": 2015
      },
      ... 
   },
   { 
      "name": "Executed 2015", 
      "type": "number", 
      "normalize": {
          "Budget Phase": "executed",
          "Fiscal Year": 2015
      },
      ... 
   },
   { 
      "name": "Approved 2016", 
      "type": "number", 
      "normalize": {
          "Budget Phase": "approved",
          "Fiscal Year": 2016
      },
      ... 
   },
   { 
      "name": "Executed 2016", 
      "type": "number", 
      "normalize": {
          "Budget Phase": "executed",
          "Fiscal Year": 2016
      },
      ... 
   },
 ]  
}
...
```
- Finally we add to the `extraFields` property a field definition for the target column for the measures' values, like so:
```yaml
"extraFields": [
  ...
  {
    "name": "Fiscal Amount",
    "type": "number",
    "columnType": "value",
    "normalizationTarget": true
  }
]
```

### Constant Fields

In order to complement missing information in the dataset it's possible to add columns with 'constant' values to the schema.

We can do so by adding field definitions to the `extraFields` property. Each of these field objects must also contain a `constant` property, holding the constant value.

Provided value might be provided either in its logical representation or its physical representation.

Examples:
```yaml
"extraFields": [
  ...
  {
    "name": "A String",
    "type": "string",
    "constant": "a value"
  },
  {
    "name": "A Number",
    "type": "number",
    "constant": 5
  },
  {
    "name": "Another Number",
    "type": "number",
    "constant": "5,4",
    "decimalChar": ","
  },
  {
    "name": "A Date",
    "type": "date",
    "constant": "10/1/2015",
    "format": "%m/%d/%Y"
  },
  {
    "name": "An Array",
    "type": "array",
    "constant": "[3.14, 2.78]"
  },
  {
    "name": "Last Example",
    "type": "array",
    "constant": [3.14, 2.78]
  }
]
```

### ColumnTypes 

The _ColumnType_ taxonomy provides many common properties of fiscal concepts which appear as columns in many different fiscal data files. 

When describing a fiscal data file, each column in a fiscal data file must be mapped to a single _ColumnType_ (Unmapped columns should simply be ignored).

By inspecting the different _ColumnTypes_ of the different columns in a file, one might get a good understanding of the meaning of each column and how different columns relate to one another.

#### ColumnType Hierarchy Tree

_ColumnTypes_ are hierarchic: starting from very generic concepts at the root of the taxonomy (time, source, recipient, amount etc.), down to more and more specific concepts (via inheritance) - each one specialising its parent concept with a more fine-grained meaning.

The names of the _ColumnTypes_ represent that hierarchy. Each new level of the hierarchy is appended to the _ColumnType_ name, separated by colons.

For example, the `activity:generic:project:code` _ColumnType_ is a non-specific project code. It's part of the "activity" fiscal concept (i.e. which activity is funded), describes a "project" (which is one kind of activity - others might be "program" or "contract") and specifically targets the unique project code (and not its name, description or other property).

#### ColumnType Basic Properties

Each _ColumnType_ in the taxonomy can also have the following properties:
- `dataType`: a `tableschema` type.
  This property states that columns with this _ColumnType_ must also have this data type. For example, the `date:fiscal-year` column type (denoting a Fiscal Year) must always be mapped to a column with the `integer` data type.
- `unique`: boolean (default: false)
  Mapping a column to a _ColumnType_ which has `unique` set to true, means that this column should be considered as part of the "primary key" of the table.
  For example, the `transaction-id` _ColumnType_ has the `unique` property set.
- `labelOf`: a `unique` _ColumnType_ name
  When a column contains labels for another column (usually containing codes), we will indicate this relationship using the `labelOf` property. This tells readers of the file that the "label" column contains display-names for the values of the "code" column.
  
Now for a few examples. We start with the _type definition_ of the fiscal year concept from above - a column of the `date:fiscal-year` _ColumnType_ must have an `integer` type and be part of the primary key of the schema:
```json
{
  "name": "date:fiscal-year",
  "dataType": "integer",
  "unique": true
}
```

Similarly, this is the definition for a generic country code, the `geo:address:country:code` _ColumnType_:
```json
{
  "name": "geo:address:country:code",
  "dataType": "string",
  "unique": true
}
```
The main difference here is the data type - country codes are `string`s.

If we have in our dataset not only the country code but also the name of the country, we might consider using the `geo:address:country:label` _ColumnType_:
```json
{
  "name": "geo:address:country:label",
  "dataType": "string",
  "labelOf": "geo:address:country:code",
}
```
Notice how this _ColumnType_ declares that it's the label of another type (`geo:address:country:code`). It's also not marked as unique, so it should not be a part of the schema's primary field.

The `labelOf` relationship might be used by implementors to choose which columns should be used for filtering a data set (usually the "codes") and which columns should be used for the filtering options that will be shown to users (usually the "labels").

Note: while not strictly enforced, mapping columns to "label" _ColumnTypes_ without their "code" counterparts should be avoided.

#### Composite Column Types

_ColumnTypes_ can be composite - for example, an `address` _ColumnType_ can be inherited by the `address:city`, `address:street` and `address:street-number` _ColumnTypes_. All of these, together, compose an _address_. 

Composite _ColumnTypes_ might also have an inherent order - for example, a multi-level classification of a budget line. In this case, the _ColumnTypes_ for the 1st and 2nd levels of that classification will both inherit from the classification's _ColumnType_, and the 2nd level _ColumnType_ will contain a `prior` property, pointing to the 1st level _ColumnType_.

As an example, consider the non-specific administrative classification _ColumnType_, `administrative-classification:generic`. In most cases, this classification is multi-leveled, e.g. the first level might indicate a ministry, the second a department in that ministry and so on.

Therefore, columns describing the first level of that classification should be mapped to _ColumnTypes_ inherting from `administrative-classification:generic:level1`. The column containing the code of the ministry (in our example) would be mapped to `administrative-classification:generic:level1:code`, while the name of the ministry would be mapped to `administrative-classification:generic:level1:label`.

Same goes for the department code and name columns, which would be mapped to the `administrative-classification:generic:level2:code` and `administrative-classification:generic:level2:label` _ColumnTypes_ respectively.

To indicate the connection between these two levels, we would add a `prior` property to the `administrative-classification:generic:level2:code` type, with a value of `administrative-classification:generic:level1:code`.

Then, when fetching the unique identifier for the administrative classification for a specific row, we would simply collect all values from columns with _ColumnTypes_ inheriting from `administrative-classification` having `unique=true`, ordered using the values of the `prior` property.

It is not required to map columns to all levels of a composite _ColumnType_. For example, consider a Geographic Classification system: Country > State > Region > County > City. It's possible to map column just to the Country and City levels of the classification. Order is still maintained and missing levels are simply ignored.

As an example for using the `prior` property, let's consider this _phone number_ example:

```json
[
  {
    "name": "recipient:phone-number:country-code",
    "dataType": "string"
  },
  {
    "name": "recipient:phone-number:national-prefix",
    "dataType": "string",
    "prior": "recipient:phone-number:country-code"
  },
  {
    "name": "recipient:phone-number:number",
    "dataType": "string"
    "prior": "recipient:phone-number:national-prefix"
  },
  {
    "name": "recipient:phone-number:extension",
    "dataType": "string"
    "prior": "recipient:phone-number:number"
  }
]
```

The `recipient:phone-number` concept is composed out of 4 parts: `country-code`, `national-prefix`, `number` and `extension`. 

When displaying the phone number, we use the `prior` relationship to define exactly in which order to show them - so that `number` never appears before `country-code`. 

We also don't need to have all these concepts present in a data-set to be able to set the order between them - for example, we might have a file without a `country-code` (as all numbers are local), without a `national-prefix` (because `number` already contains that) or without an `extension`. In any of these cases we are still able to make out the correct order of the remaining concepts.

#### Custom ColumnTypes

##### Implicit typing

Custom _ColumnTypes_ can be used without declaring them in advance.

The properties of each _ColumnType_ are implicitly derived from other _ColumnTypes_ based on their name. 

For example, recall the `geo:address:country:label` _ColumnType_:
```json
{
  "name": "geo:address:country:label",
  "dataType": "string",
  "labelOf": "geo:address:country:code",
}
```

Let's assume that we have a dataset with country names in English, and another in our local language. To indicate the difference between these columns, we could map the first to the standard `geo:address:country:label` _ColumnType_, and the second to a custom `geo:address:country:label:localized`.

While the former is a predefined _ColumnType_ and part of this spec, the latter is not. However, its properties can be deduced - simply by finding an existing _ColumnType_ whose name is a prefix to its own, and copying its properties.

Therefore, implementations encountering unknown _ColumnTypes_ should try and deduce their properties by finding another _ColumnType_ whose name is a prefix to the unknown type's name - and copying its properties.  If more than one such _ColumnType_ exists, properties should be copied from all of them - with precedence on duplicate property names to be given to the longer prefix.

If such an existing type is not found, then the _ColumnType_ is still valid - except it won't have any restrictions on data types, won't have relationships with the other columns and won't be part of the schema's primary key.

##### Explicit typing

In many cases there might be a need to explicitly define one or more types. 
It might be because we're missing a specific type (which has some specific properties or a relationships to another existing type). It might also be because we want to provide a full taxonomy, better fitting the specific domain which our dataset belongs to.

In these cases, we would attach to the fiscal data package descriptor a "_ColumnType_ definition package". This package contains definitions for any _ColumnType_ that is required to model the data.

The format of the _ColumnType_ definition package is quite simple - a JSON array, containing _ColumnType_ definitions as its items, for example:
```yaml
# From https://www.car-makers-association.org/taxonomy/v1.3/columnTypes.json
[ 
  {
    "name": "car:model",
    "dataType": "string"
  },
  {
    "name": "date:manufacture-year",
    "dataType": "integer"
  }
]
```

When attached to the fiscal data package descriptor, it can be either attached inline, or as a URL, pointing to a JSON file containing the package.

The top-level `columnTypes` property of the fiscal data package descriptor holds one or more _ColumnType_ definitions or definition packages. It is an array of items, which are interpreted like so:
- If the array item is an object, it is interpreted as a single _ColumnType_ definition.
- If the array item is an array, it is interpreted as a _ColumnType_ definition package.
- If the array item is a string, it is interpreted as a URL for a _ColumnType_ definition package.

As an example, let's consider the following dataset containing sales figures for a used car agency:
```yaml
{
  "name": "biffs-used-car-agency-2017-q1",
  "resources": [
    #
  ],
```
So far it's quite straightforward (we omit the resources section for brevity).

Now we define the _ColumnTypes_ that are being used in this specification.
```yaml
  "columnTypes": [
    "https://frictionlessdata.io/taxonomies/fiscal/budgets.json",
```
We start by specifying that we'll be using the budget taxonomy _ColumnTypes_, as described [here](./fiscal-data-package--budgets.md).

This is also the default value for this property (in case its omitted in the spec).

We continue by including another taxonomy, from the made-up car makers association (which we saw above). This taxonomy is also added as URL, pointing to version 1.3 of that taxonomy.

```yaml
    "https://www.car-makers-association.org/taxonomy/v1.3/columnTypes.json",
```

Now we shall add a package inline - with a few car-sale related types:

```yaml
    [
      {
        "name": "salesperson:employee-id",
        "dataType": "integer",
        "unique": true
      },
      {
        "name": "salesperson:employee-fullname",
        "dataType": "string",
        "labelOf": "salesperson:employee-id"
      },
      {
        "name": "owner:previous:name",
        "dataType": "string"
      },
      {
        "name": "owner:new:name",
        "dataType": "string"
      }
    ],
```

Finally, we can also add a single type as well:

```yaml
    {
        "name": "owner:previous:is-scientist",
        "dataType": "boolean"
    }
  ]
}


```

## What's changed since v0.3 of the FDP Spec 

### Background

Via a wide range of technical implementation, partner piloting, and fiscal data projects with other civic tech and data journalist partners, we've learned a lot about what works in Fiscal Data package v0.3, and what does not. We want to take these learnings and make a more robust and future proof v1 of the specification.

Additionally, all work on the specification to date has been driven by very specific project delivery needs, and we have not done a great job of creating a contribution model for taking the specification forward. We'd like Fiscal Data Package v1 to have an open draft for comments, a better engagement process in general. This can then serve as a model for clearer contribution and governance around the specification going forward.

#### SCQH

`SCQH == Situation, Complication, Question, Hypothesis`

SCQH is a way of framing our work, and declaring the motivations for doing it.

* **Situation**: 
  * Fiscal Data Package v0.3 shipped in January 2016.
  * OpenSpending.org was designed around data storage in Fiscal Data Package.
  * Growing adoption through general use and reuse  of OpenSpending tools, through project work at OKI, and through piloting work with GIFT
  * Fiscal Data package is based on [Tabular Data Package](http://specs.frictionlessdata.io/tabular-data-package/), a [Frictionless Data](http://specs.frictionlessdata.io/) specification. Frictionless Data has seen greatly increased adoption over this period.

* **Complication**:
  * Implementation has highlighted areas of ambiguity in v0.3. A key area is ambiguity around what is declared as "metadata" and what is declared as a measure or dimension.
  * Implementation has highlighted simpler ways to represent "fiscal concepts" than the `model`, by more explicit reuse of the Table Schema specification and extension of this specification with "Column Types". This is mostly a technical issue, with the presentation of information in the descriptor.
  * Users (technical and non-technical) have often asked for more guidance on the types of fiscal concepts that are desirable for different types of fiscal data. We also found that being more explicit helps us build better tools.
  * Fiscal Data Package is not up-to-date with Tabular Data Package v1.

* **Question**: 
  * How do we evolve Fiscal Data Package to v1 so that ...
    * Ambiguity in the specification is removed.
    * Technical implementation is simplified.
    * Users get more direction on "what makes good fiscal data" (what fields are desirable for budget data, for spending data, etc.).
    * The specification has a community of contributors.

* **Hypothesis**:
  * An enhanced way to [represent fiscal data with column types](https://github.com/frictionlessdata/specs/issues/520) will remove ambiguity, and enable a clearer mental model to think about fiscal concepts generally
  * A new treatment of critical fiscal concepts like "[phase](https://github.com/frictionlessdata/specs/issues/518)" and "[direction](https://github.com/frictionlessdata/specs/issues/519)" will ensure the specification is able to handler a wider range of data (specifically, more localised contexts)
  * The specification needs [better examples](https://github.com/frictionlessdata/specs/issues/523) to demonstrate how flexible the approach is for fiscal data modeling in general
  * The specification needs [documentation that is more approachable](https://github.com/frictionlessdata/specs/issues/521) for non-technical users
  * The specification needs a clear [contribution and governance model](https://github.com/frictionlessdata/specs/issues/522).

### What's different?

In a nutshell, the notable changes from v0.3 to v1 are as follows:

- Consistent usage of "fiscal concepts" to model fiscal data (i.e. _ColumnTypes_), instead of the mix of metadata properties, measures and dimensions in v0.3 (all concepts are either a measure or a dimension)
- The representation of concepts on data resources, instead of on a distinct `model` property
- Improve implementation and semantics around direction and phase
- Have explicit recommendations on the desirable concepts for given types of fiscal data (budget, spend, etc.)
- Update to be based on Tabular Data Package v1

#### v0.3 restrictions on measures

1-

Measures in the v0.3 were stated as financial amount, while in fact were limited to only include monetary amounts (i.e. only amounts of money). This limited the use of the specification in many use-cases where the financial data included amounts of personnel, amounts of equipment or other resources.
This restriction has now been lifted, allowing the specification of any unit to describe an amount (currency as one among them). 

2-

In v0.3 of the spec, measures had some extra properties: currency, factor, direction & phase.
Currency, direction and phase had a strict set of values from which one must have been chosen.
This meant that in v0.3, each measure must have contained amount from exactly one phase, one direction and one currency.

In reality, many datasets contain a mixture of rows with different currencies, directions or phases. These datasets were not possible to describe in the previous version of the spec.
Furthermore, even for non-mixed datasets, the predefined selection of values for the properties proved to be too limiting in real-life scenarios and incompatible with many fiscal systems. For example, the phase property was said to have 4 possible values (proposed, approved, adjusted, executed). In Mexico, for example, there are more than these four phases, thus rendering this property useless.

v1 of this spec proposes to convert all the above properties to actual dimensions. If this information is already present in the dataset (e.g. as existing 'currency' or 'phase' columns), then it's possible to assign those columns the correct _ColumnTypes_ (for currenct, phase etc.). If the information is not present in the dataset, it's still possible to provide it using _measure denormalisation_ which will is described above.

#### v0.3 ambiguities / removal

- `fiscalYear` was a metadata property. This is now removed, and replaced by the `Period` concept.
- `granularity` was a metadata property, declaring a keyword that represents the type of fiscal data (budget, transaction, etc.). Usage, and need, is unclear, and the property will be removed.
- `fact`: an attribute such as an ID or reference number. Replaced by identifier concepts.

All other descriptor properties are consistent with Tabular Data Package v1, and are not fiscal-data specific.

### Upgrading Packages from v0.3 to v1.0+

I have data modeled with Fiscal Data Package - how do the changes impact me?

TODO.

## Appendix A: Predefined ColumnTypes

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

#### Actors involved in the Transaction (Administrator, Procurer)

##### `administrator:generic:id`

Unique identifier for the Administrator
 - *dataType*: string
 - *unique*: True

##### `administrator:generic:name`

The display name for the Administrator
 - *dataType*: string
 - *labelOf*: `administrator:generic:id`

##### `procurer:bank:account`

Unique identifier for the bank account of the Procurer
 - *dataType*: string

##### `procurer:bank:branch:code`

Unique identifier of the bank's branch of the Procurer
 - *dataType*: string
 - *unique*: True

##### `procurer:bank:branch:name`

Name of the bank's branch of the Procurer
 - *dataType*: string
 - *labelOf*: `procurer:bank:branch:code`

##### `procurer:bank:code`

Unique identifier for the bank of the Procurer
 - *dataType*: string
 - *unique*: True

##### `procurer:generic:id`

Unique identifier for the Procurer
 - *dataType*: string
 - *unique*: True

##### `procurer:generic:name`

The display name of the Procurer
 - *dataType*: string
 - *labelOf*: `procurer:generic:id`

#### Recipient of the Transaction

##### `recipient:bank:account`

Unique identifier for the bank account of the Recipient
 - *dataType*: string

##### `recipient:bank:branch:code`

Unique identifier of the bank's branch of the Recipient
 - *dataType*: string
 - *unique*: True

##### `recipient:bank:branch:name`

Name of the bank's branch of the Recipient
 - *dataType*: string
 - *labelOf*: `recipient:bank:branch:name`

##### `recipient:bank:code`

Unique identifier for the bank of the Recipient
 - *dataType*: string
 - *unique*: True

##### `recipient:generic:id`

Unique identifier for the Recipient
 - *dataType*: string
 - *unique*: True

##### `recipient:generic:legal-entity:code-type`

Unique identifier for the codelist from which the legal entity code comes from
 - *dataType*: string
 - *prior*: `recipient:generic:id`
 - *unique*: True

##### `recipient:generic:legal-entity:code`

Unique identifier for the legal entity
 - *dataType*: string
 - *prior*: `recipient:generic:legal-entity:code-type`
 - *unique*: True

##### `recipient:generic:legal-entity:label`

Trading name (or other) of the legal entity
 - *dataType*: string
 - *labelOf*: `recipient:generic:legal-entity:code`

##### `recipient:generic:legal-entity:point-of-contact:description`

Text describing the representative of the legal entity
 - *dataType*: string

##### `recipient:generic:legal-entity:receiving-project:code`

Code of the specific project inside the legal entity
 - *dataType*: string
 - *prior*: `recipient:generic:legal-entity:code`
 - *unique*: True

##### `recipient:generic:legal-entity:receiving-project:description`

Name of the specific project inside the legal entity
 - *dataType*: string

##### `recipient:generic:legal-entity:receiving-project:label`

Name of the specific project inside the legal entity
 - *dataType*: string
 - *labelOf*: `recipient:generic:legal-entity:receiving-project:code`

##### `recipient:generic:legal-entity:receiving-project:status`

Status of the specific project inside the legal entity
 - *dataType*: string

##### `recipient:generic:name`

The display name for the Recipient
 - *dataType*: string
 - *labelOf*: `recipient:generic:id`

##### `recipient:generic:url`

An Internet address for the Recipient
 - *dataType*: string

#### Supplier Details

##### `supplier:generic:id`

Unique identifier for the Supplier
 - *dataType*: string
 - *unique*: True

##### `supplier:generic:name`

The display name for the Supplier
 - *dataType*: string
 - *labelOf*: `supplier:generic:id`

#### Transaction Details

##### `transaction-id:budget-code`

Unique identifier for the Budget Line for this transaction
 - *dataType*: string
 - *unique*: True

##### `transaction-id:code`

A Unique identifier for this transaction
 - *dataType*: string
 - *unique*: True

##### `transaction-id:contract-id`

Unique identifier for the Contract for this transaction
 - *dataType*: string
 - *unique*: True

##### `transaction-id:court-order`

Unique identifier for the Court Order for this transaction
 - *dataType*: string
 - *unique*: True

##### `transaction-id:invoice-id`

Unique identifier for the Invoice for this transaction
 - *dataType*: string
 - *unique*: True

##### `transaction-id:purchase-order`

Unique identifier for the Purchase Order for this transaction
 - *dataType*: string
 - *unique*: True

##### `transaction-id:tender-id`

Unique identifier for the Tender for this transaction
 - *dataType*: string
 - *unique*: True

##### `transaction-id:tender-kind`

Unique identifier for the Tender Kind for this transaction
 - *dataType*: string

##### `transaction-id:transaction-kind`

Unique identifier for the Transaction Kind for this transaction
 - *dataType*: string

#### Geographic Information

##### `geo:address:city:code`

The code of the city part of the address
 - *dataType*: string
 - *prior*: `geo:address:county:code`
 - *unique*: True

##### `geo:address:city:label`

The name of the city part of the address
 - *dataType*: string
 - *labelOf*: `geo:address:city:code`

##### `geo:address:country:code`

The code of the country part of the address
 - *dataType*: string
 - *unique*: True

##### `geo:address:country:label`

The name of the country part of the address
 - *dataType*: string
 - *labelOf*: `geo:address:country:code`

##### `geo:address:county:code`

The code of the county part of the address
 - *dataType*: string
 - *prior*: `geo:address:region:code`
 - *unique*: True

##### `geo:address:county:label`

The name of the county part of the address
 - *dataType*: string
 - *labelOf*: `geo:address:county:code`

##### `geo:address:region:code`

The code of the region part of the address
 - *dataType*: string
 - *prior*: `geo:address:country:code`
 - *unique*: True

##### `geo:address:region:label`

The name of the region part of the address
 - *dataType*: string
 - *labelOf*: `geo:address:region:code`

##### `geo:address:street-address:description`

Actual street address in whole address
 - *dataType*: string

##### `geo:address:zip:code`

The postal code in the address
 - *dataType*: string
 - *prior*: `geo:address:city:code`
 - *unique*: True

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
