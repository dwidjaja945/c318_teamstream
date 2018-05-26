import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Field from './profile_fields';
import AddNewInputs from './add_new_input';
import "../styles.css";
import axios from "axios/index";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            age: '',
            bio:'',
            img_url:'',
            height: '',
            weight: '',
            customInputsArray: [],

        };

        this.pullAthleteProfileData();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewInput=this.addNewInput.bind(this);
    }

    pullAthleteProfileData(){
        let path = "/api/athlete_profile";
        axios.get(`${path}`).then(response => {
            if (response.data.success) {
                console.log("data for athlete profile server response: ", response);

                this.setState({
                    first_name: response.data.user[0].first_name,
                    last_name: response.data.user[0].last_name,
                    age: response.data.user[0].age,
                    bio: response.data.user[0].bio,
                    img_url: response.data.user[0].img_url,
                    height: response.data.user[0].height,
                    weight: response.data.user[0].weight,
                    // stats: {},
                })

            } else {
                //ERROR
                console.log(response.data.errors);
            }
        });
    }
    addNewInput(event) {
        event.preventDefault();

        const newCustomInput={
            inputName:'inputName',
            nameValue:'',
            valueName:'valueName',
            inputValue:'',
        };

        const {customInputsArray} = this.state;

        customInputsArray.push(newCustomInput);

        this.setState({customInputsArray});
    }

    handleInputChange(event) {
        const { value, name } = event.target;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('This is the handleSubmit: ', this.state);
        this.props.addAthlete(this.state);
    }

    render() {
        const { first_name, last_name, age, height, bio, img_url, weight, customInputsArray } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h1>This is where user creates their profile</h1>
                    <Field name="firstName" label="First Name" type="text" value={first_name} onChange={this.handleInputChange} />
                    <Field name="lastName" label="Last Name" type="text" value={last_name} onChange={this.handleInputChange} />
                    <Field name="age" label="Age" type="number" value={age} onChange={this.handleInputChange} />
                    <Field name="height" label="Height" type="text" value={height} onChange={this.handleInputChange} />
                    <Field name="weight" label="Weight" type="number" value={weight} onChange={this.handleInputChange} />
                    <Field name="bio" label="Bio" type="text" value={bio} onChange={this.handleInputChange} />
                    {/* <button onClick={this.addNewInput.bind(this)}>Add</button> */}
                    <AddNewInputs addNewInput={this.addNewInput} customInputsArray={customInputsArray}/>
                    {/* <Field name="statInput" type="text" value={statInput} onChange={this.handleInputChange} />
                    <Field name="statValue" type="text" value={statValue} onChange={this.handleInputChange} /> */}
                    <Link to={`/athlete_profile`} className="loginButtons">
                        <span className="btnLog">Create Profile</span>
                    </Link>
                </div>
                <button className="btnLog">Submit</button>
            </form>
        )
    }
}
export default EditProfile;