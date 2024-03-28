---
title: Compression of Resources
---

<table>
  <tr>
    <th>Authors</th>
    <td>Michael Amadi</td>
  </tr>
</table>

It can be argued that applying compression to data resources can make data package publishing more cost-effective and sustainable. Compressing data resources gives publishers the benefit of reduced storage and bandwidth costs and gives consumers the benefit of shorter download times.

## Implementations

- [tabulator-py (Gzip and Zip support)](https://github.com/frictionlessdata/tabulator-py)
- [datapackage-connector (Gzip support)](https://github.com/nimblelearn/datapackage-connector)
- [datapackage-m (Gzip support)](https://github.com/nimblelearn/datapackage-m)

## Specification

All compressed resources `MUST` have a `path` that allows the `compression` property to be inferred. If the compression can't be inferred from the `path` property (e.g. a custom file extension is used) then the `compression` property `MUST` be used to specify the compression.

Supported compression types:

- gz
- zip

Example of a compressed resource with implied compression:

```
{
  "name": "data-resource-compression-example",
  "path": "http://example.com/large-data-file.csv.gz",
  "title": "Large Data File",
  "description": "This large data file benefits from compression.",
  "format": "csv",
  "mediatype": "text/csv",
  "encoding": "utf-8",
  "bytes": 1073741824
}
```

Example of a compressed resource with the `compression` property:

```
{
  "name": "data-resource-compression-example",
  "path": "http://example.com/large-data-file.csv.gz",
  "title": "Large Data File",
  "description": "This large data file benefits from compression.",
  "format": "csv",
  "compression" : "gz",
  "mediatype": "text/csv",
  "encoding": "utf-8",
  "bytes": 1073741824
}
```

:::tip NOTE
Resource properties e.g. bytes, hash etc apply to the compressed object -- not to the original uncompressed object.
:::
