---
title: Web Feature Service
layout: spec
author: OGC
summary: Service definition by the Open Geospatial Consortium that defines exchange (vector) data
redirect_to: http://specs.okfnlabs.org/reference/ogc/protocols/wfs.html
---

Goals
=====

Goal is to unify the exchange of (vector) data over the web

Definition
==========

The Service has the following operations (for full details check the specification)

* GetCapabilities (Advertises supported operations, featuretypes, formats, etc)
* DescribeFeatureType (Returns the data model for a featuretype)
* GetFeature (Returns the requested Features)
* Transaction (Allows to add or modify a feature)

Most common is the use of GML as encoding of feature data. However most of the implementations also support GeoJSON, GeoPackage, CSV and/or KML (check capabilities).

Implementations
===============

_Servers_
* [GeoServer](http://geoserver.org)
* [Mapserver](http://mapserver.org)
* [deegree](http://deegree.org)

_Clients_
* [OpenLayers](http://openlayers.org)
* [QGIS](http://qgis.org) (for WFS2 you need to install [WFS2 extension](https://plugins.qgis.org/plugins/wfsclient))
* [Udig](http://udig.org)

_Libraries_
* [OWSLib](http://geopython.github.io/OWSLib)
* [GeoTools](http://geotools.org)
* [OGR/GDAL](http://gdal.org)
* [gdal-npm](https://www.npmjs.com/package/gdal)

References
==========

* [OGC WFS Specification](http://www.opengeospatial.org/standards/wfs)
* [CITE compliance testing](https://github.com/opengeospatial/teamengine)
