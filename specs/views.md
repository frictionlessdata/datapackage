slug: views
---
title: Data Package Views
---
created: 2012
---
updated: 2 May 2017
---
version: 1.0.0-alpha
---
abstract:

A simple format for describing a views on data that leverages existing specifications like Vega and connects them with data provided in data packages or data resources.
---
body:

## Introduction

Producers and consumers of data want to have data presented in tables and graphs -- "views" on the data. They want this for a range of reasons, from simple eyeballing to drawing out key insights,

This specification sets out a way to describe views for data packages using a simple delclarative syntax that can be easily serialized in JSON.

We focus on doing the minimum to connect data package data with existing graph and table specification systems like Vega.

### Desired Features

* Specify views such as graphs and tables as part of a data package
  * => views should be describable in a specification serializable as JSON
* Simple things are simple: adding a bar chart or line chart is fast and easy -- seconds to do and requiring minimal knowledge
* Powerful and extensible: complex and powerful graphing is also powerful
* Reuse: leverage the power of existing specs like [Vega][] (and tools like Vega and Plotly)
* Composable: the views spec should be independent but composable with the other data package specs (and even usable on its own)

[Vega]: http://vega.github.io/

### Concepts and Background

To generate visualizations you need three kinds of information:

- metadata: e.g. title of graph, credits etc
- graph: description / specification of the graph itself
- data: specification of data sources for the graph including information on location and metadata like types

The data spec itself often consists of three distinct parts:

- "raw / graph data": a spec / description of data exactly in the form needed by the visualization system. This is often a very well defined spec e.g. an array of series.
- locate/describe: a spec of where to get data from e.g. `url` or `data` attribute plus some information on that data such as format and types.
- transform: a spec of how transform external data prior to use e.g. pivoting or filtering it

From this description it should be clear that the latter two data specs -- locate/describe and transform -- are actually generic and independent of the specific graphing library. The only thing the graphing library really needs is a clear description of the "raw" format which it directly consumes. Thus, we can consider a natural grouping of specs as:

- general-metadata - e.g. title of graph, credits etc [provided by e.g. Data Package / define yourself!]
- data: sourcing and transform [provided by e.g. Data Resource]
    - sourcing: how to source data from external sources
    - transform: how to transform data e.g. pivot it, select one field, scale a field etc
- graph description / specification [provided by e.g. Vega]
    - graph data (raw): data as directly consumed by graph spec (usually JSON based if we are talking about JS web-based visualization)

However, in many visualization tools -- including specs like Vega -- these items are combined together. This is understandable as these tools seek to off users a "complete solution". However, **decoupling these parts and having clearly defined interfaces would offer significant benefits**:

* Extensibility: it would be easier to extend and adapt the system. For example, adding new data import options could be done without changing the graph system.
* Composability: we can combine different parts together in different ways. For example, data import and transformation could be used for generating data for tabular display as well as graphing.
* Reusability: we want to reuse existing tools and specifications wherever possible. If we keep the specs relatively separate we can reuse the best spec for each job.
* Reliability: when the system is decoupled it is easier to test and check.

In summary, a smaller pieces, loosely joined makes it easier to adapt and evolve the specs and the associated tooling.

## Specification

Data Package Views ("Views") define data views such as graphs or tables based on the data in a Data Package.

Views are defined in the `views` property of the Data Package descriptor.

`views` MUST be an array. Each entry in the array MUST be an object. This object MUST follow the Data Package View specification set out here.

A View MUST have the following form:

```javascript
{
  // generic metadata - very similar to Data Resource or Data Package
  "name": "..."   // unique identifier for view within list of views. (should we call it id ?)
  "title": "My view" // title for this graph
  ...

  // data sources for this spec
  "resources": [ resource1, resource2 ]

  "specType": "" // one of simple | plotly | vega | vega-lite
  // graph spec
  "spec":
}
```

### Data Source Spec

The data source spec is as follows:

```
resources: [ resourceObjOrId, resourceObjOrId ]
```

That is: an array where each entry is either:

* A number - indicating the resource index in the resource array of the parent Data Package
* A string - indicating the name of the resource in the resource array of the parent Data Package
* An Object: being a full Data Resource object

#### "Compiled" Resources

The resources is termed "compiled" if all resources are objects and all data on those resources has been inlined onto an attribute named `_values`. At this point, the view is entirely self-contained -- all resources and their associated data is "inside" the view object and no external data loading is required.

### Graph Spec

#### Simple Graph Spec

The simple graph spec provides a very simple graph descriptor setup that aims for an 80/20 result. It supports only the following graph types:

* Line `line` (single and multiple). Especially time series
* Bar `bar` - Especially time series
* (?) Pie `pie` -- we are considering excluding pie charts as they are not widely used, often poor information design
* (?) Stacked bar

Example data

| x | y | z |
|---|---|---|
| 1 | 8 | 5 |
| 2 | 9 | 7 |

Spec:

```javascript
{
  "type": "line",
  "group": "x",
  "series": [ "y", "z" ]
}
```

#### Vega Spec

*We are using Vega as an input: raw Vega plus a few tweaks to support data input out of line from their spec (e.g. resources)*

This is straight-up [Vega](https://vega.github.io/vega). The only modification that we leave out the actual data and instead only declare the existence of the datasets. The names of the datasets are the same as the names in the resources array.

This example is just copied from https://vega.github.io/editor/#/examples/vega/bar-chart with only the name of the datasets declared (here `table)`. The data can then be dynamically provided when the visualization is instantiated.

```json
{
  "width": 400,
  "height": 200,
  "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},

  "data": {"name": "table"},

  "scales": [
    {
      "name": "x",
      "type": "ordinal",
      "range": "width",
      "domain": {"data": "table", "field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": {"data": "table", "field": "y"},
      "nice": true
    }
  ],
  "axes": [
    {"type": "x", "scale": "x"},
    {"type": "y", "scale": "y"}
  ],
  "marks": [
    {
      "type": "rect",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "x": {"scale": "x", "field": "x"},
          "width": {"scale": "x", "band": true, "offset": -1},
          "y": {"scale": "y", "field": "y"},
          "y2": {"scale": "y", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ]
}
```

To understand how this fits together with the overall spec here's the full view -- note how the data and graph spec are separated:

```json
{
  "title": "My amazing bar chart",
  "resources": [
    {
      "name": "table",
      "data": [
        {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
        {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
        {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
        {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
        {"x": 9,  "y": 52}, {"x": 10, "y": 48},
        {"x": 11, "y": 24}, {"x": 12, "y": 49},
        {"x": 13, "y": 87}, {"x": 14, "y": 66},
        {"x": 15, "y": 17}, {"x": 16, "y": 27},
        {"x": 17, "y": 68}, {"x": 18, "y": 16},
        {"x": 19, "y": 49}, {"x": 20, "y": 15}
      ]
    }
  ],
  "specType": "vega",
  "spec": {
    "width": 400,
    "height": 200,
    "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
    "data": {"name": "table"},
    "scales": [
      {
        "name": "x",
        "type": "ordinal",
        "range": "width",
        "domain": {"data": "table", "field": "x"}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "domain": {"data": "table", "field": "y"},
        "nice": true
      }
    ],
    "axes": [
      {"type": "x", "scale": "x"},
      {"type": "y", "scale": "y"}
    ],
    "marks": [
      {
        "type": "rect",
        "from": {"data": "table"},
        "properties": {
          "enter": {
            "x": {"scale": "x", "field": "x"},
            "width": {"scale": "x", "band": true, "offset": -1},
            "y": {"scale": "y", "field": "y"},
            "y2": {"scale": "y", "value": 0}
          },
          "update": {
            "fill": {"value": "steelblue"}
          },
          "hover": {
            "fill": {"value": "red"}
          }
        }
      }
    ]
  }
}
```

#### Vega-Lite spec

The approach for [Vega-Lite](https://vega.github.io/vega-lite) is similar to the approach for Vega. Instead of specifying the data in the Vega-Lite spec itself, only use [named datasets](https://vega.github.io/vega-lite/docs/data.html#named).

```json
{
  "title": "My amazing bar chart",
  "resources": [
    {
      "name": "table",
      "data": [
        {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
        {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
        {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
        {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
        {"x": 9,  "y": 52}, {"x": 10, "y": 48},
        {"x": 11, "y": 24}, {"x": 12, "y": 49},
        {"x": 13, "y": 87}, {"x": 14, "y": 66},
        {"x": 15, "y": 17}, {"x": 16, "y": 27},
        {"x": 17, "y": 68}, {"x": 18, "y": 16},
        {"x": 19, "y": 49}, {"x": 20, "y": 15}
      ]
    }
  ],
  "specType": "vega-lite",
  "spec": {
    "data": {"name": "table"},
    "mark": "bar",
    "encoding": {
      "x": {"field": "a", "type": "ordinal"},
      "y": {"field": "b", "type": "quantitative"}
    }
  }
}
```

#### Plotly spec

Identical to Vega approach but without any data specified in the visualization specification. 

### Table Spec

```
{
  "name": "table-1",
  "resources": ["resource-1"]
  "specType": "table"
}
```

### Data Transforms

*In progess.*
