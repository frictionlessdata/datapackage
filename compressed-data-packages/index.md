---
layout: spec
title: Compressed Data Packages
version: 0.0.1
updated: 26 May 2015
created: 26 May 2015
author:
 - Stefano Sabatini
summary: Data packages can be distributed and handled as a single compressed file
---

<div class="alert" markdown="block">
NOTE: This is a draft specification and still under development. If you have comments
or suggestions please file them in the [issue tracker][issues]. If you have
explicit changes please fork the [git repo][repo] and submit a pull request.
</div>

[issues]: https://github.com/dataprotocols/dataprotocols/issues
[repo]: https://github.com/dataprotocols/dataprotocols

### Changelog

- `0.0.1`: first draft

### Table of Contents 
{:.no_toc}

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

# Specification

A data package, as defined in the [Data Packages][dp] specification, provides a collection of files and their metadata in a structured format to ease the standardisation and the sharing of datasets.

A data package can be released as a single file via `tar` command line utility with the optional but encouraged `gzip` compression.

The resulting file should be given the extension `.dp` if it's a tarred package or `.dpz` if is a tarred and gzipped package.

## Compressing a data package

A data package must have the datapackage.json file in the root and the archive must reflect that.

Example: Inside the `un-locode` folder containing the namesake package the command `tar -czvf locode.dpz *` creates a compressed data package named `locode.dpz`.

[dp]: /data-packages/
