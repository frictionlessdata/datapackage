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

Category Table Resources are used by providing the `categories` property of a categorical field descriptor with an `object` with the following properties:

- There `MUST` be a `resource` property of type `string` that specifies the name of the Category Table Resource to be used.

- There `MAY` be an optional `package` property of type `string` that specifies the package containing the Category Table Resource to be used. As with the [External Foreign Keys](/recipes/external-foreign-keys/) recipe, the `package` property `MUST` be either a fully qualified HTTP address to a Data Package `datapackage.json` file or a data package name that can be resolved by a canonical data package registry. If omitted, implementations `SHOULD` assume the Category Table Resource is in the current data package.

- There `MAY` be an optional `encodedAs` property of type `string` that specifies whether the values of the focal categorical field reference the `value` or `label` field of the Category Table Resource. When `encodedAs` is `"value"`, the values of the focal categorical field are mapped to the values of the `value` field in the Category Table Resource. When `encodedAs` is `"label"`, the values of the focal categorical field are mapped to the values of the `label` field in the Category Table Resource. When `encodedAs` is omitted, implementations `SHOULD` assume the values of the categorical field are the values of the `value` field in the Category Table Resource.

For example, the following field definition references the `fruit-codes` Category Table Resource defined above if it was in the same data package used the `value`s of the Category Table Resource (in this case, the `code` field of `fruit-codes`):

```json
{
  "name": "fruit",
  "type": "string",
  "categories": {
    "resource": "fruit-codes"
  }
}
```

Alternatively, if the `fruit-codes` Category Table Resource was in an external data package and used the Category Table Resource's `label`s to represent the field's options (in this case, the `name` field of `fruit-codes`), the field definition would be:

```json
{
  "name": "fruit",
  "type": "string",
  "categories": {
    "package": "http://example.com/package.json",
    "resource": "fruit-codes",
    "encodedAs": "label"
  }
}
```

## Constraints

In a Category Table Resource, the field referenced by the `value` property `MUST` validated with `"required": true` and `"unique": true` field constraints. Similarly, when `label` is specified, the field it references `MUST` be of type `string` and be validated with the `"unique": true` field constraint.

Fields in a focal data resource referencing a Category Table Resource via the `categories` property `MUST` have a type identical to the type of the corresponding `value` field in the Category Table Resource. For example, the following is an invalid references to the `fruit-codes` Category Table Resource because the `type` of the categorical field being defined is `integer` while the `value` field in the `fruit-codes` Category Table Resource is of type `string`:

```json
{
  "name": "fruit",
  "type": "integer",
  "categories": "fruit-codes"
}
```

## Internationalization

Alternate translations of the category labels can be provided by way of the [Language Support](/recipes/language-support) recipe. The following example shows how the fruit-codes table from the previous example could be extended to support multiple languages:

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

## Discussion

Being able to define lists of categories in a separate data resource has a number of advantages:

- In case of a large number of categories it is often easier to maintain these in files, such as CSV files. This also keeps the `datapackage.json` file compact and readable for humans.

- The data set in the category table resource can store additional information besides the 'value' and 'label'. For example, the categories could have descriptions or the categories could form a hierarchy.

- It is also possible to store additional meta data in the category table resource. For example, it is possible to indicate the source, license, version and owner of the data resource. This is important for many 'official' categories lists where there can be many similar versions maintained by different organisations.

- When different fields use the same categories they can all refer to the same category table resource. First, this allows to reuse of the categories. Second, by referring to the same data resource, the field descriptors can indicate that the categories are comparable between fields.

- It is possible to refer to category table resources in other data packages. This makes it, for example, possible to create centrally maintained repositories of categories.
