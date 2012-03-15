===================
Data Query Protocol
===================

This document provides a list of all current efforts to create a query protocol
which can be used over HTTP. After discussing the existing work, a proposal
discusses some good practices for the future.

It is the need for support for querying over HTTP that makes this a protocol rather
than just a language, though it will build on or require a data query language of some form.

The kind of use cases that might benefit from a query protocol are:

* Data viewers calling databases to get data to display.
* Visualisation tools calling databases or data scraping tools.
* Crowd sourcing tools augmenting information dynamically pulled from a data
  catalogue.

Introduction
============

Before diving deeper into existing data query protocols, an introduction will discuss
various aspects of querying data over HTTP.

Querying
--------

Querying a dataset over HTTP, whether these data are tabular or not, involves manipulating
the response in several ways. Functionality that is needed for querying a dataset:

1. selecting
2. limiting
3. ordering by
4. filtering
5. aggregating (sum, count, distinct)

An extra for querying data over HTTP is joining data on different HTTP servers.

Identifying resources
---------------------

A first question that needs to be brought forward is how the dataset that is going to be
manipulated is identified. Many languages, such as SQL, identify a dataset using a
simple name. Other languages, such as SPARQL, identify a dataset using URIs.

When URIs are chosen to identify resources, the protocol might also choose to embrace
the RESTful principles. It can become an extra layer upon REST (these protocols usually
come with an end-point), or it can become part of REST (extra request parameters are
sent with the request).

Big Data vs. Small Data
-----------------------

Small Data are data that can be returned within one HTTP response. These data can be 
scraped from a website, can be the result from a query on a RDBMS, can be a static CSV file...

Big Data are data that cannot be maintained on one single machine.

A third kind are data that are data stored in a RDBMS.

Not all protocols can handle the three kinds of data. Some protocols only perform queries on
what would have been returned in a HTTP response. Others translate the HTTP query string
to the query language of their big data or RDBMS back-end.

The Semantic Web
----------------

The Semantic Web has been the subject of academic research for several years. RDF triples 
are used to store data in triplestores. A triple is a series of 3 URIs which identify an 
object, a predicate and a subject.

The Semantic Web gives a new dimension to query languages. We could for instance filter on
all elements that happen to be a schema:Library.

Existing Work
============= 

ElasticSearch
-------------

JSON oriented document store and search index.

* http://www.elasticsearch.org/guide/reference/api/search/
* http://www.elasticsearch.org/guide/reference/query-dsl/

Webstore
--------

Designed to expose RDBMS over RESTful HTTP.

* http://github.com/okfn/webstore
* Documentation (includes spec of query format): http://webstore.readthedocs.org/en/latest/index.html
* Supports RESTful style as well as full SQL

.. _Webstore: http://github.com/okfn/webstore

SQL
---

Raw SQL over HTTP.

This is one in Scraperwiki and the Webstore_.

DAP
---

DAP is a data transmission protocol designed speciﬁcally for science data. The
protocol relies on the widely used and stable HTTP and MIME standards, and
provides data types to accommodate gridded data, relational data, and time
series, as well as allowing users to deﬁne their own data types.

* http://opendap.org/pdf/ESE-RFC-004v1.2.pdf
* http://opendap.org/

Unstructured Query Language
---------------------------

* UnQL means Unstructured Query Language. It's an open query language for JSON, semi-structured and document databases.
* http://www.unqlspec.org/display/UnQL/Home

UnQL is a query language not a query protocol so provides no information on how clients and servers interact.

HTSQL
-----

* http://htsql.org/
* A database query language based on SQL

  * HTSQL is a URI-based high-level query language for relational databases. HTSQL wraps your database with a web service layer, translating HTTP requests into SQL and returning results as HTML, JSON, etc.

URI Fragment Identifiers for the text/csv Media Type
----------------------------------------------------

* Method for addressing (and hence possibly querying) into csv documents
* http://tools.ietf.org/html/draft-hausenblas-csv-fragment-00
* Status: draft
* Published: 26 April 2011

Google Visualization API Query Language
---------------------------------------

Another restricted SQL. Has advantage of one existing implementation - so would
immediately work with Google Spreadsheets and Fusion Tables, presumably? Also

* http://code.google.com/apis/chart/interactive/docs/querylanguage.html#Language_Syntax

SPARQL
------

SPARQL is the de facto standard query language for triple stores. It uses URIs to identify
resources. Anyone can directly execute SPARQL queries over HTTP using the end-point.

The DataTank and SPECTQL
------------------------

The DataTank is a 5 minute RESTful API. It comes with a query language, based on HTSQL, which
provides an easy way to structure the response to be able to directly use it inside your app
or visualisation.

For example:

 http://data.irail.be/spectql/Airports/Liveboard/LCY/2012/03/04/12/00/departures{iso8601,delay-,direction}:csv

Selects the time, delay and direction of planes leaving at the airport of London. Sorted by delay (DESC) 
and with CSV as the output format.


Proposal
========

The proposal divides into 2 parts. First, the definition of a JSON-serializable
query object. Second, the presentation of that data to a web accessible query
endpoint.

Query Object
------------

The Proposal is heavily based on `ElasticSearch query language`_

.. _ElasticSearch query language: http://www.elasticsearch.org/guide/reference/api/search/

Query object has the following key attributes:

* size (=limit): number of results to return
* from (=offset): offset into result set -
  http://www.elasticsearch.org/guide/reference/api/search/from-size.html
* sort: sort order -
  http://www.elasticsearch.org/guide/reference/api/search/sort.html
* query: Query in ES Query DSL
  http://www.elasticsearch.org/guide/reference/api/search/query.html
* fields: set of fields to return -
  http://www.elasticsearch.org/guide/reference/api/search/fields.html
* facets: - see http://www.elasticsearch.org/guide/reference/api/search/facets/

Additions:

* q: either straight text or a hash will map directly onto a [query_string
  query](http://www.elasticsearch.org/guide/reference/query-dsl/query-string-query.html)
  in backend

  * Of course this can be re-interpreted by different backends. E.g. some may
    just pass this straight through e.g. for an SQL backend this could be the
    full SQL query

* filters: dict of fields with for each one specified a filter like term,
  terms, prefix, range. This provides a quick way to do filtering.

  * Value for a field can just be text in which case this becomes a term query
    on that field

    * E.g. my-field: 'abc' - would only match results with abc in that field


Examples
~~~~~~~~

::

  {
     q: 'quick brown fox',
     filters: {
       'owner': 'jones'
     }
  }

