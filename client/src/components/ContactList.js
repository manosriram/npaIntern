import "../App.css";
import React, { Component } from "react";
const axios = require("axios");

class ContactList extends Component {
<<<<<<< HEAD

    render() {
        return(
            <h1>Hey there</h1>
=======
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      status: -1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      student: this.props.data
    });
  }

  handleClick() {
    const name = this.state.student.name;
    axios
      .post(`/contacts/addContact/${name}`)
      .then(res =>
        this.setState(
          { status: res.data.status, message: res.data.message },
          () => {
            console.log(this.state);
          }
>>>>>>> af6b8baf26412e4f2bba75d8196bc10501e6f0ed
        )
      )
	  .catch(err => console.
		 log(err));
  }

    
    
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <div>
              <strong>
                {this.state.status == 1 && <h1 id="alert1">Contact added!!</h1>}
              </strong>
            </div>
            <div>
              <strong>
                {this.state.status == 0 && (
                  <h1 id="alert2">Contact Already In your List!!</h1>
                )}
              </strong>
            </div>
            <div>
              <strong>
                {this.state.status == 2 && (
                  <h1 id="alert3">Not Logged In....</h1>
                )}
              </strong>
            </div>
            <br />
            <br />
	    
            <div>
              <strong>
                <h3>Name : {this.state.student.name}</h3>
              </strong>
              <br />
              <strong>
                <h3>Email : {this.state.student.email}</h3>
              </strong>
              <br />
              <strong>
                <h3>Location : {this.state.student.location}</h3>
              </strong>
              <br />
            </div>

            <br />
            <br />
            <button
              ref="addContact"
              className="btn btn-primary"
              onClick={this.handleClick}
            >
              Add to Contacts
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default ContactList;
