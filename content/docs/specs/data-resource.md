---
title: Data Resource
---

A simple format to describe and package a single data resource such as a individual table or file.

## Language

The key words <code>MUST</code>, <code>MUST NOT</code>, <code>REQUIRED</code>, <code>SHALL</code>, <code>SHALL NOT</code>, <code>SHOULD</code>, <code>SHOULD NOT</code>, <code>RECOMMENDED</code>, <code>MAY</code>, and <code>OPTIONAL</code> in this document are to be interpreted as described in <a href="https://www.ietf.org/rfc/rfc2119.txt" target="_blank" title="RFC 2119">RFC 2119</a>

## Introduction

The **Data Resource** format describes a data resource such as an individual file or table.
The essence of a Data Resource is a locator for the data it describes.
A range of other properties can be declared to provide a richer set of metadata.

### Examples

A minimal Data Resource looks as follows:

With data accessible via the local filesystem.

```javascript
{
  "name": "resource-name",
  "path": "resource-path.csv"
}
```

With data accessible via http.

```javascript
{
  "name": "resource-name",
  "path": "http://example.com/resource-path.csv"
}
```

A minimal Data Resource pointing to some inline data looks as follows.

```javascript
{
  "name": "resource-name",
  "data": {
    "resource-name-data": [
      {"a": 1, "b": 2}
    ]
  },
}
```

A comprehensive Data Resource example with all required, recommended and optional properties looks as follows.

```javascript
{
  "name": "solar-system",
  "path": "http://example.com/solar-system.csv",
  "title": "The Solar System",
  "description": "My favourite data about the solar system.",
  "format": "csv",
  "mediatype": "text/csv",
  "encoding": "utf-8",
  "bytes": 1,
  "hash": "",
  "schema": "",
  "sources": "",
  "licenses": ""
}
```

### Descriptor

A Data Resource descriptor MUST be a valid JSON `object`. (JSON is defined in [RFC 4627][]).

Key properties of the descriptor are described below. A descriptor MAY include any number of properties in additional to those described below as required and optional properties.

[RFC 4627]: http://www.ietf.org/rfc/rfc4627.txt

### Data Location

A resource MUST contain a property describing the location of the
data associated to the resource. The location of resource data MUST be
specified by the presence of one (and only one) of these two properties:

- `path`: for data in files located online or locally on disk.
- `data`: for data inline in the descriptor itself.

#### `path` Data in Files

`path` MUST be a string -- or an array of strings (see "Data in Multiple
Files"). Each string MUST be a "url-or-path" as defined in the next section.

##### URL or Path

A "url-or-path" is a `string` with the following additional constraints:

- `MUST` either be a URL or a POSIX path
- [URLs][url] MUST be fully qualified. MUST be using either http or https scheme. (Absence of a scheme indicates `MUST` be a POSIX path)
- [POSIX paths][posix] (unix-style with `/` as separator) are supported for referencing local files, with the security restraint that they `MUST` be relative siblings or children of the descriptor. Absolute paths (/) and relative parent paths (../) MUST NOT be used, and implementations SHOULD NOT support these path types.

[url]: https://en.wikipedia.org/wiki/Uniform_Resource_Locator
[posix]: https://en.wikipedia.org/wiki/Path_%28computing%29#POSIX_pathname_definition

Examples:

```
# fully qualified url
"path": "http://ex.datapackages.org/big-csv/my-big.csv"

# relative path
# note: this will work both as a relative path on disk and on online
"path": "my-data-directory/my-csv.csv"
```

:::warning
`/` (absolute path) and `../` (relative parent path) are forbidden to avoid security vulnerabilities when implementing data package software. These limitations on resource `path` ensure that resource paths only point to files within the data package directory and its subdirectories. This prevents data package software being exploited by a malicious user to gain unintended access to sensitive information.

For example, suppose a data package hosting service stores packages on disk and allows access via an API. A malicious user uploads a data package with a resource path like `/etc/passwd`. The user then requests the data for that resource and the server naively opens `/etc/passwd` and returns that data to the caller.

Prior to release 1.0.0-beta.18 (Nov 17 2016) there was a `url` property distinct from `path`. In order to support backwards compatibility, implementors MAY want to automatically convert a `url` property to a `path` property and issue a warning.
:::

#### Data in Multiple Files

Usually, a resource will have only a single file associated to it. However, sometimes it may be convenient to have a single resource whose data is split across multiple files -- perhaps the data is large and having it in one file would be inconvenient.

To support this use case the `path` property MAY be an array of strings rather
than a single string:

```
"path": [ "myfile1.csv", "myfile2.csv" ]
```

It is NOT permitted to mix fully qualified URLs and relative paths in a `path` array: strings MUST either all be relative paths or all URLs.

**NOTE:** All files in the array MUST be similar in terms of structure, format etc. Implementors MUST be able to concatenate together the files in the simplest way and treat the result as one large file. For tabular data there is the issue of header rows. See the [Tabular Data Package spec][tdp] for more on this.

#### `data` Inline Data

Resource data rather than being stored in external files can be shipped `inline` on a Resource using the `data` property.

The value of the data property can be any type of data. However, restrictions of JSON require that the value be a string so for binary data you will need to encode (e.g. to Base64). Information on the type and encoding of the value of the data property SHOULD be provided by the format (or mediatype) property and the encoding property.

Specifically: the value of the data property MUST be:

- EITHER: a **JSON** array or **Object**- the data is then assumed to be JSON data and SHOULD be processed as such
- OR: a **JSON** string - in this case the format or mediatype properties MUST be provided.

Thus, a consumer of resource object MAY assume if no format or mediatype property is provided that the data is JSON and attempt to process it as such.

**Examples 1 - inline JSON:**

    {
       ...
       "resources": [
         {
            "format": "json",
            # some json data e.g.
            "data": [
               { "a": 1, "b": 2 },
               { .... }
            ]
         }
       ]
    }

**Example 2 - inline CSV:**

    {
       ...
       "resources": [
         {
            "format": "csv",
            "data": "A,B,C\n1,2,3\n4,5,6"
         }
       ]
    }

### Metadata Properties

#### Required Properties

A descriptor MUST contain the following properties:

#### `name`

A resource MUST contain a `name` property. The name is a simple name or
identifier to be used for this resource.

- If present, the name MUST be unique amongst all resources in this data
  package.
- It MUST consist only of lowercase alphanumeric characters plus ".", "-" and "\_".
- It would be usual for the name to correspond to the file name (minus the
  extension) of the data file the resource describes.

#### Recommended Properties

#### `profile`

A string identifying the [profile][profile] of this descriptor as per the [profiles][profile] specification.

[profile]: /profiles/

Examples:

```javascript
{
  "profile": "tabular-data-resource"
}
```

```
{
  "profile": "http://example.com/my-profiles-json-schema.json"
}
```

#### Optional Properties

A descriptor MAY contain any number of additional properties. Common properties include:

- `title`: a title or label for the resource.
- `description`: a description of the resource.
- `format`: 'csv', 'xls', 'json' etc. Would be expected to be the standard file
  extension for this type of resource.
- `mediatype`: the mediatype/mimetype of the resource e.g. "text/csv", or "application/vnd.ms-excel". Mediatypes are maintained by the Internet Assigned Numbers Authority (IANA) in a [media type registry](https://www.iana.org/assignments/media-types/media-types.xhtml).
- `encoding`: specify the character encoding of the resource's data file. The values should be one of
  the "Preferred MIME Names" for [a character encoding registered with IANA][iana]. If no
  value for this key is specified then the default is UTF-8.
- `bytes`: size of the file in bytes.
- `hash`: the MD5 hash for this resource. Other algorithms can be indicated by prefixing
  the hash's value with the algorithm name in lower-case. For example:

      "hash": "sha1:8843d7f92416211de9ebb963ff4ce28125932878"

- `sources`: as for [Data Package metadata][dp].
- `licenses`: as for [Data Package metadata][dp]. If not specified the resource
  inherits from the data package.

### Resource Schemas

A Data Resource MAY have a `schema` property to describe the schema of the resource data.

The value for the `schema` property on a `resource` MUST be an `object` representing the schema OR a `string` that identifies the location of the schema.

If a `string` it must be a [url-or-path as defined above](#url-or-path), that is a fully qualified http URL or a relative POSIX path. The file at the location specified by this url-or-path string `MUST` be a JSON document containing the schema.

NOTE: the Data Package specification places no restrictions on the form of the schema Object. This flexibility enables specific communities to define schemas appropriate for the data they manage. As an example, the [Tabular Data Package][tdp] specification requires the schema to conform to [Table Schema][ts].

[tdp]: /tabular-data-package/
[ts]: /table-schema/
[iana]: http://www.iana.org/assignments/character-sets/character-sets.xhtml
[dp]: /data-package/

## Tabular Data Resource

A **Tabular Data Resource** is a type of [Data Resource][dr] specialized for describing tabular data like CSV files or spreadsheets.

Tabular Data Resource extends [Data Resource][dr] in following key ways:

- The `schema` property MUST follow the [Table Schema][ts] specification,
  either as a JSON object directly under the property, or a string referencing another
  JSON document containing the Table Schema
- A new `dialect` property to describe the CSV dialect. This property follows the [CSV Dialect][cd] specification.

[dr]: http://specs.frictionlessdata.io/data-resource/
[ts]: http://specs.frictionlessdata.io/table-schema/
[cd]: http://specs.frictionlessdata.io/csv-dialect/

### Examples

A minimal Tabular Data Resource, referencing external JSON documents, looks as follows.

```javascript
// with data and a schema accessible via the local filesystem
{
  "profile": "tabular-data-resource",
  "name": "resource-name",
  "path": [ "resource-path.csv" ],
  "schema": "tableschema.json"
}

// with data accessible via http
{
  "profile": "tabular-data-resource",
  "name": "resource-name",
  "path": [ "http://example.com/resource-path.csv" ],
  "schema": "http://example.com/tableschema.json",
  "dialect": "http://example.com/csvdialect.json"
}
```

A minimal Tabular Data Resource example using the data property to inline data looks as follows.

```javascript
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
```

A comprehensive Tabular Data Resource example with all required, recommended and optional properties looks as follows.

```javascript
{
  "profile": "tabular-data-resource",
  "name": "solar-system",
  "path": "http://example.com/solar-system.csv",
  "title": "The Solar System",
  "description": "My favourite data about the solar system.",
  "format": "csv",
  "mediatype": "text/csv",
  "encoding": "utf-8",
  "bytes": 1,
  "hash": "",
  "schema": {
    "fields": [
      {
        "name": "id",
        "type": "integer"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      }
    ],
    "primaryKey": "id"
  },
  "dialect": {
    "delimiter": ";",
    "doubleQuote": true
  },
  "sources": [{
      "title": "The Solar System - 2001",
      "path": "http://example.com/solar-system-2001.json",
      "email": ""
    }],
    "licenses": [{
      "name": "CC-BY-4.0",
      "title": "Creative Commons Attribution 4.0",
      "path": "https://creativecommons.org/licenses/by/4.0/"
    }]
}
```

## Specification

A Tabular Data Resource MUST be a [Data Resource][dr], that is it MUST conform to the [Data Resource specification][dr].

In addition:

- The Data Resource `schema` property MUST follow the [Table Schema][ts] specification,
  either as a JSON object directly under the property, or a string referencing another
  JSON document containing the Table Schema

* There `MUST` be a `profile` property with the value `tabular-data-resource`

- The data the Data Resource describes MUST:
  - If non-inline: Be a CSV file
  - If inline data: be "JSON tabular data" that is array of data rows where each row is an `array` or `object` (see below)

### CSV file requirements

CSV files in the wild come in a bewildering array of formats. There is a standard for CSV files described in [RFC 4180](https://tools.ietf.org/html/rfc4180), but unfortunately this standard does not reflect reality. In Tabular Data Resource, CSV files `MUST` follow RFC 4180 with the following important exceptions allowed:

#### File encoding

Files MUST:

- EITHER be encoded as UTF-8 (the default)
- OR the Tabular Data Resource MUST include an `encoding` property and the files `MUST` follow that encoding

NB: the RFC requires 7-bit ASCII encoding.

#### CSV Dialect

The line terminator character `MUST` be LF or CRLF (the RFC allows CRLF only).

If the CSV differs from this or the RFC in any other way regarding dialect (e.g. line terminators, quote characters, field delimiters), the Tabular Data Resource MUST contain a `dialect` property describing its dialect. The `dialect` property MUST follow the [CSV Dialect][cd] specification.

The value for the `dialect` property on a `resource` MUST be an `object` representing the dialect OR a `string` that identifies the location of the dialect.

If a `string` it must be a [url-or-path](/data-resource/#url-or-path), that is a fully qualified http URL or a relative POSIX path. The file at the the location specified by this url-or-path string `MUST` be a JSON document containing the dialect.

### JSON Tabular Data

JSON Tabular Data MUST be an `array` where each item in the array MUST be:

- EITHER: an array where each entry in the array is the value for that cell in the table
- OR: an object where each key corresponds to the header for that row and the value corresponds to the cell value for that row for that header

#### Row Arrays

```javascript
;[
  ["A", "B", "C"],
  [1, 2, 3],
  [4, 5, 6],
]
```

#### Row Objects

```javascript
;[
  { A: 1, B: 2, C: 3 },
  { A: 4, B: 5, C: 6 },
]
```
