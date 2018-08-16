import React, { Component } from "react";
import { Route } from "react-router-dom";
import BulletinBoard from "./bulletin_board/bulletin_board";
import bulletinDummyData from "./bulletin_board/bulletin_dummy_data";
import Login from "./log_in/login";
import Login_Page from "./log_in/login_page";
import ForkNav from "./fork_nav";
import CreateTeam from "./create_team";
import JoinTeam from "./join_team";
import AthleteProfile from "./profile_pages/athlete_profile";
import Roster from "./roster/roster";
import UserIdPw from "./create_user_id_pw";
import NavBar from "./navbar";
import AddAthlete from "./profile_pages/add_athlete";
import EditAthlete from "./profile_pages/edit_profile";
import Logout from "./log_in/logout";
import TeammateProfile from "./profile_pages/teammate_profile";
import meetTheTeam from "./meet_the_team/meet_the_team";
import EntryPage from "./entry_page";
import "./animations.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bulletinDummyData: []
    };
  }
  componentDidMount() {
    this.getRosterData();
  }

  getRosterData() {
    this.setState({
      bulletinDummyData
    });
  }
  // getDataCallback(dataToGet, pathToGoTo, historyPush){
  //     const historyObj = {
  //         pathname: pathToGoTo,
  //         state: dataToGet,
  //     };
  //     historyPush(historyObj)
  // }

  render() {
    return (
      <div className="container">
        <Route path="/home" component={Login} />
        <Route exact path="/" component={EntryPage} />

        <Route path="/login_page" component={Login_Page} />

        <Route path="/user_id_pw" component={UserIdPw} />

        <Route path="/bulletin_board" component={BulletinBoard} />

        <Route path="/athlete_profile" component={AthleteProfile} />

        <Route path="/teammate_profile" component={TeammateProfile} />

        <Route path="/roster" component={Roster} />

        <Route path="/fork_nav" component={ForkNav} />

        <Route path="/create_team" component={CreateTeam} />

        <Route path="/join_team" component={JoinTeam} />

        <Route path="/add_athlete" component={AddAthlete} />

        <Route path="/edit_profile" component={EditAthlete} />

        <Route path="/meet_the_team" component={meetTheTeam} />

        <Route path="/logout" component={Logout} />
      </div>
    );
  }
}

export default App;
