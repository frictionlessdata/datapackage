---
layout: spec
title: CSV Dialect
subtitle: A simple format to describe a CSV file's dialect.
slug: csvdialect
version: 1.2
created: 20 February 2013
updated: 30 January 2017
mediatype: application/vnd.csvdialect+json
authors:
  -
    name: Rufus Pollock
    organisation: Open Knowledge International
descriptor:
  file: csvdialect.json
examples:
  - examples/csvdialect_1.md
  - examples/csvdialect_2.md
  - examples/csvdialect_3.md
changelog:
  - "1.2.1: [case-sensitive header](https://github.com/dataprotocols/dataprotocols/issues/193#issuecomment-99774395)"
  - "1.2: (breaking) - for details see this [issue](https://github.com/dataprotocols/dataprotocols/issues/99). Remove dialect attribute moving all other attributes up one level up one level. Specify defaults for most attributes."
abstract: >
  CSV Dialect defines a simple format to describe the various dialects of CSV files in a language agnostic manner. It aims to deal with a reasonably large subset of the features which differ between dialects, such as terminator strings, quoting rules, escape rules and so on.
---

{{ page.title }} defines a simple format to describe the various dialects of CSV files in a language agnostic manner. It aims to deal with a reasonably large subset of the features which differ between dialects, such as terminator strings, quoting rules, escape rules and so on. The specification has been modeled around the union of the csv  modules in Python and Ruby, and the bulk load capabilities of MySQL and PostgresQL.

{{ page.title }} has nothing to do with the names, contents or types of the headers or data within the CSV file, only how it is formatted. However, {{ page.title }} does allow the presence or absence of a header to be specified, similarly to [RFC4180](http://www.ietf.org/rfc/rfc4180.txt).

{{ page.title }} is also orthogonal to the character encoding used in the CSV file. Note that it is possible for files in CSV format to contain data in more than one encoding.

{{ page.title }} is useful for programmes which might have to deal with multiple dialects of CSV file, but which can rely on being told out-of-band which
dialect will be used in a given input stream. This reduces the need for heuristic inference of CSV dialects, and simplifies the implementation of CSV readers, which must juggle dialect inference, schema inference, unseekable input streams, character encoding issues, and the lazy reading of very large input streams.

Some related work can be found in [this comparison of csv dialect
support](https://docs.google.com/spreadsheet/ccc?key=0AmU3V2vcPKrIdEhoU1NQSWtoQmJwcUNCelJtdkx2bFE&usp=sharing), this [example of similar JSON
format](http://panda.readthedocs.org/en/latest/api.html#data-uploads), and in Python's [PEP 305](http://www.python.org/dev/peps/pep-0305/).
