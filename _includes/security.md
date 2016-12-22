## Security

### Properties that accept URIs

`/` (absolute path) and `../` (relative parent path) are **forbidden** in all proprties that support URIs in the Frictionless Data specifications. This limitation is imposed to avoid security vulnerabilities when implementing data package tools by ensuring that resource paths only point to files within the data package directory and its subdirectories. This prevents data package tools being exploited by a malicious user to gain unintended access to sensitive information.

For example, suppose a data package hosting service stores packages on disk and allows access via an API. A malicious user uploads a data package with a resource path like /etc/passwd. The user then requests the data for that resource and the server naively opens /etc/passwd and returns that data to the caller.
