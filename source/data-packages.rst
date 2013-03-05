=============
Data Packages
=============

.. sectionauthor:: Rufus Pollock (Open Knowledge Foundation), Matthew Brett (NiPY), Martin Keegan (Open Knowledge Foundation Labs)

:**Version**: 1.0beta
:**Date**: 15 February 2013

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

A data package must provide package descriptor metadata. As a file this should
be named "datapackage.json" and placed in the top-level directory. Additional
files such as a README and data files may be provided. A data package has the
following structure on disk::

    datapackage.json  # (required) metadata and schemas for this data package
    README.md         # (optional) README in markdown format

    # data files may go either in data subdirectory or in main directory
    mydata.csv
    data/otherdata.csv         

    # the directory for code scripts - again these can go in the base directory
    scripts/

datapackage.json
----------------

`datapackage.json` is the central file in a Data Package as it provides both
general metadata and schema information in a structured form that is machine
usable. It is a JSON file with the following structure::

  {
    # general "metadata" like title, sources etc
    name: "a unique human readable and url-usable identifier",
    title: "A nice title",
    sources: [...],
    # optional
    "files": {
      "url or path to data file": {
        ... file info described below ...
      }
    },
    # optional
    ... additional information ...
  }

Metadata
--------

Core Attributes
~~~~~~~~~~~~~~~

The metadata hash may have the following keys and values:

* name (required) - short url-usable (and preferably human-readable) name of
  the package. This must be lowercase alpha-numeric name without spaces. It may
  include "." or "_" or "-" characters. It will function as a unique identifier
  and therefore should be unique in relation to any registry in which this
  package will be deposited (and preferably globally unique).
* title (required) - a title or one sentence description for this package
* description - a description of the package. The first paragraph (up to the
  first double line break should be usable as summary information for the package)
* version - a version string conforming to the Semantic Versioning requirements
  (http://semver.org/).
* licenses - array of licenses under which the package is provided. Each
  license is a hash with a "type" property specifying the type of license and a
  url property linking to the actual text.
* sources - an array of source hashes. Each source hash may have name, web and email attributes. Example::

    "sources": [{
      "name": "World Bank and OECD",
      "web": "http://data.worldbank.org/indicator/NY.GDP.MKTP.CD"
    }],
    
* keywords - an Array of string keywords to assist users searching for the
  package in catalogs.
* last_updated: iso 8601 formatted date (or datetime) when this data package was last updated
* image - a link to an image to use for this data package

Extension attributes
~~~~~~~~~~~~~~~~~~~~

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

File Info
---------

This will be a JSON serializable structure. Exact attributes will vary by file
type.

For tabular data we expect it to contain schema information conforming to the
:doc:`JSON Table Schema <json-table-schema`.

Here is an example for a CSV file::

  {
    // one of url or path should be present
    url:     # url to the file
    path:    # relative path to the file relative to the directory in which datapackage.json resides
    
    dialect: # as per CSV Dialect specification
    schema:  # hash as per JSON Table Schema 
  }
  

Catalogs and Discovery
======================

In order to find Data Packages tools may make use of a "consolidated" catalog
either online or locally.

A general specification for (online) Data Catalogs can be found at
http://spec.datacatalogs.org/.

For local catalogs on disk we suggest locating at "HOME/.dpm/catalog.json" and
having the following structure::

 {
    version: ...
    datasets:
      {name}: {
        {version}:
          metadata: {metadata},
          bundles: [
            url: ...
            type: file, url, ckan, zip, tgz
          ]
 }

When Package metadata is added to the catalog a field called bundle is added
pointing to a bundle for this item (see below for more on bundles).

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

Concepts
========

.. note::

   when people talk of a data package they will usually mean what we define
   below as a Package Bundle, that is a concrete instance of a Package at a
   particular revision with data associated. This is similar to software.  When
   someone says install software package X what they really mean is install the
   software package 'Bundle' (e.g. zipped up set of files or special installer
   file) for package X at a specific revision or version.

(Data) Package
--------------

Strictly, the Data Package itself is something of an abstract idea, and is a
bit like a data project, that is a set of information that the packager
believed has something in common. The precise contents of a package could
change completely over course of its life. The package then is a little bit
like a namespace, having itself no content other than a string (the package
name) and the data it contains. So the one essential feature of a package is
that is **has a Package name**.

Package Revision
----------------

A specific revision of the Package corresponding to some particular actual set
of data for a particular package at a particular point in time. 'Actual' here
means 'stuff' that can be read as bytes. As we add and remove data from the
package, the instantiation changes. In version control, the instantiation would
be the particular state of the working tree at any moment, whether this has
been committed or not.

Package Bundle
--------------

The (package) bundle is something that can deliver the bytes of a particular
Package Revision. For example, if you have a package named
"interesting-images", you might have a revision of that package identified by
revision id "f745dc2" and tagged with "version-0.2". There might be a bundle of
that instantiation that is a zipfile interesting-images-version-0.2.zip.  There
might also be a directory on an http server with the same contents
http://my.server.org/packages/interesting-images/version-9.2. When I unpack the
zipfile onto my hard disk, I might have a directory
/my/home/packages/interesting-images/version-0.2.


Tools
=====

Data Package Manager
--------------------

A command line utility and library supporting the data package spec is
available: dpm.

* Data package manager (dpm): http://dpm.readthedocs.org/

  * Source code: https://github.com/okfn/dpm


Existing Work
=============

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


Other Information
=================

Matthew Brett's thoughts:

* https://github.com/nipy/nibabel/blob/master/doc/source/devel/data_pkg_discuss.rst
* https://github.com/nipy/nibabel/blob/master/doc/source/devel/data_pkg_uses.rst

