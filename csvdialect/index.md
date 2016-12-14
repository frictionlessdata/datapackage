---
title: CSV Dialect Description Format (CSVDDF)
layout: default
listed: true
version: 1.2
created: 20 February 2013
updated: 7 May 2015
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

{% include meta.html %}

### Changelog

- 1.2.1: [case-sensitive header](https://github.com/dataprotocols/dataprotocols/issues/193#issuecomment-99774395)
- 1.2: (breaking) - for details see this
[issue](https://github.com/dataprotocols/dataprotocols/issues/99)
  - remove dialect attribute moving all other attributes up one level up one level
  - specify defaults for most attributes

Excluded
========

CSVDDF has nothing to do with the names, contents or types of the
headers or data within the CSV file, only how it is formatted. However,  
CSVDDF does allow the presence or absence of a header to be specified, 
similarly to [RFC4180](http://www.ietf.org/rfc/rfc4180.txt) 

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
      "delimiter": ",",
      "doubleQuote": true,
      "lineTerminator": "\r\n",
      "quoteChar": "\"",
      "skipInitialSpace": true,
      "header": true
    }

Specification
=============

The format is a JSON hash comprising


csvddfVersion    | a number, in n.n format, e.g., `1.0`. If not present, consumers should assume latest schema version.
delimiter        | specifies a one-character string to use as the field separator. Default = `,`
doubleQuote      | controls the handling of quotes inside fields. If true, two consecutive quotes should be interpreted as one. Default = `true`
lineTerminator   | specifies the character sequence which should terminate rows. Default = `\r\n`
nullSequence     | specifies the null sequence (for example `\N`). Not set by default
quoteChar        | specifies a one-character string to use as the quoting character. Default = `"`
escapeChar       | specifies a one-character string to use for escaping (for example, `\`), mutually exclusive with `quoteChar`. Not set by default
skipInitialSpace | specifies how to interpret whitespace which immediately follows a delimiter; if `false`, it means that whitespace immediately after a delimiter should be treated as part of the following field. Default = `true`
header        	 | indicates whether the file includes a header row. If `true` the first row in the file is a header row, not data. Default = `true`
caseSensitiveHeader | indicates that case in the header is meaningful. For example, columns `CAT` and `Cat` should not be equated. Default = `false`
{:.table .table-striped .table-bordered .table-condensed .table-definitions}

Links
=====

[Comparison of csv dialect
support](https://docs.google.com/spreadsheet/ccc?key=0AmU3V2vcPKrIdEhoU1NQSWtoQmJwcUNCelJtdkx2bFE&usp=sharing)

[Example of similar JSON
format](http://panda.readthedocs.org/en/latest/api.html#data-uploads)

[PEP 305](http://www.python.org/dev/peps/pep-0305/)
