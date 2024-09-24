# Data Package

Data Package is a standard consisting of a set of simple yet extensible specifications to describe datasets, data files and tabular data. It is a data definition language (DDL) and data API that facilitates findability, accessibility, interoperability, and reusability (FAIR) of data. For more information, please visit the [documentation portal](https://datapackage.org).

## Contributing

One can contribute to the documentation by clicking on the "Edit Page" button on a site page and create a pull request directly on Github.

The project uses two main branches: `main` and `next`:

- The `main` branch is the default branch and is the one that is deployed to the live site. PRs that make quick corrections (e.g. fixing a typo or updating a website style) should be merged with this branch.
- The `next` branch is the main development branch that accumulates changes for the next release. PRs that affect the standard (e.g. changing standard texts or profiles) should be merged with this branch.

## Releasing

When then `next` branch is ready for release:

- A maintainer should create a PR from the `next` branch to the `main` branch and request a review from another maintainer.
- A reviewer should check the PR for version, profiles and changelog correctness, and approve the PR.
- A maintainer should merge the PR.

When the PR is merged, Github Actions will automatically:

> **NOTE:** The actual implementation is under development (https://github.com/frictionlessdata/datapackage/issues/976)

- Create a new release on Github.
- Deploy the new version of the site.
- Sync the `next` branch with the `main` branch.
- Update the `next` branch with the new version number and generated files.

## Development

Running the project locally:

```bash
npm install
npm start
```

Building profiles:

```bash
npm run profiles
```

Building the site:

```bash
npm run build
```

## Funding

This project is funded through [NGI0 Entrust](https://nlnet.nl/entrust), a fund established by [NLnet](https://nlnet.nl) with financial support from the European Commission's [Next Generation Internet](https://ngi.eu) program. Learn more at the [NLnet project page](https://nlnet.nl/project/FrictionlessStandards/).

[<img src="https://nlnet.nl/logo/banner.png" alt="NLnet foundation logo" width="20%" />](https://nlnet.nl)
[<img src="https://nlnet.nl/image/logos/NGI0_tag.svg" alt="NGI Zero Logo" width="20%" />](https://nlnet.nl/entrust)
