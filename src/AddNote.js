import React from "react";
import "./AddNote.css";

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
		} else {
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
		console.log("State:");
		console.log(this.state);
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
		console.log(index);
	};

	deleteFunc = event => {
		var index = this.state.AllData.findIndex(
			value => value.id === parseInt(event.target.id)
		);
		var data = this.state.AllData;
		data.splice(index, 1);
		this.setState({
			AllData: data,
		});
	};

	render() {
		return (
			<>
				<div className="add-note-container">
					<textarea
						placeholder="Enter your note here..."
						// rows={5}
						className="enter-text"
						value={this.state.data}
						onChange={this.handleDataChange}
					/>
					<button onClick={this.save} className="save-button">
						SAVE
					</button>
				</div>

				<div className="current-notes-body">
					{this.state.AllData.map(value => {
						const { data, time, id } = value;

						return (
							<div className="archive-note-with-buttons">
								<div>
									<div className="archive-data">{data}</div>
									<div className="archive-time">{time}</div>
								</div>
								<div className="edit-delete-wrapper">
									<span className="edit-button" onClick={this.editFunc} id={id}>
										Edit
									</span>
									<span
										className="delete-button"
										onClick={this.deleteFunc}
										id={id}>
										Delete
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

export default AddNote;
