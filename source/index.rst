==============================
Welcome to Open Data Protocols
==============================

This site is a the home of **simple protocols and formats for working with open
data**. Our mission is both to make it **easier to develop tools and services for
working with data**, and, to ensure **greater interoperability between new and
existing tools and services**.

Work topics include:

* Data catalog interoperability - see the `Data Catalog Interoperability Protocol`_
* Data packages, publication and installation - see the :doc:`Data packages spec <data-packages>`
* Simple formats for facilitating data exchange over the web - see the :doc:`Simple Data Format <simple-data-format>`
* Web-oriented data APIs including those for accessing and querying data
* An overview of sharing and syncing data changes - see :doc:`Protocols for sharing and syncing data <syncing>`
* Webhooks and webservices for data transformation

.. _Data Catalog Interoperability Protocol: http://spec.datacatalogs.org/

.. toctree::
   :hidden:
 
   data-packages
   simple-data-format
   json-table-schema
   csv-dialect
   tabular-diff-format

.. toctree::
   :hidden:

   revisioning-data
   syncing
   reconciliation
   data-query-protocol
   data-formats

Background and Context
======================

The civic and open data community is often hampered by a lack of simple standards for
interaction between services and tools.

We believe there is a clear need for the kinds of lightweight but useful
protocols and formats for doing things like:

* Sharing information between data catalogs
* Packaging data for publication and installation
* Sharing and syncing data changes over HTTP
* Querying data and databases over the web
* Creating web services for data transformation and reconciliation

DataProtocols isn't a formal standardization process like W3C, ISO or OASIS,
but rather is aiming to be a more informal community where we can hammer out
RFCs for data - rough consensus, running code and integrated data (and building
wherever possible on what already exists).

We believe consensus needs to come from a community not just a single vendor or
organization and the user and developer community is now developed enough to
take this on and make it happen.

Moreover, technology and especially web technology has reached the point where
this is both feasible and needed - be that in terms of standards, use of HTTP
and REST, browser maturity, or, in terms of ad-hoc development in tools that is
ripe for "standardization".

Data Protocols was started in Autumn 2011 and arose out of discussions with,
among others, Rufus Pollock and Friedrich Lindenberg of the `Open Knowledge
Foundation`_, Francis Irving and Aidan McGuire of ScraperWiki_, Max Ogden (then
a `Code for America`_ fellow), Chris Taggart of OpenCorporates_, Richard
Cyganiak of DERI_ and members of the `W3C GLD Working Group` and has
subsequently benefitted from input from numerous other individuals.

.. _Open Knowledge Foundation: http://okfn.org/
.. _ScraperWiki: http://scraperwiki.com/
.. _Code for America: http://codeforamerica.com/
.. _OpenCorporates: http://opencorporates.com/
.. _DERI: http://www.deri.ie/
.. _W3C GLD Working Group: http://www.w3.org/2011/gld/charter


Participate and Contribute
==========================

Participation and contributions are welcome. Most work proceeds in an RFC-style manner with discussion on the `mailing list`_.

.. _mailing list: http://lists.okfn.org/mailman/listinfo/data-protocols

Material is kept in a git repo on github: https://github.com/dataprotocols/dataprotocols - fork and submit a pull request to add material.

There is also an issue tracker at https://github.com/dataprotocols/dataprotocols/issues which can be used for specific issues or suggestions.

