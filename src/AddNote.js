import React from "react";
import "./AddNote.css";
import CurrentNotes from "./CurrentNotes.js";

class AddNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			data: "",
			time: "",
			id: 0,
			AllData: [],
		};
	}

	handleDataChange = event => {
		this.setState({ data: event.target.value });
	};

	save = () => {
		if (this.state.edit) {
			var index = this.state.AllData.findIndex(
				value => value.id === parseInt(this.state.id)
			);

			var data = this.state.AllData;
			data[index].data = this.state.data;
			data[index].time = this.state.time;
			data[index].edit = false;

			this.setState({
				AllData: data,
			});
		} else if (this.state.data !== "") {
			var idCount = this.state.id;
			idCount += 1;
			var obj = {
				data: this.state.data,
				time: new Date().toLocaleString().replace(",", "").replace(/:.. /, " "),
				id: idCount,
			};
			var data = this.state.AllData;
			data.unshift(obj);

			this.setState({
				AllData: data,
				id: idCount,
			});
		}
		this.clearNotesArea();
	};

	clearNotesArea = () => {
		this.setState({
			data: "",
			time: "",
			edit: false,
		});
	};

	editFunc = event => {
		var index = this.state.AllData.findIndex(
			value => value.id === parseInt(event.target.id)
		);
		var data = this.state.AllData[index];
		this.setState({
			data: data.data,
			time: data.time,
			id: data.id,
			edit: true,
		});
	};

	deleteFunc = event => {
		if (!this.state.edit) {
			var index = this.state.AllData.findIndex(
				value => value.id === parseInt(event.target.id)
			);
			var data = this.state.AllData;
			data.splice(index, 1);
			this.setState({
				AllData: data,
			});
		}
	};

	render() {
		return (
			<>
				<div className="add-note-container">
					<h3>Kanishk's Notes</h3>
					<textarea
						placeholder="Enter your note here..."
						className="enter-text"
						value={this.state.data}
						onChange={this.handleDataChange}
					/>
					<span onClick={this.save} className="save-button">
						SAVE
					</span>
				</div>
				<CurrentNotes
					AllData={this.state.AllData}
					deleteFunc={this.deleteFunc}
					editFunc={this.editFunc}></CurrentNotes>
			</>
		);
	}
}

export default AddNote;
