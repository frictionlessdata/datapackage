---
title: Revisioning (Versioning) for Data - Theory
layout: default
author: Rufus Pollock (Open Knowledge Foundation)
---

The following develops a changeset approach for revisioning databases
(data/datasets). The approach taken has some similariteis to that found
in source control for software, especially mercurial and git.

It is agnostic about format of versioning (i.e. copy-on-Write versus
diffs). For more on this, see Appendix below on Recording Changes to the
Database.

The Changeset Model
===================

Key Concepts
------------

-   Changeset - a change to the database

    -   includes metadata about this change
    -   lists set of changes to database (e.g. changes to individual
        documents/rows) in the form of ChangeObjects

-   ChangeObject - a description of a change to an individual database
    object (e.g. row in relational DB or document in a document DB)

In addition we have:

-   Working Copy - the representation of the current state of the system
    resulting the application of specified set of changesets

Optional (?) additional items:

-   Tags
-   Branches

Remarks: Changesets form a directed acyclic graph.

### Changeset

At its simplest changeset is just an id plus timestamp (for ordering
--timestamp can be dropped if ids are orderable):

-   id: uuid
-   timestamp

In addition systems can include fields such as:

-   author - name of user creating change
-   message - summary message describing change
-   metadata - arbitrary key/value metadata
-   manifest - dict of ChangeObjects keyed by object\_id
-   [optional] parents = ordered list of ids

### ChangeObject

-   object\_id - a tuple forming a unique identifier for this object
    *within* the database
-   operation\_type: delete | update | create | (move? copy?)
-   representation: serialization of this change either as full dump of
    object (copy-on-write) or diff

Doing Things
------------

### Applying changes to a working copy

Trivial.

### Reconstructing the repository at a given changeset/revision

Specifically we require to reconstruct a given object at that changeset.
The process:

1.  Get object ID
2.  If using CoW (copy-on-write): find first changeset \<=
    {given-changeset} in which there is a ChangeObject entry containing
    the object ID and return this. END.
3.  If using diff: find all ChangeObjects with changesets \<=
    {given-changeset} and concatenate. Return resulting object.

### Get all changes to a given object

Search ChangeObjects by object\_id, and order by the order on Changesets
(if there is one).

### Merging

### Pending Changes

This is a common use case where you want to record changes but only make
them visible when approved in some way. It can also be useful if you are
worried about spam revisions.

Questions
---------

### Practical

-   How do we cherry-pick? I.e. select certain changesets and not others
    (they depend
-   How do we transplant? Ie. copy a set of changesets from one line of
    development to another?

Technical

-   How do we compute changeset ids (and changeobject ids)?
-   Does the ordering of ChangeObjects in a ChangesetManifest matter?
    Current answer: No.

### What's Different from Git?

We don't store a current state of the database on each commit (rather we
store changes to the database and copies or diffs of domain objects).

Appendix: Recording Changes to the Database
===========================================

There are several ways to record a specific change to a database /
dataset:

-   Copy on write - so one has a 'full' copy of the model/DB at each
    version.
-   Diffs: store diffs between versions (plus, usually, a full version
    of the model at a given point in time e.g. store HEAD)

Copy on write
-------------

In its simplest form copy-on-write (CoW) would copy entire DB on each
change. However, this is cleary very inefficient and hence one usually
restricts the copy-on-write to relevant changed "objects". The advantage
of doing this is that it limits the the changes we have to store (in
essence objects unchanged between revision X and revision Y get "merged"
into a single object).

For example, if our database had Person, Address, Job, a change to
Person X would only require a copy of Person X record (an even more
standard example is wiki pages). Obviously, for this to work, one needs
to able to partition the data (database). With a normal database this is
trivial: pick the object types e.g. Person, Address, Job etc. However,
for a graph setup (as with RDF) this is not so trivial.

Why? In essence, for copy on write to work we need:

    a)  a way to reference entities/records
    b)  support for putting objects in a deleted state

The (RDF) graph model has poor way for referencing triples (we could use
named graphs, quads or reification but none are great). We could move to
the object level and only work with groups of triples (e.g. those
corresponding to a "Person"). You'd also need to add a state triple to
every base entity (be that a triple or named graph) and add that to
every query statement. This seems painful.

Diffs
-----

The diff models involves computing diffs (forward or backward) for each
change. A given version of the model is then computed by composing
diffs.

Usually for performance reasons full representations of the model/DB at
a given version are cached -- most commonly HEAD is kept available. It
is also possible to cache more frequently and, like copy-on-write, to
cache selectively (i.e. only cache items which have change since the
last cache period).

The disadvantage of the diff model is the need (and cost) of creating
and composing diffs (CoW is, generally, easier to implement and use).
However, it is more efficient in storage terms and works better with
general data (one can always compute diffs), especially that which
doesn't have such a clear domain model -- e.g. the RDF case discussed
above.

Usage
-----

-   Wikis: Many wikis implement a full copy-on-write model with a full
    copy of each page being made on each write.
-   Source control: diff model (usually with HEAD cached and backwards
    diffs)
-   vdm: copy-on-write using SQL tables as core 'domain objects'
-   ordf (<http://packages.python.org/ordf>): (RDF) diffs (with HEAD
    caching)

Todo
----

Discuss application of tree algorithms to structured data (such as XML).

Existing Systems
----------------

### Mercurial

Overview of the Mercurial model:

-   <http://mercurial.selenic.com/wiki/UnderstandingMercurial>
-   <http://hgbook.red-bean.com/read/behind-the-scenes.html>
-   (Longer)
    <http://mercurial.selenic.com/wiki/Mercurial?action=AttachFile&do=get&target=Hague2009.pdf>
-   Octopus merges:
    <http://arrenbrecht.ch/mercurial/pbranch/octopus.htm>

Key concepts:

-   changeset / changelog (our changeset)
-   manifest
-   file

Details of [Mercurial hash
generation](http://mercurial.selenic.com/wiki/FAQ#FAQ.2BAC8-TechnicalDetails.How_do_Mercurial_hashes_get_calculated.3F):

\> Mercurial hashes both the contents of an object and the hash of its
parents \> to create an identifier that uniquely identifies an object's
contents and \> history. This greatly simplifies merging of histories
because it avoid graph \> cycles that can occur when a object is
reverted to an earlier state.

\> All file revisions have an associated hash value (the nodeid). These
are \> listed in the manifest of a given project revision, and the
manifest hash is \> listed in the changeset. The changeset hash (the
changeset ID) is again a \> hash of the changeset contents and its
parents, so it uniquely identifies the \> entire history of the project
to that point.

### Git

-   Glossary:
    <http://www.kernel.org/pub/software/scm/git/docs/gitglossary.html>
-   Technical Docs:
    <http://repo.or.cz/w/git.git?a=tree;f=Documentation/technical;hb=HEAD>
-   <http://eagain.net/articles/git-for-computer-scientists/>

Key features:

-   blob (bistreams)
-   tree
-   commit (changeset)
    -   has metadata (e.g. parents)
    -   points to a tree

Extras:

-   references (pointers into commit tree)
-   tags

Git hash computation:

    sha1("blob " + filesize + "\0" + data)
