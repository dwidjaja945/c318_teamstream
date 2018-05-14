import React from "react";
import blueLeftArrow from "./images/blue-chevron-left.png";

export default props => (
	<div className="createTeamContainer">
		<div className="backNav">
			<div className="backArrow">
				<img className="backArrowImg" src={blueLeftArrow} />
			</div>
			<div className="backTsLogo">
				<span className="backNavTitle">Team Stream</span>
			</div>
		</div>
		<div className="createTeamName">
			<span className="teamName">Team Name</span>
		</div>
		<div className="cTCodeGenerator">
			<div className="cGTitleContainer">
				<span className="cGTitle">Team Code Generator</span>
			</div>
			<div className="cGNumberContainer">
				<span className="cGNumber">Code for Team</span>
			</div>
		</div>
		<div className="cGDoneBtnContainer">
			<div className="cGbtnContent">
				<span className="cGDoneBtn">Done</span>
			</div>
		</div>
	</div>
);