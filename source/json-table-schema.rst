=================
JSON Table Schema
=================

:**Version**: 1.0-beta.3
:**Last Updated**: 11 May 2013
:**Created**: 12 November 2012

This RFC defines a simple schema for tabular data. The schema is designed to be expressible in JSON.

Concepts
========

A Table consists of a set of rows. Each row has a set of fields (columns). We usually expect that each Row has the same set of fields and thus we can talk about *the* fields for the table as a whole.

In cases of tables in spreadsheets or CSV files we often interpret the first row as a header row giving the names of the fields. By contrast, in other situations, e.g. tables in SQL databases the fields (columns) are explicitly designated.

To illustrate here's a classic spreadsheet table::

      field     field
        |         |
        |         |
        V         V
      
       A     |    B    |    C    |    D      <--- Row
       ------------------------------------
       valA  |   valB  |  valC   |   valD    <--- Row
       ...
      

In JSON a table would be::

  [
    { "A": value, "B": value, ... },
    { "A": value, "B": value, ... },
    ...
  ]


Specification
=============

Top-Level
---------

A JSON Table Schema has the following structure::


  {
    # fields is an ordered list of field descriptors
    # one for each field (column) in the table
    "fields": [
      # a field-descriptor
      {
        "id": "field unique name / id",
        "label": "A nicer human readable label for the field",
        "type": "A string specifying the type",
        "format": "A string specifying a format",
        "description": "A description for the field"
        ...
      },
      ... more field descriptors
    ]
  }

That is, a JSON Table Schema is:

* a Hash which ``MUST`` contain a key ``fields``
* ``fields`` MUST be an array where each entry in the array is a field descriptor
* a field descriptor MUST be a Hash
* the field descriptor Hash MUST contain an ``id`` attribute. This attribute ``MUST`` be unique among all the fields.
* the field descriptor Hash MAY contain any number of other attributes
* specific attributes that MAY be included in the Hash and whose meaning is defined in this spec are:

  * type: The type of the field (string, number etc) - see below for more
    detail. If type is not provided a consumer should assume a type of "string"
  * label: A nicer human readable label for the field
  * description: A description for this field e.g. "The recipient of the funds"
  * format: A description of the format e.g. "DD.MM.YYYY" for a date. See below
    for more detail.

Types
-----

The type attribute is a string indicating the type of this field.

Types are based on the `type set of json-schema`_ with some additions and minor
modifications (cf other type lists include those in `Elasticsearch types`_).

.. _type set of json-schema: http://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.1
.. _Elasticsearch types: http://www.elasticsearch.org/guide/reference/mapping/

The type list is as follows:

* **string**: a string (of arbitrary length)
* **number**: a number including floating point numbers.
* **integer**: an integer.
* **date**: a date. This MUST be in ISO6801 format YYYY-MM-DD or, if not,
  a format field must be provided describing the structure.
* **time**: a time without a date
* **datetime**: a date-time. This MUST be in ISO 8601 format of YYYY-MM-
  DDThh:mm:ssZ in UTC time or, if not, a format field must be provided.
* **boolean**: a boolean value (1/0, true/false).
* **binary**: base64 representation of binary data.
* **object**: (alias json) an JSON-encoded object
* **geopoint**: has one of the following structures::

      { lon: ..., lat: ... }
      
      [lon,lat]
      
      "lon, lat"

* **geojson**: as per <http://geojson.org/>
* **array**: an array
* **any**: value of field may be any type

Formats
=======

The format field can be used to describe the format, especially for dates. Possible examples are:

    # "type": "date"
    "format": "yyyy"

    # type=string
    "format": "markdown"


Appendix: Related Work
======================

See :doc:`Web-Oriented Data Formats <data-formats>` for more details and links for each format.

* SQL
* DSPL
* JSON-Stat
* `Google BigQuery`_ (JSON format section)

.. _Google BigQuery: https://developers.google.com/bigquery/docs/import#jsonformat

DSPL
----

See https://developers.google.com/public-data/docs/schema/dspl18. Allowed values:

* string  
* float 
* integer 
* boolean 
* date  
* concept

Google BigQuery
---------------

Example schema::

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

* string - UTF-8 encoded string up to 64K of data (as opposed to 64K characters).
* integer - IEEE 64-bit signed integers: [-263-1, 263-1]
* float - IEEE 754-2008 formatted floating point values
* boolean - "true" or "false", case-insensitive
* record (JSON only) - a JSON object; also known as a nested record

