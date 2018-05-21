import React, { Component } from "react";
import "./bulletin_board.css";
import BulletinBoardMessages from "./bulletin_board_message";
import bulletinDummyData from "./bulletin_dummy_data";
import AddBulletinMessages from "./add_bulletin_message";
import Navbar from "./navbar";
import dropDown from "./images/double-down.png";
import axios from 'axios';
import hamburgerMenu from "./hamburger_menu";

class BulletinBoard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messageArray: [],
			hasPinned: false,
		};

		this.getDataFromServer();

		this.pinMessage = this.pinMessage.bind(this);
	}

	getDataFromServer(path){
		path='/api/bulletin_board';
		axios.get(path)
			.then( resp => {
				console.log('BB GET response: ' , resp);

				this.setState({
                    messageArray: resp.data.data,
				})
			});
	}

	addMessage(message) {
		const { hasPinned, messageArray } = this.state;
		// if (hasPinned) {
		// 	const newMessageArray = messageArray.splice(1, 0, message);
		// 	this.setState({
		// 		messageArray
		// 	});
		// } else {
		// 	this.setState({
		// 		messageArray: [message, ...this.state.messageArray]
		// 	});
		// }
        const path='/api/bulletin_board';

        const dataToSend = {
        	post_text:message,
		};

        axios.post(path, dataToSend)
            .then( resp => {
                console.log('BB POST response: ' , resp);

            });


	}

	pinMessage(index) {
		const { messageArray } = this.state;
		var { hasPinned } = this.state;
		var updatedRoster = messageArray.splice(index, 1);
		messageArray.unshift(updatedRoster[0]);
		console.log("This is the index: ", index);

		hasPinned = true;

		this.setState({
			messageArray,
			hasPinned
		});
	}
	render() {
		const { messageArray } = this.state;
		return (
			<div>
				<Navbar icon={dropDown} hamburgerMenu={true} url="/bulletin_board" />
				<div className="pinnedMessage" />
				<div className="messageContainer">
					<BulletinBoardMessages pinCallBack={this.pinMessage} data={messageArray} />
				</div>
				<AddBulletinMessages add={this.addMessage.bind(this)} />
			</div>
		);
	}
}
export default BulletinBoard;
