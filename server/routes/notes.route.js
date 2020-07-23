const express = require("express");
const router = express.Router();
const {
	allNotes,
	addNote,
	deleteNote,
	updateNote,
} = require("../controllers/notes.controller");

router.get("/all-notes", allNotes);

router.post("/add-note", addNote);

router.delete("/delete-note/:id", deleteNote);

router.put("/update-note", updateNote);

module.exports = router;
