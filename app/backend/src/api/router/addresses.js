const { Router } = require('express');
const { executeService } = globalRequire('services');
const { apiJsonResultWrapper } = require('../helpers');

const router = Router();

router.get('/countries', async (req, res) => {
    return apiJsonResultWrapper(res, () => executeService('AddressCountries')('findAll')());
});

module.exports = router;