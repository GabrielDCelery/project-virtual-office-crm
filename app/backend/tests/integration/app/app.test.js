const axios = require('axios');

describe('app', () => {
  describe('Health check', () => {
    beforeEach(async () => { });

    it('confirms if the service is running', async () => {
      // Given
      const { BACKEND_APP_PORT } = process.env;
      const endpoint = `http://localhost:${BACKEND_APP_PORT}/health`;

      // When
      const result = await axios.get(endpoint);
      const { status, data } = result;

      // Then
      expect(status).toEqual(200);
      expect(data).toEqual('OK');
    });
  });
});