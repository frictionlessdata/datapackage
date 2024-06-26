---
title: Data Catalog
---

<table>
  <tr>
    <th>Authors</th>
    <td>Michael Joseph Rosenthal</td>
  </tr>
</table>

There are scenarios where one needs to describe a collection of data packages, such as when building an online registry, or when building a pipeline that ingests multiple datasets.

In these scenarios, the collection can be described using a "Catalog", where each dataset is represented as a single resource which has:

```json
{
  "profile": "data-package",
  "format": "json"
}
```

## Specification

The Data Package Catalog builds directly on the Data Package specification. Thus a Data Package Catalog `MUST` be a Data Package and conform to the [Data Package specification][dp].

The Data Package Catalog has the following requirements over and above those imposed by Data Package:

- There `MUST` be a `profile` property with the value `data-package-catalog`, or a `profile` that extends it
- Each resource `MUST` also be a Data Package

### Examples

A generic package catalog:

```json
{
  "profile": "data-package-catalog",
  "name": "climate-change-packages",
  "resources": [
    {
      "profile": "json-data-package",
      "format": "json",
      "name": "beacon-network-description",
      "path": "https://http://beacon.berkeley.edu/hypothetical_deployment_description.json"
    },
    {
      "profile": "tabular-data-package",
      "format": "json",
      "path": "https://pkgstore.datahub.io/core/co2-ppm/10/datapackage.json"
    },
    {
      "profile": "tabular-data-package",
      "name": "co2-fossil-global",
      "format": "json",
      "path": "https://pkgstore.datahub.io/core/co2-fossil-global/11/datapackage.json"
    }
  ]
}
```

A minimal tabular data catalog:

```json
{
  "profile": "tabular-data-package-catalog",
  "name": "datahub-climate-change-packages",
  "resources": [
    {
      "path": "https://pkgstore.datahub.io/core/co2-ppm/10/datapackage.json"
    },
    {
      "name": "co2-fossil-global",
      "path": "https://pkgstore.datahub.io/core/co2-fossil-global/11/datapackage.json"
    }
  ]
}
```

Data packages can also be declared inline in the data catalog:

```json
{
  "profile": "tabular-data-package-catalog",
  "name": "my-data-catalog",
  "resources": [
    {
      "profile": "tabular-data-package",
      "name": "my-dataset",
      // here we list the data files in this dataset
      "resources": [
        {
          "profile": "tabular-data-resource",
          "name": "resource-name",
          "data": [
            {
              "id": 1,
              "first_name": "Louise"
            },
            {
              "id": 2,
              "first_name": "Julia"
            }
          ],
          "schema": {
            "fields": [
              {
                "name": "id",
                "type": "integer"
              },
              {
                "name": "first_name",
                "type": "string"
              }
            ],
            "primaryKey": "id"
          }
        }
      ]
    }
  ]
}
```

[dr]: /standard/data-resource/
[dp]: /standard/data-package/

## Implementations

None known.
