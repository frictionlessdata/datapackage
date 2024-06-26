---
title: Data Package Version
---

<table>
  <tr>
    <th>Authors</th>
    <td>Rufus Pollock</td>
  </tr>
</table>

## Specification

The Data Package version format follows the [Semantic Versioning](http://semver.org) specification format: MAJOR.MINOR.PATCH

The version numbers, and the way they change, convey meaning about how the data package has been modified from one version to the next.

Given a Data Package version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible changes, e.g.

- Change the data package, resource or field `name` or `identifier`
- Add, remove or re-order fields
- Change a field `type` or `format`
- Change a field `constraint` to be more restrictive
- Combine, split, delete or change the meaning of data that is referenced by another data resource

MINOR version when you add data or change metadata in a backwards-compatible manner, e.g.

- Add a new data resource to a data package
- Add new data to an existing data resource
- Change a field `constraint` to be less restrictive
- Update a reference to another data resource
- Change data to reflect changes in referenced data

PATCH version when you make backwards-compatible fixes, e.g.

- Correct errors in existing data
- Change descriptive metadata properties

## Scenarios

- You are developing your data though public consultation. Start your initial data release at 0.1.0
- You release your data for the first time. Use version 1.0.0
- You append last months data to an existing release. Increment the MINOR version number
- You append a column to the data. Increment the MAJOR version number
- You relocate the data to a new `URL` or `path`. No change in the version number
- You change a `title`, `description`, or other descriptive metadata. Increment the PATCH version
- You fix a data entry error by modifying a value. Increment the PATCH version
- You split a row of data in a foreign key reference table. Increment the MAJOR version number
- You update the data and schema to refer to a new version of a foreign key reference table. Increment the MINOR version number
