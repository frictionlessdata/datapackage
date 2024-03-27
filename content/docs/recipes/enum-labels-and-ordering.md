---
title: Enum Labels and Ordering
---

## Overview

Many software packages for manipulating and analyzing tabular data have special
features for working with categorical variables. These include:

- Value labels or formats ([Stata](https://www.stata.com/manuals13/dlabel.pdf),
  [SAS](https://documentation.sas.com/doc/en/pgmsascdc/9.4_3.5/proc/p1upn25lbfo6mkn1wncu4dyh9q91.htm)
  and [SPSS](https://www.ibm.com/docs/en/spss-statistics/beta?topic=data-adding-value-labels))
- [Categoricals (Pandas)](https://pandas.pydata.org/docs/user_guide/categorical.html)
- [Factors (R)](https://www.stat.berkeley.edu/~s133/factors.html)
- [CategoricalVectors (Julia)](https://dataframes.juliadata.org/stable/man/categorical/)

These features can result in more efficient storage and faster runtime
performance, but more importantly, facilitate analysis by indicating that a
variable should be treated as categorical and by permitting the logical order
of the categories to differ from their lexical order. And in the case of value
labels, they permit the analyst to work with variables in numeric form (e.g.,
in expressions, when fitting models) while generating output (e.g., tables,
plots) that is labeled with informative strings.

While these features are of limited use in some disciplines, others rely
heavily on them (e.g., social sciences, epidemiology, clinical research,
etc.). Thus, before these disciplines can begin to use Frictionless in a
meaningful way, both the standards and the software tools need to support
these features. This pattern addresses necessary extensions to the
[Table Schema](https://specs.frictionlessdata.io//table-schema/).

## Principles

Before describing the proposed extensions, here are the principles on which
they are based:

1. Extensions should be software agnostic (i.e., no additions to the official
   schema targeted toward a specific piece of software). While the extensions
   are intended to support the use of features not available in all software,
   the resulting data package should continue to work as well as possible with
   software that does not have those features.
2. Related to (1), extensions should only include metadata that describe the
   data themselves—not instructions for what a specific software package should
   do with the data. Users who want to include the latter may do so within
   a sub-namespace such as `custom` (e.g., see Issues [#103](https://github.com/frictionlessdata/specs/issues/103)
   and [#663](https://github.com/frictionlessdata/specs/issues/663)).
3. Extensions must be backward compatible (i.e., not break existing tools,
   workflows, etc. for working with Frictionless packages).

It is worth emphasizing that the scope of the proposed extensions is strictly
limited to the information necessary to make use of the features for working
with categorical data provided by the software packages listed above. Previous
discussions of this issue have occasionally included references to additional
variable-level metadata (e.g., multiple sets of category labels such as both
"short labels" and longer "descriptions", or links to common data elements,
controlled vocabularies or rdfTypes). While these additional metadata are
undoubtedly useful, we speculate that the large majority of users who would
benefit from the extensions propopsed here would not have and/or utilize such
information, and therefore argue that these should be considered under a
separate proposal.

## Implementations

Our proposal to add a field-specific `enumOrdered` property has been raised
[here](https://github.com/frictionlessdata/specs/issues/739) and
[here](https://github.com/frictionlessdata/specs/issues/156).

Discussions regarding supporting software providing features for working with
categorical variables appear in the following GitHub issues:

- [https://github.com/frictionlessdata/specs/issues/156](https://github.com/frictionlessdata/specs/issues/156)
- [https://github.com/frictionlessdata/specs/issues/739](https://github.com/frictionlessdata/specs/issues/739)

and in the Frictionless Data forum:

- [https://discuss.okfn.org/t/can-you-add-code-descriptions-to-a-data-package/](https://discuss.okfn.org/t/can-you-add-code-descriptions-to-a-data-package/)
- [https://discuss.okfn.org/t/something-like-rs-ordered-factors-or-enums-as-column-type/](https://discuss.okfn.org/t/something-like-rs-ordered-factors-or-enums-as-column-type/)

Finally, while we are unaware of any existing implementations intended for
general use, it is likely that many users are already exploiting the fact that
arbitrary fields may be added to the
[table schema](https://specs.frictionlessdata.io//table-schema/)
to support internal implementations.

## Proposed extensions

We propose two extensions to [Table Schema](https://specs.frictionlessdata.io/table-schema/):

1. Add an optional field-specific `enumOrdered` property, which can be used
   when contructing a categorical (or factor) to indicate that the variable is
   ordinal.
2. Add an optional field-specific `enumLabels` property for use when data are
   stored using integer or other codes rather than using the category labels.
   This contains an object mapping the codes appearing in the data (keys) to
   what they mean (values), and can be used by software to construct
   corresponding value labels or categoricals (when supported) or to translate
   the values when reading the data.

These extensions are fully backward compatible, since they are optional and
not providing them is valid.

Here is an example of a categorical variable using extension (1):

```
{
  "fields": [
    {
      "name": "physical_health",
      "type": "string",
      "constraints": {
        "enum": [
          "Poor",
          "Fair",
          "Good",
          "Very good",
          "Excellent",
        ]
      }
      "enumOrdered": true
    }
  ],
  "missingValues": ["Don't know","Refused","Not applicable"]
}
```

This is our preferred strategy, as it provides all of the information
necessary to support the categorical functionality of the software packages
listed above, while still yielding a useable result for software without such
capability. As described below, value labels or categoricals can be created
automatically based on the ordering of the values in the `enum` array, and the
`missingValues` can be incorporated into the value labels or categoricals if
desired. In those cases where it is desired to have more control over how the
value labels are constructed, this information can be stored in a separate
file in JSON format or as part of a custom extension to the table schema.
Since such instructions do not describe the data themselves (but only how a
specific software package should handle them), and since they are often
software- and/or user-specific, we argue that they should not be included in
the official table schema.

Alternatively, those who wish to store their data in encoded form (e.g., this
is the default for data exports from [REDCap](https://projectredcap.org), a
commonly-used platform for collecting data for clinical studies) may use
extension (2) to do so:

```
{
  "fields": [
    {
      "name": "physical_health",
      "type": "integer",
      "constraints": {
        "enum": [1,2,3,4,5]
      }
      "enumOrdered": true,
      "enumLabels": {
        "1": "Poor",
        "2": "Fair",
        "3": "Good",
        "4": "Very good",
        "5": "Excellent"
      }
    }
  ],
  "missingValues": ["Don't know","Refused","Not applicable"]
}
```

Note that although the field type is `integer`, the keys in the `enumLabels`
object must be wrapped in double quotes because this is required by the JSON
file format.

A second variant of the example above is the following:

```
{
  "fields": [
    {
      "name": "physical_health",
      "type": "integer",
      "constraints": {
        "enum": [1,2,3,4,5]
      }
      "enumOrdered": true,
      "enumLabels": {
        "1": "Poor",
        "2": "Fair",
        "3": "Good",
        "4": "Very good",
        "5": "Excellent",
        ".a": "Don't know",
        ".b": "Refused",
        ".c": "Not applicable"
      }
    }
  ],
  "missingValues": [".a",".b",".c"]
}
```

This represents encoded data exported from software with support for value
labels. The values `.a`, `.b`, etc. are known as _extended missing values_
(Stata and SAS only) and provide 26 unique missing values for numeric fields
(both integer and float) in addition to the system missing value ("`.`"); in
SPSS these would be replaced with specially designated integers, typically
negative (e.g., -97, -98 and -99).

## Specification

1. A field with an `enum` constraint or an `enumLabels` property MAY have an
   `enumOrdered` property that MUST be a boolean. A value of `true` indicates
   that the field should be treated as having an ordinal scale of measurement,
   with the ordering given by the order of the field's `enum` array or by the
   lexical order of the `enumLabels` object's keys, with the latter taking
   precedence. Fields without an `enum` constraint or an `enumLabels` property
   or for which the `enumLabels` keys do not include all values observed
   in the data (excluding any values specified in the `missingValues`
   property) MUST NOT have an `enumOrdered` property since in that case the
   correct ordering of the data is ambiguous. The absence of an `enumOrdered`
   property MUST NOT be taken to imply `enumOrdered: false`.

2. A field MAY have an `enumLabels` property that MUST be an object. This
   property SHOULD be used to indicate how the values in the data (represented
   by the object's keys) are to be labeled or translated (represented by the
   corresponding value). As required by the JSON format, the object's keys
   must be listed as strings (i.e., wrapped in double quotes). The keys MAY
   include values that do not appear in the data and MAY omit some values that
   do appear in the data. For clarity and to avoid unintentional loss of
   information, the object's values SHOULD be unique.

## Suggested implementations

Note: The use cases below address only _reading data_ from a Frictionless data
package; it is assumed that implementations will also provide the ability to
write Frictionless data packages using the schema extensions proposed above.
We suggest two types of implementations:

1. Additions to the official Python Frictionless Framework to generate
   software-specific scripts that may be executed by a specific software
   package to read data from a Frictionless data package and create the
   appropriate value labels or categoricals, as described below. These
   scripts can then be included along with the data in the package itself.

2. Software-specific extension packages that may be installed to permit users
   of that software to read data from a Frictionless data package directly,
   automatically creating the appropriate value labels or categoricals as
   described below.

The advantage of (1) is that it doesn't require users to install another
software package, which may in some cases be difficult or impossible. The
advantage of (2) is that it provides native support for working with
Frictionless data packages, and may be both easier and faster once the package
is installed. We are in the process of implementing both approaches for Stata;
implementations for the other software listed above are straightforward.

### Software that supports value labels (Stata, SAS or SPSS)

1. In cases where a field has an `enum` constraint but no `enumLabels`
   property, automatically generate a value label mapping the integers 1, 2,
   3, ... to the `enum` values in order, use this to encode the field (thereby
   changing its type from `string` to `integer`), and attach the value label
   to the field. Provide option to skip automatically dropping values
   specified in the `missingValues` property and instead add them in order to
   the end of the value label, encoded using extended missing values if
   supported.

2. In cases where the data are stored in encoded form (e.g., as integers) and
   a corresponding `enumLabels` property is present, and assuming that the
   keys in the `enumLabels` object are limited to integers and extended
   missing values (if supported), use the `enumLabels` object to generate a
   value label and attach it to the field. As with (1), provide option to skip
   automatically dropping values specified in the `missingValues` property and
   instead add them in order to the end of the value label, encoded using
   extended missing values if supported.

3. Although none of Stata, SAS or SPSS currently permits designating a specific
   variable as ordered, Stata permits attaching arbitrary metadata to
   individual variables. Thus, in cases where the `enumOrdered` property is
   present, this information can be stored in Stata to inform the analyst and
   to prevent loss of information when generating Frictionless data packages
   from within Stata.

### Software that supports categoricals or factors (Pandas, R, Julia)

1. In cases where a field has an `enum` constraint but no `enumLabels`
   property, automatically define a categorical or factor using the `enum`
   values in order, and convert the variable to categorical or factor type
   using this definition. Provide option to skip automatically dropping values
   specified in the `missingValues` property and instead add them in order to
   the end of the `enum` values when defining the categorical or factor.

2. In cases where the data are stored in encoded form (e.g., as integers) and
   a corresponding `enumLabels` property is present, translate the data using
   the `enumLabels` object, define a categorical or factor using the values of
   the `enumLabels` object in lexical order of the keys, and convert the
   variable to categorical or factor type using this definition. Provide
   option to skip automatically dropping values specified in the
   `missingValues` property and instead add them to the end of the
   `enumLabels` values when defining the categorical or factor.

3. In cases where a field has an `enumOrdered` property, use that when
   defining the categorical or factor.

### All software

Although the extensions proposed here are intended primarily to support the
use of value labels and categoricals in software that supports them, they also
provide additional functionality when reading data into any software that can
handle tabular data. Specifically, the `enumLabels` property may be used to
support the use of enums even in cases where value labels or categoricals are
not being used. For example, it is standard practice in software for analyzing
genetic data to code sex as 0, 1 and 2 (corresponding to "Unknown", "Male" and
"Female") and affection status as 0, 1 and 2 (corresponding to "Unknown",
"Unaffected" and "Affected"). In such cases, the `enumLabels` property may be
used to confirm that the data follow the standard convention or to indicate
that they deviate from it; it may also be used to translate those codes into
human-readable values, if desired.

## Notes

While this pattern is designed as an extension to [Table Schema](https://specs.frictionlessdata.io/table-schema/) fields, it could also be used to document `enum` values of properties in [profiles](https://specs.frictionlessdata.io/profiles/), such as contributor roles.

This pattern originally included a proposal to add an optional field-specific
`missingValues` property similar to that described in the pattern
"[missing values per field](https://specs.frictionlessdata.io/patterns/#missing-values-per-field)"
appearing in this document above. The objective was to provide a mechnanism to
distinguish between so-called _system missing values_ (i.e., values that
indicate only that the corresponding data are missing) and other values that
convey meaning but are typically excluded when fitting statistical models. The
latter may be represented by _extended missing values_ (`.a`, `.b`, `.c`,
etc.) in Stata and SAS, or in SPSS by negative integers that are then
designated as missing by using the `MISSING VALUES` command. For example,
values such as "NA", "Not applicable", ".", etc. could be specified in the
resource level `missingValues` property, while values such as "Don't know" and
"Refused"—often used when generating tabular summaries and occasionally used
when fitting certain statistical models—could be specified in the
corresponding field level `missingValues` property. The former would still be
converted to `null` before type-specific string conversion (just as they are
now), while the latter could be used by capable software when creating value
labels or categoricals.

While this proposal was consistent with the principles outlined at the
beginning (in particular, existing software would still yield a usable result
when reading the data), we realized that it would conflict with what appears
to be an emerging consensus regarding field-specific `missingValues`; i.e.,
that they should _replace_ the less specific resource level `missingValues`
for the corresponding field rather than be combined with them (see the discussion
[here](https://github.com/frictionlessdata/specs/issues/551) as well as the
"[missing values per field](https://specs.frictionlessdata.io/patterns/#missing-values-per-field)"
pattern above). While there is good reason for replacing rather than combining
here (e.g., it is more explicit), it would unfortunately conflict with the
idea of using the field-specific `missingValues` in conjunction with the
resource level `missingValues` as just described; namely, if the
field-specific property replaced the resource level property then the system
missing values would no longer be converted to `null`, as desired.

For this reason, we have dropped the proposal to add a field-specific
`missingValues` property from this pattern, and assert that implementation of
this pattern by software should assume that if a field-specific `missingValues`
property is added to the
[table schema](https://specs.frictionlessdata.io//table-schema/)
it should, if present, replace the resource level `missingValues` property for
the corresponding field. We do not believe that this change represents a
substantial limitation when creating value labels or categoricals, since
system missing values can typically be easily distinguished from other missing
values when exported in CSV format (e.g., "." in Stata or SAS, "NA" in R, or
"" in Pandas).
