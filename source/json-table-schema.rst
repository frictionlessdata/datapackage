=================
JSON Table Schema
=================

:Authors: Rufus Pollock

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
      

In JSON::

  [
    { "A": value, "B": value, ... },
    { "A": value, "B": value, ... },
    ...
  ]


Specification
=============

Top-Level
---------

A JSON Table schema has the following structure::


  {
    # fields is an ordered list of field descriptors
    # one for each field (column) in the table
    "fields": [
      # a field-descriptor
      {
        "id": "field unique name / id",
        "label": "A nicer human readable label for the field",
        "type": "A string specifying the type",
        "format": "A string specifying a format"
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

  * label: A nicer human readable label for the field
  * type: the type of the field (string, number etc) - see below

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
* **date**: a date. The preferred format is YYYY-MM-DD.
* **time**: a time without a date
* **date-time (datetime, timestamp)**: a date-time. It is recommended this be in ISO 8601
  format of YYYY-MM- DDThh:mm:ssZ in UTC time.
* **boolean**
* **binary**: base64 representation of binary data.
* **geopoint**: as per `Elasticsearch geo_point`_
  That is a field (in these examples named location) that has one of the
  following structures::

      location: {
        lon: ...
        lat: ...
      }
      
      location: [lon,lat]
      
      location: "lat, lng"

  As bonus there is also support for (beyond the ES style geo_point)::

      // geonames style
      location: {
        lng: ...
        lat: ...
      }
      // found on the web
      location: "(lat, lon)"

* **geojson**: as per <http://geojson.org/>
* **array**: an array
* **object (json)**: an object
* **any**: value of field may be any type

.. _Elasticsearch geo_point: http://www.elasticsearch.org/guide/reference/mapping/geo-point-type.html

