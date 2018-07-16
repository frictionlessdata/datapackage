title: Fiscal Data Package - Spending Standard Taxonomy
---
slug: fiscal-data-package--spending
---
version: 1.0rc1
---
updated: 22 April 2018
---
created: 14 March 2014
---
abstract:

The Budget Taxonomy is a set of ClumnTypes to be used in the context of a Fiscal Data Package to describe spending data of organisations (governments or otherwise.)  
---
body:


!! NOTE: This is a draft specification and still under development. If you have comments or suggestions please file them in the [issue tracker][issues]. If you have explicit changes please fork the [git repo][repo] and submit a pull request.


[issues]: https://github.com/frictionlessdata/specs/issues
[repo]: https://github.com/frictionlessdata/specs/issues

## Changelog

- `1.0.0rc1`: Initial text

[toc]

## Introduction

This document contains a _ColumnType_ taxonomy to be used for publishing spending data files. It should be used in conjuction with the budget taxonomy, as it contains some common _ColumnTypes_ as well.

The _ColumnTypes_ contained in this taxonomy contain:
- Transactions Identifiers
- Details about admimistrators, procurers, suppliers and recipients
- Some Geographic related types (esp. for addresses)

## References
- [The Fiscal Data Package Spec](/specs/fiscal-data-package/)

## Location 

The canonic location for this taxonomy's _ColumnType_ definition - to be used in fiscal data package descriptors - is

`https://frictionlessdata.io/taxonomies/fiscal/spending.json`

## The Taxonomy

#### Amounts and their properties

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

