import React from "react";
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
			id: 0,
			AllData: [],
		};
	}

	handleSearchChange = event => {
		this.setState({ search: event.target.value });

		var searchedArray = this.state.temp.filter(value =>
			value.title.includes(event.target.value)
		);

		this.setState({
			AllData: searchedArray,
		});
		if (event.target.value === "") {
			let temp = this.state.temp;
			this.setState({
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
			let data = this.state.temp;

			var index = data.findIndex(value => value.id === parseInt(this.state.id));

			data[index].title = this.state.title;
			data[index].data = this.state.data;
			data[index].time = this.state.time;
			data[index].edit = false;

			this.setState({
				temp: data,
				AllData: data,
			});
			this.clearNotesArea();
		} else if (this.state.data !== "" && this.state.title !== "") {
			var idCount = this.state.id;
			idCount += 1;
			var obj = {
				title: this.state.title,
				data: this.state.data,
				time: new Date().toLocaleString().replace(",", "").replace(/:.. /, " "),
				id: idCount,
			};
			var data = [];
			data = this.state.temp;
			data.unshift(obj);

			this.setState({
				AllData: data,
				temp: data,
				id: idCount,
			});
			this.clearNotesArea();
		}
	};

	clearNotesArea = () => {
		this.setState({
			search: "",
			title: "",
			data: "",
			time: "",
			edit: false,
		});
	};

	editFunc = event => {
		var index = this.state.temp.findIndex(
			value => value.id === parseInt(event.target.id)
		);
		var data = this.state.temp[index];
		this.setState({
			search: "",
			title: data.title,
			data: data.data,
			time: data.time,
			id: data.id,
			edit: true,
		});
	};

	deleteFunc = event => {
		if (!this.state.edit) {
			var index = this.state.temp.findIndex(
				value => value.id === parseInt(event.target.id)
			);
			var data = this.state.temp;
			data.splice(index, 1);
			this.setState({
				search: "",
				temp: data,
				AllData: data,
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
					AllData={this.state.AllData}
					deleteFunc={this.deleteFunc}
					editFunc={this.editFunc}></CurrentNotes>
			</>
		);
	}
}

export default AddNote;
