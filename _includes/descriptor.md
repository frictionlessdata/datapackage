## Descriptor

A valid {{ page.title }} descriptor is an `object` adhering to the specifications of this document.

The descriptor `MUST` be in one of the following forms:

1. A file named `{{ page.descriptor.file }}`.
2. An `object` nested in another data structure.

Where a {{ page.title }} descriptor is a file with references to additional co-located resources on a file system, the `{{ page.descriptor.file }}` descriptor `MUST` be at the top-level directory, with those resources in a relative location to the descriptor file.

All Frictionless Data descriptors `MUST` be valid JSON (JSON is defined in [RFC 4627](http://www.ietf.org/rfc/rfc4627.txt)).

The JSON Pointer specification as described in [RFC 6901](https://tools.ietf.org/html/rfc6901) is fully supported for all Frictionless Data descriptors. This means that any property that can be a URI can be a JSON Pointer to a specific property in the same descriptor, or any other JSON object that can be referenced.

The media type for {{ page.title }} descriptors as `MUST` be `{{ page.mediatype }}`.

All Frictionless Data descriptors `MAY` include any number of properties in addition to those defined as *required*, *recommended*, and *optional* fields.
