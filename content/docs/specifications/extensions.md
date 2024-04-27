---
title: Extensions
sidebar:
  order: 5
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh, Adam Kariv, Evgeny Karev, Peter Desmet, Data Package Working Group</td>
  </tr>
</table>

The Data Package Standard extensibility features for domain-specific needs.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)

## Introduction

The Data Package Standard provides a rich set of metadata and data features for general applications. At the same time, the Data Package Standard at its core is domain-agnostic and does not provide any builtin means to describe metadata in specific knowledge areas such as biology or medicine.

A domain-specific extension is the way to enrich Data Package's metadata to meet specific needs of a knowledge domain. For example, there are some prominent Data Package extensions:

- [Camera Trap Data Package](https://camtrap-dp.tdwg.org/)
- [Fiscal Data Package](https://fiscal.datapackage.org)

## Extension

The Data Package Standard has a simple yet powerful extension mechanism based on the [Profile](../glossary/#profile) concept. An extension is, generally speaking, a project that provides one or more domain-specific profiles to the Data Package Standard specifications.

From user-perspective, a custom profile can be provided as a `$schema` property in a corresponding specification [Descriptor](../glossary/#descriptor). Having a profile instructs implementation to validate a descriptor using JSON Schema rules of the profile.

Usually, Data Package is the specification that is extended. As a container format, it is the most natural target for metadata enrichment. At the same time, technically any of the core specifications can be extended. For example, if you build a Table Schema catalog, it is possible to extend a Table Schema specification using the same approach as described below.

Note, that the Data Package Standard's extension system completely relies on the JSON Schema Standard without extending its builtin features in any way. It makes the system robust and provides rich tooling support such as [text editor validation](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-json).

Combining modern JSON Schema features with an ability to provide profiles to any of the core Data Package Standard specification descriptors, allows to achieve almost any of metadata enrichment goals including but not limited to:

- Adding new domain-specific properties.
- Requiring existing properties to comply with certain requirements.
- Defining what resources are expected.
- Requiring resources to meet certain dialect or schema requirements.
- Combining existent profiles as a part of a high-level extension.
- Creating domain-specific dialect and schema catalogues.

## Example

For example, we will create a Spatial Data Package that requires a `geopoint` marker to be provided for each resource consisting a Data Package.

### Profile

First of all, we need to create a Data Package profile. Note that it includes a default data package profile as per the [specification requirement](../data-package/#schema):

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Spatial Data Package Profile",
  "type": "object",
  "allOf": [
    { "$ref": "https://datapackage.org/profiles/2.0/datapackage.json" },
    { "$ref": "#/definitions/spatialMixin" }
  ],
  "definitions": {
    "spatialMixin": {
      "type": "object",
      "properties": {
        "resources": {
          "type": "array",
          "item": {
            "type": "object",
            "required": ["geopoint"],
            "properties": {
              "geopoint": {
                "type": "object",
                "properties": {
                  "lon": { "type": "number" },
                  "lat": { "type": "number" },
                  "additionalProperties": false
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Descriptor

Consider that the profile above is published at `https://spatial.datapackage.org/profiles/1.0/datapackage.json`. In this case, a Data Package descriptor compatible to exemplar Spatial Data Package (v1) will look as below:

```json
{
  "$schema": "https://spatial.datapackage.org/profiles/1.0/datapackage.json",
  "title": "Spatial Data Package Descriptor",
  "resources": [
    {
      "name": "expedition-1",
      "path": "expedition-1.csv",
      "geopoint": {
        "lon": 90,
        "lat": 90
      }
    }
  ]
}
```

### Software

Even though they are not aware of the extension, any Data Package software implementation will be validating a Spatial Data Package out of the box: both the domain-specific properties as well as the general Data Package properties. We do encourage extensions authors however to build on top of existing software to support domain-specific properties on the programming models level as well.
