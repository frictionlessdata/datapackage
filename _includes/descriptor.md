## Descriptor

A valid {{ page.title }} descriptor is an `object` adhering to the specifications of this document.

The descriptor `MUST` be in one of the following forms:

1. A file named `{{ page.descriptor.file }}`.
2. An `object` nested in another data structure.

Where a {{ page.title }} descriptor is a file with references to additional co-located resources on a file system, the `{{ page.descriptor.file }}` descriptor `MUST` be at the top-level directory, with those resources in a relative location to the descriptor file.

All Frictionless Data descriptors `MUST` be serialised as JSON.

The media type for {{ page.title }} descriptors as files `MUST` be `{{ page.mediatype }}`.
