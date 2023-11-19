const express = require("express");
const router = express.Router();
let authorModel = require("../models/schema");
router.get("/", async (req, res) => {
	try {
		let author = await authorModel.find({});
		res.status(200).send({ data: author, message: "Successful", status: "ok" });
	} catch (error) {
		res
			.status(505)
			.send({ data: null, message: error.message, status: "error" });
	}
});
router.post("/", async (req, res) => {
	try {
		let author = await authorModel.create(req.body);
		res
			.status(201)
			.send({ data: author, message: "Successfully saved", status: "ok" });
	} catch (error) {
		res
			.status(505)
			.send({ data: null, message: error.message, status: "error" });
	}
});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});
module.exports = router;
