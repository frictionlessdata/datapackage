---
title: Glossary
sidebar:
  order: 6
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock, Paul Walsh, Evgeny Karev, Peter Desmet</td>
  </tr>
</table>

A dictionary of special terms for the Data Package Standard.

## Language

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)

## Definitions

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
