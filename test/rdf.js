const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const {assert} = require('chai')
const jsonld = require('jsonld')

const toRDF = async file => {
  const doc = require(file)
  doc["@context"] = require("../schemas/context/data-package.json")
  const triples = await jsonld.toRDF(doc, {format: 'application/n-quads'})
  return triples.split("\n").sort().filter(Boolean).join("\n")+"\n"
}

describe('rdf', () => {
  it('data-package', async () => {
    const rdf = await toRDF('./files/data-package-1.json')
    const nt = await readFile('test/files/data-package-1.nt', 'utf-8')
    assert.equal(rdf, nt)
  })
})
