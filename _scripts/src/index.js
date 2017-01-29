const Promise = require('bluebird')
, readFile = Promise.promisify(require('fs').readFile)
, writeFile = Promise.promisify(require('fs').writeFile)
, readDir = Promise.promisify(require('fs').readdir)
, glob = Promise.promisify(require('glob'))
, $RefParser = require('json-schema-ref-parser')


glob('*.json')
  .then(files => {
    files.forEach(file => {
      readFile(file)
        .then(refSchema => {
          $RefParser.dereference(JSON.parse(refSchema))
            .then(schema => {
              writeFile('../../_data/schemas/' + file, JSON.stringify(schema))
                .then(result => { console.log('file written') })
                .catch(error => { console.error(error) })
            })
            .catch(error => { console.error(error) });
        })
    })
  })
