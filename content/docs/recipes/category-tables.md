---
title: Category Tables
---

<table>
  <tr>
    <th>Authors</th>
    <td>Kyle Husmann, Jan van der Laan, Albert-Jan Roskam, Phil Schumm</td>
  </tr>
</table>

Category Table Resources are Tabular Data Resources that can be referenced in the `categories` property of field definitions. This is useful when there are many (e.g. thousands) of categorical levels, the same `categories` definitions are repeated across many fields, or the categorical levels include a signficant amount of additional metadata.

## Specification

The Category Table Resource builds directly on the Tabular Data Resource specification. Thus a Category Table Resource `MUST` be a Tabular Data Resource and conform to the [Tabular Data Resource specification](/standard/data-resource/#tabular).

In addition to the requirements of the Tabular Data Resource, Category Table Resources MUST have an additional
`categoryFieldMap` property of type `object` with the following properties:

- There `MUST` be a `value` property of type `string` that specifies the name of the field in the table that contains the values for the categories defined in the table. The field indicated by `value` `MUST` exist in the table and be of field type `string` or `integer`.

- There `MAY` be an optional `label` property of type `string` that specificies the name of the field in the table that contains the labels for the categories defined in the table. When specified, the field indicated by `label` `MUST` exist in the table and be of field type `string`.

- There `MAY` be an optional `ordered` field of type `boolean`. When `ordered` is `true`, implementations `SHOULD` regard the order of appearance of the values in the Category Table Resource as their natural order. When `false` implementations `SHOULD` assume that the categories do not have a natural order; when the property is not present, no assumption about the ordered nature of the values `SHOULD` be made.

For example, the following is a valid Category Table Resource:

```json
{
  "name": "fruit-codes",
  "type": "table",
  "categoryFieldMap": {
    "value": "code",
    "label": "name",
    "ordered": false
  },
  "schema": {
    "fields": [
      { "name": "code", "type": "string" },
      { "name": "name", "type": "string" }
    ]
  },
  "data": [
    { "code": "A", "name": "Apple" },
    { "code": "B", "name": "Banana" },
    { "code": "C", "name": "Cherry" }
  ]
}
```

## Usage

Category Table Resources can be referenced by name in `categories` properties of field definitions. For example, the following is a valid field definition that references the `fruit-codes` Category Table Resource:

```json
{
  "name": "fruit",
  "type": "string",
  "categories": "fruit-codes"
}
```

As with the [External Foreign Keys](/recipes/external-foreign-keys/) recipe, references to Category Table Resources in external packages can be made by providing the `categories` property an object with a `package` and `resource` property, both required `string`s. For example:

```json
{
  "name": "fruit",
  "type": "string",
  "categories": {
    "package": "http://example.com/package.json",
    "resource": "fruit-codes"
  }
}
```

## Constraints

In a Category Table Resource, the field referenced by the `valueField` property `MUST` validated with `"required": true` and `"unique": true` field constraints. Similarly, when `labelField` is specified, the field it references `MUST` be of type `string` and be validated with the `"unique": true` field constraint.

Fields referencing a Category Table Resource via the `categories` property `MUST` be of a type that matches the `value` type of the Category Table Resource.

## Internationalization

Alternate transations of the category labels can be provided by way of the [Language Support](/recipes/language-support) recipe. The following example shows how the fruit-codes table from the previous example could be extended to support multiple languages:

```json
{
  "name": "fruit-codes",
  "type": "table",
  "languages": ["en", "nl"],
  "categoryFieldMap": {
    "value": "code",
    "label": "name",
    "ordered": false
  },
  "schema": {
    "fields": [
      { "name": "code", "type": "string" },
      { "name": "name", "type": "string" },
      { "name": "name@nl", "type": "string" }
    ]
  },
  "data": [
    { "code": "A", "name": "Apple", "name@nl": "Appel" },
    { "code": "B", "name": "Banana", "name@nl": "Banaan" },
    { "code": "C", "name": "Cherry", "name@nl": "Kers" }
  ]
}
```
