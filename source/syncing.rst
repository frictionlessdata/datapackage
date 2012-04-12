===================
Changes and Syncing
===================

The current focus of this section is the documentation of existing change and sync protocols rather than the specification of a new protocol.

SLEEP
=====

A strawman specification for transaction log based syncing of tabular data with JSON.

.. toctree::
   :maxdepth: 2

   sleep

CouchDB
=======

.. toctree::
   :maxdepth: 2

   couchdb_replication


MVCC and WAL for databases
==========================

Forthcoming.

Diff-based syncing
==================

The toolchain used for syncing text-based projects
(such as the github repository this website is developed in)
is diffing, patching, and 3-way merges, building up
to distributed revision control.  It is possible to
do the same with tabular data.

.. toctree::
   :maxdepth: 2

   diff


General Overview of Changes / Revisioning for Data
==================================================

.. toctree::
   :maxdepth: 2

   revisioning-data

