const {
	Router
} = require("express");
const {
	executeService
} = globalRequire("services");
const {
	apiJsonResultWrapper
} = require("../helpers");

const router = Router();

router.post("/register", async (req, res) => {
	return apiJsonResultWrapper(res, () => executeService("Users", "register", {
		data: req.body,
		config: {}
	}));
});

router.post("/authenticate", async (req, res) => {
	return apiJsonResultWrapper(res, () => executeService("Users", "authenticate", {
		data: req.body,
		config: {}
	}));
});

module.exports = router;