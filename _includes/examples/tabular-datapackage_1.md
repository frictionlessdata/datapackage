Here's an example of a minimal simple data format dataset:

    2 files

    data.csv
    datapackage.json


    data.csv
    --------

    var1,var2,var3
    A,1,2
    B,3,4

    datapackage.json
    ----------------

    {
      "name": "my-dataset",
      # here we list the data files in this dataset
      "resources": [
        {
          "path": "data.csv",
          "schema": {
            "fields": [
              {
                "name": "var1",
                "type": "string"
              },
              {
                "name": "var2",
                "type": "integer"
              },
              {
                "name": "var3",
                "type": "number"
              }
            ]
          }
        }
      ]
    }







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
