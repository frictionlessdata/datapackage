title: Profiles
---
updated: 24 May 2017
---
created: 11 December 2017
---
author:
 - Rufus Pollock (Open Knowledge International)
 - Paul Walsh (Open Knowledge International)
---
summary: Data Package and Data Resource Profiles
---
body:

Different kinds of data need different data and metadata formats. To support these different data and metadata formats we need to extend and specialise the generic Data Package. These specialized types of Data Package (or Data Resource) are termed **profiles**. For example, there is a [Tabular Data Package][tdp] profile that specializes Data Packages specifically for tabular data.

Thus, every Package and Resource descriptor has a profile. The namespace for the profile is the type of descriptor, so the default profile, if none is declared, is `data-package` for a Package descriptor and `data-resource` for a Resource descriptor.

In summary, an extension of Data Package may be formalised as a profile. A profile is a Data Package which extends the default specification towards more specific needs.

## `profile` Property

In addition to the concept, we need an explicit way for publishers to state the profile they are using and consumers to discover this.

Thus, we have a `profile` property that declares the profile for the descriptor for this Package or Resource. For the default Data Package and Data Resource descriptor, this SHOULD be present with a value of `data-package`/`data-resource`, but if not, the absence of a profile is equivalent to setting `"profile": "data-package"`/ `"profile": "data-resource"`.

Custom profiles MUST have a profile property, where the value is a unique identifier for that profile. This unique identifier `MUST` be a string and can be in one of two forms. It can be an id from the official [Data Package Schema Registry][registry], or, a fully-qualified URL that points directly to a JSON Schema that can be used to validate the profile.

As part of the Frictionless Data Specifications project, we publish a number of Data Package profiles such as:

* [Tabular Data Package][tdp]
* [Fiscal Data Package][fdp]

We also publish the following Data Resource profiles:

* [Tabular Data Resource][tdr]

[registry]: http://frictionlessdata.io/schemas/registry.json
[tdp]: http://frictionlessdata.io/specs/tabular-data-package/
[fdp]: http://frictionlessdata.io/specs/fiscal-data-package/
[tdr]: http://frictionlessdata.io/specs/tabular-data-resource/
