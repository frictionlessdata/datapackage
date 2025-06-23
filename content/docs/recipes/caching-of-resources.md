---
title: Caching of Resources
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh</td>
  </tr>
</table>

All Frictionless Data specifications allow for referencing resources via http or a local filesystem.

In the case of remote resources via http, there is always the possibility that the remote server will be unavailable, or, that the resource itself will be temporarily or permanently removed. If implementing systems are doing any processing or analysis with the file, they may wish to keep and reference a local copy while still pointing to the remote URL as the canonical data source.

Applications that are concerned with the persistent storage of data described in Frictionless Data specifications can use a `_cache` property that mirrors the functionality and usage of the `path` or `data` properties, and refers to a storage location for the data that the application can fall back to if the canonical resource is unavailable.

## Implementations

There are no known implementations of this pattern at present.

## Specification

Implementations `MAY` handle a `_cache` property on any descriptor that supports either a `path` or `data` property. In the case that the data referenced in `path` or `data` is unavailable, `_cache` should be used as a fallback to access the data. The handling of the data stored at `_cache` is beyond the scope of the specification. Implementations might store a copy of the resources in `path` or `data` at ingestion time, update at regular intervals, or any other method to keep an up-to-date, persistent copy.

Some examples of the `_cache` property.

```
{
  "name": "my-package",
  "resources": [
    {
      "name": "my-resource",
      "path": "http://example.com/data/csv/my-resource.csv",
      "_cache": "my-resource.csv"
    },
    {
      "name": "my-resource",
      "path": "http://example.com/data/csv/my-resource.csv",
      "_cache": "http://data.registry.com/user/files/my-resource.csv"
    },
    {
      "name": "my-resource",
      "data": [
        "http://example.com/data/csv/my-resource.csv",
        "http://somewhere-else.com/data/csv/resource2.csv"
      ],
      "_cache": [
        "my-resource.csv",
        "resource2.csv"
      ]
    },
    {
      "name": "my-resource",
      "data": [ "http://example.com/data/csv/my-resource.csv" ],
      "_cache": "my-resource.csv"
    }
  ]
}
```
