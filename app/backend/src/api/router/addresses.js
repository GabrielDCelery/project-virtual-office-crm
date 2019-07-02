const { Router } = require('express');
const services = globalRequire('services');
const { apiJsonResultWrapper } = require('../helpers');

const router = Router();

router.get('/countries', async (req, res) => {
    return apiJsonResultWrapper(res, () => services.executeService('AddressCountries', 'findAll', { data: {}, config: {} }));
});

module.exports = router;