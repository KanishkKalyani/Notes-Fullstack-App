import React from "react";
import "./CurrentNotes.css";
import Highlighter from "react-highlight-words";

class CurrentNotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="current-notes-body">
				{this.props.AllData.map(value => {
					const { title, data, time, _id } = value;
					return (
						<div className="archive-note-with-buttons" key={_id}>
							<div>
								<div className="title-wrapper">
									<Highlighter
										highlightClassName="title-data"
										searchWords={[this.props.search]}
										autoEscape={true}
										textToHighlight={title}
									/>
								</div>
								<hr />
								<div className="archive-data">{data}</div>
								<div className="archive-time">{time}</div>
							</div>
							<div className="edit-delete-wrapper">
								<span className="edit-button">
									<img
										src="https://img.icons8.com/cotton/64/000000/edit--v1.png"
										alt="edit-icon"
										className="edit-button-img"
										onClick={e => this.props.editFunc(e)}
										id={_id}
									/>
								</span>
								<span className="delete-button">
									<img
										src="https://img.icons8.com/fluent/48/000000/delete-sign.png"
										alt="delete-icon"
										className="delete-button-img"
										onClick={e => this.props.deleteFunc(e)}
										id={_id}
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
