import React from "react";
import ReactPlayer from "react-player";
import teamStreamLogo from "./images/team_stream_logo3x.png";
import teamStreamName from "./images/asset_4_3x.png";

import "../assets/css/entry_page.css";

class Name extends React.Component {
  render() {
    return (
      <div className="entry-page container">
        <div className="loginLogoContent">
          <img className="loginTeamLogo" src={teamStreamLogo} />
          <img className="loginTeamLogo" src={teamStreamName} />
        </div>
        <p className="entry-page text one">
          If you'd like to continue to the application, please use a mobile
          device.
        </p>{" "}
        <p className="entry-page text two">
          Otherwise, you can view our demonstration video below.
        </p>
        <ReactPlayer
          className="entry-page react-player"
          url="https://youtu.be/QLGBKgcJ-OY"
          controls={true}
        />
        <button
          className="entry-page loginButtons"
          onClick={e => this.props.history.push("/home")}
        >
          Continue to Application
        </button>
      </div>
    );
  }
}

export default Name;
