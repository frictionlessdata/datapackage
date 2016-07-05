---
title: Tabular Data Package
subtitle: (previously known as Simple Data Format)
layout: spec
listed: true
version: 1.0-beta-3
updated: 7 March 2016
created: May 7 2012
ietf-keywords: true
summary: This document defines a simple data publishing format (Tabular Data
  Package) for publishing and sharing tabular-style data.

---

Summary
=======

This document defines a simple data publishing format (Tabular Data
Package) for publishing and sharing tabular-style data.

The format's focus is on simplicity and ease of use over the web -- that
is, usage online with access and transmission *over HTTP*. In addition
the format is focused on data that can be presented in a tabular
structure and in making it easy to produce (and consume) this format
from spreadsheets and relational databases.

The key features of this format are the following:

-   CSV (comma separated variables) for data
-   Single JSON file (datapackage.json) to describe the dataset
    including a schema for data files
-   Reuse wherever possible of existing work including other Data
    Protocols specifications

As suggested by the name, Tabular Data Package extends and specializes the
[Data Package][dp] spec for the specific case where the data is tabular.

[dp]: ../data-packages/

<div class="alert alert-info" markdown="block">
If you have comments or suggestions please file them in the issue
tracker at: <https://github.com/frictionlessdata/specs/issues>.
</div>

### Changelog

- `1.0-beta-3`: no substantive changes but clarify where we differ from CSV RFC
  ([#204](https://github.com/dataprotocols/dataprotocols/issues/204))
- `1.0-beta-2`: renamed from Simple Data Format to Tabular Data Package

### Table of Contents 
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Quick Start

A Tabular Data Package package contains:

-   Data files in CSV
-   (Minimal) dataset information in JSON (including a schema for the
    CSV)

Here's an example of a minimal simple data format dataset:

    2 files

    data.csv
    datapackage.json


    data.csv
    --------

    var1,var2,var3
    A,1,2
    B,3,4

    datapackage.json
    ----------------

    {
      "name": "my-dataset",
      # here we list the data files in this dataset
      "resources": [
        {
          "path": "data.csv",
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

## Specification

This specification builds on the 
<a href="{{site.baseurl}}/data-packages/">Data Packages specification</a>. It defines a profile for publishing data packages that places some additional constraints on metadata and data formats.

A valid Tabular Data Package package MUST be a valid Data Package as defined in that specification. This means that it MUST:

-  Contain a package descriptor (`datapackage.json`)
-  Provide at least the minimum required package metadata as described in the Data Package specification
-  Include a description of each data file in the package in the `resources` array of the package

In addition to those basic rules, a valid Tabular Data Package package MUST conform to the following additional 
requirements:

-   It MUST contain at least one *data file*
-   All data files MUST be in CSV format, see below for additional rules on CSV file naming and structure
-   Every resource MUST have a `schema` following the <a href="{{site.baseurl}}/json-table-schema/">JSON Table Schema</a> specification

### CSV Files

CSV files included in a Tabular Data Package package MUST conform to [RFC 4180
"Common Format and MIME Type for Comma-Separated Values (CSV) Files"][rfc4180]
subject to the following exceptions:

-   Files MUST be encoded as UTF-8 (the RFC requires 7-bit ASCII)
-   The standard line terminator character can be LF or CRLF (the RFC allows CRLF only)
-   Files MAY (but SHOULD NOT) deviate from standard CSV in terms of various
    parameters including field delimiters (e.g. tab rather than ","), quote
    character etc (see below)

In addition to these requirements:

-   File names MUST end with `.csv`
-   Files MUST have a single header row. This row MUST be the first row in the
    file.

    -   Terminology: each column in the CSV file is termed a *field* and
        its `name` is the string in that column in the header row.
    -   The `name` MUST be unique amongst fields and MUST contain at
        least one character
    -   There are no further restrictions on the form of the `name` but
        it is RECOMMENDED that it contain only alphanumeric characters
        together with " .-\_"
-   Rows in the file MUST NOT contain more fields than are in the header row (though they may
    contain less)
-   Each file MUST have an entry in the `resources` array in the `datapackage.json` file
-   The resource metadata MUST include a `schema` attribute whose value MUST conform to the JSON
    Table Schema
-   All fields in the CSV files MUST be described in the `schema`

CSV files generated by different applications often vary in their syntax, e.g.
use of quoting characters, delimiters, etc. To encourage conformance, CSV files
in a Tabular Data Package SHOULD

-   Use "," as field delimiters (as per RFC)
-   Use "\\r\\n" (CRLF) or "\\n" (LF) as line terminators

If a CSV file does not follow these rules then its specific CSV dialect MUST be documented. The resource 
hash for the resource in the `datapackage.json` descriptor MUST:

-   Include a `dialect` key that conforms to that described in the <a href="{{site.baseurl}}/csv-dialect/">CSV Dialect Description Format</a>

Applications processing the CSV file SHOULD use the `dialect` of the CSV file to guide parsing.

[rfc4180]: https://tools.ietf.org/html/rfc4180

## Key Design Features and Principles

The format's focus is on simplicity and web usage -- that is, usage
online with access and transmission *over HTTP*. In addition the format
is focused on data that can be presented in a tabular structure and in
making it easy to produce (and consume) this format from spreadsheets
and relational databases.

The key features of this format are the following:

-   CSV (comma separated variables) as the base data format
-   JSON as the base format for schema definition
-   Reuse wherever possible of existing work including other Data
    Protocols specifications

### Why CSV

1.  CSV is very simple - it is perhaps *the* most simple data format
2.  CSV is tabular-oriented. Most data structures are either tabular or
    can be transformed to a tabular structure by some form of
    normalization
3.  It is open and the "standard" is well-known
4.  It is widely supported - practically every spreadsheet program,
    relational database and programming language in existence can handle
    CSV in some form or other
5.  It is text-based and therefore amenable to manipulation and access
    from a wide range of standard tools (including revision control
    systems such as git, mercurial and subversion)
6.  It is line-oriented which means it can be incrementally processed --
    you do not need to read an entire file to extract a single row. For
    similar reasons it means that the format supports streaming.

More informally:

> CSV is the data Kalashnikov: not pretty, but many wars have been
fought with it and kids can use it.
[[@pudo](https://twitter.com/pudo/status/248473299741446144) (Friedrich
Lindenberg)]

> CSV is the ultimate simple, standard data format - streamable,
text-based, no need for proprietary tools etc [@rufuspollock (Rufus
Pollock)]

### Why JSON for the Schema

-   JSON is simple
-   JSON supports rich structure including nesting and basic types
-   JSON is very widely used and supported (all major programming
    languages can handle JSON)
-   JSON is web-native (every browser can access and manipulate JSON)
-   JSON is readable as simple text making it amenable to management and
    processing using simple text tools

