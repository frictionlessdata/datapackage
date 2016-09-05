---
layout: default
category: example
title: Hierarchies and Labels
order: 01
slug: labels-and-hierarchies
---

An example of a Fiscal Data Package that supports a classification hierarchy and labels. 

{% include example-data.html %}

# Discussion

This example provides an opportunity to discuss the handling of hierarchical classifications in Fiscal Data Package.

## Source Data - "Physical Model"

Let's start by considering the various options for the structure of the source data - the original source CSV files.

### Case 1 - Denormalized - No Unique ID for Classification

*Where there is no unique identifier for the classification (e.g. we do not have A.01 as an entry in a column).  This means in generating a normalized table structure you will need to generate identifiers and foreign key.*

| amount | level1 | level1_title | level2 | level2_title |
|---|---|---|---|---|
| 10 | A | Military | 01 | Planes |

### Case 2 - Denormalized, Unique ID for Classification

| amount | code | class_level1 | level1_title | level2 | level2_title |
|---|---|---|---|---|---|
| 10 | A.01 | A | Military | 01 | Planes |

### Case 3 - Normalized

| amount | class_code |
|---|---|
| 10 | A.01 |

| code | level1 | level1_title | level2 | level2_title |
|---|---|---|---|---|
| A.01 | A | Military | 01 | Planes |

## Logical Model 

Now let's look at the logical model. All of the the above should produce a logical model as follows:

**Fact Table**

| amount | class_code |
|---|---|
| 10 | A.01 |

class_code = code on classification table

**Classification Table**

For the classification table there are two options.

A "normalized" approach:

| ID | Label | Parent | 
|---|---|---|---|
| A | Military | 01 |
| A.01 | Planes (Military) | A |

Or a partially de-normalized approach:

| code | level1 | level1_title | level2 | level2_title |
|---|---|---|---|---|
| A.01 | A | Military | 01 | Planes |

Denormalization is common because source data looks like this *and* it makes group by easier when we join this table back with the fact table.

## The Mapping

With this target logical model in mind, what is needed from the mapping in Fiscal Data Package.

* Describe where fields in the logical model come from in physical model
  * Ans: do this in standard way via `source`
* Hierarchical structure
  * Normalized logical model classification table: have a parent column
  * Denormalized logical model classification table: use `parent` keyword in logical model description to indicate which attribute is the parent of another attribute. Where there are multiple attributes at a given level e.g. the code and the label do this only using the code attribute.
* Generate foreign keys within logical model
  * Straightforward except where no primary key (code) for classification in physical model. In this case you will need to generate a primary key. TODO: explain how to describe this in the logical model.

