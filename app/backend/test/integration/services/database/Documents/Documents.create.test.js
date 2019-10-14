const { expect } = require('chai');
//const verror = require('verror');
const sinon = require('sinon');
const services = require('../../../../../src/services');

describe('services.get("database").execute("documents", "create")', () => {
  let clock = null;

  beforeEach(async () => {
    await services
      .get('database')
      .getKnex()
      .seed.run();
    clock = sinon.useFakeTimers(new Date('2019-08-27T11:11:11.000Z').getTime());
  });

  afterEach(async () => {
    clock.restore();
  });

  it('creates a new document', async () => {
    // Given
    const controller = 'documents';
    const method = 'create';
    const args = {
      name: 'somedocumentname',
      type: 'identity card',
      file: Buffer.from('wefersger', 'binary'),
      mimetype: 'application/pdf',
      extension: 'pdf'
    };

    // When
    const result = await services
      .get('database')
      .execute(controller, method, args);

    // Then
    expect(result).to.deep.equal({
      success: true,
      service: 'database',
      errors: [],
      payload: {
        id: 3
      }
    });
  });
});
