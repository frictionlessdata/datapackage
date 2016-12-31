---
title: JSON Table Schema
layout: spec
listed: true
version: 1.0-pre15
updated: 17 November 2016
created: 12 November 2012
summary: A JSON-based format for defining the structure of a table, including field validation rules,
  primary and foreign keys. It can be used for any tabular data, regardless of format.
ietf-keywords: true
---


### Changelog

- 1.0.0-pre15: add calendar units `gyear` and `gyearmonth` ([#105](https://github.com/dataprotocols/dataprotocols/issues/105)), tweak pattern support for date/time types [#260](https://github.com/frictionlessdata/specs/issues/260)
- 1.0.0-pre14: add support for `missingValue` ([#97](https://github.com/dataprotocols/dataprotocols/issues/97))
- 1.0.0-pre13: remove `null` datatype ([#262](https://github.com/dataprotocols/dataprotocols/issues/262))
- 1.0.0-pre12: add support for new number properties such as `decimalChar`([#246](https://github.com/dataprotocols/dataprotocols/issues/246))
- 1.0.0-pre11: add new field property: rdfType ([#217](https://github.com/dataprotocols/dataprotocols/issues/217))
- 1.0.0-pre10: add new field types: duration ([#210](https://github.com/dataprotocols/dataprotocols/issues/210))
- 1.0.0-pre9: make date formats stricter for default
  [issue](https://github.com/dataprotocols/dataprotocols/issues/104). Define
  value of fmt:PATTERN for dates
  [issue](https://github.com/dataprotocols/dataprotocols/issues/200)
- 1.0-pre8: Rename contraints.oneOf to contraints.enum [issue](https://github.com/dataprotocols/dataprotocols/issues/191)
- 1.0-pre7: Add contraints.oneOf [issue](https://github.com/dataprotocols/dataprotocols/issues/175)
- 1.0-pre6: clarify types and formats
  [issue](https://github.com/dataprotocols/dataprotocols/issues/159)
- 1.0-pre5: add type validation
  [issue](https://github.com/dataprotocols/dataprotocols/issues/95)
- 1.0-pre4: add foreign key support - see this
  [issue](https://github.com/dataprotocols/dataprotocols/issues/23)
- 1.0-pre3.2: add primary key support (see this
    [issue](https://github.com/dataprotocols/dataprotocols/issues/21))
- 1.0-pre3.1: breaking changes.
  - `label` (breaking) changed to `title` - see [Closer alignment with JSON
    Schema](https://github.com/dataprotocols/dataprotocols/issues/46)
  - `id` changed to `name` (with slight alteration in semantics - i.e. SHOULD
    be unique but no longer MUST be unique)

### Table of Contents
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

# Concepts

A table consists of an ordered set of rows, each containing the same set of fields (also known
as columns). The fields are usually either defined by an included header row (when the table is 
in a file-based format such as CSV), or separately (such as for
an SQL database table).

For instance, a table with two fields ("City_name" and "ID"), and two rows:

```
City_name | ID
--------------
Paris     | 1
Sydney    | 2
```

A schema following the JSON Table Schema specification ("a Schema") defines the fields 
for a certain table structure, adding additional metadata such as type formats and 
descriptions. It can thus serve two purposes:

1. To provide richer descriptions of the contents of a provided data
   file that is provided in a format that lacks such features (eg CSV).
2. To define requirements for datasets provided by third parties, which
   can be automatically enforced.

# Specification

A Schema consists of:

* a required list of _field descriptors_
* optionally, a _primary key_ description
* optionally, a _foreign _key_ description

A Schema is described using JSON. This might exist as a standalone document
or may be embedded within another JSON structure, e.g. as part of a
[data package](http://specs.frictionlessdata.io/data-packages/) description.

## Schema

A Schema has the following structure:

    {
      // REQUIRED: an array of field descriptor objects, in order from left to right, 
      // one for each field (column) in the table
      "fields": [
        {
          // see "Field Descriptors"
        },
        // ... more field descriptors
      ],
      
      // OPTIONAL, specification of the primary key, see "Primary Keys"
      "primaryKey":  [...]

      // OPTIONAL, specification of the foreign keys, see "Foreign Keys"
      "foreignKeys": [...]

      // OPTIONAL, other properties not defined by this spec may be added anywhere.

    }

## Field Descriptors

Each field descriptor provides additional human-readable documentation for a field, as
well as additional information that may be used to validate the field or create
a user interface for data entry.

    {
        // REQUIRED, the name of the field. It SHOULD correspond to the name of the field
        // in the file or database. It SHOULD be unique, and SHOULD be considered case-sensitive.
        "name": "City_name",

        // OPTIONAL, a human-readable version of the name
        "title": "City name",

        // OPTIONAL, an explanatory description for the field
        "description": "The name of the city, in English."

        // OPTIONAL (defaults to "string"), a string ("string", "number" etc) specifying the type.
        // See "Field Types and Formats".
        "type": "string",

        // OPTIONAL (defaults to "default"), a string giving more precise information about the `type` ("email", "date" etc)
        // See "Field Types and Formats"
        "format": "A string specifying a format",

        // OPTIONAL, a string, or array of strings, of values which should be interpreted as missing data (`null`).
        // Defaults to "" when `type` is NOT string; no default otherwise.
        "missingValue": ["-", "Unknown"],

        // OPTIONAL, further rules about the allowed values of the field. 
        "constraints": {
            // See "Field Constraints"

        },

        // OPTIONAL, the URI of an instance or subclass of an [RDF Schema Class object][https://www.w3.org/TR/rdf-schema/#ch_class]
        // This provides a way to indicate the semantic meaning of the field.
        "rdfType": "http://schema.org/Country",

        // OPTIONAL, other properties not defined by this spec are permitted.
    }

### Field Constraints

A set of constraints can be associated with a field. These constraints can be used
to validate data against a JSON Table Schema. The constraints might be used by consumers
to validate, for example, the contents of a data package, or as a means to validate
data being collected or updated via a data entry interface.

Each constraints descriptor is a JSON object. 

```
{
    // All fields are OPTIONAL. All constraints MUST be satisfied for a given value to be considered valid.

    // Boolean, whether the field must have a value in every row of the table. Empty strings are not considered values.
    "required": true,

    // Integer, the minimum length of each value. Applies to types `string`, `array` and `object`.
    "minLength": 3,

    // Integer, the maximum length of each value. Applies to types `string`, `array` and `object`.
    "maxLength": 8,

    // Boolean, whether all values for that field MUST be unique within the table.
    "unique": false,

    // String, regular expression (SHOULD match [XML Schema regular expression syntax](http://www.w3.org/TR/xmlschema-2/#regexs)) 
    // that each stringified value must match. See also [this reference](http://www.regular-expressions.info/xml.html).
    "pattern": "^\\d+\\.\\d+$"

    // (Type depends on `type` field) Minimum value allowed (not to be confused with minimum length of each value).
    // If present, `type` field MUST also be present, and one of `integer`, `number`, `date`, `time` and `datetime`
    "minimum": 1,

    // Maximum value allowed, as for `minimum`.
    "maximum": 1000,

    // Array of permitted values for each value. Each MUST comply with the `type` and `format` of the field.
    "enum": [ "left", "right" ],

    // Other properties may be applicable to the relevant `type` or `format` (eg, `decimalChar`).
}
```

The constraints listed above may also define a list of supported field types. Implementations `SHOULD` report an error if an attempt is made to evaluate a value against an unsupported constraint.

"Missing values" are non-values supported in some table formats (eg NULL in SQL). The `missingValue` field provides
a way to designate additional values as equivalent to "missing values". Consumer software SHOULD convert these values
to NULL or appropriate equivalent.

### Field Types and Formats

Types are based on the [type set of
json-schema](http://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.1)
with some additions and minor modifications (cf other type lists include
those in [Elasticsearch
types](http://www.elasticsearch.org/guide/reference/mapping/)).

Each type has a number of possible `format` values, defined below.

#### string

The field contains strings, that is, sequences of characters.

`format`:

* **`default`**: any valid string.
* **`email`**: A valid email address.
* **`uri`**: A valid URI.
* **`binary`**: A base64 encoded string representing binary data.
* **`uuid`**: A string that is a uuid.

#### number

The field contains numbers of any kind including decimals.

The lexical formatting follows that of decimal in [XMLSchema][xsd-decimal]: a
non-empty finite-length sequence of decimal digits separated by a period as a
decimal indicator. An optional leading sign is allowed. Leading and trailing zeroes are optional. 
If the fractional part is zero, the period and following zero(es) can be omitted. 

A number MAY also have (in order):

* a trailing exponent: `E` followed by an optional `+` or `-` sign
  followed by one or more decimal digits (`0`-`9`).
* a trailing percentage sign: `%`. In conversion percentages should be
  divided by 100.

For example: 
'-1.23', '12678967.543233', '+100000.00', '210', '53E1%' (equivalent to 530% or 5.3)

The following special case-insensitive string values are permitted:

* `"NaN"`: not a number
* `"INF"`: positive infinity
* `"-INF"`: negative infinity


This lexical formatting MAY be modified using these additional properties:

* **`decimalChar`**: String (defaults to ".") that represents a decimal point within the number.
* **`groupChar`**: String (defaults to "") used to group digits within the
  number. A common value is "," e.g. "100,000".
* **`currency`**: A number that may include additional currency symbols.

`format`: no options.

[xsd-decimal]: https://www.w3.org/TR/xmlschema-2/#decimal

#### integer

The field contains integers: whole numbers with no decimals.

`format`: no options.

#### boolean

The field contains boolean (true/false) data.

Boolean values can be indicated with the following case-insensitive strings:

* **true**: `yes`, `y`, `true`, `t`, `1`
* **false**: `no`, `n`, `false`, `f`, `0`

`format`: no options.

#### object

The field contains data which is valid JSON.

`format`: no options.

#### array

The field contains data that is a valid JSON format arrays.

`format`: no options.

#### date

The field contains temporal values such as dates, times and date-times.

`format`:

* **`default`**: Each value must be an ISO8601 format string.
* **`date`**: A string of the format `YYYY-MM-DD`
* **`datetime`**: A string in ISO 8601, UTC format: `YYYY-MM-DDThh:mm:ssZ`
* **`time`**: A time without a date: `hh:mm:ss`
* **`any`**: Any parsable representation of the type. The implementing
  library can attempt to parse the datetime via a range of strategies.
  An example is `dateutil.parser.parse` from the `python-dateutils`
  library.
* **{PATTERN}**: Any format other than the above is interpreted as a pattern that can be
  parsed by [standard Python / C strptime][strptime]. Example: `%d %b %y`
  would correspond to dates like: `30 Nov 14`

#### gyear

A calendar year as per [XMLSchema `gYear`][xsd-gyear].

Usual lexical reprentation is `YYYY`. 

`format`: no options.

[xsd-gyear]: https://www.w3.org/TR/xmlschema-2/#gYear

#### gyearmonth

A specific month in a specific year as per [XMLSchema
`gYearMonth`][xsd-gyearmonth].

Usual lexical representation is: `YYYY-MM`. 

`format`: no options.

[xsd-gyearmonth]: https://www.w3.org/TR/xmlschema-2/#gYearMonth

#### duration

A duration of time.

The lexical representation for duration is the [ISO 8601][iso8601-duration]
extended format PnYnMnDTnHnMnS, where nY represents the number of years, nM the
number of months, nD the number of days, 'T' is the date/time separator, nH the
number of hours, nM the number of minutes and nS the number of seconds. The
number of seconds can include decimal digits to arbitrary precision. Date and
time elements including their designator may be omitted if their value is zero,
and lower order elements may also be omitted for reduced precision. Here we
follow the definition of [XML Schema duration datatype][xsd-duration] directly
and that definition is implicitly inlined here.

`format`: no options.

#### geopoint

The field contains data describing a geographic point, given by a longitude and a latitude,
each expressed in decimal degrees.

`format`:

For the locatino with longitude 144.97, latitude -37.81:

* **`default`**: A string like `"144.97,-37.81"`
* **`array`**: An array like [144.97, -37.81] or `["144.97", "-37.81"]`
* **`object`**: A JSON object, `{ "lon": 144.97, "lat": -37.81 }`

#### geojson

The field contains a JSON object according to GeoJSON or TopoJSON spec.

`format`:

* **`default`**: A GeoJSON object as per the [GeoJSON spec](http://geojson.org/).
* **`topojson`**: A TopoJSON object as per the [TopoJSON spec](https://github.com/topojson/topojson-specification/blob/master/README.md)

#### any

Any `type` or `format` is accepted.

[strptime]: https://docs.python.org/2/library/datetime.html#strftime-strptime-behavior
[iso8601-duration]: https://en.wikipedia.org/wiki/ISO_8601#Durations
[xsd-duration]: http://www.w3.org/TR/xmlschema-2/#duration


## Primary Key

The optional `primaryKey` property specifies a field or set of fields that uniquely 
identifies each row in the table.

If present it MUST be:

* Either: A single string corresponding to one of the field `name` values in
  the `fields` array.

```
  "fields": [
    { "name": "Country" },
    ...
  ],
  "primaryKey": "Country"
```


* Or: an array of one or more strings which each correspond to one of the
  field `name` values in the `fields` array. Fields in the key SHOULD 
  follow the order the fields in the `fields` property as client applications may
  utilize the order of the primary key list (e.g. in concatenating values
  together).

```
    "schema": {
      "fields": [
        { "name": "Country" },
        { "name": "Population" },
        { "name": "City" },
        ...
      ],
      "primaryKey": ["Country", "City"]
     }
```

## Foreign Keys

<div class="alert alert-success">
Foreign Keys by necessity must be able to reference other data objects. These data objects require a specific structure for the spec to work. Therefore, this spec makes one of two assumptions:
<ul>
<li>Your Foreign Key points to another field/fields within the current JSON
Table Schema. In this case you use a special <code>self</code> keyword is
employed.</li>
<li>Your Foreign Key points to a field/fields in a JSON Table Schema
"elsewhere". In this case, the JSON Table Schema must be inside of a resource
on <a href="/data-packages/">Data Package</a>. There are two situations here:
EITHER this JSON Table Schema is already situated within a (Tabular) Data
Package and the reference is to a resource within this Data Package; OR we are
pointing out to a (Tabular) Data Package stored elsewhere e.g. online.</li>
</ul>
</div>

A foreign key is a reference where entries in a given field (or fields) on this
table ('resource' in Data Package terminology) is a reference to an entry in a
field (or fields) on a separate resource.

The `foreignKeys` property, if present, `MUST` be an Array. Each entry in the
array must be a `foreignKey`. A `foreignKey` `MUST` be an Object as follows:

```
{
    ...
    "foreignKeys":
    [
        {
            // REQUIRED, string or array of strings corresponding to the names of fields in
            // this table that form the source part of the foreign key.
            "fields": ["state", "country"]

            // REQUIRED, object 
            "reference": {
                // OPTIONAL string, URL or name of Data Package where the target field is found.
                // If absent, the reference is resolved within the current data package (if any)
                // or the current table.
                "datapackage": "http://example.com/my-datapackage",

                // REQUIRED string, EITHER: name of the resource within the referenced data package.
                // OR: "self", indicating the field is found within this resource/table.
                "resource": "states",

                // REQUIRED string or array (MUST be of same type as outer `fields` property, and if array, same length)
                // Each item in the array is the name of the target field corresponding, in order, to the source field.
                "fields": ["state_name", "country"]
            }
        },
        // ...other foreign keys
    ]
}
```


An example of a self-referencing foreign key:

      "fields": [
        { "name": "parent" },
        { "name": "id" }
      ],
      "foreignKeys": [
        {
          "fields": "parent"
          "reference": {
            "resource": "self",
            "fields": "id"
          }
        }
      ]

----

# Appendix: Related Work

See <a href="{{site.baseurl}}/data-formats/">Web-Oriented Data Formats</a>  for more details and
links for each format.

-   SQL
-   DSPL
-   JSON-Stat
-   [Google
    BigQuery](https://developers.google.com/bigquery/docs/import#jsonformat)
    (JSON format section)

## DSPL

See <https://developers.google.com/public-data/docs/schema/dspl18>.
Allowed values:

-   string
-   float
-   integer
-   boolean
-   date
-   concept

## Google BigQuery

Example schema:

    "schema": {
      "fields":[
         {
            "mode": "nullable",
            "name": "placeName",
            "type": "string"
         },
         {
            "mode": "nullable",
            "name": "kind",
            "type": "string"
         },  ...
       ]
     }

Types:

-   string - UTF-8 encoded string up to 64K of data (as opposed to 64K
    characters).
-   integer - IEEE 64-bit signed integers: [-263-1, 263-1]
-   float - IEEE 754-2008 formatted floating point values
-   boolean - "true" or "false", case-insensitive
-   record (JSON only) - a JSON object; also known as a nested record

## XML Schema

See <http://www.w3.org/TR/xmlschema-2/#built-in-primitive-datatypes>

* string
* boolean
* decimal
* float
* double
* duration
* dateTime
* time
* date
* gYearMonth
* gYear
* gMonthDay
* gDay
* gMonth
* hexBinary
* base64Binary
* anyURI

## Type Lists

* HTML5 Forms: <http://www.whatwg.org/specs/web-apps/current-work/#attr-input-type>
