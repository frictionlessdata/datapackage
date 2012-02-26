===================
Data Query Protocol
===================

This document is about providing a proposal for a standardized way of making
queries to (heterogeneous) databases over HTTP. It is the need for support for
querying over HTTP that makes this a protocol rather than just a language
though it will build on or require a data query language of some form.

The kind of use cases we're thinking of are: Visualisation tools calling
databases of data scraping tools. Crowd sourcing tools augmenting information
dynamically pulled from a data catalogue.


Existing Work
=============

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

UnQL is a query language not a query protocol so provides no information 

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


