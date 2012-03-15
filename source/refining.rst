===================
Refining Protocol
===================

This document is about providing a standardized way of (fuzzily) matching a
column in one dataset to a column in another dataset. 

This is called "refining" or "reconciling".


Refine API
===========

There is one obvious candidate standard, the reconciliation API used by Google Refine.

http://code.google.com/p/google-refine/wiki/ReconciliationServiceApi

Refine essentially assigns a `score` integer value to each reconciliation match. The boolean key `match` can also be added to signify responses that have a high level of confidence.

To implement a reconciliation API you basically need a full text index (most already return weighted match values that can be returned as the `score` in a reconciliation API)