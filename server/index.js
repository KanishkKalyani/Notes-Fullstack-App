const app = require("express")();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const notesRoutes = require("./routes/notes.route");

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(cors());

app.use("/api", notesRoutes);

mongoose
	.connect(process.env.DATABASE_URL, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: true,
	})
	.then(() => {
		app.listen(process.env.NODE_PORT || 8000, () => {
			console.log(`DB Connected and the server is running at 8000 port.`);
		});
	})
	.catch(err => {
		console.error("DB Connection Failed", err);
	});
