import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import Field from "./field_inputs";

class JoinTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			code: ""
		};
	}

	handleInputChange(event) {
		const { value, name } = event.target;

		this.setState({
			[name]: value
		});
	}

	// addCodeInput(input) {
	// 	this.setState({
	// 		teamCode: [input]
	// 	});
	// }

	handleSubmit(event) {
		event.preventDefault();
		console.log("handleSubmit: ", this.state);
		// this.addCodeInput(this.state);

		this.reset();
	}

	reset() {
		this.setState({
			code: ""
		});
	}

	joinTeamAxios() {
		const { code: team_code } = this.state;
		const dataToSend = { team_code };
		let path = "/api/join_team";
		const teamCodeValidation = /^[A-Z0-9]{6}$/;

		if (teamCodeValidation.test(team_code)) {
			axios.post(`${path}`, dataToSend).then(response => {
				if (response.data.success) {
					console.log("Join Team Axios: ", response);

					this.props.history.push(response.data.redirect);
					// this.props.history.push("/login");
				} else {
					console.log("Join Team err: ", response.data.errors);
				}
			});
		}
	}

	render() {
		const { code } = this.state;

		return (
			<div className="joinTeamPage">
				<Navbar icon={backArrow} hamburgerMenu={false} url="/fork_nav" />
				<div className="joinTeamContainer">
					<div className="jTteamCode">
						<span className="teamCodeTitle">Team Code</span>
					</div>
					<form className="jTcodeNum" onSubmit={this.handleSubmit.bind(this)}>
						<Field
							name="code"
							type="text"
							value={code}
							onChange={this.handleInputChange.bind(this)}
							className="codeNum"
						/>
						<Link to="/bulletin_board" className="jTcodeBtn">
							<span className="codeBtn" onClick={this.joinTeamAxios.bind(this)}>
								Join!
							</span>
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

export default JoinTeam;
