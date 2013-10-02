---
title: Simple Data Format (SDF)
layout: default
version: 1.0 beta
last_update: 18 April 2013
created: May 7 2012
---

This document defines a simple data publishing format (Simple Data
Format) for publishing and sharing tabular-style data.

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

<div class="alert alert-info" markdown="block">
 If you have comments or suggestions please file them in the issue
 tracker at: <https://github.com/dataprotocols/dataprotocols/issues>.
</div>

### Table of Contents 
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Quick Start

A Simple Data Format dataset has:

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

This specification is in large part a refinement of the
<a href="{{site.baseurl}}/data-packages/">Data Packages specification</a>. It has the additional requirements such
as:

-   All data files MUST be in CSV format
-   A schema following <a href="{{site.baseurl}}/json-table-schema/">JSON Table Schema</a> MUST be
    provided for each data file that is part of the data package

Files
-----

-   A dataset in Simple Data Format is a data package and MUST therefore
    have a package descriptor (datapackage.json) file (and that file
    MUST contain the metadata required by the Data Package
    specification)
-   A dataset MUST contain at least one or more *data files*

Each data file:

-   MUST be in CSV format and its file name MUST end with `.csv`.
-   MUST have a single header row. This row MUST be the first row in the
    file.

    -   Terminology: each column in the CSV file is termed a *field* and
        its `name` is the string in that column in the header row.
    -   The `name` MUST be unique amongst fields and MUST contain at
        least one character
    -   There are no further restrictions on the form of the `name` but
        it is RECOMMENDED that it contain only alphanumeric characters
        together with " .-\_"

-   Associated to each file MUST be an entry in the resources attribute
    in the datapackage.json file.
-   The schema attribute of each resources entry in the package
    descriptor MUST be present and its value MUST conform to the JSON
    Table Schema and MUST describe the fields in the associated data
    file.

CSV Format
----------

There is an RFC for CSV (4180 - Common Format and MIME Type for
Comma-Separated Values (CSV) Files). The CSV file MUST follow these
additional restrictions:

-   Be encoded as UTF-8
-   NOT contain more fields than are in the header row (though they may
    contain less)

The CSV file SHOULD follow these additional restrictions regarding CSV
structure:

-   Use "," as field delimiters
-   Use "rn" or "n" as line terminators

If the CSV file does not follow these dialect information MUST be
provided in the file entry as per
<a href="{{site.baseurl}}/csv-dialect/">CSV Dialect Description Format</a>.

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

Why CSV
-------

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

What alternatives are there for the data portion of the Simple Data
format?

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

### Alternative CSV format

This describes a possible alternative CSV-based format for serializing
the metadata. It has the advantage that you could then put a single
dataset in one spreadsheet (using multiple sheets).

In this format each key in the JSON file becomes a column. In addition
there is one initial column named @key@. Values for this column are then
attribute names. To illustrate (spacing for illustrative purposes only):

    @key@, year, series, ...
    @type, ...,  xsd:string
    simpletype, date, string
    label, ....
    ...
