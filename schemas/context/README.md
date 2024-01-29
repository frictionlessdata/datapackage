This directory contains non-normative JSON-LD Context Documents to convert Data Package Formats to RDF. 

By now it only contains a context for Data Package documents.
Properties `resources`, `profile`, and contributor roles are ignored.

Note that the use of POSIX pathes will reduce the ability for RDF conversion. In particular:

- property `id`, if given, MUST be an URI
- property `image` with POSIX path will be ignore
- elements with property `path` having a POSIX path value be ignored

