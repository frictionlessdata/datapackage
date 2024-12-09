---
title: Category Tables
---

<table>
  <tr>
    <th>Authors</th>
    <td>Kyle Husmann, Jan van der Laan, Albert-Jan Roskam, Phil Schumm</td>
  </tr>
</table>

Category Table Resources are Tabular Data Resources that can be referenced in the `categories` property of a field descriptor. This is useful when there are many (e.g., thousands) of categorical levels (e.g., as with controlled vocabularies such as Medical Subject Headings (MeSH)), the same `categories` definitions are repeated across many fields (e.g., the same Likert scale applied to a series of items), or the categorical levels include a signficant amount of additional metadata (e.g., a hierarchical ontology such as the International Classification of Diseases (ICD)). Category Table Resources may be shared across data packages to facilitate harmonization, and provide support for categorical variables (e.g., as in Pandas, R, or Julia) or value labels (e.g., as in Stata, SAS, or SPSS).

## Specification

The Category Table Resource builds directly on the Tabular Data Resource specification. A Category Table Resource `MUST` be a Tabular Data Resource and conform to the [Tabular Data Resource specification](/standard/data-resource/#tabular).

In addition to the requirements of a Tabular Data Resource, Category Table Resources MUST have an additional
`categoryFieldMap` property of type `object` with the following properties:

- There `MUST` be a `value` property of type `string` that specifies the name of the field in the Category Table Resource containing the values for the categories as they would appear in a focal data resource. The field indicated by `value` `MUST` exist in the Category Table Resource and be of field type `string` or `integer`.

- There `MAY` be an optional `label` property of type `string` that specificies the name of the field in the Category Table Resource containing labels for the categories. When specified, the field indicated by `label` `MUST` exist in the Category Table Resource and be of field type `string`.

- There `MAY` be an optional `ordered` property of type `boolean`. When `ordered` is `true`, implementations `SHOULD` regard the order of appearance of the values in the Category Table Resource as their natural order. When `false` implementations `SHOULD` assume that the categories do not have a natural order. When the property is not present, no assumption about the ordered nature of the values `SHOULD` be made.

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

Category Table Resources can be referenced by name in the `categories` property of a field definition in a Tabular Data Resource. For example, the following is a valid field definition that references the `fruit-codes` Category Table Resource defined above:

```json
{
  "name": "fruit",
  "type": "string",
  "categories": "fruit-codes"
}
```

As with the [External Foreign Keys](/recipes/external-foreign-keys/) recipe, references to Category Table Resources in external packages can be made by specifying the `categories` property as an object with a `package` and `resource` property, both required to be of type `string`. For example:

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

Fields in a focal data resource referencing a Category Table Resource via the `categories` property `MUST` have a type identical to the type of the corresponding `value` field in the Category Table Resource.

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
