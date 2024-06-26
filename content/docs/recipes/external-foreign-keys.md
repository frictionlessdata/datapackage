---
title: External Foreign Keys
---

<table>
  <tr>
    <th>Authors</th>
    <td>Stephen Gates</td>
  </tr>
</table>

A foreign key is a reference where values in a field (or fields) in a Tabular Data Resource link to values in a field (or fields) in a Tabular Data Resource in the same or in another Tabular Data Package.

This pattern allows users to link values in a field (or fields) in a Tabular Data Resource to values in a field (or fields) in a Tabular Data Resource in a different Tabular Data Package.

## Specification

The [`foreignKeys`](/standard/table-schema/#foreignkeys) array MAY have a property `package`. This property MUST be, either:

- a string that is a fully qualified HTTP address to a Data Package `datapackage.json` file
- a data package [`name`](/standard/data-package/#name) that can be resolved by a canonical data package registry

If the referenced data package has an [`id`](/standard/data-package/#id) that is a fully qualified HTTP address, it SHOULD be used as the `package` value.

For example:

```
"foreignKeys": [{
    "fields": ["code"],
    "reference": {
      "package": "https://raw.githubusercontent.com/frictionlessdata/example-data-packages/master/donation-codes/datapackage.json",
      "resource": "donation-codes",
      "fields": ["donation code"]
    }
  }]
```
