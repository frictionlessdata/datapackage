---
title: SLEEP
layout: default
---

A proposed simple specification for syncing tabular data over HTTP via
JSON transaction logs.

(Originally drafted explicitly by Christopher Groskopf of the Panda
Project and Francis Irving of ScraperWiki on 21st December 2011. Concept
by Max Ogden. Named by Isaac Z. Schlueter)

Motivation document by Max Ogden: <https://gist.github.com/1246804>

HTTP endpoint
=============

Can be any URL, and is a GET request.

There are some extra URL parameters that a client can include:

-   since - seq id to start at, returns everything after that, defaults
    to the start
-   limit - maximum number of changes to return, defaults to unlimited
    XXX can a server optionally limit this to a maximum?
-   include\_data - if present and false, the wire protocol's data field
    isn't included

Wire protocol
=============

JSON representing part of the transaction log of changes to the tabular
data.:

    { 
        seq: 10, 
        id: "07acde3002cb1f62a08de5469160b912", 
        deleted: false, 
        data: { first_name: "Ryan", last_name: "Pitts", employer: "The Spokesman-Review" } 
    }

-   seq - the sequence in the transaction log
-   id - unique identifier of the row
-   deleted - if present and true, means the row is being deleted by the
    transaction
-   data - new data for the row, should not be present if deleted is
    true (also see include\_data in the HTTP endpoint section)

Data format
===========

**Keys** in the data dictionary can be any string, with any UTF-8
character, or whitespace in them. To meet JSON specificaiton, they must
be quoted if not simple like a variable name.

Note that as it is JSON, the keys can be in any order and change order.

**Values** in the data dictionary must be one of these types:

-   Strings, in quotes
-   Numbers, integers or floats
-   Dates, a string containing an ISO 8601 date or date/time. Only in
    UTC no timezones.

Optional - by convention name variables storing WGS 84
latitude/longitude so they end \_lat and \_lng. e.g. :: data: { city:
"Liverpool", centre\_lat: 53.4, centre\_lng: -3 }

Errors
======

Return error messages in a JSON dictionary with the key error, value an
arbitary string.:

    {
        error: "Datastore timed out"
    }

Todo
====

Should we just use <http://syncable.org/> ?

Make it use the right MUST type words from RFCs to be clear what is
compulsory.
