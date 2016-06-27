---
title: Sensor Observation Service
layout: spec
author: OGC
summary: Service definition by the Open Geospatial Consortium that defines exchange of sensor data over the web
redirect_to: http://specs.okfnlabs.org/reference/ogc/protocols/sos.html
---

Goals
=====

Goal is to unify the exchange of sensor data over the web.

Definition
==========

The Service has the following operations (for full details check the specification)

* GetCapabilities (Advertises projections, formats, etc)
* DescribeSensor
* GetObservation
* GetResult
* GetDataAvailability


SOS is part of a stack of services, named [Sensor Web Enablement](http://www.opengeospatial.org/projects/groups/sensorwebdwg).

Example request: http://sensorweb.demo.52north.org/52n-sos-webapp/service?REQUEST=GetCapabilities&SERVICE=SOS&ACCEPTVERSIONS=2.0.0

Implementations
===============

* [52North](http://52north.org)
* [istSOS](http://sourceforge.net/projects/istsos)
* [Open Sensorhub](http://opensensorhub.org)
* [OpenLayers](http://openlayers.org)

References
==========

*  [OGC CSW Specification](www.opengeospatial.org/standards/sos)
*	[CITE complience testing](https://github.com/opengeospatial/teamengine)

