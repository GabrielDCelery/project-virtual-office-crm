const { Router } = require('express');
const { executeService } = globalRequire('services');
const { apiJsonResultWrapper } = require('../helpers');

const router = Router();

router.post('/register', async (req, res) => {
    return apiJsonResultWrapper(res, () => executeService('Users')('register')(req.body));
});

router.post('/authenticate', async (req, res) => {
    return apiJsonResultWrapper(res, () => executeService('Users')('authenticate')(req.body));
});

module.exports = router;