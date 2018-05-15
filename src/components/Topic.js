import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TopicStyles from './Topic.css';

class Topic extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isDeleting: false
        }
       
        this.deleteTopic = this.deleteTopic.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)

    }

    deleteTopic(){
        console.log("Intital  delete")
        this.setState({
            isDeleting: true
        })
    }

    confirmDelete(){
        this.props.delete(this.props.topic)
        console.log("Confirm delete")

        this.setState({
            isDeleting: false
        })
    }

    render() {
    
      return (
        <div className="list-group-item">
            <div className="row">
                <div className="col-sm-10">
                    <Link className="topic-link" to={{pathname: `/topic/${this.props.topic._id}`, state: {topic: this.props.topic}}}>
                    <h4 className="list-group-item-heading">{this.props.topic.title}</h4>
                    </Link>
                    <p className="list-group-item-text">{this.props.topic.description}</p>
                </div>

                {
                    this.state.isDeleting ? (
                        <div className="col-sm-2">
                            <button onClick={this.confirmDelete} className="btn btn-danger">Confirm</button>
                        </div>
                    ) : (
                        <div className="col-sm-2">
                            <button onClick={this.deleteTopic} className="btn btn-outline-danger">Delete</button>
                         </div>
                    )
                }

                



            </div>
        </div>
      );
    }
  }
  
  
  export default Topic;

