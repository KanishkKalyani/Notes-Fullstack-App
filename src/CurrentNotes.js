import React from "react";
import "./CurrentNotes.css";

class CurrentNotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="current-notes-body">
				{this.props.AllData.map(value => {
					const { title, data, time, id } = value;

					return (
						<div className="archive-note-with-buttons">
							<div>
								<div className="title-data">{title}</div>
								<div className="archive-data">{data}</div>
								<div className="archive-time">{time}</div>
							</div>
							<div className="edit-delete-wrapper">
								<span className="edit-button">
									<img
										src="https://img.icons8.com/cotton/64/000000/edit--v1.png"
										className="edit-button-img"
										onClick={e => this.props.editFunc(e)}
										id={id}
									/>
								</span>
								<span className="delete-button">
									<img
										src="https://img.icons8.com/fluent/48/000000/delete-sign.png"
										className="delete-button-img"
										onClick={e => this.props.deleteFunc(e)}
										id={id}
									/>
								</span>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default CurrentNotes;
