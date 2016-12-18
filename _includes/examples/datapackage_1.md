A minimal {{ page.title }} on disk would be a directory containing a single file:

```
datapackage.json
```

Lacking a single piece of actual data would make this {{ page.title }} of doubtful use. A less minimal version would be:

```
datapackage.json
# a data file (CSV in this case)
data.csv
```

Additional files such as a README, scripts (for processing or analyzing the
data) and other material may be provided. By convention scripts go in a scripts
directory and thus, a more elaborate data package could look like this:

```
datapackage.json
README.md
mydata.csv
data/otherdata.csv
scripts/my-preparation-script.py
```

Several exemplar data packages can be found in the [datasets organization on github](https://github.com/datasets), including:

- [World GDP](https://github.com/datasets/gdp)
- [ISO 3166-2 country codes](https://github.com/datasets/country-codes)
