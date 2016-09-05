---
layout: default
category: example
title: Transform Needed
order: 04
slug: transform-needed
---

While this specification goes to great lengths to avoid specifying the
physical model of your spending data, there are limits to the kind of
CSV structures we can usefully describe.  For instance, some datasets
split program spending across multiple columns.

    country,program1,program2,program3,year
    Poland,1000,500,2000,2014
    Italy,2500,100,1500,2014

In this specification, we expect program spending to be described as a
range of values on a particular dimension (e.g. "program").  See below
for a transformed version of the above and its associated descriptor.

{% include example-data.html %}
