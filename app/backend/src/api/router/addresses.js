const {
	Router
} = require('express');
const {
	apiJsonResultWrapper
} = require('../helpers');
const orchestrator = globalRequire('orchestrator');
const router = Router();

router.get('/', async (req, res) => {
	return apiJsonResultWrapper(res, () => orchestrator.execute('addresses', 'findAll', {
		bFlatten: true
	}));
});

module.exports = router;