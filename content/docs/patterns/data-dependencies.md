---
title: Data Dependencies
---

Consider a situation where data packages are part of a tool chain that, say, loads all of the data into an SQL db. You can then imagine a situation where one requires package A which requires package B + C.

In this case you want to specify that A depends on B and C -- and that "installing" A should install B and C. This is the purpose of `dataDependencies` property.

## Specification

`dataDependencies` is an object. It follows same format as CommonJS Packages spec v1.1. Each dependency defines the lowest compatible MAJOR[.MINOR[.PATCH]] dependency versions (only one per MAJOR version) with which the package has been tested and is assured to work. The version may be a simple version string (see the version property for acceptable forms), or it may be an object group of dependencies which define a set of options, any one of which satisfies the dependency. The ordering of the group is significant and earlier entries have higher priority. Example:

```javascript
"dataDependencies": {
   "country-codes": "",
   "unemployment": "2.1",
   "geo-boundaries": {
     "acmecorp-geo-boundaries": ["1.0", "2.0"],
     "othercorp-geo-boundaries": "0.9.8",
   },
}
```

## Implementations

None known.
