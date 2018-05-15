import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Challenge extends Component {
    
    constructor(props) {
        super(props);

        // //bind function
        // this.onNotificationSubmit = this.onNotificationSubmit.bind(this);

        // this.state = {
        //     notificationMessage: '',
        //     notificationConfirmation: ''
        // }
    }

    render() {
    
      return (
        <div className="Challenge App">
            <h1>Daily Challenge</h1>
            <Link to="/todaychallenge"><h2>Create Today's Challenge</h2></Link>
        </div>
      );
    }
  }
  
  
  
  export default Challenge;