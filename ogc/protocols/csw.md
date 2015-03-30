---
title: Catalog Service for the Web
layout: spec
author: OGC
summary: Service definition by the Open Geospatial Consortium that defines exchange of metadata describing datasets
---

Goals
=====

Goal is to unify the exchange of metadata describing datasets and services over the web.

Definition
==========

The Service has the folowing operations (for full details check the specification)

* GetCapabilities (advertises the supported operations, schemas and formats)
* DescribeRecord
* GetDomain
* GetRecords (allows to get a list of summaries using a set of filter)
* GetRecordById
* Transaction (allows to add and update metadata)
* Harvest

Example-request: http://www.nationaalgeoregister.nl/geonetwork/srv/eng/csw?request=GetCapabilities&service=CSW&version=2.0.1

The exchanged metadata can have any schema as advertised in GetCapabilities, most common are dublin-core, dcat, fgdc, iso19139 and iso19115-3

Note that there are some alternative practices/standards that have a similar functionality; [OAI-MPH](http://www.openarchives.org/pmh), [Z39.50](http://en.wikipedia.org/wiki/Z39.50), [CKAN-API](http://docs.ckan.org/en/ckan-2.2/api.html), [SPARQL/DCAT](http://www.w3.org/TR/vocab-dcat).

Implementations
===============

_Servers_

* [GeoNetwork](http://geonetwork-opensource.org)
* [pyCSW](http://pycsw.org)
* [CKANEXT-spatial](http://ckanext-spatial.readthedocs.org/en/latest/csw.html)
* [deegree](http://deegree.org)

_Clients_

* [QGIS Metasearch](https://plugins.qgis.org/plugins/MetaSearch/)
* [GXP GeoExt](http://gxp.opengeo.org/master/examples/catalogue.html)

_Libraries_

* [OpenLayers](http://openlayers.org)
* [OWS.js](https://github.com/OSGeo/ows.js)
* [OWSlib](http://geopython.org/owslib)

References
==========

* [OGC CSW Specification](http://www.opengeospatial.org/standards/csw)
*  [INSPIRE discovery Service](http://inspire.ec.europa.eu/documents/Network_Services/Technical%20Guidance%20Discovery%20Services%20v2.0.pdf)
*	[CITE compliance testing](https://github.com/opengeospatial/teamengine)

