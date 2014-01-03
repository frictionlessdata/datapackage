---
title: Data Packages
layout: default
version: 1.0-beta.5
last_update: 3 August 2013
created: 12 November 2007
author:
 - Rufus Pollock (Open Knowledge Foundation Labs)
 - Matthew Brett (NiPY)
 - Martin Keegan (Open Knowledge Foundation Labs)
---

A Data Package (or DataPackage) is a coherent collection of data and possibly
other assets in a single 'package'. It provides the basis for convenient
delivery, installation and management of datasets.

{% include meta.html %}

<div class="alert" markdown="block">
NOTE: This is a draft specification and still under development. If you have comments
or suggestions please file them in the [issue tracker][issues]. If you have
explicit changes please fork the [git repo][repo] and submit a pull request.
</div>

[issues]: https://github.com/dataprotocols/dataprotocols/issues
[repo]: https://github.com/dataprotocols/dataprotocols

### Table of Contents 
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

# Specification

A data package consists of:

* Data package metadata that describes the structure and contents of the package
* Optionally, additional resources, including data files, that make up the package

A valid data package MUST provide a data package "descriptor" file named
`datapackage.json`.

This file should be placed in the top-level directory (relative to any other
resources provided as part of the data package).

The data package descriptor is used to provide metadata about the data package and to 
describe its contents. The descriptor should follow the structure described in the 
rest of this document.

A data package will normally include other resources (e.g. data files) but the
Data Package specification does NOT impose any requirements on their form or
structure. 

The data included in the package may be provided as:

* Files bundled into the package itself
* Remote resources, referenced by URL
* "Inline" data (see below) which is included directly in the `datapackage.json` file

## Illustrative Structure

A minimal data package on disk would be a directory containing a single file:

    datapackage.json  # (required) metadata and schemas for this data package

Obviously lacking a single piece of actual data would make this of doubtful
use. A slightly less minimal version would be:

    datapackage.json
    # a data file (CSV in this case)
    data.csv

Additional files such as a README, scripts (for processing or analyzing the
data) and other material may be provided. By convention scripts go in a scripts
directory and thus, a more elaborate data package could look like this:

    datapackage.json  # (required) metadata and schemas for this data package
    README.md         # (optional) README in markdown format

    # data files may go either in data subdirectory or in main directory
    mydata.csv
    data/otherdata.csv         

    # the directory for code scripts - again these can go in the base directory
    scripts/my-preparation-script.py

Several exemplar data packages can be found in the [datasets organization on github][datasets], including:

* [World GDP][gdp]
* [ISO 3166-2 country codes][3166] 

[datasets]: https://github.com/datasets
[gdp]: https://github.com/datasets/gdp 
[3166]: https://github.com/datasets/country-codes


## Descriptor (datapackage.json)

`datapackage.json` is the central file in a Data Package. It provides:

* General metadata such as the name of the package, its license, its publisher etc
* A list of the data resources that make up this data package (plus, possibly, additional schema information about these data resources in a structured form)

The Package descriptor MUST be a valid JSON file. (JSON is defined in [RFC 4627][].

[RFC 4627]: http://www.ietf.org/rfc/rfc4627.txt

It MAY contain any number of attributes. All attributes at the first level not
otherwise specified here are considered `metadata` attributes.

A valid descriptor MUST contain a `name` attibute. These fields, and additional 
metadata attributes, are described in the "Required Fields" section below.

A valid descriptor MAY contain a `resources` attribute.

Here is an illustrative example of a datapackage JSON file:

    {
      # general "metadata" like title, sources etc
      name: "a-unique-human-readable-and-url-usable-identifier",
      title: "A nice title",
      licenses: [...],
      sources: [...],
      # list of the data resources in this data package
      "resources": [
        {
          ... resource info described below ...
        }
      ],
      # optional
      ... additional information ...
    }

## Metadata

### Required Fields

A valid package MUST include the following fields:

* `name` (required) - short url-usable (and preferably human-readable) name of
  the package. This MUST be lower-case and contain only alphanumeric characters
  along with ".", "_" or "-" characters. It will function as a unique
  identifier and therefore SHOULD be unique in relation to any registry in
  which this package will be deposited (and preferably globally unique).

  The name SHOULD be invariant, meaning that it SHOULD NOT change when a data
  package is updated, unless the new package version should be considered a
  distinct package, e.g. due to significant changes in structure or
  interpretation. Version distinction SHOULD be left to the version field. As
  a corollary, the name also SHOULD NOT include an indication of time range
  covered.

In addition to the above fields, it is recommended that the following fields SHOULD 
be included in every package descriptor:

* `resources` - a JSON array of hashes that describe the contents of 
  the package. The structure of the resource hash is described in the "Resource Information"
  section.

* `licenses` - array of licenses under which the package is provided. Each
  license is a hash with an `id` (based on http://OpenDefinition.org/licenses) and/or a `url` property linking to the actual text. Example:

      "licenses": [{
        "id": "odc-pddl",
        "url": "http://opendatacommons.org/licenses/pddl/"
      }]
* `datapackage_version` - the version of the data package specification this
  datapackage.json conforms to. It should follow the Semantic Versioning
  requirements (http://semver.org/). The current version of this specification is given at 
  the top of this document.

### Recommended Fields

Additionally, a package descriptor MAY include the following keys and values:

* `title` - a title or one sentence description for this package
* `description` - a description of the package. The first paragraph (up to the
  first double line break should be usable as summary information for the package)
* `homepage` - URL string for the data packages web site
* `version` - a version string identifying the version of the package. It should conform to the Semantic Versioning requirements
  (http://semver.org/).
* `sources` - an array of source hashes. Each source hash may have `name`, `web` and `email` fields. Example:

      "sources": [{
        "name": "World Bank and OECD",
        "web": "http://data.worldbank.org/indicator/NY.GDP.MKTP.CD"
      }]
    
* `keywords` - an Array of string keywords to assist users searching for the
  package in catalogs.
* `last_modified`: iso 8601 formatted date (or datetime) when this data package was last updated
* `image` - a link to an image to use for this data package

### Optional Fields 

* `maintainers` - Array of maintainers of the package. Each maintainer is a hash
  which must have a "name" property and may optionally provide "email" and
  "web" properties.
* `contributors` - an Array of hashes each containing the details of a
  contributor. Must contain a 'name' property and MAY contain an email and web
  property. By convention, the first contributor is the original author of the
  package. Example:

      "contributors":[ {
        "name": "Joe Bloggs",
        "email": "joe@bloggs.com",
        "web": "http://www.bloggs.com"
      }]

* `publisher` - like contributors 
* `root` - a base URI used to resolve `resources` that specify relative paths in
  the event that the actual data files specified by those resource paths are not
  located in the same directory in which the descriptor file (`datapackage.json`)
  resides.
* `dependencies` - Hash of prerequisite packages on which this package depends in
  order to install and run. Each dependency defines the lowest compatible
  MAJOR[.MINOR[.PATCH]] dependency versions (only one per MAJOR version) with
  which the package has been tested and is assured to work. The version may be
  a simple version string (see the version property for acceptable forms), or
  it may be a hash group of dependencies which define a set of options, any one
  of which satisfies the dependency. The ordering of the group is significant
  and earlier entries have higher priority.

<div class="alert" markdown="block">
NOTE: A Data Package author MAY add any number of additional fields beyond those
listed in the specification here.  For example, suppose you were storing
time series data and want to list the temporal coverage of the data in the
Data Package you could add a field `temporal` (cf [Dublin Core][dc-temporal]):

    "temporal": {
      "name": "19th Century",
      "start": "1800-01-01",
      "end": "1899-12-31"
    }

This flexibility enables specific communities to extend Data Packages as
appropriate for the data they manage. As an example, the [Simple Data
Format][sdf] specification extends Data Package to the case
where all the data is tabular and stored in CSV.
</div>

[sdf]: /simple-data-format/
[dc-temporal]: http://dublincore.org/documents/usageguide/qualifiers.shtml#temporal

## Resource Information

Packaged data resources are described in the `resources` property of the package descriptor. 
This property is an array of values. Each value describes a single resource and 
MUST be a JSON hash.

### Required Fields

Resource information MUST contain (at least) one of the following attributes which
specify the location of the associated data file (either online, 'relative'
(local), or 'inline'):

* `url`: url of this data resource
* `path`: unix-style ('/') relative path to the resource. Path MUST be a relative
  path, that is relative to the directory in which the descriptor file
  (`datapackage.json`) listing this file resides, or relative to the URI specified
  by the optional `root` property (if it is defined).
* `data`: (inline) a field containing the data directly inline in the
  `datapackage.json` file. Further details below.

<div class="alert" markdown="block">
NOTE: the use of a `url` allows a data package to reference data not necessarily
contained locally in the Data Package. Of course, the `path` attribute may still
be used for Data Packages located online (in this case it determines the
relative URL) in combination with the optional `root` property if it is defined.
</div>

<div class="alert" markdown="block">
NOTE: When more than one of `url`, `path` or `data` are specified consumers need to
determine which option to use (or in which order to try them). The
recommendation is to utilize the following order: `data`, `path`, `url`. A consumer
should also stop processing once one of these options yields data.
</div>

There are NO other required fields. However, there are a variety of common
fields that can be used which we detail below.

### Recommended Fields

It is recommended that a resource SHOULD contain the following fields:

* `name`: a resource SHOULD contain an `name` attribute. The name is a simple name or
  identifier to be used for this resource.

  * If present, the name MUST be unique amongst all resources in this data
    package.
  * The name SHOULD be usable in a url path and SHOULD therefore consist only
    of alphanumeric characters plus ".", "-" and "_".
  * It would be usual for the name to correspond to the file name (minus the
    extension) of the data file the resource describes.

### Optional Fields

A data package MAY contain any number of additional fields. Common fields include:

* `format`: 'csv', 'xls', 'json' etc. Would be expected to be the the standard file
  extension for this type of resource.
* `mediatype`: the mediatype/mimetype of the resource e.g. 'text/csv', 'application/vnd.ms-excel'as 
* encoding: character encoding of the resource data file (default is assumption
  of utf8) 
* `bytes`: size of the file in bytes
* `hash`: the md5 hash for this resource
* `modified`: ISO 8601 string for last modified timestamp of the resource
* `schema`: a schema for the resource - see below for more on this in the case of
  tabular data.
* `sources`: as for data package metadata.
* `licenses`: as for data package metadata. If not specified the resource
  inherits from the data package.

### Inline Data

Resource data rather than being stored in external files can be shipped
'inline' on a Resource using the `data` attribute.

The value of the data attribute  can be any type of data. However, restrictions
of JSON require that the value be a string so for binary data you will need to
encode (e.g. to Base64). Information on the type and encoding of the value of
the data attribute SHOULD be provided by the format (or mediatype) attribute
and the encoding attribute.

Specifically: the value of the data attribute MUST be:

* EITHER: a JSON array or hash - the data is then assumed to be JSON data and SHOULD be processed as such
* OR: a JSON string - in this case the format or mediatype attributes MUST be provided.

Thus, a consumer of resource hash MAY assume if no format or mediatype
attribute is provided that the data is JSON and attempt to process it as such.

Examples 1 - inline JSON:

    {
       ...
       resources: [
         {
            "format": "json",
            # some json data e.g. 
            "data": [
               { "a": 1, "b": 2 },
               { .... }
            ]
         }
       ]
    }

Example 2 - inline CSV:

    {
       ...
       resources: [
         {
            "format": "csv",
            "data": "A,B,C\n1,2,3\n4,5,6"
         }
       ]
    }

### Tabular Data

For tabular data the resource information MAY contain schema information in an
attribute named `schema`. If `schema` is provided its value MUST confirm to
the [JSON Table Schema][jts].

[jts]: /json-table-schema/

Here is an example for a CSV file:

    {
      // one of url or path should be present
      url:
      path:
      
      dialect: # as per CSV Dialect specification
      schema:  # as per JSON Table Schema 
    }

The [Simple Data Format][sdf] provides a specification focused on tabular data.
It builds on this data package specification (Simple Data Format datasets are
Data Packages) and provides additional specific requirements for the format and
structure of data files and the resource information in the datapackage.json.


# Background

## Aims

* Simple
* Extensible
* Human editable (for metadata)
* Machine usable (easily parsable and editable)
* Based on existing standard formats
* Not linked to a particular language or system

## How It Fits into the Ecosystem

* Minimal wrapping to provide for machine automated sharing and obtaining of
  data
* Data Packages can be registered into and found in indexes (local or remote)
* Tools (based on code libraries) integrate with these indexes (and storage) to
  download and upload material

<img src="https://docs.google.com/drawings/pub?id=1W0s91bQGS-bmGOLm519mMq9zDJvRhP71pwuJtkflRws&w=896&h=660" align="center" alt="Data Packages and the Wider Ecosystem" width="90%" />

# Appendix: Review of Existing Packaging Work

The specification is heavily inspired by various software packaging formats
including the Debian 'Debs' format, Python Distributions and CommonsJS
Packages. More background on these other formats can be found below.

## Debs

http://www.debian.org/doc/debian-policy/ch-controlfields.html

The fields in the binary package paragraphs are:

* Package (mandatory)
* Architecture (mandatory)
* Section (recommended)
* Priority (recommended)
* Essential
* Depends et al
* Description (mandatory)
* Homepage

5.6.2 Maintainer

The package maintainer's name and email address. The name must come first, then
the email address inside angle brackets <> (in RFC822 format).

5.6.13 Description

In a source or binary control file, the Description field contains a
description of the binary package, consisting of two parts, the synopsis or the
short description, and the long description. The field's format is as follows:

5.6.5 Section

This field specifies an application area into which the package has been
classified. See Sections, Section 2.4.

## JARs

http://java.sun.com/j2se/1.3/docs/guide/jar/jar.html

The META-INF directory

The following files/directories in the META-INF directory are recognized and
interpreted by the Java 2 Platform to configure applications, extensions, class
loaders and services:

MANIFEST.MF - The manifest file that is used to define extension and package
related data.

INDEX.LIST

## CommonJS javascript packages

http://wiki.commonjs.org/wiki/Packages/1.0

The following is an extract:

### Packages

This specification describes the CommonJS package format for distributing
CommonJS programs and libraries. A CommonJS package is a cohesive wrapping of a
collection of modules, code and other assets into a single form. It provides
the basis for convenient delivery, installation and management of CommonJS
components.

This specifies the CommonJS package descriptor file and package file format. It
does not specify a package catalogue file or format; this is an exercise for
future specifications.  The package descriptor file is a statement of known
fact at the time the package is published and may not be modified without
publishing a new release.

### Package Descriptor File

Each package must provide a top-level package descriptor file called
"package.json". This file is a JSON format file. Each package must provide all
the following fields in its package descriptor file.

* name - the name of the package.
* description - a brief description of the package. By convention, the first
  sentence (up to the first ". ") should be usable as a package title in
  listings.
* version - a version string conforming to the Semantic Versioning requirements
  (http://semver.org/).
* keywords - an Array of string keywords to assist users searching for the
  package in catalogs.
* maintainers - Array of maintainers of the package. Each maintainer is a hash
  which must have a "name" property and may optionally provide "email" and
  "web" properties.
* contributors - an Array of hashes each containing the details of a
  contributor. Format is the same as for author. By convention, the first
  contributor is the original author of the package.
* bugs - URL for submitting bugs. Can be mailto or http.
* licenses - array of licenses under which the package is provided. Each
  license is a hash with a "type" property specifying the type of license and a
  url property linking to the actual text. If the license is one of the
  [http://www.opensource.org/licenses/alphabetical official open source
  licenses] the official license name or its abbreviation may be explicated
  with the "type" property.  If an abbreviation is provided (in parentheses),
  the abbreviation must be used.
* repositories - Array of repositories where the package can be located. Each
  repository is a hash with properties for the "type" and "url" location of the
  repository to clone/checkout the package. A "path" property may also be
  specified to locate the package in the repository if it does not reside at
  the root.
* dependencies - Hash of prerequisite packages on which this package depends in
  order to install and run. Each dependency defines the lowest compatible
  MAJOR[.MINOR[.PATCH]] dependency versions (only one per MAJOR version) with
  which the package has been tested and is assured to work. The version may be
  a simple version string (see the version property for acceptable forms), or
  it may be a hash group of dependencies which define a set of options, any one
  of which satisfies the dependency. The ordering of the group is significant
  and earlier entries have higher priority.

### Catalog Properties

When a package.json is included in a catalog of packages, the following fields
should be present for each package. 

* checksums - Hash of package checksums. This checksum is used by package
  manager tools to verify the integrity of a package. For example:

       checksums: {
         "md5": "841959b03e98c92d938cdeade9e0784d",
         "sha1": " f8919b549295a259a6cef5b06e7c86607a3c3ab7",
         "sha256": "1abb530034bc88162e8427245839ec17c5515e01a5dede6e702932bbebbfe8a7"
       }

This checksum is meant to be automatically added by the catalog service

## Open Document Format

<http://en.wikipedia.org/wiki/OpenDocument_technical_specification#Format_internals>

Layout:

    meta.xml
    META-INF/
      manifest.xml

meta.xml contains the file metadata. For example, Author, "Last modified by",
date of last modification, etc. The contents look somewhat like this:

    <meta:creation-date>2003-09-10T15:31:11</meta:creation-date>
    <dc:creator>Daniel Carrera</dc:creator>
    <dc:date>2005-06-29T22:02:06</dc:date>
    <dc:language>es-ES</dc:language>
    <meta:document-statistic  table-count="6" object-count="0"
      page-count="59" paragraph-count="676"
      image-count="2" word-count="16701"
      character-count="98757"/>

META-INF is a separate folder. Information about the files contained in the
OpenDocument package is stored in an XML file called the manifest file. The
manifest file is always stored at the pathname META-INF/manifest.xml. The main
pieces of information stored in the manifest are:

* A list of all of the files in the package.
* The media type of each file in the package.
* If a file stored in the package is encrypted, the information required to
  decrypt the file is stored in the manifest.

