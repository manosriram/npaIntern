import React, { Component } from "react";

class ContactList extends Component {
    componentDidMount() {
        console.log(this.props.data)
    }
    render() {
        return(
            <h1>Hey there</h1>
        )
    }
}

export default ContactList;