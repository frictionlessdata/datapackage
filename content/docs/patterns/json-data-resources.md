---
title: JSON Data Resources
---

A simple format to describe a single structured JSON data resource. It includes support both for metadata such as author and title and a [schema](https://json-schema.org/) to describe the data.

## Introduction

A **JSON Data Resource** is a type of [Data Resource][dr] specialized for describing structured JSON data.

JSON Data Resource extends [Data Resource][dr] in following key ways:

- The `schema` property MUST follow the [JSON Schema](https://json-schema.org/) specification,
  either as a JSON object directly under the property, or a string referencing another
  JSON document containing the JSON Schema

## Examples

A minimal JSON Data Resource, referencing external JSON documents, looks as follows.

```javascript
// with data and a schema accessible via the local filesystem
{
  "profile": "json-data-resource",
  "name": "resource-name",
  "path": [ "resource-path.json" ],
  "schema": "jsonschema.json"
}

// with data accessible via http
{
  "profile": "json-data-resource",
  "name": "resource-name",
  "path": [ "http://example.com/resource-path.json" ],
  "schema": "http://example.com/jsonschema.json"
}
```

A minimal JSON Data Resource example using the data property to inline data looks as follows.

```javascript
{
  "profile": "json-data-resource",
  "name": "resource-name",
  "data": {
    "id": 1,
    "first_name": "Louise"
  },
  "schema": {
    "type": "object",
    "required": [
      "id"
    ],
    "properties": {
      "id": {
        "type": "integer"
      },
      "first_name": {
        "type": "string"
      }
    }
  }
}
```

A comprehensive JSON Data Resource example with all required, recommended and optional properties looks as follows.

```javascript
{
  "profile": "json-data-resource",
  "name": "solar-system",
  "path": "http://example.com/solar-system.json",
  "title": "The Solar System",
  "description": "My favourite data about the solar system.",
  "format": "json",
  "mediatype": "application/json",
  "encoding": "utf-8",
  "bytes": 1,
  "hash": "",
  "schema": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": [
      "id"
    ],
    "properties": {
      "id": {
        "type": "integer"
      },
      "name": {
        "type": "string"
      }
      "description": {
        "type": "string"
      }
    }
  },
  "sources": [{
    "title": "The Solar System - 2001",
    "path": "http://example.com/solar-system-2001.json",
    "email": ""
  }],
  "licenses": [{
    "name": "CC-BY-4.0",
    "title": "Creative Commons Attribution 4.0",
    "path": "https://creativecommons.org/licenses/by/4.0/"
  }]
}
```

## Specification

A JSON Data Resource MUST be a [Data Resource][dr], that is it MUST conform to the [Data Resource specification][dr].

In addition:

- The Data Resource `schema` property MUST follow the [JSON Schema](https://json-schema.org/) specification,
  either as a JSON object directly under the property, or a string referencing another
  JSON document containing the JSON Schema

* There `MUST` be a `profile` property with the value `json-data-resource`

- The data the Data Resource describes MUST, if non-inline, be a JSON file

## JSON file requirements

When `"format": "json"`, files must strictly follow the [JSON specification](https://www.json.org/). Some implementations `MAY` support `"format": "jsonc"`, allowing for non-standard single line and block comments (`//` and `/* */` respectively).

## Implementations

None known.
