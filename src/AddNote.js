import React from "react";
import axios from "axios";
import "./AddNote.css";
import CurrentNotes from "./CurrentNotes.js";

class AddNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			temp: [],
			search: "",
			title: "",
			edit: false,
			data: "",
			time: "",
			id: "",
			AllData: [],
		};
		axios.get("http://localhost:8000/api/all-notes").then(resp => {
			this.setState({ AllData: resp.data.notes, temp: resp.data.notes });
		});
	}

	handleSearchChange = event => {
		if (event.target.value !== "") {
			var searchedArray = this.state.temp.filter(value =>
				value.title.includes(event.target.value)
			);

			this.setState({
				search: event.target.value,
				AllData: searchedArray,
			});
		} else {
			let temp = this.state.temp;
			this.setState({
				search: "",
				AllData: temp,
			});
		}
	};

	handleDataChange = event => {
		this.setState({ data: event.target.value });
	};

	handleTitleChange = event => {
		this.setState({ title: event.target.value });
	};

	save = () => {
		if (this.state.edit && this.state.data !== "" && this.state.title !== "") {
			axios
				.put("http://localhost:8000/api/update-note", {
					_id: this.state.id,
					title: this.state.title,
					data: this.state.data,
				})
				.then(() => {
					let data = this.state.temp;
					var index = data.findIndex(value => value._id === this.state.id);

					data[index].title = this.state.title;
					data[index].data = this.state.data;
					data[index].time = this.state.time;

					this.setState({
						temp: data,
						AllData: data,
					});
					this.clearNotesArea();
				});
		} else if (this.state.data !== "" && this.state.title !== "") {
			axios
				.post("http://localhost:8000/api/add-note", {
					title: this.state.title,
					data: this.state.data,
					time: new Date()
						.toLocaleString()
						.replace(",", "")
						.replace(/:.. /, " "),
				})
				.then(response => {
					axios.get("http://localhost:8000/api/all-notes").then(resp => {
						let data = resp.data.notes;

						this.setState({
							AllData: data,
							temp: data,
						});
						this.clearNotesArea();
					});
				})
				.catch(error => {
					console.log("ERROR", error);
				});
		}
	};

	clearNotesArea = () => {
		this.setState({
			// search: "",
			title: "",
			data: "",
			time: "",
			edit: false,
		});
	};

	editFunc = event => {
		var index = this.state.temp.findIndex(
			value => value._id === event.target.id
		);
		var data = this.state.temp[index];
		this.setState({
			search: "",
			title: data.title,
			data: data.data,
			time: data.time,
			id: data._id,
			edit: true,
		});
	};

	deleteFunc = event => {
		const del = event.target.id;
		if (!this.state.edit) {
			axios
				.delete(`http://localhost:8000/api/delete-note/${del}`)
				.then(() => {
					var index = this.state.temp.findIndex(value => value._id === del);
					var data = this.state.temp;
					data.splice(index, 1);
					this.setState({
						search: "",
						temp: data,
						AllData: data,
					});
				})
				.catch(err => {
					console.log("ERROR", err);
				});
		}
	};

	render() {
		return (
			<>
				<div className="add-note-container">
					<h3>Kanishk's Notes</h3>
					<div className="search-wrapper">
						<textarea
							placeholder="Search by Title..."
							className="search-bar"
							value={this.state.search}
							onChange={this.handleSearchChange}
						/>
					</div>
					<textarea
						placeholder="Title..."
						className="enter-title"
						value={this.state.title}
						onChange={this.handleTitleChange}
					/>
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
					search={this.state.search}
					AllData={this.state.AllData}
					deleteFunc={this.deleteFunc}
					editFunc={this.editFunc}></CurrentNotes>
			</>
		);
	}
}

export default AddNote;
