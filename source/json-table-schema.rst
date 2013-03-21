=================
JSON Table Schema
=================

:**Version**: 1.0
:**Date**: 2 March 2013

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
       valA1 |   valB1 |  valC1  |   valD1   <--- Row
       valA2 |   valB2 |  valC2  |   valD2   <--- Row
       ...
      

In JSON::

  [
    { "A": valA1, "B": valB1, "C": valC1, "D": valD1 },
    { "A": valA2, "B": valB2, "C": valC2, "D": valD2 },
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

Data Transmission
-----------------

Given the JSON Table Schema, data can be more efficiently transmitted by indexing the fields in each row by their abbreviated `ID`. For instance, given a JSON Table Schema along the lines of::

  {
    "fields": [      
      {
        "id": "A",
        "label": "First Name",
        "type": "string"        
      },
      {
        "id": "B",
        "label": "Last Name",
        "type": "string"        
      },
      {
        "id": "C",
        "label": "Age",
        "type": "integer"        
      },
      {
        "id": "D",
        "label": "Eye Color",
        "type": "string"        
      }
    ]
  }

a message which was originally in the form of::

    [{"fname": "John", "lname": "Smith", "age": 34, "eyeColor": "brown"},
     {"fname": "Cyndi", "lname": "Roe", "age": 41, "eyeColor": "blue"}]

could be abbreviated in the following way::

    [{"A": "John", "B":"Smith", "C": 34, "D": "brown"},
     {"A": "Cyndi", "B":"Roe", "C": 41, "D": "blue"}]


Disregarding the one-time overhead of transmitting the JSON Table Schema, this represents a reduction of 17 characters per line -- over 25% -- for this message. For small tables, the size of the Table Schema may outweigh the benefit obtained from using shortened IDs. The content of larger messages, however, will likely be dominated by the data contained in each row; thus a 25% reduction in each row of data would yield an overall reduction of almost as much. Of course, the schema needn't be re-sent with every transmission of data.

Alternatively, if the order of the fields is guaranteed to be uniform for all rows and in accordance with the order given in the schema, then the field identifiers can be omitted and inferred by the order of the columns. The data can then be sent as a mixed-type array, reducing the example message even further to::

    [["John", "Smith", 34, "brown"],
     {"Cyndi", "Roe", 41, "blue"]]

The message is now approximately 50% of its original size.

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

