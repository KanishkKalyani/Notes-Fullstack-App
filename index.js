const app = require("express")();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const notesRoutes = require("./server/routes/notes.route");

const isDevelopment = process.env.NODE_ENV === "development";

const activePort = process.env.PORT || 8000;

if (isDevelopment) {
	app.use(morgan("dev"));
} else {
	app.use(morgan("combined"));
}

app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

if (isDevelopment) {
	// production
	app.use(cors());
} else {
	app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));
}

app.use("/api", notesRoutes);

if (process.env.NODE_ENV === "production") {
	// Serve any static files
	app.use(express.static(path.join(__dirname, "client/build")));
	// Handle React routing, return all requests to React app
	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

mongoose
	.connect(process.env.DATABASE_URL, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: true,
	})
	.then(() => {
		app.listen(activePort, () => {
			console.log(
				`DB Connected and the server is running at ${activePort} port.`
			);
		});
	})
	.catch(err => {
		console.error("DB Connection Failed", err);
	});
