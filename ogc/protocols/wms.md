---
title: Web Map Service
layout: spec
author: OGC
summary: Service definition by the Open Geospatial Consortium that defines exchange of bitmaps for map visualisation
---

Goals
=====

Goal is to unify the exchange of bitmaps for map visualisation

Definition
==========

The Service has the following operations (for full details check the specification)

* GetCapabilities (Advertises supported layers, projections, formats, etc)
* GetMap (Returns the requested map)
* GetFeatureInfo (provides details about a selected feature)
* GetLegendGraphic (renders a map legend)

Implementations
===============

_Servers_
* [GeoServer (GeoWebCache)](http://geoserver.org)
* [MapServer](http://mapserver.org)
* [deegree](http://deegree.org)
* [QGIS server](http://qgis.org)

_Clients_
* [Leaflet]()
* [OpenLayers]()
* Google Earth
* QGIS

References
==========

*   [OGC WMS Specification](http://www.opengeospatial.org/standards/wms)
*	[CITE complience testing](https://github.com/opengeospatial/teamengine)

