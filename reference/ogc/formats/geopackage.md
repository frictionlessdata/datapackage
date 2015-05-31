---
title: GeoPackage
layout: spec
author: OGC
summary: Format definition by the Open Geospatial Consortium that defines storage of spatial features and tiles in SQLite
---

Goals
=====

Goal is to have an interoperable format for (spatial) data, coverage and tiles exchange. Being a full database and its tile capabilities makes it a good storage platform for mobile apps. 

Definition
==========

GeoPackage is a database schema in SQLite. The database at least has a table 'gpkg_contents' that has records for each of the datasets in the package.

Implementations
===============

_Servers_
* [GeoServer](http://geoserver.org)

_Clients_
* [QGIS](http://qgis.org)
* [GPKG viewer](http://demo.luciad.com/GeoPackage)

_Libraries_
* [OGR/GDAL](http://gdal.org)
* [libgpkg](https://bitbucket.org/luciad/libgpkg)

References
==========

-   [GeoPackage.org](http://www.geopackage.org)
-	[Github](https://github.com/opengeospatial/geopackage)
