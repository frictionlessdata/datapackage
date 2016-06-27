---
title: Web Map Tiling Service
layout: spec
author: OGC
summary: Service definition by the Open Geospatial Consortium that defines exchange of bitmap tiles for map display
redirect_to: http://specs.okfnlabs.org/reference/ogc/protocols/wmts.html
---

Goals
=====

Goal is to unify the exchange of bitmap tiles for web-mapping. 

Definition
==========

The Service has the following operations (for full details check the specification)

* GetCapabilities (Advertises supported layers, projections, grids, formats, etc)
* GetTile (Returns the requested tile)
* GetFeatureInfo (provides details about a selected feature)
* GetLegendGraphic (renders a map legend)

Implementations
===============

_Servers_
* [GeoServer (GeoWebCache)](http://geoserver.org)
* [MapCache](http://mapserver.org/el/mapcache)
* [Mapproxy](http://mapproxy.org)

_Clients_
* [Leaflet](http://leafletjs.com)
* [OpenLayers](http://openlayers.org)
* [ArcBrutile](https://arcbrutile.codeplex.com/) (popular tile layers in ArcGIS)
* [QGIS](http://qgis.org)

Note
====

There are a couple of competing alternatives for this standard; TMS and WMS-c. MapCache and GeoServer support all of these protocols. [Mapnik](http://mapnik.org) is a typical tool that supports these only. Some [new vector protocols](https://www.mapbox.com/developers/vector-tiles) introduced the tiling concept for Vector Data. 

References
==========

*   [OGC WMTS Specification](http://www.opengeospatial.org/standards/wmts)
*	[CITE complience testing](https://github.com/opengeospatial/teamengine)
