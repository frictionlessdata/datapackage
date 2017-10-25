const util = require('util')
const {assert} = require('chai')
const glob = util.promisify(require('glob'))
const readFile = util.promisify(require('fs').readFile)


// Tests

describe('specs', () => {

  it('[all]', async () => {
    const files = await glob('build/specs/**/contents.lr')
    assert.include(files, 'build/specs/csv-dialect/contents.lr')
    assert.include(files, 'build/specs/data-package/contents.lr')
    assert.include(files, 'build/specs/data-resource/contents.lr')
    assert.include(files, 'build/specs/fiscal-data-package/contents.lr')
    assert.include(files, 'build/specs/table-schema/contents.lr')
    assert.include(files, 'build/specs/tabular-data-package/contents.lr')
    assert.include(files, 'build/specs/tabular-data-resource/contents.lr')
  })

  it('csv-dialect', async () => {
    const contents = await readFile('build/specs/csv-dialect/contents.lr', 'utf-8')
    assert.include(contents, 'CSV Dialect')
  })

  it('data-package', async () => {
    const contents = await readFile('build/specs/data-package/contents.lr', 'utf-8')
    assert.include(contents, 'Data Package')
  })

  it('data-resource', async () => {
    const contents = await readFile('build/specs/data-resource/contents.lr', 'utf-8')
    assert.include(contents, 'Data Resource')
  })

  it('fiscal-data-package', async () => {
    const contents = await readFile('build/specs/fiscal-data-package/contents.lr', 'utf-8')
    assert.include(contents, 'Fiscal Data Package')
  })

  it('table-schema', async () => {
    const contents = await readFile('build/specs/table-schema/contents.lr', 'utf-8')
    assert.include(contents, 'Data Package')
  })

  it('tabular-data-package', async () => {
    const contents = await readFile('build/specs/tabular-data-package/contents.lr', 'utf-8')
    assert.include(contents, 'Tabular Data Package')
  })

  it('tabular-data-resource', async () => {
    const contents = await readFile('build/specs/tabular-data-resource/contents.lr', 'utf-8')
    assert.include(contents, 'Tabular Data Resource')
  })

})
