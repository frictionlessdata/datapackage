---
title: Web-Oriented Data Formats
layout: default
reference: true
listed: true
---

This document reviews existing web-oriented data formats.

HTML microformats
=================

-   microformats overview: <http://microformats.org/about> and
    <http://microformats.org/wiki>
-   additional similar approaches: RDFa and microdata
-   microformats-2: latest iteration based on lessons learned from above

    -   <http://microformats.org/wiki/microformats-2>

-   relationships between data, documents, using standard rel attribute
    values
-   semantic class names re-using well established vocabularies (e.g.
    vCard, iCalendar)
-   additional vocabularies developed with an open scientific process
    and community, CC0 public domain

Dataset Publishing Language (Google)
====================================

-   Overview: <https://developers.google.com/public-data/docs/tutorial>
-   CSV + XML Metadata

Metadata Structure
------------------

Basic dataset metadata

-   Name
-   Description
-   Url
-   Provider

    -   Name
    -   URL

-   Topics (aka tags)

Data metadata is organized around Concepts which are Dimensions
(attributes) and Metrics (values).

Concept:

-   Id
-   Info

    -   Name
    -   Description

-   Type

Slices = collections of concepts. Define what is a metric and what is a
dimension. Serialize one-to-one with tables.

Tables = definition of a CSV file.

-   Can define defaults for columns
-   Can define formats (e.g. for data columns ...)

Comments
--------

-   DSPL seems an excellent CSV-based data packaging system
-   Would be nice to have JSON instead of XML for metadata

RDF and Linked Data
===================

-   Overview:
    <http://www.w3.org/wiki/SweoIG/TaskForces/CommunityProjects/LinkingOpenData>
-   Triple format developed by W3C

Google Visualization API Data Format
====================================

-   Metadata:
    <http://code.google.com/apis/visualization/documentation/dev/implementing_data_source.html#jsondatatable>
-   Data:
    <http://code.google.com/apis/visualization/documentation/reference.html#dataparam>.
    Three attributes:

    -   cols: define types of cols
    -   rows: a list of rows
    -   p: arbitrary key/value pairs.

Google BigQuery
===============

<https://developers.google.com/bigquery/>

-   Format documentation (for import / export):
    <https://developers.google.com/bigquery/docs/import>
-   CSV and JSON as data, schema as JSON

CKAN Data API
=============

See <http://docs.ckan.org/en/latest/datastore.html> and
<http://docs.ckan.org/en/latest/datastore-api.html>.

-   JSON based
-   Tabular oriented

JSON-Stat
=========

<http://json-stat.org/> with the detailed specification at
<http://json-stat.org/doc/>

-   "The ultimate goal of json-stat.org is to define a JSON schema for
    statistical dissemination or at least some guidelines and good
    practices when dealing with stats in JSON."
-   JSON based and cube oriented

Example (reasonably complex):

    {
       "dataset" : {
          "value" : [4729, 4832, 9561],
          "dimension" : {
             "id" : ["metric", "time", "geo", "sex"],
             "size" : [1, 1, 1, 3],
             "metric" : {
                "category" : {
                   "label" : {
                      "pop" : "Population"
                   },
                   "unit" : {
                      "type" : {
                         "pop" : "count"
                      }, 
                      "base" : {
                         "pop" : "Person"
                      },
                      "symbol" : {
                         "pop" : null
                      },
                      "mult" : {
                         "pop" : 0
                      }
                   },
                }
             },
             …
          }
       }
    }

OData (Microsoft)
=================

-   Overview: <http://odata.org/>
-   Microsoft's data format
-   XML + Atom based

SQL
===

Standard ANSI SQL

SQLite
======

-   <http://www.sqlite.org/>
-   SQLite binary format - not just sql Not specified by anyone in
    particular but suggested by several people and now used by
    Scraperwiki

SODA - Socrata Open Data API
============================

-   <http://opendata.socrata.com/api/docs>

Metaweb Object Model
====================

-   Generic 'triple/graph' format used for Freebase
-   <http://www.freebase.com/docs/mql/ch02.html>

Formats - Tabular
=================

General characteristics
-----------------------

Most systems have a model that looks something like:

Dataset

-   headers: list of Columns
-   data: RowSet
-   total (total\_rows in couch, count in sql style systems): number of
    rows in RowSet

Column:

-   id
-   label

RowSet - list of rows:

-   getLength
-   getRow(i): returns row

Row:

-   list of cells

R (Data Frames)
---------------

-   <http://cran.r-project.org/doc/manuals/R-intro.html#Lists-and-data-frames>

TODO: Need more info ...

Tablib
------

-   Tablib: <http://docs.tablib.org/>
-   Tablib Core:
    <https://github.com/kennethreitz/tablib/blob/develop/tablib/core.py>

Model:

-   Dataset - core object

    -   dict: list of Rows (can instantiate with list of arrays/tuples)
    -   headers: header fields

-   Row: list of fields
-   Databook: list of Datasets (e.g. spreadsheet workbook)

SlickGrid
---------

JS tabular data presentation.

-   SlickGrid: <https://github.com/mleibman/SlickGrid>
-   SlickGrid.Data.DataView:
    <https://github.com/mleibman/SlickGrid/blob/master/slick.dataview.js>

Model:

-   Two arguments: data, columns
-   Data: an array of dicts or a Model object

    -   Model: object implement three methods - see sample
        implementation SlickGrid.Data.DataView\_

        -   model.getItem(i) // Returns the ith row
        -   model.getLength() // Returns the number of items
        -   model.getItemMetadata(i) // not sure about this ...

-   Columns: at least id, name (label) and field attributes. See
    <https://github.com/mleibman/SlickGrid/wiki/Column-Options>

JS Data
-------

-   <https://github.com/michael/data>

Model:

-   Data.Hash (A sortable Hash data-structure)
-   Data.Graph (A data abstraction for all kinds of linked data)
-   Data.Collection (A simplified interface for tabular data that uses a
    Data.Graph internally)
-   Persistence Layer for Data.Graphs
