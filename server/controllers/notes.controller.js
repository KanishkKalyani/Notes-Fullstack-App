const notes = require("../models/notes.model");

exports.addNote = (req, res) => {
	const { title, data } = req.body;

	console.log(title, data);

	const newNote = new notes({ title, data });

	notes.findOne({ title }).exec((err, user) => {
		if (err) {
			return res.status(400).json({
				error: `Something went wrong 1 ${err}`,
			});
		}

		if (user) {
			return res.status(400).json({
				error: "Title alredy exists",
			});
		}

		newNote.save((err, notesdata) => {
			if (err) {
				return res.status(400).json({
					error: `Something went wrong 2 ${err}`,
				});
			}

			res.json({
				message: `Hey, ${notesdata.title} note saved in DB`,
			});
		});
	});
};

exports.allNotes = (__, res) => {
	notes.find({}).exec((err, allNotes) => {
		if (err) {
			return res.status(400).json({
				error: `Something went wrong ${err}`,
			});
		}

		return res.json({ notes: allNotes });
	});
};

exports.deleteNote = (req, res) => {
	const { id } = req.params;

	notes.findOneAndDelete({ _id: id }).exec((err, note) => {
		if (err || !note) {
			return res.status(400).json({
				error: `Something went wrong ${err}`,
			});
		}

		return res.json({ deleted: note });
	});
};

exports.updateNote = (req, res) => {
	const { _id, title, data } = req.body;

	notes
		.updateOne(
			{ _id: _id },
			{
				title: title,
				data: data,
			}
		)
		.exec((err, note) => {
			if (err || !note) {
				return res.status(400).json({
					error: `Something went wrong ${err}`,
				});
			}

			return res.json({ updated: note });
		});
};
