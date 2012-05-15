========================
Simple Data Format (SDF)
========================

This document defines a simple data publishing format (Simple Data Format) for
publishing and sharing data.

Key Design Features and Principles
==================================

The format's focus is on simplicity and web usage -- that is, usage online with
access and transmission *over HTTP*. In addition the format is focused on data
that can be presented in a tabular structure and in making it easy to produce
(and consume) this format from spreadsheets and relational databases.

The key features of this format are the following:

* CSV (comma separated variables) as the base data format
* JSON (with CSV alternative) as the base format for schema definition
* JSON (with CSV alternative) as the base format for metadata definition
* Usage of linked data / semantic web attributes for schema definition via the
  JSON-LD standard
* Support for normalization (i.e. splitting of data into multiple CSV file
  tables and definition of links between files)

.. note:: this specification owes a great deal to the excellent Dataset
          Publishing Language (DSPL) put forward by Google. The main difference
          is in using JSON instead of XML for the schema and re-using as far as
          possible the JSON-LD schema language (based on linked-data) rather
          than inventing a new type and schema structure.

Why CSV
-------

1. CSV is very simple - it is perhaps *the* most simple data format
2. CSV is tabular-oriented. Most data structures are either tabular or can be
   transformed to a tabular structure by some form of normalization
3. It is open and the "standard" is well-known
4. It is widely supported - practically every spreadsheet program, relational
   database and programming language in existence can handle CSV in some form
   or other
5. It is text-based and therefore amenable to manipulation and access from a
   wide range of standard tools (including revision control systems such as
   git, mercurial and subversion)
6. It is line-oriented which means it can be incrementally processed -- you do
   not need to read an entire file to extract a single row. For similar reasons
   it means that the format supports streaming.

Why JSON
--------

* JSON is simple
* JSON supports rich structure including nesting and basic types
* JSON is very widely used and supported (all major programming languages can
  handle JSON)
* JSON is web-native (every browser can access and manipulate JSON)
* JSON is readable as simple text making it amenable to management and
  processing using simple text tools

Specification
=============

Example
-------

We provide an initial example. The following involves providing information on
key economic and social indicators for Italian regions (this data comes from
the YourTopia_ project.

.. _YourTopia: http://yourtopia.net/

Here is the sample CSV data::

  year,series,series_id,region,region_id,value,value_normalized
  2006,GDP per capita,gdp1,Provincia Autonoma Bolzano/Bozen,ITD1,"28,298",1
  2008,GDP per capita,gdp1,Valle d'Aosta/VallŽe d'Aoste,ITC2,"28,241",1
  2007,GDP per capita,gdp1,Valle d'Aosta/VallŽe d'Aoste,ITC2,"28,207",1
  2007,GDP per capita,gdp1,Provincia Autonoma Bolzano/Bozen,ITD1,"28,207",1
  2008,GDP per capita,gdp1,Provincia Autonoma Bolzano/Bozen,ITD1,"28,195",0.996877333514358

Here is the schema file (note that comments would have to be removed for this
to be valid JSON)::

  {
    "year": {
      "@type": "xsd:gYear",  // @type as per JSON-LD
      "simpletype": "date", // simple type (see below)
      "format": "yyyy", // simple format information
      "label": "Year
    },
    "series": {
      "@type": xsd:string,
      "simpletype": "string"
    },
    "series_id": {
      // no appropriate type here so can ignore (could invent one)
      // "@type": @id",
      // "@id": "reference to document / dataset"
      "simpletype": "key",
      "foreign_key": "series.csv" // values in this field are key to data in referenced file series.csv
    },
    "value": {
      "@type": "xsd:double",
      "simpletype": "float",
      "label": "Value",
      "description": "Value of the series for this region in this year",
      "description@it": "Italian version of the label"
    },
    "value_normalized": {
      "@type": "xsd:double",
      "@simpletype": "float",
      "description": "Value normalized to be between 0 and 1"
    }
  }

Here is the series data::

  id,label,source,type,format,description@en,description@it,description@es,description@pt
    employment1,Employment rate in the age group 24-60,"NOI Italia",float,percentage,"The employment rate of the population between 20 and 64","Il tasso di occupazione della popolazione tra 20 e 64 anni","La tasa de empleo es calculada dividiendo el numero de personas empleadas con edades comprendidas entre los 20 y los 64 por el total de personas en ese mismo grupo.","A taxa de emprego é calculada dividindo o número de pessoas empregadas com idades compreendidas entre os 20 e os 64 pelo total de pessoas desde mesmo grupo."

.. todo:: google docs spreadsheet example of all in one.

Files
-----

* Each dataset MUST contain at least one or more *data files*
* A data file MUST be in CSV format. It's file name MUST end with ``.csv``. It
  must have a single header row. Further details of the CSV format below.

  * Terminology: each column in the CSV file is termed a *field* and its *id*
    is the string in that column in the header row.

* Associated to each file MAY be a schema file. A schema file MUST be a valid
  JSON document (or, alternatively, a CSV file). A detailed specification of
  the form of the schema file is provided below. Schema files must be named
  after their associated data files appending ``.schema.json`` (or
  ``.schema.csv`` in case of CSV version)
* Each dataset MAY provide general metadata. If so it should do by
  providing it in conformance with the Data Package specification.


CSV Definition
--------------

CSV has never been formally standardized (TODO: check) and various varieties
are often used. The following restrictions regarding CSV structure are part of
this specification:

* CSV files MUST use commas as field delimiters
* CSV files MUST contain one and only one header row
* Rows in CSV files MUST NOT contain more fields than are in the header row
  (though they may contain less)
* CSV files MUST be encoded as UTF-8

Schema Files
------------

A schema file is a JSON file with a single root object. This root object is
modelled as JSON-LD context object describing the fields in the CSV file (so
this is the JSON-LD context for a JSON object corresponding to a row of the CSV
-- i.e. where the CSV file converted to a JSON object in the natural manner
i.e. mapping column name to key and column entry to value).

The JSON object MAY have entries corresponding to each field (column) in the
corresponding CSV file. If such an entry exists it MUST be assumed to be a
description for that field. Addditional keys are permitted beyond this as per
JSON-LD spec.

Special keys on root:

* @type: (optionl) used to define the (semantic web) type of the "object" this
  table represents. See JSON-LD docs for more. 

Special keys on each field:

* @type: JSON-LD type (if any for this field)
* label: human readable name / label for this field
* simple_type: one of::
  
    string | integer | float | date | datetime | object | list

* description: a longer description of this field.
* format: specification of how the field is formatted (e.g. a date may be
  yyyy-mm or yyyy-mmm-dd or dd-mm-yyyy)
* foreign_key: this field holds a key and one can look up this key in the
  SimpleData file specified by this attribute (which may be a url or
  (url-style, forward-slash-only) local path within the dataset to a file).
  
  For example, suppose a file has a field called country whose contents
  is 2-digit ISO code. Then foreign_key would be a URL or relative path to a CSV
  file following this standard and containing a list of regions where the
  region code is in a file named id.

* olap_type: (optional) one of::
  
    dimension | measure
    
  From the OLAP literature we have the concepts of Measures and Dimensions.
  Measures are things like amounts or values. Dimensions are attributes like
  country, region, or a category. Knowing whether something is a measure or a
  dimension helps a great deal in processing and presenting the data and this
  optional convenience field provides a hint to consumers of the data of what
  it is.

.. note:: Multiple languages. As per JSON-LD conventions one may append
          @{2-digit-lang-code} to any string field such as label or description
          to provide information in an alternative language.


.. todo:: Open issues:

          * Definition and links to concepts (locally) - i.e. how do i link to
            the series data table
          * What 

Alternative CSV format
~~~~~~~~~~~~~~~~~~~~~~

This alternative format is provided because of its convenience in specifying an
entire dataset in one spreadsheet.

In this format each key in the JSON file becomes a column. In addition there is
one initial column named @key@. Values for this column are then attribute
names. To illustrate (spacing for illustrative purposes only)::

  @key@, year, series, ...
  @type, ...,  xsd:string
  simpletype, date, string
  label, ....
  ...


Alternatives Discussion
=======================

What alternatives are there for the SimpleData format?

* Use line oriented JSON (?)

  * Greater flexibility and complexity on types and objects
  * No support from spreadsheets

* Use SQLite

  * (+) compact, full DB in one
  * (-) lack of support (e.g. from spreadsheets), no streaming, not accessible with text tools etc

