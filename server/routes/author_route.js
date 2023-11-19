const express = require("express");
const router = express.Router();
let authorModel = require("../models/schema");

router.get("/", async (req, res) => {
	try {
		const { active } = req.query;
		let query = {};

		if (active !== undefined) {
			query.active = active === "true";
		}
		let author = await authorModel.find(query);
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
router.put("/active/:userId", async (req, res) => {
	const { userId } = req.params;
	const { active } = req.body;
	try {
		const updatedAuthor = await authorModel.findByIdAndUpdate(
			userId,
			{ active },
			{
				new: active,
			}
		);
		if (!updatedAuthor) {
			return res.status(404).json({
				data: updatedAuthor,
				message: "Author not Found",
				status: "error",
			});
		}
		res.status(200).json({
			data: updatedAuthor,
			message: "updated",
			status: "ok",
		});
	} catch (error) {
		res
			.status(500)
			.json({ data: null, message: error.message, status: "error" });
	}
});
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updatedAuthor = await authorModel.findByIdAndUpdate(id, req.body);
		if (!updatedAuthor) {
			return res.status(404).json({
				data: updatedAuthor,
				message: "Author not Found",
				status: "error",
			});
		}
		res.status(200).json({
			data: updatedAuthor,
			message: "updated Successfully",
			status: "ok",
		});
	} catch (error) {
		res
			.status(500)
			.json({ data: null, message: error.message, status: "error" });
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteAuthor = await authorModel.findByIdAndRemove(id);
		console.log(deleteAuthor);
		console.log(!deleteAuthor);
		if (!deleteAuthor) {
			return res.status(404).json({
				data: null,
				message: "Author not Found",
				status: "error",
			});
		}
		return res.status(200).json({
			data: null,
			message: "Deleted Successfully",
			status: "ok",
		});
	} catch (error) {
		res
			.status(500)
			.json({ data: null, message: error.message, status: "error" });
	}
});
module.exports = router;
