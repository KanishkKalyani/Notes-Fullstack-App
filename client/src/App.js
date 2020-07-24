import React from "react";
import axios from "axios";
import "./App.css";
import AddNote from "./AddNote.js";
require("dotenv").config();

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="App">
				<AddNote></AddNote>
			</div>
		);
	}
}

export default App;
