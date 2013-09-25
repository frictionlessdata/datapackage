---
title: JSON Table Schema Transmission
layout: default
---

Concepts
========

Given a classic spreadsheet table:

      field     field
        |         |
        |         |
        V         V
      
       A     |    B    |    C    |    D      <--- Row
       ------------------------------------
       valA1 |   valB1 |  valC1  |   valD1   <--- Row
       valA2 |   valB2 |  valC2  |   valD2   <--- Row
       ...

In JSON:

    [
      { "A": valA1, "B": valB1, "C": valC1, "D": valD1 },
      { "A": valA2, "B": valB2, "C": valC2, "D": valD2 },
      ...
    ]

Data Transmission
=================

Given the JSON Table Schema, data can be more efficiently transmitted by
indexing the fields in each row by their abbreviated ID. For instance,
given a JSON Table Schema along the lines of:

    {
      "fields": [      
        {
          "id": "A",
          "label": "First Name",
          "type": "string"        
        },
        {
          "id": "B",
          "label": "Last Name",
          "type": "string"        
        },
        {
          "id": "C",
          "label": "Age",
          "type": "integer"        
        },
        {
          "id": "D",
          "label": "Eye Color",
          "type": "string"        
        }
      ]
    }

a message which was originally in the form of:

    [{"fname": "John", "lname": "Smith", "age": 34, "eyeColor": "brown"},
     {"fname": "Cyndi", "lname": "Roe", "age": 41, "eyeColor": "blue"}]

could be abbreviated in the following way:

    [{"A": "John", "B":"Smith", "C": 34, "D": "brown"},
     {"A": "Cyndi", "B":"Roe", "C": 41, "D": "blue"}]

Disregarding the one-time overhead of transmitting the JSON Table
Schema, this represents a reduction of 17 characters per line -- over
25% -- for this message. For small tables, the size of the Table Schema
may outweigh the benefit obtained from using shortened IDs. The content
of larger messages, however, will likely be dominated by the data
contained in each row; thus a 25% reduction in each row of data would
yield an overall reduction of almost as much. Of course, the schema
needn't be re-sent with every transmission of data.

Alternatively, if the order of the fields is guaranteed to be uniform
for all rows and in accordance with the order given in the schema, then
the field identifiers can be omitted and inferred by the order of the
columns. The data can then be sent as a mixed-type array, reducing the
example message even further to:

    [["John", "Smith", 34, "brown"],
     ["Cyndi", "Roe", 41, "blue"]]

The message is now approximately 50% of its original size.
