---
title: Metadata in Table Schema
sidebar:
  hidden: true
---

<table>
  <tr>
    <th>Authors</th>
    <td>Christophe Benz, Johan Richer</td>
  </tr>
</table>

## Overview

Table Schemas need their own metadata to be stand-alone and interpreted without relying on other contextual information (Data Package metadata for example). Adding metadata to describe schemas in a structured way would help users to understand them and would increase their sharing and reuse.

Currently it is possible to add custom properties to a Table Schema, but the lack of consensus about those properties restricts common tooling and wider adoption.

## Use cases

- Documentation: generating Markdown documentation from the schema itself is a useful use case, and contextual information (description, version, authors...) needs to be retrieved.
- Cataloging: open data standardisation can be increased by improving Table Schemas shareability, for example by searching and categorising them (by keywords, countries, full-text...) in catalogs.
- Machine readability: tools like Goodtables could use catalogs to access Table Schemas in order to help users validate tabular files against existing schemas. Metadata would be needed for tools to find and read those schemas.

## Specification

This pattern introduces the following properties to the Table Schema spec (using [the Frictionless Data core dictionary](https://github.com/frictionlessdata/specs/blob/master/schemas/dictionary/common.yml) as much as possible):

- `name`: An identifier string for this schema.
- `title`: A human-readable title for this schema.
- `description`: A text description for this schema.
- `keywords`: The keyword(s) that describe this schema.
  _Tags are useful to categorise and catalog schemas._
- `countryCode`: The ISO 3166-1 alpha-2 code for the country where this schema is primarily used.
  _Since open data schemas are very country-specific, it's useful to have this information in a structured way._
- `homepage`: The home on the web that is related to this schema.
- `path`: A fully qualified URL for this schema.
  _The direct path to the schema itself can be useful to help accessing it (i.e. machine readability)._
- `image`: An image to represent this schema.
  _An optional illustration can be useful for example in catalogs to differentiate schemas in a list._
- `licenses`: The license(s) under which this schema is published.
- `resources`: Example tabular data resource(s) validated or invalidated against this schema.
  _Oftentimes, schemas are shared with example resources to illustrate them, with valid or even invalid files (e.g. with constraint errors)._
- `sources`: The source(s) used to created this schema.
  _In some cases, schemas are created after a legal text or some draft specification in a human-readable document. In those cases, it's useful to share them with the schema._
- `created`: The datetime on which this schema was created.
- `lastModified`: The datetime on which this schema was last modified.
- `version`: A unique version number for this schema.
- `contributors`: The contributors to this schema.

## Example schema

```
{
  "$schema": "https://specs.frictionlessdata.io/schemas/table-schema.json",
  "name": "irve",
  "title": "Infrastructures de recharge de véhicules électriques",
  "description": "Spécification du fichier d'échange relatif aux données concernant la localisation géographique et les caractéristiques techniques des stations et des points de recharge pour véhicules électriques",
  "keywords": [
      "electric vehicle",
      "ev",
      "charging station",
      "mobility"
  ],
  "countryCode": "FR",
  "homepage": "https://github.com/etalab/schema-irve",
  "path": "https://github.com/etalab/schema-irve/raw/v1.0.1/schema.json",
  "image": "https://github.com/etalab/schema-irve/raw/v1.0.1/irve.png",
  "licenses": [
    {
      "title": "Creative Commons Zero v1.0 Universal",
      "name": "CC0-1.0",
      "path": "https://creativecommons.org/publicdomain/zero/1.0/"
    }
  ],
  "resources": [
    {
      "title": "Valid resource",
      "name": "exemple-valide",
      "path": "https://github.com/etalab/schema-irve/raw/v1.0.1/exemple-valide.csv"
    },
    {
      "title": "Invalid resource",
      "name": "exemple-invalide",
      "path": "https://github.com/etalab/schema-irve/raw/v1.0.1/exemple-invalide.csv"
    }
  ],
  "sources": [
    {
      "title": "Arrêté du 12 janvier 2017 relatif aux données concernant la localisation géographique et les caractéristiques techniques des stations et des points de recharge pour véhicules électriques",
      "path": "https://www.legifrance.gouv.fr/eli/arrete/2017/1/12/ECFI1634257A/jo/texte"
    }
  ],
  "created": "2018-06-29",
  "lastModified": "2019-05-06",
  "version": "1.0.1",
  "contributors": [
    {
      "title": "John Smith",
      "email": "john.smith@etalab.gouv.fr",
      "organization": "Etalab",
      "role": "author"
    },
    {
      "title": "Jane Doe",
      "email": "jane.doe@aol.com",
      "organization": "Civil Society Organization X",
      "role": "contributor"
    }
  ],
  "fields": [ ]
}
```

## Implementations

The following links are actual examples already using this pattern, but not 100 % aligned with our proposal. The point is to make the Table Schema users converge towards a common pattern, before considering changing the spec.

- @OpenDataFrance has initiated the creation of [Table Schemas](http://git.opendatafrance.net/scdl/) to standardise common French open data datasets. [Their Markdown documentation](http://scdl.opendatafrance.net/) is generated automatically from the schemas ([using some scripts](https://git.opendatafrance.net/validata/validata-doc-generator/)), including contextual information.
- A tool called [Validata](https://go.validata.fr/) was developed, based on Goodtables, to help French open data producers follow the schemas. It uses metadata from the schemas to present them.
- @Etalab has launched [schema.data.gouv.fr](http://schema.data.gouv.fr/), an official open data schema catalog, which is specific to France. [It needs additional metadata in the schemas to validate them](https://schema.data.gouv.fr/documentation/validation-schemas#validations-sp%C3%A9cifiques-au-format-table-schema).
- [Example Table Schema](https://github.com/etalab/schema-irve/blob/master/schema.json) from @Etalab using metadata properties.
