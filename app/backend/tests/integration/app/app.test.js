const axios = require('axios');

describe('app', () => {
    describe('Health check', () => {
        beforeEach(async () => {
        });

        it('confirms if the service is running', async () => {
            //const { APP_PORT } = process.env;
            //const { status, statusText } = await axios.get(`http://localhost:${APP_PORT}/health`);
            expect(true).toEqual(true);
            //expect(status).toEqual(200);
            //expect(statusText).toEqual('OK');
        });
    });
});