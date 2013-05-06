=============
Data Packages
=============

.. sectionauthor:: Rufus Pollock (Open Knowledge Foundation), Matthew Brett (NiPY), Martin Keegan (Open Knowledge Foundation Labs)

:**Version**: 1.0beta2
:**Lasted Updated**: 14 April 2013
:**Created**: 12 November 2007

A Data Package (or DataPackage) is a coherent collection of data
and possibly other assets into a single form. It provides the basis for
convenient delivery, installation and management of datasets.

.. note::

   This is a draft specification and still under development. If you have
   comments or suggestions please file them in the issue tracker at:
   https://github.com/dataprotocols/dataprotocols/issues. If you have explicit changes
   please fork the repo (https://github.com/dataprotocols/dataprotocols) and submit a
   pull request.


Specification
=============

A data package MUST provide a data package "descriptor" file named
datapackage.json.

This file should be placed in the top-level directory (relative to any other
resources provided as part of the data package).

A data package will normally include other resources (e.g. data files) but the Data
Package specification does NOT impose any requirements on their form or
structure.

Illustrative Structure
----------------------

A minimal data package on disk would be a directory containing a single file::

    datapackage.json  # (required) metadata and schemas for this data package

Obviously lacking a single piece of actual data would make this of doubtful
use. A slightly less minimal version would be::

    datapackage.json
    # a data file (CSV in this case)
    data.csv

Additional files such as a README, scripts (for processing or analyzing the
data) and other material may be provided. By convention scripts go in a scripts
directory and thus, a more elaborate data package could look like this::

    datapackage.json  # (required) metadata and schemas for this data package
    README.md         # (optional) README in markdown format

    # data files may go either in data subdirectory or in main directory
    mydata.csv
    data/otherdata.csv         

    # the directory for code scripts - again these can go in the base directory
    scripts/my-preparation-script.py

Several exemplar data packages can be found in the `datasets organization on github`, including:

* `World GDP`_
* `ISO 3166-2 country codes`_ 

.. _datasets organization on github: https://github.com/datasets
.. _World GDP: https://github.com/datasets/gdp 
.. _ISO 3166-2 country codes: https://github.com/datasets/country-codes


Descriptor (datapackage.json)
-----------------------------

`datapackage.json` is the central file in a Data Package. It provides:

* General metadata such as the name of the package, its license, its publisher etc
* A list of the data resources that make up this data package (plus, possibly, additional schema information about these data resources in a structured form)

The Package descriptor MUST be a valid JSON file. (JSON is defined in `RFC 4627`_).

.. _RFC 4627: http://www.ietf.org/rfc/rfc4627.txt

It MAY contain any number of attributes. All attributes at the first level not
otherwise specified here are considered `metadata` attributes.

The hash MUST contain a `resources` attribute and metadata attributes defined as
'required' below.
  
Here is an illustrative example of a datapackage JSON file::

  {
    # general "metadata" like title, sources etc
    name: "a unique human readable and url-usable identifier",
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

Metadata
--------

Core Attributes
~~~~~~~~~~~~~~~

The metadata may have the following keys and values:

* name (required) - short url-usable (and preferably human-readable) name of
  the package. This must be lowercase alpha-numeric name without spaces. It may
  include "." or "_" or "-" characters. It will function as a unique identifier
  and therefore should be unique in relation to any registry in which this
  package will be deposited (and preferably globally unique).
* title (optional) - a title or one sentence description for this package
* description - a description of the package. The first paragraph (up to the
  first double line break should be usable as summary information for the package)
* version - a version string conforming to the Semantic Versioning requirements
  (http://semver.org/).
* licenses - array of licenses under which the package is provided. Each
  license is a hash with an id (based on http://OpenDefinition.org/licenses) and/or a url property linking to the actual text. Example::

      "licenses": [{
        "id": "odc-pddl",
        "url": "http://opendatacommons.org/licenses/pddl/"
      }]

* sources - an array of source hashes. Each source hash may have name, web and email attributes. Example::

    "sources": [{
      "name": "World Bank and OECD",
      "web": "http://data.worldbank.org/indicator/NY.GDP.MKTP.CD"
    }],
    
* keywords - an Array of string keywords to assist users searching for the
  package in catalogs.
* last_updated: iso 8601 formatted date (or datetime) when this data package was last updated
* image - a link to an image to use for this data package

Additional attributes
~~~~~~~~~~~~~~~~~~~~~

* maintainers - Array of maintainers of the package. Each maintainer is a hash
  which must have a "name" property and may optionally provide "email" and
  "web" properties.
* contributors - an Array of hashes each containing the details of a
  contributor. Must contain a 'name' property and MAY contain an email and web
  property. By convention, the first contributor is the original author of the
  package. Example::

    "contributors":[ {
      "name": "Joe Bloggs",
      "email": "joe@bloggs.com",
      "web": "http://www.bloggs.com"
    }]

* publisher - like contributors 
* dependencies - Hash of prerequisite packages on which this package depends in
  order to install and run. Each dependency defines the lowest compatible
  MAJOR[.MINOR[.PATCH]] dependency versions (only one per MAJOR version) with
  which the package has been tested and is assured to work. The version may be
  a simple version string (see the version property for acceptable forms), or
  it may be a hash group of dependencies which define a set of options, any one
  of which satisfies the dependency. The ordering of the group is significant
  and earlier entries have higher priority.

Resource Information
--------------------

Resource information MUST be a JSON serializable hash.

Resource information MUST contain (at least) one of the following attributes which
specify the location of the associated data file (either online or 'local'):

* url: url of this data resource
* path: unix-style ('/') path to the resource. Path MUST be a relative path,
  that is relative to the directory in which the descriptor file
  (datapackage.json) listing this file resides

.. note:: the use of a url allows a data package to reference data not
          necessarily contained locally in the Data Package. Of course, the
          path attribute may still be used for Data Packages located online (in
          this case it determines the relative URL).

There are NO other required fields. However, there are a variety of common
fields that can be used.

Recommended fields
~~~~~~~~~~~~~~~~~~

A resource SHOULD contain the following fields:

* id: a resource SHOULD contain an id attribute. The id is a simple name or
  identifier to be used for this resource. The should be usable in a url path
  and is subject to the same restrictions as the data package name (see above).
  It would be common for the id to correspond to the file name (minus the
  extension) of the data file the resource describes.

Optional fields
~~~~~~~~~~~~~~~

A data package MAY contain any number of additional fields. Common fields include:

* format: 'csv', 'xls' etc. Would be expected to be the the standard file
  extension for this type of resource.
* mimetype: 'text/csv', 'application/vnd.ms-excel'as 
* bytes: size of the file in bytes
* schema: a schema for the resource - see below for more on this in the case of
  tabular data.
* hash: hash for this resource
* lastmodified: ISO 8601 string for last modified timestamp of the resource
* sources: as for data package metadata.
* licenses: as for data package metadata. If not specified the resource inherits from the data package.

Tabular Data
~~~~~~~~~~~~

For tabular data the resource information MAY contain schema information conforming to the
:doc:`JSON Table Schema <json-table-schema>`.

Here is an example for a CSV file::

  {
    // one of url or path should be present
    url:
    path:
    
    dialect: # as per CSV Dialect specification
    schema:  # as per JSON Table Schema 
  }

See :doc:`Simple Data Format <simple-data-format>` for a specification that
builds on this data package specification adding specific requirements for
files and file info.


Background
==========

Aims
----

* Simple
* Extensible
* Human editable (for metadata)
* Machine usable (easily parsable and editable)
* Based on existing standard formats
* Not linked to a particular language or system

How It Fits into the Ecosystem
------------------------------

* Minimal wrapping to provide for machine automated sharing and obtaining of
  data
* Data Packages can be registered into and found in indexes (local or remote)
* Tools (based on code libraries) integrate with these indexes (and storage) to
  download and upload material

.. image:: https://docs.google.com/drawings/pub?id=1W0s91bQGS-bmGOLm519mMq9zDJvRhP71pwuJtkflRws&w=896&h=660
   :align: center
   :alt: Data Packages and the Wider Ecosystem
   :width: 90%


Appendix: Review of Existing Packaging Work
===========================================

The specification is heavily inspired by various software packaging formats
including the Debian 'Debs' format, Python Distributions and CommonsJS
Packages. More background on these other formats can be found below.


Debs
----

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

JARs
----

http://java.sun.com/j2se/1.3/docs/guide/jar/jar.html

The META-INF directory

The following files/directories in the META-INF directory are recognized and
interpreted by the Java 2 Platform to configure applications, extensions, class
loaders and services:

MANIFEST.MF - The manifest file that is used to define extension and package
related data.

INDEX.LIST

CommonJS javascript packages
----------------------------

http://wiki.commonjs.org/wiki/Packages/1.0

The following is an extract:

Packages
~~~~~~~~

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

Package Descriptor File
~~~~~~~~~~~~~~~~~~~~~~~

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

Catalog Properties
~~~~~~~~~~~~~~~~~~

When a package.json is included in a catalog of packages, the following fields
should be present for each package. 

* checksums - Hash of package checksums. This checksum is used by package
  manager tools to verify the integrity of a package. For example::

   checksums: {
     "md5": "841959b03e98c92d938cdeade9e0784d",
     "sha1": " f8919b549295a259a6cef5b06e7c86607a3c3ab7",
     "sha256": "1abb530034bc88162e8427245839ec17c5515e01a5dede6e702932bbebbfe8a7"
   }

This checksum is meant to be automatically added by the catalog service

Open Document Format
--------------------

http://en.wikipedia.org/wiki/OpenDocument_technical_specification#Format_internals

Layout::

  meta.xml
  META-INF/
    manifest.xml

meta.xml contains the file metadata. For example, Author, "Last modified by",
date of last modification, etc. The contents look somewhat like this::

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

