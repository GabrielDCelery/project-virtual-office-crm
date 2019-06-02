const axios = require('axios');

describe('app', () => {
    describe('Health check', () => {
        beforeEach(async () => {
        });

        it('checks if the server is running', async () => {
            const { APP_PORT } = process.env;
            const { status, statusText } = await axios.get(`http://localhost:${APP_PORT}/health`);

            expect(status).toEqual(200);
            expect(statusText).toEqual('OK');
        });
    });
});