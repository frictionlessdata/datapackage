---
title: How to start using Data Package
sidebar:
  order: 1
---

There are many alternatives when it comes to Data Package Standard implementations. We will cover a few the most popular options which will be a good starting point.

:::tip
Please take a look at the full list of Data Package [Software](/overview/software/) to find other implementations.
:::

## Open Data Editor

The simplest way to start using the Data Package Standard is by installing [Open Data Editor](https://opendataeditor.okfn.org/) (currently, in beta):

[![Open Data Editor](../../../assets/software/ode.png)](https://opendataeditor.okfn.org)

You can use the visual interface as you usually do in any modern IDE, adding and moving files, validating data, etc. Under the hood, Open Data Editor will be creating Data Package descriptors for your datasets (can be explicitly done by creating a dataset), inferring metadata, and data types. When the data curation work is done a data package can be validated and published, for example, to CKAN.

Please refer to the [Open Data Editor's documentation](https://opendataeditor.okfn.org) to read about all the features.

## frictionless-py

If you prefer a command-line interface, or Python, there is [frictionless-py](https://framework.frictionlessdata.io/), a complete framework for managing data packages. Here are main commands available in CLI:

```bash
frictionless describe # to describe your data
frictionless explore # to explore your data
frictionless extract # to extract your data
frictionless index # to index your data
frictionless list # to list your data
frictionless publish # to publish your data
frictionless query # to query your data
frictionless script # to script your data
frictionless validate # to validate your data
frictionless --help # to get list of the command
frictionless --version # to get the version
```

Please refer to the [frictionless-py's documentation](https://framework.frictionlessdata.io/) to read about all the features.

## frictionless-r

For the R community, there is [frictionless-r](https://docs.ropensci.org/frictionless/) package that allows managing data packages in R language. For example:

```r
library(frictionless)

# Read the datapackage.json file
# This gives you access to all Data Resources of the Data Package without
# reading them, which is convenient and fast.
package <- read_package("https://zenodo.org/records/10053702/files/datapackage.json")

package

# List resources
resources(package)

# Read data from the resource "gps"
# This will return a single data frame, even though the data are split over
# multiple zipped CSV files.
read_resource(package, "gps")
```

Please refer to the [frictionless-r's documentation](https://docs.ropensci.org/frictionless/) to read about all the features.
