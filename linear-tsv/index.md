---
title: Linear TSV
subtitle: simple, line-oriented, tabular data
author: Jason Dusek <jason.dusek@gmail.com>
layout: spec
listed: true
version: 1.0-beta
updated: 6 May 2014
created: 6 May 2014
summary: This document defines a format for tabular data.
redirect_to: http://specs.okfnlabs.org/linear-tsv/
---

Summary
=======

This document defines a line-oriented, tabular data format.

The format is intended to be easy to implement, space efficient, streamable,
amenable to processing with line-oriented tools and broadly interoperable. The
"text" output mode common to many relational databases is line-oriented,
tabular, streamable, and easily described; it is here presented as a candidate
for standardization.

<div class="alert alert-info" markdown="block">
If you have comments or suggestions please file them in the issue
tracker at: <https://github.com/dataprotocols/dataprotocols/issues>.
</div>

### Changelog

- `1.0-beta`: initial revision

### Table of Contents 
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}


## Specification

A tabular data file consists of zero or more *records* consisting of *fields*.

Records are separated by ASCII newlines (`0x0a`). Fields within a record are
separated with ASCII tab (`0x09`). It is permitted but discouraged to separate
records with carriage-return-newline (`0x0d` and `0x0a`). (A literal carriage
return in any other position is non-conforming.)

A zero-length file is a valid linear TSV file, containing no records. Empty
lines are ignored in linear TSV files.

Linear TSV provides for escape sequences, instead of quoting, so that
implementations can naively split on the byte values of the separators. To
include newlines, tabs, carriage returns and backslashes in field data, the
following escape sequences must be used:

* `\n` for newline,

* `\t` for tab,

* `\r` for carriage return,

* `\\` for backslash.

Records must contain at least one field. All fields must be present in every
record. To indicate missing data for a field, the character sequence `\N`
(bytes `0x5c` and `0x4e`) is used. Note that the `N` is capitalized. This
character sequence is exactly that used by SQL databases to indicate SQL
`NULL` in their tab-separated output mode.

If a single backslash is encountered at the end of a field, it is an error. If
a backslash precedes another character but does not form one of the escape
sequences above, it is a "superfluous backslash" and is removed from the field
on read. Such a "superfluous backslash" must never be written by a conforming
implementation.

While CSV files commonly have a header line, giving names to each of the
columns, in this format no provision is made for such a header.

## Motivation

In advocating a shift to a line-oriented, tab-separated serialization format,
we are endorsing an existing format: the default serialization format of both
Postgres and MySQL. We propose to standardize a subset of the format common to
both database systems.

A truly line-oriented format for tabular data, where newline, carriage return
and the separator are always represented by escape sequences, offers many
practical advantages, among them:

* The parsers are simple and fast.

* First pass filtering and sorting for line-oriented formats is easy to
  implement in high-level languages, like Python and Java.

* Analysis and transformation of line-oriented data with command line tools is
  simple, dependable and often surprisingly efficient.

* By requiring escape sequences when newlines and tabs are in field text, the
  format allows parsers to naively and efficiently split data on raw byte
  values: `0x09` for fields and `0x0a` for records.

CSV is almost right and it's worth talking about the disadvantages of CSV that
motivate the author to promote another tabular data format:

* In some locales, `,` is the decimal separator; whereas the ASCII tab never
  collides with the decimal separator. More generally, the tab is not a
  centuries old glyph that one encounters in natural language.

* CSV is not truly line-oriented -- newlines are quoted, not escaped. A single
  record can span multiple physical lines. In consequence, line-oriented
  processing almost works until it doesn't, and then simple tricks -- sorting
  on the first column to optimize insertion order or batching records in to
  groups of a few thousand to get better insert performance -- require
  relatively complicated code to get right.

* CSV's quoting style requires one to mingle field data parsing and record
  splitting. Taking every third record still requires one to parse the prior
  two, since a newline inside quotes is not a record separator.

* CSV is ambiguous in many small areas -- the presence or absence of a header
  line, the choice of quote character (single or double?) and even the choice
  of separator character are all axes of variability.

### A Note About Headers

Header lines are excluded to simplify line-oriented processing. The naive
filtering, sorting and concatenation of TSV files with line-oriented tools
could easily mix headers with data.

The amount of information provided by a header line is rarely sufficient for
interoperable parsing. The [Data Package][dp] spec provides a mechanism for
bundling column names, types and format information with data.

[dp]: ../data-packages/

