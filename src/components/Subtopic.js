import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SubtopicStyles from './Subtopic.css';

class Subtopic extends Component {
    
    constructor(props) {
        super(props);

    }

    render() {
    
      return (
        <div className="list-group-item">
            <div className="row">
                <div className="col-md-1">
                    <h1>{this.props.subtopic.stage}</h1>
                </div>
                <div className="col-md-11">
                    <Link className="subtopicTitle" to={{pathname: `/subtopic/${this.props.subtopic._id}`, state: {subtopic: this.props.subtopic}}}>
                        <h4>{this.props.subtopic.title}</h4>
                    </Link>
                    <h6>{this.props.subtopic.description}</h6>
                </div>
            </div>
        </div>
      );
    }
  }
  

  
  
  export default Subtopic;