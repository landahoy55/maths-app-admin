import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Subtopic from './Subtopic';
import AddSubtopic from './AddSubtopic';
import AddTopicFormStyles from './AddTopic.css';


class AddTopic extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isEdit: false,
            created: false,
            title: '',
            description: '',
            createdid: '',
            errorMessage: ''
        }

        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onSave = this.onSave.bind(this);

    }

    componentDidMount() {
       
    }

    onEdit() {
        this.setState({ isEdit: true });
    }

    onSave(){
        console.log('Testing');
    }

    onEditSubmit(event) {
        event.preventDefault();
        let currentComponent = this

        console.log("Here")

        let title = this.titleInput.value
        let description = this.descriptionInput.value

        if (title == '' || description == '') {

            console.log("In if block")
            
            this.setState({
                errorMessage: "Please add a name and description"
            });

        } else {

            //networking then move to add subtopic screen.
        //submit to server - replace not needed. AXIOS handles JSON parsing. Object was being parsed twice...
        axios.post('https://morning-journey-26383.herokuapp.com/v1/setup/createtopic', {
            title: title,
            description: description
        })
        .then(function (response) {
          console.log("Topic added");
          console.log(response);

          //set state
            currentComponent.setState({
                created: true,
                title: response.data.newTopic.title,
                description: response.data.newTopic.description,
                createdid: response.data.newTopic._id
            })


        })
        .catch(function (error) {
          console.log("Issue saving topic");
          console.log(error);
          alert("issue saving topic")
        });

        }

    }

    render() {
    
      return (
        <div className="Wrapper">

            <div className="page-header">
                <h1>Add Topic</h1>
                <h6>Include a topic name and description</h6>
            </div>

            {
                this.state.created ? (
                    <div>
                        <div className="list-group">
                            <div className="list-group-item">
                                <div className="alert alert-success" role="alert">
                                    <strong>Topic Created</strong> Now to add some questions...
                                </div>
                                <h6><b>Topic Name: </b>{this.state.title}</h6>
                                <h6><b>Topic Description: </b> {this.state.description}</h6>
                                
                            </div>
                        </div>

                    
                       <AddSubtopic stage={1} parentid={this.state.createdid} />
                       <AddSubtopic stage={2} parentid={this.state.createdid} />
                       <AddSubtopic stage={3} parentid={this.state.createdid} />
                       <AddSubtopic stage={4} parentid={this.state.createdid} />
                       <AddSubtopic stage={5} parentid={this.state.createdid} />

                    </div>
                ) : (
                    <div className="list-group">
                        <div className="list-group-item">
                            <form onSubmit={this.onEditSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="titleInput" className="col-sm-3 col-form-label"><b>Topic Name:</b></label>
                                    <div className="col-sm-9">
                                        <input className="form-control" placeholder="Title" ref={titleInput => this.titleInput = titleInput} defaultValue={this.state.title}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="titleInput" className="col-sm-3 col-form-label"><b>Topic Description:</b></label>
                                    <div className="col-sm-9">
                                        <input className="form-control" placeholder="Description" ref={descriptionInput => this.descriptionInput = descriptionInput} defaultValue={this.state.description} />
                                        <p className="text-danger">{this.state.errorMessage}</p>
                                    </div>
                                </div>
                                
                                <button className="btn btn-success">Save</button>
                        </form> 
                        </div>
                    </div>
                )
            }

        </div>
      )
  }
} 
  
export default AddTopic;
