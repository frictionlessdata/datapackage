=========================
Web-Oriented Data Formats
=========================

This document reviews existing web-oriented data formats.

Dataset Publishing Language (Google)
====================================

* Overview: https://developers.google.com/public-data/docs/tutorial
* CSV + XML Metadata

Metadata Structure
------------------

Basic dataset metadata

* Name
* Description
* Url
* Provider

  * Name
  * URL

* Topics (aka tags)

Data metadata is organized around Concepts which are Dimensions (attributes) and Metrics (values).

Concept:

* Id
* Info

  * Name
  * Description

* Type

.. note:

   Concepts can extend other concepts

Slices = collections of concepts. Define what is a metric and what is a dimension. Serialize one-to-one with tables.

Tables = definition of a CSV file.

* Can define defaults for columns
* Can define formats (e.g. for data columns ...)

Comments
--------

* DSPL seems an excellent CSV-based data packaging system
* Would be nice to have JSON instead of XML for metadata


RDF and Linked Data
===================

* Overview: http://www.w3.org/wiki/SweoIG/TaskForces/CommunityProjects/LinkingOpenData
* Triple format developed by W3C

Google Visualization API Data Format
====================================

* Metadata: http://code.google.com/apis/visualization/documentation/dev/implementing_data_source.html#jsondatatable
* Data: http://code.google.com/apis/visualization/documentation/reference.html#dataparam. Three attributes:

  * cols: define types of cols
  * rows: a list of rows
  * p: arbitrary key/value pairs.

CKAN Data API
=============

Based on ElasticSearch. See http://docs.ckan.org/en/latest/storage/datastore.html.

OData (Microsoft)
=================

* Overview: http://odata.org/
* Microsoft's data format
* XML + Atom based

SQL
===

Standard ANSI SQL

SQLite
======

* http://www.sqlite.org/
* SQLite binary format - not just sql Not specified by anyone in particular but suggested by several people and now used by Scraperwiki

SODA - Socrata Open Data API
============================

* http://opendata.socrata.com/api/docs

Metaweb Object Model
====================

* Generic 'triple/graph' format used for Freebase
* http://www.freebase.com/docs/mql/ch02.html

Formats - Tabular
=================

General characteristics
-----------------------

Most systems have a model that looks something like:

Dataset

* headers: list of Columns
* data: RowSet
* total (total_rows in couch, count in sql style systems): number of rows in RowSet

Column:

* id
* label

RowSet - list of rows:

* getLength
* getRow(i): returns row

Row:

* list of cells

R (Data Frames)
---------------

* http://cran.r-project.org/doc/manuals/R-intro.html#Lists-and-data-frames

TODO: Need more info ...

Tablib
------

* Tablib: http://docs.tablib.org/
* Tablib Core: https://github.com/kennethreitz/tablib/blob/develop/tablib/core.py

Model:

* Dataset - core object

  * dict: list of Rows (can instantiate with list of arrays/tuples)
  * headers: header fields

* Row: list of fields
* Databook: list of Datasets (e.g. spreadsheet workbook)

SlickGrid
---------

JS tabular data presentation.

* SlickGrid: https://github.com/mleibman/SlickGrid
* SlickGrid.Data.DataView: https://github.com/mleibman/SlickGrid/blob/master/slick.dataview.js

Model:

* Two arguments: data, columns
* Data: an array of dicts or a Model object

  * Model: object implement three methods - see sample implementation SlickGrid.Data.DataView_

    * model.getItem(i) // Returns the ith row
    * model.getLength() // Returns the number of items
    * model.getItemMetadata(i) // not sure about this ...

* Columns: at least id, name (label) and field attributes. See https://github.com/mleibman/SlickGrid/wiki/Column-Options

JS Data
-------

* https://github.com/michael/data

Model:

* Data.Hash (A sortable Hash data-structure)
* Data.Graph (A data abstraction for all kinds of linked data)
* Data.Collection (A simplified interface for tabular data that uses a Data.Graph internally)
* Persistence Layer for Data.Graphs

