import React from "react";
import "./App.css";
import AddNote from "./AddNote.js";

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
