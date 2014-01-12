---
title: JSON Table Schema
layout: default
version: 1.0-pre3.2
last_update: 12 January 2013
created: 12 November 2012
---

This RFC defines a simple schema for tabular data. The schema is
designed to be expressible in JSON.

{% include meta.html %}

### Changelog

- 1.0-pre3.2: (not breaking) add primary key support (see this
    [issue](https://github.com/dataprotocols/dataprotocols/issues/21))

- 1.0-pre3.1: breaking changes.

  - `label` changed to `title` - see [Closer alignment with JSON
    Schema](https://github.com/dataprotocols/dataprotocols/issues/46)
  - `id` changed to `name` (with slight alteration in semantics - i.e. SHOULD
    be unique but no longer MUST be unique)

### Table of Contents 
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

# Concepts

A Table consists of a set of rows. Each row has a set of fields
(columns). We usually expect that each Row has the same set of fields
and thus we can talk about *the* fields for the table as a whole.

In cases of tables in spreadsheets or CSV files we often interpret the
first row as a header row giving the names of the fields. By contrast,
in other situations, e.g. tables in SQL databases the fields (columns)
are explicitly designated.

To illustrate here's a classic spreadsheet table:

    field     field
      |         |
      |         |
      V         V

     A     |    B    |    C    |    D      <--- Row
     ------------------------------------
     valA  |   valB  |  valC   |   valD    <--- Row
     ...

In JSON a table would be:

    [
      { "A": value, "B": value, ... },
      { "A": value, "B": value, ... },
      ...
    ]

# Specification

## Top-Level

A JSON Table Schema has the following structure:

    {
      # fields is an ordered list of field descriptors
      # one for each field (column) in the table
      "fields": [
        # a field-descriptor
        {
          "name": "name of field (e.g. column name)",
          "title": "A nicer human readable label or title for the field",
          "type": "A string specifying the type",
          "format": "A string specifying a format",
          "description": "A description for the field"
          ...
        },
        ... more field descriptors
      ],
      # (optional) specification of the primary key
      "primaryKey": ...
    }

That is, a JSON Table Schema is:

-   a Hash which `MUST` contain a key `fields`
-   `fields` MUST be an array where each entry in the array is a field
    descriptor
-   a field descriptor MUST be a Hash
-   the field descriptor Hash MUST contain a `name` attribute. This
    attribute `SHOULD` correspond to the name of field/column in the
    data file (if it has a name). As such it `SHOULD` be unique (though
    it is possible, but very bad practice, for the data file to have
    multiple columns with the same name)
-   the field descriptor Hash MAY contain any number of other attributes
-   specific attributes that MAY be included in the Hash and whose
    meaning is defined in this spec are:

    -   type: The type of the field (string, number etc) - see below for
        more detail. If type is not provided a consumer should assume a
        type of "string"
    -   title: A nicer human readable label or title for the field
    -   description: A description for this field e.g. "The recipient of
        the funds"
    -   format: A description of the format e.g. "DD.MM.YYYY" for a
        date. See below for more detail.

-   the Hash `MAY` contain an attribute `primaryKey` (specification and meaning
    is detailed below)

## Types

The type attribute is a string indicating the type of this field.

Types are based on the [type set of
json-schema](http://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.1)
with some additions and minor modifications (cf other type lists include
those in [Elasticsearch
types](http://www.elasticsearch.org/guide/reference/mapping/)).

The type list is as follows:

-   **string**: a string (of arbitrary length)
-   **number**: a number including floating point numbers.
-   **integer**: an integer.
-   **date**: a date. This MUST be in ISO6801 format YYYY-MM-DD or, if
    not, a format field must be provided describing the structure.
-   **time**: a time without a date
-   **datetime**: a date-time. This MUST be in ISO 8601 format of
    YYYY-MM-DDThh:mm:ssZ in UTC time or, if not, a format field must be
    provided.
-   **boolean**: a boolean value (1/0, true/false).
-   **binary**: base64 representation of binary data.
-   **object**: (alias json) an JSON-encoded object
-   **geopoint**: has one of the following structures:

        { lon: ..., lat: ... }

        [lon,lat]

        "lon, lat"

-   **geojson**: as per \<<http://geojson.org/>\>
-   **array**: an array
-   **any**: value of field may be any type

## Formats

The format field can be used to describe the format, especially for
dates. Possible examples are:

     # "type": "date" "format": "yyyy"
     
     # type=string "format": "markdown"

## Primary Key

A primary key is a field or set of fields that uniquely identifies each row in
the table.

The `primaryKey` entry in the schema Hash is optional. If present it specifies
the primary key for this table.

The `primaryKey`, if present, MUST be:

* Either: an array of strings with each string corresponding to one of the
  field `name` values in the `fields` array (denoting that the primary key is
  made up of those fields). It is acceptable to have an array with a single
  value (indicating just one field in the primary key). Strictly, order of
  values in the array does not matter. However, it is RECOMMENDED that one
  follow the order the fields in the `fields` has as client applications may
  utitlize the order of the primary key list (e.g. in concatenating values
  together).
* Or: a single string corresponding to one of the field `name` values in
  the `fields` array (indicating that this field is the primary key). Note that
  this version corresponds to the array form with a single value (and can be
  seen as simply a more convenient way of specifying a single field primary
  key).

Here's an example:

    {
      "schema": {
        "fields": [
          {
            "name": "a"
          },
          ...
        ]
        "primaryKey": "a"
       }
    }

Here's an example with an array primary key:

    {
      "schema": {
        "fields": [
          {
            "name": "a"
          },
          {
            "name": "b"
          },
          {
            "name": "c"
          },
          ...
        ]
        "primaryKey": ["a", "c"]
       }
    }

----

# Appendix: Related Work

See <a href="{{site.baseurl}}/data-formats/">Web-Oriented Data Formats</a>  for more details and
links for each format.

-   SQL
-   DSPL
-   JSON-Stat
-   [Google
    BigQuery](https://developers.google.com/bigquery/docs/import#jsonformat)
    (JSON format section)

## DSPL

See <https://developers.google.com/public-data/docs/schema/dspl18>.
Allowed values:

-   string
-   float
-   integer
-   boolean
-   date
-   concept

## Google BigQuery

Example schema:

    'schema': {
      'fields':[
         {
            "mode": "nullable",
            "name": "placeName",
            "type": "string"
         },
         {
            "mode": "nullable",
            "name": "kind",
            "type": "string"
         },  ...
       ]
     }

Types:

-   string - UTF-8 encoded string up to 64K of data (as opposed to 64K
    characters).
-   integer - IEEE 64-bit signed integers: [-263-1, 263-1]
-   float - IEEE 754-2008 formatted floating point values
-   boolean - "true" or "false", case-insensitive
-   record (JSON only) - a JSON object; also known as a nested record

## XML Schema

See <http://www.w3.org/TR/xmlschema-2/#built-in-primitive-datatypes>

* string
* boolean
* decimal
* float
* double
* duration
* dateTime
* time
* date
* gYearMonth
* gYear
* gMonthDay
* gDay
* gMonth
* hexBinary
* base64Binary
* anyURI

## Type Lists

* HTML5 Forms: <http://www.whatwg.org/specs/web-apps/current-work/#attr-input-type>


