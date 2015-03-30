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

Implementations
===============

#Servers

GeoNetwork OpenSource
pyCSW
CKAN CSW
deegree

#Clients

QGIS Metasearch (client)
GXP GeoExt

#Libraries

OpenLayers
OWSlib

References
==========

-   [OGC CSW Specification](http://www.opengeospatial.org/standards/csw)
-   [INSPIRE discovery Service](http://inspire.ec.europa.eu/documents/Network_Services/Technical%20Guidance%20Discovery%20Services%20v2.0.pdf)
-	[CITE complience testing](https://github.com/opengeospatial/teamengine)

