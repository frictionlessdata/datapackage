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

function compileDictionary() {
  let dictionary = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    definitions: {}
  }
  return glob('dictionary/*.yml').then(files => {
    return Promise.each(files, file => {
      return readFile(file).then(contents => {
        return Object.assign(dictionary.definitions, yaml.safeLoad(contents))
      })
    })
  })
    .then((ret) => {
      return writeFile('dictionary.json', JSON.stringify(dictionary), null, 2)
  })
}

function compileSchemas() {
  let dataBag = {}
  return glob('*.json').then(files => {
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

compileDictionary()
  .then(compileSchemas)
  .then(compileRegistry)
