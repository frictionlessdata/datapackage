=========================
Web-Oriented Data Formats
=========================

This document reviews existing web-oriented data formats.

Dataset Publishing Language
===========================

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
========

* DSPL seems an excellent CSV-based data packaging system
* Would be nice to have JSON instead of XML for metadata

