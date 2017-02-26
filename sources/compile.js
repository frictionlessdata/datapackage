const Promise = require('bluebird')
, readFile = Promise.promisify(require('fs').readFile)
, writeFile = Promise.promisify(require('fs').writeFile)
, readDir = Promise.promisify(require('fs').readdir)
, glob = Promise.promisify(require('glob'))
, $RefParser = require('json-schema-ref-parser')
, csvParser = Promise.promisify(require('csv-parse'))
, yaml = require('js-yaml')
, excludeOnOutput = [ 'dictionary.json' ]
, dataBagLocation = '../databags/schemas.json'

function compileSchemas() {
  dataBag = {}
  return readFile('dictionary.yml')
    .then(dictionaryBuffer => {
      return writeFile('dictionary.json', JSON.stringify(yaml.safeLoad(dictionaryBuffer), null, 2))
        .then(() => {
          glob('*.json').then(files => {
            return Promise.each(files, file => {
              if (!excludeOnOutput.includes(file)) {
                return readFile(file)
                  .then(refSchema => {
                    return $RefParser.dereference(JSON.parse(refSchema))
                      .then(schema => {
                        [ name, _ ] = file.split('.')
                        dataBag[name] = schema
                        return writeFile(`../assets/schemas/${file}`, JSON.stringify(schema, null, 2))
                          .then(result => { console.log(`${file} written`) })
                          .catch(error => { console.error(error) })
                      })
                      .catch(error => { console.error(error) });
                  })
              }
            }).
              then(() => {
                return writeFile(dataBagLocation, JSON.stringify(dataBag, null, 2))
                  .then(result => { console.log('dataBag written') })
                  .catch(error => { console.error(error) })
              })
          })
        })
    })
}

function compileRegistry() {
  return readFile('registry.csv')
    .then(file => {
      return csvParser(file, { columns: true })
        .then(registry => {
          return writeFile(`../assets/schemas/registry.json`, JSON.stringify(registry, null, 2))
        })
    })
}

compileSchemas().then(compileRegistry)
