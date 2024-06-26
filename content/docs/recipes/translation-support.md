---
title: Translation Support
---

<table>
  <tr>
    <th>Authors</th>
    <td>Paul Walsh</td>
  </tr>
</table>

Following on from a general pattern for language support, and the explicit support of metadata translations in Frictionless Data descriptors, it would be desirable to support translations in source data.

We currently have two patterns for this in discussion. Both patterns arise from real-world implementations that are not specifically tied to Frictionless Data.

One pattern suggests inline translations with the source data, reserving the `@` symbol in the naming of fields to denote translations.

The other describes a pattern for storing additional translation sources, co-located with the "source" file described in a descriptor `data`.

## Implementations

There are no known implementations of this pattern in the Frictionless Data core libraries at present.

## Specification

### Inline

**Uses a column naming convention for accessing translations**.

Tabular resource descriptors support translations using `{field_name}@{lang_code}` syntax for translated field names. `lang_code` `MUST` be present in the `languages` array that applies to the resource.

Any field with the `@` symbol `MUST` be a translation field for another field of data, and `MUST` be parsable according to the `{field_name}@{lang_code}` pattern.

If a translation field is found in the data that does not have a corresponding `field` (e.g.: `title@es` but no `title`), then the translation field `SHOULD` be ignored.

If a translation field is found in the data that uses a `lang_code` _not_ declared in the applied `languages` array, then the translation field `SHOULD` be ignored.

Translation fields `MUST NOT` be described in a schema `fields` array.

Translation fields `MUST` match the `type`, `format` and `constraints` of the field they translate, with a single exception: Translation fields are never required, and therefore `constraints.required` is always `false` for a translation field.

### Co-located translation sources

**Uses a file storage convention for accessing translations**.

To be contributed by @jheeffer

- Has to handle local and remote resources
- Has to be explicit about the translation key/value pattern in the translation files

```
# local
data/file1.csv
data/lang/file1-en.csv
data/lang/file1-es.csv

# remote
http://example/com/data/file2.csv
http://example/com/data/lang/file2-en.csv
http://example/com/data/lang/file2-es.csv
```
