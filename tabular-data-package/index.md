---
title: Tabular Data Package
subtitle: (previously known as Simple Data Format)
layout: spec
version: 1.0-beta-2
last_update: 16 March 2014
created: May 7 2012
well_defined_keywords: true
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

-   TSV (tab separated values) for data
-   Single JSON file (datapackage.json) to describe the dataset
    including a schema for data files
-   Reuse wherever possible of existing work including other Data
    Protocols specifications

As suggested by the name, Tabular Data Package extends and specializes the
[Data Package][dp] spec for the specific case where the data is tabular.

[dp]: ../data-packages/

<div class="alert alert-info" markdown="block">
If you have comments or suggestions please file them in the issue
tracker at: <https://github.com/dataprotocols/dataprotocols/issues>.
</div>

### Changelog

- `1.0-beta-2`: renamed from Simple Data Format to Tabular Data Package

### Table of Contents 
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Quick Start

A Tabular Data Package package contains:

-   Data files in TSV
-   (Minimal) dataset information in JSON (including a schema for the
    TSV)

Here's an example of a minimal simple data format dataset:

    2 files

    data.tsv
    datapackage.json


    data.tsv
    --------

    A	1	2
    B	3	4

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
-   All data files MUST be in TSV format, see below for additional rules on TSV file naming and structure
-   Every resource MUST have a `schema` following the <a href="{{site.baseurl}}/json-table-schema/">JSON Table Schema</a> specification

TSV Files
---------

The TSV files included in a Tabular Data Package package are modelled on the
data serialization format used by Postgres and
MySQL.

In particular, fields are UTF-8 text separated by literal tabs (`0x09`). Rows
are separated by literal newlines (`0x0a`). Carriage returns, newlines, tabs
and backslashes in field data must be escaped; each literal line is thus also
a logical line. This is in contradistinction to CSV, where quoting allows a
literal newline to be embedded in a record, thus frustrating line-oriented
processing.

A value must be present for every field. A null value for a field is signified
with `\N` (characters `0x5c` and `0x4e`).

In a Tabular Data Package:

-   File names MUST end with `.tsv`
-   Files MUST be encoded as UTF-8
-   Files MUST not have a header row.
-   Each file MUST have an entry in the `resources` array in the `datapackage.json` file
-   The resource metadata MUST include a `schema` attribute whose value MUST conform to the JSON
    Table Schema
-   All fields in the TSV files MUST be described in the `schema`

Escape sequences employed in TSV files are few in number:

-   `\n` for newline
-   `\t` for tab
-   `\r` for carriage return
-   `\\` for the backslash

Things that look like escape sequences but aren't are handled in one of two
ways:

-   a backslash preceding any other character is simply skipped
-   a lone backslash at the end of a field shall be an error

TSV files in a Tabular Data Package SHOULD use `\n` (`0x0a`) as the line (and
thus record) separator.


## Key Design Features and Principles

The format's focus is on simplicity and web usage -- that is, usage
online with access and transmission *over HTTP*. In addition the format
is focused on data that can be presented in a tabular structure and in
making it easy to produce (and consume) this format from spreadsheets
and relational databases.

The key features of this format are the following:

-   TSV (tab separated values) as the base data format
-   JSON as the base format for schema definition
-   Reuse wherever possible of existing work including other Data
    Protocols specifications

Why TSV
-------

1.  TSV is very simple - it is perhaps *the* most simple data format
2.  TSV is tabular-oriented. Most data structures are either tabular or
    can be transformed to a tabular structure by some form of
    normalization
3.  It is implemented in a consistent way, by those tools that implement it
5.  It is text-based and therefore amenable to manipulation and access
    from a wide range of standard tools (including revision control
    systems such as git, mercurial and subversion)
6.  It is line-oriented (unlike CSV) which means it can be incrementally
    processed -- you do not need to read an entire file to extract a single
    row. For similar reasons it means that the format supports streaming.

Why JSON
--------

-   JSON is simple
-   JSON supports rich structure including nesting and basic types
-   JSON is very widely used and supported (all major programming
    languages can handle JSON)
-   JSON is web-native (every browser can access and manipulate JSON)
-   JSON is readable as simple text making it amenable to management and
    processing using simple text tools

## Open Issues

-   Foreign keys between files
-   Primary keys and uniqueness

## Alternatives Discussion

What alternatives are there for the data portion of the format?

-   Use line oriented JSON (?)

    -   Greater flexibility and complexity on types and objects
    -   No support from spreadsheets

-   Use SQLite

    -   (+) compact, full DB in one
    -   (-) lack of support (e.g. from spreadsheets), no streaming, not
        accessible with text tools etc

<div class="alert alert-info" markdown="block">
NOTE: this specification owes a great deal to the excellent Dataset
Publishing Language (DSPL) put forward by Google. The main
difference is in using JSON instead of XML for the schema and
re-using as far as possible the JSON-LD schema language (based on
linked-data) rather than inventing a new type and schema
structure.
</div>

