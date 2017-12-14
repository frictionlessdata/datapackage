title: Design Philosophy
---
body:

Our specifications follow our design philosophy:

* **Simplicity**: seek zen-like simplicity in which there is nothing to add and nothing to take away.
* **Extensibility**: design for extensibility and customisation. This makes hard things possible and allows for future evolution -- nothing we build will be perfect.
* **Human-editable and machine-usable**: specs should preserve human readability and editability whilst making machine-use easy.
* **Reuse**: reuse and build on existing standards and formats wherever possible.
* **Cross technology**: support a broad range of languages, technologies and infrastructures -- avoid being tied to any one specific system.

This philosophy is itself based on the overall design principles of the Frictionless Data project:

1. **Focused**: We have a sharp focus on one part of the data chain, one specific feature – packaging – and a few specific types of data (e.g. tabular).
2. **Web Oriented**: We build for the web using formats that are web "native" such as JSON, work naturally with HTTP such as plain text CSVs (which stream).
3. **Distributed**: we design for a distributed ecosystem with no centralized, single point of failure or dependence.
4. **Open**: Anyone should be able to freely and openly use and reuse what we build. Our community is open to everyone.
5. **Existing Software**: Integrate as easily as possible with existing software both by building integrations and designing for direct use – for example we like CSV because everyone has a tool that can access CSV.
6. **Simple, Lightweight**: Add the minimum, do the least required, keep it simple. For example, use the most basic formats, require only the most essential metadata, data should have nothing extraneous.


## Participate and Contribute

This effort is community-run and contributions, comments and corrections are warmly welcomed. Most work proceeds in an RFC-style manner with discussion on the [forum][forum] and the [chat][chat].

Material is kept in a [git repo on GitHub][repo] - fork and submit a pull request to add material. There is also an [issue tracker][issues] which can be used for specific issues or suggestions.

[forum]: https://discuss.okfn.org/c/frictionless-data
[repo]: https://github.com/frictionlessdata/specs
[issues]: https://github.com/frictionlessdata/specs/issues
[chat]: https://gitter.im/frictionlessdata/chat
[site]: http://frictionlessdata.io
