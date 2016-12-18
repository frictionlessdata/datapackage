A minimal {{ page.title }} looks as follows.

```
# with data and a schema accessible via the local filesystem
{
  "name": "resource-name",
  "path": "resource-path.csv",
  "schema": "tableschema.json"
}

# with data accessible via http
{
  "name": "resource-name",
  "path": "http://example.com/resource-path.csv",
  "schema": "http://example.com/tableschema.json"
}
```
