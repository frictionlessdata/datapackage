---
title: Missing Values per Field
---

Characters representing missing values in a table can be defined for all fields in a [Tabular Data Resource](http://frictionlessdata.io/specs/tabular-data-resource/) using the [`missingValues`](http://frictionlessdata.io/specs/table-schema/#missing-values) property in a Table Schema. Values that match the `missingValues` are treated as `null`.

The Missing values per field pattern allows different missing values to be specified for each field in a Table Schema. If not specified, each field inherits from values assigned to `missingValues` at the Tabular Data Resource level.

For example, this data...

| item | description | price |
| ---- | ----------- | ----- |
| 1    | Apple       | 0.99  |
| tba  | Banana      | -1    |
| 3    | n/a         | 1.20  |

...using this Table Schema...

```javascript
"schema":{
  "fields": [
    {
      "name": "item",
      "title": "An inventory item number",
      "type": "integer"
    },
    {
      "name": "description",
      "title": "item description",
      "type": "string",
      "missingValues": [ "n/a"]
    },
    {
      "name": "price",
      "title": "cost price",
      "type": "number",
      "missingValues": [ "-1"]
    }
  ],
  "missingValues": [ "tba", "" ]
}
```

...would be interpreted as...

| item   | description | price  |
| ------ | ----------- | ------ |
| 1      | Apple       | 0.99   |
| `null` | Banana      | `null` |
| 3      | `null`      | 1.20   |

## Specification

A field MAY have a `missingValues` property that MUST be an `array` where each entry is a `string`. If not specified, each field inherits from the values assigned to [`missingValues`](http://frictionlessdata.io/specs/table-schema/#missing-values) at the Tabular Data Resource level.

## Implementations

None known.
