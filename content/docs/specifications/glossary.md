---
title: Glossary
sidebar:
  order: 6
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh, Adam Kariv, Evgeny Karev, Peter Desmet, Data Package Working Group</td>
  </tr>
</table>

A dictionary of special terms for the Data Package Standard.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)

## Definitions

### Profile

A profile is a URL that `MUST`:

- resolves to a valid JSON Schema descriptor under the `draft-07` version
- be versioned and immutable i.e. once published under some version it cannot be changed

A profile is both used as a metadata version identifier and the location of a JSON Schema against which a descriptor having it as a root level `$schema` property `MUST` be valid and `MUST` be validated.

Similarly to [JSON Schema](https://json-schema.org/understanding-json-schema/reference/schema#schema), the `$schema` property has effect only on the root level of a descriptor. For example, if a Table Dialect is published as a file it can include a `$schema` property that affects its validation. If the same dialect is an object inlined into a Data Package descriptor, the dialect's `$schema` property `MUST` be ignored and the descriptor as whole `MUST` be validated against a root level `$schema` property provided by the package.

Data Package Standard employes profiles as a mechanism for creating extensions as per [Extensions](../extensions) specification.

:::note[Implementation Note]
It is recommended to cache profiles using their URL as a unique key.
:::

### Descriptor

The Data Package Standard uses a concept of a `descriptor` to represent metadata defined according to the core specefications such as Data Package or Table Schema.

On logical level, a descriptor is represented by a data structure. The data structure `MUST` be a JSON `object` as defined in [RFC 4627](http://www.ietf.org/rfc/rfc4627.txt).

On physical level, a descriptor is represented by a file. The file `MUST` contain a valid JSON `object` as defined in [RFC 4627](http://www.ietf.org/rfc/rfc4627.txt).

This specification does not define any discoverability mechanisms. Any URI can be used to directly reference a file containing a descriptor.

:::note[File Formats]
A descriptor `MAY` be serialized using alternative formats like YAML or TOML as an internal part of some project or system if supported by corresponding implementations. A descriptor `SHOULD NOT` be externally published in any other format rather than JSON.
:::

#### Custom Properties

The Data Package specifications define a set of standard properties to be used and allows custom properties to be added. It is `RECOMMENDED` to use `namespace:property` naming convention for custom properties. It is `RECOMMENDED` to use [lower camel case](https://en.wikipedia.org/wiki/Camel_case) convention for naming custom properties, for example, `namespace:propertyName`.

Adherence to a specification does not imply that additional, non-specified properties cannot be used: a descriptor `MAY` include any number of properties in additional to those described as required and optional properties. For example, if you were storing time series data and wanted to list the temporal coverage of the data in the Data Package you could add a property `temporal` (cf [Dublin Core](http://dublincore.org/documents/usageguide/qualifiers.shtml#temporal)):

```json
{
  "dc:temporal": {
    "name": "19th Century",
    "start": "1800-01-01",
    "end": "1899-12-31"
  }
}
```

This flexibility enables specific communities to extend Data Packages as appropriate for the data they manage. As an example, the [Fiscal Data Package](https://fiscal.datapackage.org) specification extends Data Package for publishing and consuming fiscal data.

### URL or Path

A `URL or Path` is a `string` with the following additional constraints:

- `MUST` either be a URL or a POSIX path
- [URLs](https://en.wikipedia.org/wiki/Uniform_Resource_Locator) `MUST` be fully qualified. `MUST` be using either http or https scheme. (Absence of a scheme indicates `MUST` be a POSIX path)
- [POSIX paths](https://en.wikipedia.org/wiki/Path_%28computing%29#POSIX_pathname_definition) (unix-style with `/` as separator) are supported for referencing local files, with the security restraint that they `MUST` be relative siblings or children of the descriptor. Absolute paths `/`, relative parent paths `../`, hidden folders starting from a dot `.hidden` `MUST` NOT be used.

Example of a fully qualified url:

```json
{
  "path": "http://ex.datapackages.org/big-csv/my-big.csv"
}
```

Example of a relative path that this will work both as a relative path on disk and online:

```json
{
  "path": "my-data-directory/my-csv.csv"
}
```

:::caution[Security]
`/` (absolute path) and `../` (relative parent path) are forbidden to avoid security vulnerabilities when implementing data package software. These limitations on resource `path` ensure that resource paths only point to files within the data package directory and its subdirectories. This prevents data package software being exploited by a malicious user to gain unintended access to sensitive information. For example, suppose a data package hosting service stores packages on disk and allows access via an API. A malicious user uploads a data package with a resource path like `/etc/passwd`. The user then requests the data for that resource and the server naively opens `/etc/passwd` and returns that data to the caller.
:::
