---
title: Files Inside Archives
---

<table>
  <tr>
    <th>Authors</th>
    <td>Carles Pina Estany</td>
  </tr>
</table>

Some datasets need to contain a Zip file (or tar, other formats) containing a
set of files.

This might happen for practical reasons (datasets containing thousands of files)
or for technical limitations (for example, currently Zenodo doesn't support subdirectories and
datasets might need subdirectory structures to be useful).

## Implementations

There are no known implementations at present.

## Specification

The `resources` in a `data-package` can contain "recursive resources": identifying
a new resource.

## Example

```json
{
  "profile": "data-package",
  "resources": [
    {
      "path": "https://zenodo.org/record/3247384/files/Sea-Bird_Processed_Data.zip",
      "format": "zip",
      "mediatype": "application/zip",
      "bytes": "294294242424",
      "hash": "a27063c614c183b502e5c03bd9c8931b",
      "resources": [
        {
          "path": "file_name.csv",
          "format": "csv",
          "mediatype": "text/csv",
          "bytes": 242421,
          "hash": "0300048878bb9b5804a1f62869d296bc",
          "profile": "tabular-data-resource",
          "schema": "tableschema.json"
        },
        {
          "path": "directory/file_name2.csv",
          "format": "csv",
          "mediatype": "text/csv",
          "bytes": 2424213,
          "hash": "ff9435e0ee350efbe8a4a8779a47caaa",
          "profile": "tabular-data-resource",
          "schema": "tableschema.json"
        }
      ]
    }
  ]
}
```

For a `.tar.gz` it would be the same changing the `"format"` and the
`"mediatype"`.

## Types of files

Support for `Zip` and `tar.gz` might be enough: hopefully everything can be
re-packaged using these formats.

To keep the implementation and testing testing: only one recursive level is
possible. A `resource` can list `resources` inside (like in the example). But
the inner resources cannot contain resources again.
