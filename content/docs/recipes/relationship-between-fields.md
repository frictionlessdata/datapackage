---
title: Relationship between Fields
---

<table>
  <tr>
    <th>Authors</th>
    <td>Philippe THOMY, Peter Desmet</td>
  </tr>
</table>

The structure of tabular datasets is simple: a set of Fields grouped in a table.

However, the data present is often complex and reflects an interdependence between Fields (see explanations in the Internet-Draft [NTV tabular format (NTV-TAB)](https://www.ietf.org/archive/id/draft-thomy-ntv-tab-00.html#section-2)).

Let's take the example of the following dataset:

| country | region         | code | population |
| ------- | -------------- | ---- | ---------- |
| France  | European Union | FR   | 449        |
| Spain   | European Union | ES   | 48         |
| Estonia | European Union | ES   | 449        |
| Nigeria | Africa         | NI   | 1460       |

The data schema for this dataset indicates in the Field Descriptor "description":

- for the "code" Field : "country code alpha-2"
- for the "population" Field: "region population in 2022 (millions)"

If we now look at the data we see that this dataset is not consistent because it contains two structural errors:

- The value of the "code" Field must be unique for each country, we cannot therefore have "ES" for "Spain" and "Estonia",
- The value of the "population" Field of "European Union" cannot have two different values (449 and 48)

These structural errors make the data unusable and yet they are not detected in the validation of the dataset (in the current version of Table Schema, there are no Descriptors to express this dependency between two fields).

The purpose of this specification is therefore on the one hand to express these structural constraints in the data schema and on the other hand to define the controls associated with the validation of a dataset.

## Context

This subject was studied and treated for databases and led to the definition of a methodology for specifying relationships and to the implementation of consistent relational databases.

The methodology is mainly based on the [Entity–relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model):

> _An entity–relationship model (or ER model) describes interrelated things of interest in a specific domain of knowledge. A basic ER model is composed of entity types (which classify the things of interest) and specifies relationships that can exist between entities (instances of those entity types)._

The Entity–relationship model is broken down according to the conceptual-logical-physical hierarchy.

The Relationships are expressed literally by a name and in a structured way by a [cardinality](<https://en.wikipedia.org/wiki/Cardinality_(data_modeling)>).

The Entity–relationship model for the example presented in the [Overview](#overview) is detailed in [this NoteBook](https://nbviewer.org/github/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example_schema.ipynb).

## Principles

Two aspects need to be addressed:

- **relationship expression**:

  This methodology applied for databases can also be applied for tabular data whose structure is similar to that of relational database tables but whose representation of relationships is different (see [patterns](https://www.ietf.org/archive/id/draft-thomy-ntv-tab-00.html#section-2) used in tabular representations).

  This variation is explained in the [linked notebook](https://github.com/loco-philippe/Environmental-Sensing/blob/main/property_relationship/methodology.ipynb) and presented in the [example](https://nbviewer.org/github/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example_schema.ipynb).

  Using a data model is a simple way to express relationships but it is not required. We can express the relationships directly at the data schema level.

- **validity of a dataset**:

  Checking the validity of a relationship for a defined dataset is one of the functions of [tabular structure analysis](https://github.com/loco-philippe/tab-analysis/blob/main/docs/tabular_analysis.pdf). It only requires counting functions accessible for any type of language (see [example of implementation](https://github.com/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example.ipynb)).

## Proposed extensions

A relationship is defined by the following information:

- the two Fields involved (the order of the Fields is important with the "derived" link),
- the textual representation of the relationship,
- the nature of the relationship

Three proposals for extending Table Schema are being considered:

- New Field Descriptor
- New Constraint Property
- New Table Descriptor

After discussions only the third is retained (a relationship between fields associated to a Field) and presented below:

- **New Table Descriptor**:

  A `relationships` Table Descriptor is added.
  The properties associated with this Descriptor could be:

  - `fields`: array with the names of the two Fields involved
  - `description`: description string (optional)
  - `link`: nature of the relationship

  Pros:

  - No mixing with Fields descriptors

  Cons:

  - Need to add a new Table Descriptor
  - The order of the Fields in the array is important with the "derived" link

  Example:

  ```json
  { "fields": [ ],
    "relationships": [
      { "fields" : [ "country", "code"],
        "description" : "is the country code alpha-2 of",
        "link" : "coupled"
      }
      { "fields" : [ "region", "population"],
        "description" : "is the population of",
        "link" : "derived"}
    ]
  }
  ```

## Specification

Assuming solution 3 (Table Descriptor), the specification could be as follows:

The `relationships` Descriptor MAY be used to define the dependency between fields.

The `relationships` Descriptor, if present, MUST be an array where each entry in the array is an object and MUST contain two required properties and one optional:

- `fields`: Array with the property `name` of the two fields linked (required)
- `link` : String with the nature of the relationship between them (required)
- `description` : String with the description of the relationship between the two Fields (optional)

The `link` property value MUST be one of the three following :

- `derived` :

  - The values of the child (second array element) field are dependant on the values of the parent (first array element) field (i.e. a value in the parent field is associated with a single value in the child field).
  - e.g. The "name" field [ "john", "paul", "leah", "paul" ] and the "Nickname" field [ "jock", "paulo", "lili", "paulo" ] are derived,
  - i.e. if a new entry "leah" is added, the corresponding "nickname" value must be "lili".

- `coupled` :

  - The values of one field are associated to the values of the other field.
  - e.g. The "Country" field [ "france", "spain", "estonia", "spain" ] and the "code alpha-2" field [ "FR", "ES", "EE", "ES" ] are coupled,
  - i.e. if a new entry "estonia" is added, the corresponding "code alpha-2" value must be "EE" just as if a new entry "EE" is added, the corresponding "Country" value must be "estonia".

- `crossed` :

  - This relationship means that all the different values of one field are associated with all the different values of the other field.
  - e.g. the "Year" Field [ 2020, 2020, 2021, 2021] and the "Population" Field [ "estonia", "spain", "estonia", "spain" ] are crossed
  - i.e the year 2020 is associated to population of "spain" and "estonia", just as the population of "estonia" is associated with years 2020 and 2021

## Implementations

The implementation of a new Descriptor is not discussed here (no particular point to address).

The control implementation is based on the following principles:

- calculation of the number of different values for the two Fields,
- calculation of the number of different values for the virtual Field composed of tuples of each of the values of the two Fields
- comparison of these three values to deduce the type of relationship
- comparison of the calculated relationship type with that defined in the data schema

The [implementation example](https://github.com/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example.ipynb) presents calculation function.
An [analysis tool](https://github.com/loco-philippe/tab-analysis/blob/main/README.md) is also available and accessible from pandas data.
An example of implementation as `custom_check` is available [here](https://nbviewer.org/github/loco-philippe/Environmental-Sensing/blob/main/property_relationship/relationship_descriptor.ipynb).

## Notes

If the relationships are defined in a data model, the generation of the relationships in the data schema can be automatic.

The example presented in the [Overview](#overview) and the rule for converting a Data model into a Table schema are detailed in [this NoteBook](https://nbviewer.org/github/loco-philippe/Environmental-Sensing/blob/main/property_relationship/example_schema.ipynb).

A complete example (60 000 rows, 50 fields) is used to validate the methodology and the tools: [open-data IRVE](https://www.data.gouv.fr/fr/reuses/les-donnees-irve-sont-elles-coherentes/)
