---
title: CSV Dialect Description Format (CSVDDF)
layout: default
version: 1.0
created: 20 February 2013
---

This RFC defines a simple JSON format to describe the various dialects
of CSV files; it aims to deal with a reasonably large subset of the
features which differ between dialects (terminator strings, quoting
rules, escape rules, etc), and roughly to describe the union of the
capabilities of Python's csv module, Ruby's CSV module, and the MySQL
and Postgres bulk load facilities at the time of writing (February
2013).

The keys of the "dialect" member of the JSON dictionary are intended to
be very close to the arguments to Python's csv.Dialect class.

Excluded
========

CSVDDF has nothing to do with the names, contents or types of the
headers or data within the CSV file, only how it is formatted.

CSVDDF is also orthogonal to the character encoding used in the CSV
file. Note that it is possible for files in CSV format to contain data
in more than one encoding.

Usage
=====

CSVDDF is useful for programmes which might have to deal with multiple
dialects of CSV file, but which can rely on being told out-of-band which
dialect will be used in a given input stream.

This reduces the need for heuristic inference of CSV dialects, and
simplifies the implementation of CSV readers, which must juggle dialect
inference, schema inference, unseekable input streams, character
encoding issues, and the lazy reading of very large input streams.

For example, a curator might take a file published by a third party in
CSV format, work out what dialect the file is in, and package this file
alongside a file in CSVDDF, such that a programme reading the package
can know which options to pass to its CSV reader module or to its SQL
bulk load statement, without danger of corrupting the data.

Example
=======

Here's an example:

    {
      "csvddfVersion": 1.0,
      "dialect": {
        "delimiter": ",",
        "doubleQuote": false,
        "lineTerminator": "\r\n",
        "quoteChar": "\"",
        "skipInitialSpace": false
      }
    }

Specification
=============

The format is a JSON file comprising a dictionary with two members:

csvddfVersion    | a number, in n.n format, e.g., 1.0
dialect          | a JSON dictionary (specified below)
{:.table .table-striped .table-bordered .table-condensed .table-definitions}

The "dialect" member must be a dictionary with the following mandatory
keys:

delimiter        | specifies a one-character string to use as the field separator
doubleQuote      | controls the handling of quotes inside fields. If true, two consecutive quotes should be interpreted as one
lineTerminator   | specifies the character sequence which should terminate rows
quoteChar        | specifies a one-character string to use as the quoting character.
skipInitialSpace | specifies how to interpret whitespace which immediately follows a delimiter; if False, it means that whitespace immediately after a delimiter should be treated as part of the following field
{:.table .table-striped .table-bordered .table-condensed .table-definitions}

Links
=====

[Comparison of csv dialect
support](https://docs.google.com/spreadsheet/ccc?key=0AmU3V2vcPKrIdEhoU1NQSWtoQmJwcUNCelJtdkx2bFE&usp=sharing)

[Example of similar JSON
format](http://panda.readthedocs.org/en/latest/api.html#data-uploads)

[PEP 305](http://www.python.org/dev/peps/pep-0305/)
