## Descriptor

A valid {{ page.title }} descriptor is an `object` adhering to the specifications described in this document, with the formal reference being [the properties section](#properties) which enumerates the specifications for each property of the descriptor.

Adherence to the specification **does not** imply that additional, non-specified properties cannot be used: a descriptor `MAY` include any number of properties in additional to those described as *required* and *optional* fields.

### Form

The descriptor `MUST` be valid JSON, as described in [RFC 4627](http://www.ietf.org/rfc/rfc4627.txt), and `SHOULD` be in one of the following forms:

1. A file named `{{ page.descriptor.file }}`.
2. An `object`, either on its own or nested in another data structure.

### Media type

The media type for {{ page.title }} descriptors as `MUST` be `{{ page.mediatype }}`. This media type is [registered with IANA](https://www.iana.org/assignments/media-types/{{ page.mediatype }}).

### References via URIs

Properties that have a value that is a URI can be any of:

1. A [URL](https://en.wikipedia.org/wiki/Uniform_Resource_Locator).
2. A [POSIX path](https://en.wikipedia.org/wiki/Path_%28computing%29#POSIX_pathname_definition) without a resource definition.
3. A [JSON Pointer](https://tools.ietf.org/html/rfc6901).

**For security**, all POSIX paths `MUST` be relative siblings or children of the descriptor. Absolute paths (`/`) and relative parent paths (`../`) `MUST NOT` be used, and implementations `SHOULD NOT` support these path types.
