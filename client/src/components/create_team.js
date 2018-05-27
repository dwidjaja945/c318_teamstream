import React, { Component } from "react";
import { Link } from "react-router-dom";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import ForkNav from "./fork_nav";
import axios from "axios/index";
const style = {
	color: "red",
	textAlign: "center"
};

class CreateTeam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			team_name: "ROWMASTERS",
			sport_name: "Rowing",
			team_bio: "A bunch of cool people doing awesome rowing",
			generatedCode: "",
			errorHandle: ""
		};
	}
	// codeGenerator() {
	// 	let newCode = "";
	//
	// 	for (let i = 0; i < 6; i++) {
	// 		let codeChoice = Math.floor(Math.random() * 2 + 1);
	// 		let code;
	//
	// 		if (codeChoice === 1) {
	// 			let randomLetters = Math.floor(Math.random() * 26 + 65);
	//
	// 			code = String.fromCharCode(randomLetters);
	// 		} else {
	// 			code = Math.floor(Math.random() * 9);
	// 		}
	// 		newCode += code;
	// 	}
	// 	return newCode;
	// }

	handleSubmit() {
		//perform axios call to return code, then show login
		const { team_name, sport_name, team_bio } = this.state;
		const dataToSend = { team_name, sport_name, team_bio };
		const path = "/api/create_team";
		axios.post(`${path}`, dataToSend).then(response => {
			if (response.data.success) {
				console.log("Create team data from server response: ", response);
				console.log("error message to handle: ", response.data.errors);
				this.setState({
					generatedCode: response.data.team_code
				});
			} else {
				this.setState({
					errorHandle: response.data.errors
				});
			}
		});
	}
	login() {
		this.props.history.push("/bulletin_board");
	}

	displayLogIn(generatedCode) {
		const { errorHandle } = this.state;

		if (generatedCode) {
			return (
				<button type="button" onClick={this.login.bind(this)} className="cGbtnContent">
					Log In
				</button>
			);
		} else {
			return (
				<div>
					<div style={style}>{errorHandle}</div>
					<button type="button" onClick={this.handleSubmit.bind(this)} className="cGbtn">
						Generate Code
					</button>
				</div>
			);
		}
	}

	render() {
		console.log("Error Message: ", this.state.errorHandle);
		const { team_name, sport_name, team_bio, generatedCode } = this.state;

		const hashCode = generatedCode ? generatedCode : "Generate your code";

		return (
			<div className="createTeamContainer">
				<Navbar icon={backArrow} hamburgerMenu={false} url="/fork_nav" />
				<div className="cTCodeGenerator">
					<div className="createTeamName">
						{/*<span className="teamName">Team Name</span>*/}
						<input
							value={team_name}
							className="teamName"
							type="text"
							placeholder="Your Team Name"
							onChange={event => {
								this.setState({ team_name: event.target.value });
							}}
						/>
					</div>
					<div className="createTeamInfo">
						<textarea
							value={sport_name}
							type="text"
							row="4"
							column="20"
							wrap="hard"
							placeholder="Sport Name"
							onChange={event => {
								this.setState({ sport_name: event.target.value });
							}}
						/>
						<textarea
							value={team_bio}
							type="text"
							row="4"
							column="20"
							wrap="hard"
							placeholder="A quick blurb about your team"
							onChange={event => {
								this.setState({ team_bio: event.target.value });
							}}
						/>
					</div>
					<div className="cGContent">
						<div className="cGNumberContainer">
							<span className="cGNumber">{hashCode}</span>
						</div>
						<div className="cGbtnContent">{this.displayLogIn(generatedCode)}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateTeam;
