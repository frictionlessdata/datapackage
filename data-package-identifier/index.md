---
layout: spec
title: Data Package Identifiers
version: 1.0-alpha
updated: 02 November 2014
created: 17 August 2014
author:
 - Rufus Pollock (Open Knowledge Labs)
summary: Data Package Identifiers are small JSON-oriented structure or strings
  which identify a Data Package (and, usually, its location).
---

Data Package Identifiers are a simple way to identify a Data Package (and its
location) using a string or small JSON object.

It exists because of the consistent need across applications to identify a Data
Package. For example, in command line tools or libraries one will frequently
want to take a Data Package Identifier as an argument.

For example, consider the `dpm` (the Data Package Manager) has commands like:

    # gdp is a data package identifier
    dpm info gdp
    # https://github.com/datasets/gold-prices is a data package identifier
    dpm install https://github.com/datasets/gold-prices

## Identifier Object Structure

The Object structure looks like:

    {
      // URL to base of the Data Package
      // This URL will *always* have a trailing /
      url: ...
      // URL to datapackage.json
      dataPackageJsonUrl: ...
      // name of the Data Package
      name: ...
      // version of the Data Package
      version: ...
      // if parsed from a Identifier String this is the original specString
      original: 
    }

It can be parsed (and less importantly) serialized to a simple string. Spec
strings will be frequently used on e.g. the command line to identify a data
package.

TODO: describe minimum requirements for validity

## Identifier String

A Identifier String is a single string (rather than JSON object). A Identifier String can be, in decreasing order of explicitness:

* A direct URL to a datapackage.json

       http://mywebsite.com/mydatapackage/datapackage.json

* A direct URL to a datapackage

       http://mywebsite.com/mydatapackage/
       
*which resolves to:*

       http://mywebsite.com/mydatapackage/datapackage.json
       
* A Github URL

       http://github.com/datasets/gold-prices

*which resolves to:*

       https://github.com/datasets/gold-prices/blob/master/datapackage.json

* A name of a dataset in the core datasets registry

       gold-prices

*which resolves to:* 

       http://data.okfn.org/data/core/gold-prices/datapackage.json
