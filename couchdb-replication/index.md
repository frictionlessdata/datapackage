---
title: CouchDB Replication Protocol
layout: spec
listed: true
author: Benoit Chesneau
summary: The **CouchDB Replication protocol** is a protocol for synchronizing
  documents between 2 peers over HTTP/1.1.
ietf-keywords: true
redirect_to: http://specs.okfnlabs.org/couchdb-replication/
---


Goals
=====

The CouchDB Replication protocol is a synchronization protocol for
synchronizing documents between 2 peers over HTTP/1.1.

In theory the CouchDB protocol can be used between products that
implement it. However the reference implentation, written in
[Erlang](http://erlang.org), is provided by the
[couchrreplicator](https://github.com/apache/couchdb/tree/master/src/couch_replicator)
module available in Apache CouchDB.

The [CouchDB](http://couchdb.apache.org) replication protocol is using
the [CouchDB REST API](http://wiki.apache.org/couchdb/Reference) and so
is based on HTTP and the Apache CouchDB MVC Data model. The primary goal
of this specification is to describe the CouchDB replication alogorithm.

Definitions
===========

ID:
:   An identifier (could be an UUID) as described in 4122

Sequence:
:   An ID provided by the changes feed. It can be numeric but not
    necessarily.

Revision:
:   (to define)

Document
:   A document is JSON entity with a unique ID and revision.

Database
:   A collection of documents with a unique URI

URI
:   An uri is defined by the 2396 . It can be an URL as defined in 1738.

Source
:   Database from where the Documents are replicated

Target
:   Database where the Document are replicated

Checkpoint
:   Last source sequence ID

Algorithm
=========

1.  Assign an unique identifier to the source Database. Most of the time
    it will be the URI.

2.  Save this identifier in a special Document named
    \_local/\<uniqueid\> on the Target database. This document isn't
    replicated. It will collect the last Source sequence ID, the
    Checkpoint, from the previous replication process.

3.  Get the Source changes feed by passing it the Checkpoint using the
    since parameter by calling the /\<source\>/\_changes URL. The
    changes feed only return a list of current revisions.

> **note**
>
> This step can be done continuously using the feed=longpoll or
> feed=continuous parameters. Then the feed will continuously get the
> changes.

4.  Collect a group of Document/Revisions ID pairs from the **changes
    feed** and send them to the target databases on the
    /\<target\>/\_revs\_diffs URL. The result will contain the list of
    revisions **NOT** in the Target database.

5.  GET each revisions from the source Database by calling the URL
    /\<source\>/\<docid\>?revs=true&rev=\<revision\> . This will get the
    document with the parent revisions. Also don't forget to get
    attachements that aren't already stored at the target. As an
    optimisation you can use the HTTP multipart api to get all.

6.  Collect a group of revisions fetched at previous step and store them
    on the target database using the [Bulk
    Docs](http://wiki.apache.org/couchdb/HTTP_Document_API#Bulk_Docs)
    API with the new\_edit: false JSON property to preserve their
    revisions ID.

7.  After the group of revision is stored on the Target Database, save
    the new Checkpoint on the Source database.

> **note**
>
> -   Even if some revisions have been ignored the sequence should be
>     take in consideration for the Checkpoint.
>
> -   To compare non numeric sequence ordering, you will have to keep an
>     ordered list of the sequences IDS as they appear in the \_changes
>     feed and compare their indices.
>

Filter replication
==================

The replication can be filtered by passing the filter parameter to the
changes feeds with a function name. This will call a function on each
changes. If this function return True, the document will be added to the
feed.

Optimisations
=============

-   The system should run each steps in parallel to reduce the latency.

-   The number of revisions passed to the step 3 and 6 should be large
    enough to reduce the bandwidth and make sure to reduce the latency.

Reference
=========

-   [TouchDB Ios
    wiki](https://github.com/couchbaselabs/TouchDB-iOS/wiki/Replication-Algorithm)
-   [CouchDB documentation](http://wiki.apache.org/couchdb/Replication)
-   CouchDB [change
    notifications](http://guide.couchdb.org/draft/notifications.html)
