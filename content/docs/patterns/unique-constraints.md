---
title: Unique Constraints
---

A `primaryKey` uniquely identifies each row in a table. Per SQL standards, it
cannot contain `null` values. This pattern implements the SQL UNIQUE constraint
by introducing a `uniqueKeys` array, defining one or more row uniqueness
constraints which do support `null` values. An additional `uniqueNulls` property
controls how `null` values are to be treated in unique constraints.

## Specification

### `uniqueKeys` (add)

The `uniqueKeys` property, if present, `MUST` be an array. Each entry
(`uniqueKey`) in the array `MUST` be a string or array (structured as per
`primaryKey`) specifying the resource field or fields required to be unique for
each row in the table.

### `uniqueNulls` (add)

The `uniqueNulls` property is a boolean that dictates how `null` values should
be treated by all unique constraints set on a resource.

- If `true` (the default), `null` values are treated as unique (per most SQL
  databases). By this definition, `1, null, null` is UNIQUE.
- If `false`, `null` values are treated like any other value (per Microsoft SQL
  Server, Python pandas, R data.frame, Google Sheets). By this definition, `1,
null, null` is NOT UNIQUE.

### `foreignKeys` (edit)

Per SQL standards, `null` values are permitted in both the local and reference
keys of a foreign key. However, reference keys `MUST` be unique and are
therefore equivalent to a `uniqueKey` set on the reference resource (the meaning
of which is determined by the reference `uniqueNulls`).

Furthermore, per SQL standards, the local key `MAY` contain keys with field
values not present in the reference key if and only if at least one of the
fields is locally `null`. For example, `(1, null)` is permitted locally even if
the reference is `[(2, 1), (3, 1)]`. This behavior is the same regardless of the
value of `uniqueNulls`.

## Examples

### `null` in unique constraints

| a   | b   | c      | d      |
| --- | --- | ------ | ------ |
| 1   | 1   | 1      | 1      |
| 2   | 2   | `null` | 2      |
| 3   | 2   | `null` | `null` |

The above table meets the following primary key and two unique key constraints:

```json
{
  "primaryKey": ["a"],
  "uniqueKeys": [
    ["b", "c"],
    ["c", "d"]
  ],
  "uniqueNulls": true
}
```

The primary key `(a)` only contains unique, non-`null` values. In contrast, the
unique keys can contain `null` values. Although unique key `(b, c)` contains two
identical keys `(2, null)`, this is permitted because `uniqueNulls: true`
specifies that `null` values are unique. This behavior is consistent with the
UNIQUE constraint of PostgreSQL and most other SQL implementations, as
illustrated by this
[dbfiddle](https://dbfiddle.uk/?rdbms=postgres_11&fiddle=34cab8ba7d74b488d215a96f7e83c096).
The same keys would be considered duplicates if `uniqueNulls: false`, consistent
with the UNIQUE constraint of Microsoft SQL Server, as illustrated by this
[dbfiddle](https://dbfiddle.uk/?rdbms=sqlserver_2019l&fiddle=34cab8ba7d74b488d215a96f7e83c096).

### Setting unique constraints

For a given resource, unique constraints can be set for one field using a
field's `unique` constraint, for one or multiple fields using a `uniqueKey`, and
for one or multiple fields using a `foreignKey` referencing the resource. Each
of the following examples set a unique constraint on field `a`:

**Field `constraints`**

```json
{
  "fields": [
    {
      "name": "a",
      "constraints": {
        "unique": true
      }
    }
  ]
}
```

**`uniqueKeys`**

```json
{
  "uniqueKeys": ["a"]
}
```

**`foreignKeys`**

```json
{
  "foreignKeys": [
    {
      "fields": "a",
      "reference": {
        "resource": "",
        "fields": "a"
      }
    }
  ]
}
```

## Implementations

None known.
