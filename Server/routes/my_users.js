const express = require("express");
const router = express.Router();

router.post("/setUser", (req, res) => {
	console.log(req.body.name);
	console.log("setUser");
	res
		.status(200)
		.json({ result: "successfully posted Data", status_code: 200 });
});

router.get("/getUser", (req, res) => {
	res.send({ title: "AmadIrfan" });
	console.log("getUsers");
});
router.get("/getUser/:id", (req, res) => {
	res.send({ title: "AmadIrfan", id: req.params.id });
	console.log(req.params.id);
	// return res.status(200).json('successfully posted Data')
});

module.exports = router;
