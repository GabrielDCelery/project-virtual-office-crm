const { Router } = require('express');
const services = globalRequire('services');
const { apiJsonResultWrapper } = require('../helpers');

const router = Router();

router.get('/', async (req, res) => {
    return apiJsonResultWrapper(res, () => services.executeService('Addresses', 'findAll', { 
        data: {}, config: { bFlatten: true } 
    }));
});

router.get('/countries', async (req, res) => {
    return apiJsonResultWrapper(res, () => services.executeService('AddressCountries', 'findAll', { data: {}, config: {} }));
});

module.exports = router;