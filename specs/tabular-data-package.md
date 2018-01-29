title: Tabular Data Package
---
slug: tabular-data-package
---
mediatype: application/vnd.datapackage+json
---
version: 1.0.0-rc.2
---
updated: 2 May 2017
---
created: 7 May 2012
---
descriptor: datapackage.json
---
abstract:

A simple format for describing tabular-style data for publishing and sharing.
---
body:

## Introduction

Tabular Data Package is a simple container format used for publishing and sharing tabular-style data. The format's focus is on simplicity and ease of use, especially online. In addition, the format is focused on data that can be presented in a tabular structure and in making it easy to produce (and consume) tabular data packages from spreadsheets and relational databases.

The key features of this format are the following:

- CSV (comma separated variables) for data files
- Single JSON file (datapackage.json) to describe the dataset including a schema for data files
- Reuse of existing work including other Frictionless Data specifications

As suggested by the name, Tabular Data Package extends and specializes the [Data Package][dp] spec for the specific case where the data is tabular.

[dp]: http://frictionlessdata.io/specs/data-package/

### Why CSV

We chose CSV as the data format for the Tabular Data Package specification because:

1. CSV is very simple -- it is possibily *the* most simple data format
2. CSV is tabular-oriented. Most data structures are either tabular or can be transformed to a tabular structure by some form of normalization
3. It is open and the "standard" is well-known
4. It is widely supported - practically every spreadsheet program, relational database and programming language in existence can handle CSV in some form or other
5. It is text-based and therefore amenable to manipulation and access from a wide range of standard tools (including revision control systems such as git, mercurial and subversion)
6. It is line-oriented which means it can be incrementally processed - you do not need to read an entire file to extract a single row. For similar reasons it means that the format supports streaming.

More informally:

> CSV is the data Kalashnikov: not pretty, but many wars have been
fought with it and kids can use it.
[[@pudo](https://twitter.com/pudo/status/248473299741446144) (Friedrich
Lindenberg)]

> CSV is the ultimate simple, standard data format - streamable,
text-based, no need for proprietary tools etc [@rufuspollock (Rufus
Pollock)]

## Specification

Tabular Data Package builds directly on the [Data Package][dp] specification. Thus a Tabular Data Package `MUST` be a Data Package and conform to the [Data Package specification][dp].

Tabular Data Package has the following requirements over and above those imposed by [Data Package][dp]:

- There `MUST` be at least one `resource` in the `resources` `array`
- There `MUST` be a `profile` property with the value `tabular-data-package`
- Each `resource` `MUST` be a [Tabular Data Resource][tdr]

[tdr]: http://frictionlessdata.io/specs/tabular-data-resource/

### Example

Here's an example of a minimal tabular data package:

On disk we have 2 files:

```
data.csv
datapackage.json
```

`data.csv` looks like:

```
var1,var2,var3
A,1,2.1
B,3,4.5
```

`datapackage.json` looks like:

```javascript
{
  "profile": "tabular-data-package",
  "name": "my-dataset",
  // here we list the data files in this dataset
  "resources": [
    {
      "path": "data.csv",
      "profile": "tabular-data-resource",
      "schema": {
        "fields": [
          {
            "name": "var1",
            "type": "string"
          },
          {
            "name": "var2",
            "type": "integer"
          },
          {
            "name": "var3",
            "type": "number"
          }
        ]
      }
    }
  ]
}

```
