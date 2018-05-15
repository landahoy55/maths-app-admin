import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Challengesuccessfullyposted extends Component {
    
    constructor(props) {
        super(props);

    }

    render() {
    
      return (
        <div className="Challenge App">
            <h1>Challenge Successfully Posted</h1>
        </div>
      );
    }
  }
  
  
  
  export default Challengesuccessfullyposted;