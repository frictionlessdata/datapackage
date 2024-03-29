---
title: Data Package
sidebar:
  order: 1
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh, Evgeny Karev, Peter Desmet</td>
  </tr>
  <tr>
    <th>Profile</th>
    <td><a href="/profiles/data-package.json">data-package.json</a></td>
  </tr>
</table>

A simple container format for describing a coherent collection of data in a single 'package'. It provides the basis for convenient delivery, installation and management of datasets.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)

## Introduction

A Data Package consists of:

- Metadata that describes the structure and contents of the package
- Resources such as data files that form the contents of the package

The Data Package metadata is stored in a "descriptor". This descriptor is what makes a collection of data a Data Package. The structure of this descriptor is the main content of the specification below.

In addition to this descriptor a data package will include other resources such as data files. The Data Package specification does NOT impose any requirements on their form or structure and can therefore be used for packaging **any kind of data**.

The data included in the package can be provided as:

- Files bundled locally with the package descriptor
- Remote resources, referenced by URL
- "Inline" data (see below) which is included directly in the descriptor

## Structure

A minimal data package on disk would be a directory containing a single file:

```text
datapackage.json  # (required) metadata and schemas for this data package
```

Lacking a single external source of data would make this of limited use. A slightly less minimal version would be:

```text
datapackage.json
# a data file (CSV in this case)
data.csv
```

Additional files such as a README, scripts (for processing or analyzing the data) and other material may be provided. By convention scripts go in a scripts directory and thus, a more elaborate data package could look like this:

```text
datapackage.json  # (required) metadata and schemas for this data package
README.md         # (optional) README in markdown format

# data files may go either in data subdirectory or in main directory
mydata.csv
data/otherdata.csv

# the directory for code scripts - again these can go in the base directory
scripts/my-preparation-script.py
```

Several example data packages can be found in the [datasets organization on github](https://github.com/datasets), including:

- [World GDP](https://github.com/datasets/gdp)
- [ISO 3166-2 country codes](https://github.com/datasets/country-codes)

## Descriptor

The descriptor is the central file in a Data Package. It provides:

- General metadata such as the package's title, license, publisher etc
- A list of the data "resources" that make up the package including their location on disk or online and other relevant information (including, possibly, schema information about these data resources in a structured form)

A Data Package descriptor `MUST` be a valid JSON `object`. (JSON is defined in [RFC 4627](http://www.ietf.org/rfc/rfc4627.txt)). When available as a file it `MUST` be named `datapackage.json` and it `MUST` be placed in the top-level directory (relative to any other resources provided as part of the data package).

The descriptor `MUST` contain a `resources` property describing the data resources.

All other properties are considered `metadata` properties. The descriptor `MAY` contain any number of other `metadata` properties. The following sections provides a description of required and optional metadata properties for a Data Package descriptor.

Adherence to the specification does not imply that additional, non-specified properties cannot be used: a descriptor `MAY` include any number of properties in additional to those described as required and optional properties. For example, if you were storing time series data and wanted to list the temporal coverage of the data in the Data Package you could add a property `temporal` (cf [Dublin Core](http://dublincore.org/documents/usageguide/qualifiers.shtml#temporal)):

```json
"temporal": {
  "name": "19th Century",
  "start": "1800-01-01",
  "end": "1899-12-31"
}
```

This flexibility enables specific communities to extend Data Packages as appropriate for the data they manage. As an example, the [Tabular Data Package](https://specs.frictionlessdata.io/tabular-data-package/) specification extends Data Package to the case where all the data is tabular and stored in CSV.

Here is an illustrative example of a datapackage JSON file:

```json
{
  "name" : "a-unique-human-readable-and-url-usable-identifier",
  "title" : "A nice title",
  "licenses" : [ ... ],
  "sources" : [ ... ],
  "resources": [
    {
      ...
    }
  ]
}
```

## Properties

A Data Package descriptor `MUST` have `resoures` property and `SHOULD` have `name`, `id`, `licenses`, and `profile` properties.

### `resources` [required]

The `resources` property is `REQUIRED`, with at least one resource.

Packaged data resources are described in the `resources` property of the package descriptor. This property `MUST` be an array of `objects`. Each object `MUST` follow the [Data Resource ](../data-resource/) specification.

### `name`

The name is a simple name or identifier to be used for this package in relation to any registry in which this package will be deposited.

- It `SHOULD` be human-readable and consist only of lowercase alphanumeric characters plus ".", "-" and "\_".
- It `SHOULD` be unique in relation to any registry in which this package will be deposited (and preferably globally unique).
- It `SHOULD` be invariant, meaning that it `SHOULD NOT` change when a data package is updated, unless the new package version `SHOULD` be considered a distinct package, e.g. due to significant changes in structure or interpretation. Version distinction `SHOULD` be left to the version property. As a corollary, the name also `SHOULD NOT` include an indication of time range covered.

### `id`

A property reserved for globally unique identifiers. Examples of identifiers that are unique include UUIDs and DOIs.

A common usage pattern for Data Packages is as a packaging format within the bounds of a system or platform. In these cases, a unique identifier for a package is desired for common data handling workflows, such as updating an existing package. While at the level of the specification, global uniqueness cannot be validated, consumers using the `id` property `MUST` ensure identifiers are globally unique.

Examples:

```json
{
  "id": "b03ec84-77fd-4270-813b-0c698943f7ce"
}
```

```json
{
  "id": "https://doi.org/10.1594/PANGAEA.726855"
}
```

### `licenses`

The license(s) under which the package is provided.

:::caution
This property is not legally binding and does not guarantee the package is licensed under the terms defined in this property.
:::

`licenses` `MUST` be an array. Each item in the array is a License. Each `MUST` be an `object`. The object `MUST` contain a `name` property and/or a `path` property. It `MAY` contain a `title` property.

Here is an example:

```json
"licenses": [{
  "name": "ODC-PDDL-1.0",
  "path": "http://opendatacommons.org/licenses/pddl/",
  "title": "Open Data Commons Public Domain Dedication and License v1.0"
}]
```

- `name`: The `name` `MUST` be an [Open Definition license ID](http://licenses.opendefinition.org/)
- `path`: A [url-or-path](../data-resource/#url-or-path) string, that is a fully qualified HTTP address, or a relative POSIX path.
- `title`: A human-readable title.

### `profile`

A string identifying the profile of this descriptor as per the [profiles](https://specs.frictionlessdata.io/profiles/) specification.

Examples:

```json
{
  "profile": "tabular-data-package"
}
```

```json
{
  "profile": "http://example.com/my-profiles-json-schema.json"
}
```

### `title`

A `string` providing a title or one sentence description for this package

### `description`

A description of the package. The description `MUST` be [markdown](http://commonmark.org/) formatted -- this also allows for simple plain text as plain text is itself valid markdown. The first paragraph (up to the first double line break) `SHOULD` be usable as summary information for the package.

### `homepage`

A URL for the home on the web that is related to this data package.

### `image`

An image to use for this data package. For example, when showing the package in a listing.

The value of the image property `MUST` be a string pointing to the location of the image. The string `MUST` be a [url-or-path](../data-resource/#url-or-path), that is a fully qualified HTTP address, or a relative POSIX path.

### `version`

A version string identifying the version of the package. It `SHOULD` conform to the [Semantic Versioning](http://semver.org) requirements and `SHOULD` follow the [Data Package Version](../../recipes/data-package-version) recipe.

### `created`

The datetime on which this was created.

Note: semantics may vary between publishers -- for some this is the datetime the data was created, for others the datetime the package was created.

The datetime `MUST` conform to the string formats for datetime as described in [RFC3339](https://tools.ietf.org/html/rfc3339#section-5.6). Example:

```json
{
  "created": "1985-04-12T23:20:50.52Z"
}
```

### `keywords`

An Array of string keywords to assist users searching for the package in catalogs.

### `contributors`

The people or organizations who contributed to this Data Package. It `MUST` be an array. Each entry is a Contributor and `MUST` be an `object`. A Contributor `MUST` have at least one property. A Contributor is RECOMMENDED to have `title` property and MAY contain `givenName`, `familyName`, `path`, `email`, `roles`, and `organization` properties. An example of the object structure is as follows:

```json
"contributors": [{
  "title": "Joe Bloggs",
  "email": "joe@bloggs.com",
  "path": "http://www.bloggs.com",
  "roles": ["creator"]
}]
```

- `title`: name of the contributor.
- `givenName`: name a person has been given, if the contributor is a person.
- `familyName`: familial name that a person inherits, if the contributor is a person.
- `path`: a fully qualified http URL pointing to a relevant location online for the contributor
- `email`: An email address
- `roles`: an array of strings describing the roles of the contributor. A role is `RECOMMENDED` to follow an established vocabulary, such as [DataCite Metadata Schema's contributorRole](https://support.datacite.org/docs/datacite-metadata-schema-v44-recommended-and-optional-properties#7a-contributortype) or [CreDIT](https://credit.niso.org/). Useful roles to indicate are: `creator`, `contact`, `rightsHolder`, and `dataCurator`.
- `organization`: a string describing the organization this contributor is affiliated to.

Use of the `creator` role does not imply that that person was the original creator of the data in the data package - merely that they created and/or maintain the data package. It is common for data packages to "package" up data from elsewhere. The original origin of the data can be indicated with the `sources` property - see above.

References:

- [Citation Style Language](https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html#name-fields)

:::note[Backward Compatibility]
If the `roles` property is not provided a data consumer MUST fall back to using `role` property which was a part of the `v1.0` of the specification. This property has the same semantics but it is a string allowing to specify only a single role.
:::

### `sources`

The raw sources for this data package. It `MUST` be an array of Source objects. A Source object `MUST` have at least one property. A Source object is `RECOMMENDED` to have `title` property and `MAY` have `path`, `email`, and `version` properties. Example:

```json
"sources": [{
  "title": "World Bank and OECD",
  "path": "http://data.worldbank.org/indicator/NY.GDP.MKTP.CD"
}]
```

- `title`: title of the source (e.g. document or organization name)
- `path`: A [url-or-path][] string, that is a fully qualified HTTP address, or a relative POSIX path (see [the url-or-path definition in Data Resource for details][url-or-path]).
- `email`: An email address
- `version`: A version of the source
