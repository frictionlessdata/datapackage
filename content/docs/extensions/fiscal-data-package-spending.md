---
title: Fiscal Data Package - Spending Standard Taxonomy
---

:::warning
This is a draft specification and still under development. If you have comments or suggestions please file them in the [issue tracker][issues]. If you have explicit changes please fork the [git repo][repo] and submit a pull request.
:::

[issues]: https://github.com/frictionlessdata/specs/issues
[repo]: https://github.com/frictionlessdata/specs/issues

The Budget Taxonomy is a set of ColumnTypes to be used in the context of a Fiscal Data Package to describe spending data of organizations (governments or otherwise.)

## Language

The key words <code>MUST</code>, <code>MUST NOT</code>, <code>REQUIRED</code>, <code>SHALL</code>, <code>SHALL NOT</code>, <code>SHOULD</code>, <code>SHOULD NOT</code>, <code>RECOMMENDED</code>, <code>MAY</code>, and <code>OPTIONAL</code> in this document are to be interpreted as described in <a href="https://www.ietf.org/rfc/rfc2119.txt" target="_blank" title="RFC 2119">RFC 2119</a>

## Changelog

- `1.0.0rc1`: Initial text

## Introduction

This document contains a _ColumnType_ taxonomy to be used for publishing spending data files. It should be used in conjunction with the budget taxonomy, as it contains some common _ColumnTypes_ as well.

The _ColumnTypes_ contained in this taxonomy contain:

- Transactions Identifiers
- Details about administrators, procurers, suppliers and recipients
- Some Geographic related types (esp. for addresses)

## References

- [The Fiscal Data Package Spec](/fiscal-data-package/)

## Location

The canonic location for this taxonomy's _ColumnType_ definition - to be used in fiscal data package descriptors - is

`https://specs.frictionlessdata.io/taxonomies/fiscal/spending.json`

## The Taxonomy

#### Amounts and their properties

#### Geographic Information

##### `geo:address:city:code`

The code of the city part of the address

- _dataType_: string
- _prior_: `geo:address:county:code`
- _unique_: True

##### `geo:address:city:label`

The name of the city part of the address

- _dataType_: string
- _labelOf_: `geo:address:city:code`

##### `geo:address:country:code`

The code of the country part of the address

- _dataType_: string
- _unique_: True

##### `geo:address:country:label`

The name of the country part of the address

- _dataType_: string
- _labelOf_: `geo:address:country:code`

##### `geo:address:county:code`

The code of the county part of the address

- _dataType_: string
- _prior_: `geo:address:region:code`
- _unique_: True

##### `geo:address:county:label`

The name of the county part of the address

- _dataType_: string
- _labelOf_: `geo:address:county:code`

##### `geo:address:region:code`

The code of the region part of the address

- _dataType_: string
- _prior_: `geo:address:country:code`
- _unique_: True

##### `geo:address:region:label`

The name of the region part of the address

- _dataType_: string
- _labelOf_: `geo:address:region:code`

##### `geo:address:street-address:description`

Actual street address in whole address

- _dataType_: string

##### `geo:address:zip:code`

The postal code in the address

- _dataType_: string
- _prior_: `geo:address:city:code`
- _unique_: True

#### Actors involved in the Transaction (Administrator, Procurer)

##### `administrator:generic:id`

Unique identifier for the Administrator

- _dataType_: string
- _unique_: True

##### `administrator:generic:name`

The display name for the Administrator

- _dataType_: string
- _labelOf_: `administrator:generic:id`

##### `procurer:bank:account`

Unique identifier for the bank account of the Procurer

- _dataType_: string

##### `procurer:bank:branch:code`

Unique identifier of the bank's branch of the Procurer

- _dataType_: string
- _unique_: True

##### `procurer:bank:branch:name`

Name of the bank's branch of the Procurer

- _dataType_: string
- _labelOf_: `procurer:bank:branch:code`

##### `procurer:bank:code`

Unique identifier for the bank of the Procurer

- _dataType_: string
- _unique_: True

##### `procurer:generic:id`

Unique identifier for the Procurer

- _dataType_: string
- _unique_: True

##### `procurer:generic:name`

The display name of the Procurer

- _dataType_: string
- _labelOf_: `procurer:generic:id`

#### Recipient of the Transaction

##### `recipient:bank:account`

Unique identifier for the bank account of the Recipient

- _dataType_: string

##### `recipient:bank:branch:code`

Unique identifier of the bank's branch of the Recipient

- _dataType_: string
- _unique_: True

##### `recipient:bank:branch:name`

Name of the bank's branch of the Recipient

- _dataType_: string
- _labelOf_: `recipient:bank:branch:name`

##### `recipient:bank:code`

Unique identifier for the bank of the Recipient

- _dataType_: string
- _unique_: True

##### `recipient:generic:id`

Unique identifier for the Recipient

- _dataType_: string
- _unique_: True

##### `recipient:generic:legal-entity:code-type`

Unique identifier for the codelist from which the legal entity code comes from

- _dataType_: string
- _prior_: `recipient:generic:id`
- _unique_: True

##### `recipient:generic:legal-entity:code`

Unique identifier for the legal entity

- _dataType_: string
- _prior_: `recipient:generic:legal-entity:code-type`
- _unique_: True

##### `recipient:generic:legal-entity:label`

Trading name (or other) of the legal entity

- _dataType_: string
- _labelOf_: `recipient:generic:legal-entity:code`

##### `recipient:generic:legal-entity:point-of-contact:description`

Text describing the representative of the legal entity

- _dataType_: string

##### `recipient:generic:legal-entity:receiving-project:code`

Code of the specific project inside the legal entity

- _dataType_: string
- _prior_: `recipient:generic:legal-entity:code`
- _unique_: True

##### `recipient:generic:legal-entity:receiving-project:description`

Name of the specific project inside the legal entity

- _dataType_: string

##### `recipient:generic:legal-entity:receiving-project:label`

Name of the specific project inside the legal entity

- _dataType_: string
- _labelOf_: `recipient:generic:legal-entity:receiving-project:code`

##### `recipient:generic:legal-entity:receiving-project:status`

Status of the specific project inside the legal entity

- _dataType_: string

##### `recipient:generic:name`

The display name for the Recipient

- _dataType_: string
- _labelOf_: `recipient:generic:id`

##### `recipient:generic:url`

An Internet address for the Recipient

- _dataType_: string

#### Supplier Details

##### `supplier:generic:id`

Unique identifier for the Supplier

- _dataType_: string
- _unique_: True

##### `supplier:generic:name`

The display name for the Supplier

- _dataType_: string
- _labelOf_: `supplier:generic:id`

#### Transaction Details

##### `transaction-id:budget-code`

Unique identifier for the Budget Line for this transaction

- _dataType_: string
- _unique_: True

##### `transaction-id:code`

A Unique identifier for this transaction

- _dataType_: string
- _unique_: True

##### `transaction-id:contract-id`

Unique identifier for the Contract for this transaction

- _dataType_: string
- _unique_: True

##### `transaction-id:court-order`

Unique identifier for the Court Order for this transaction

- _dataType_: string
- _unique_: True

##### `transaction-id:invoice-id`

Unique identifier for the Invoice for this transaction

- _dataType_: string
- _unique_: True

##### `transaction-id:purchase-order`

Unique identifier for the Purchase Order for this transaction

- _dataType_: string
- _unique_: True

##### `transaction-id:tender-id`

Unique identifier for the Tender for this transaction

- _dataType_: string
- _unique_: True

##### `transaction-id:tender-kind`

Unique identifier for the Tender Kind for this transaction

- _dataType_: string

##### `transaction-id:transaction-kind`

Unique identifier for the Transaction Kind for this transaction

- _dataType_: string
