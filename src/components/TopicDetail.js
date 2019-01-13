import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Subtopic from './Subtopic';
import TopicDetailStyles from './TopicDetail.css';
import AddSubtopic from './AddSubtopic';


class TopicDetail extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isEdit: false,
            title: this.props.location.state.topic.title,
            description: this.props.location.state.topic.description,
            isPublished: this.props.location.state.topic.isPublished,
            subtopicCount: 0,
            subTopicCountforPublishing: 0,
            stagesRemaining: [1,2,3,4,5]
        }

        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.isPublished = this.isPublished.bind(this);
        this.onSubAdded = this.onSubAdded.bind(this);

    }

    componentDidMount() {
        console.log(this.props.location.state.topic);

        //count number of subtopics
        var count = this.props.location.state.topic.subTopics.length

        //remove elements from stages if found.
        
        //create array of current stage numbers
        var currentStages = []
        for (let subtopic of this.props.location.state.topic.subTopics) {
            currentStages.push(subtopic.stage)
        }
        console.log("ARRAY TO WORK WITH", currentStages);

        //loop over new array and remove element from subtopicStage
        var stageRemaining = this.state.stagesRemaining
        for (let stage of currentStages) {
            stageRemaining = stageRemaining.filter(item => item !== stage)
        }

        console.log("STAGES REMAINING", stageRemaining)

        this.setState({
            subtopicCount: count,
            stagesRemaining: stageRemaining,
            subTopicCountforPublishing: count
        })


    }


    onEdit() {
        this.setState({ isEdit: true });
    }

    onSave(){
        console.log('Testing');
    }
    
    isPublished(e){
        const isPublished = e.target.value;
        console.log("IS PUBLISHED", isPublished);
        this.setState({
            isPublished: isPublished
        })
    }
    
    onSubAdded(sub){
        //when a subtopic is added remaining
        console.log("Sub added")
        let counter = this.state.subTopicCountforPublishing
        if (sub){
            counter += 1
            this.setState({
                subTopicCountforPublishing: counter
            })
        }
    }
 
    onEditSubmit(event) {
        event.preventDefault();
        // this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);
        

        console.log("Title", this.titleInput.value);
        console.log("Description", this.descriptionInput.value);

        //additonal binding
        let currentComponent = this
        let title = this.titleInput.value
        let description = this.descriptionInput.value
        let isPublished = this.state.isPublished

        if (this.state.subTopicCountforPublishing !== 5 && isPublished === 'true') {
            console.log("IN IF STATEMENT")
            alert("Make sure there are five sub-topics")
            return
        }

        //check for blank
        if (title == '' || description == '') {

            console.log("In if block")
            
            this.setState({
                errorMessage: "Please add a name and description"
            });

        } else {


            //axios - send details back.
            axios.put('https://morning-journey-26383.herokuapp.com/v1/topic/edittopic/' + this.props.location.state.topic._id, {
                title: title,
                description: description,
                isPublished: isPublished
            })
            .then(function (response) {
                console.log(response);
                currentComponent.setState({
                        isEdit: false,
                        title: title,
                        description: description,
                        errorMessage: ""
                    });
                })
            .catch(function (error) {
                alert("Error editing topic")
                console.log(error);
            });

        }

    }

    render() {
    
      return (
        <div className="Challenge Wrapper">

        <div className="page-header">
            <h3>Manage Topic</h3>
            <h6>Edit the topic title and description, or choose a sub-topic</h6>
        </div>

            {
                this.state.isEdit 
                ?
                (
                    <div className="list-group">
                        <div className="list-group-item">
                            <form onSubmit={this.onEditSubmit}>
                                <div className="form-group row">
                                    <label for="titleInput" className="col-sm-2 col-form-label"><b>Topic Name</b></label>
                                    <div className="col-sm-10">
                                        <input className="form-control" placeholder="Title" ref={titleInput => this.titleInput = titleInput} defaultValue={this.state.title}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="titleInput" className="col-sm-2 col-form-label"><b>Topic Description</b></label>
                                    <div className="col-sm-10">
                                        <input className="form-control" placeholder="Description" ref={descriptionInput => this.descriptionInput = descriptionInput} defaultValue={this.state.description} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="titleInput" className="col-sm-2 col-form-label"><b>Published</b></label>
                                    <div className="col-sm-10">
                                        <select className="form-control"
                                            name="published"
                                            onChange={this.isPublished}
                                            value={this.state.isPublished}
                                            >
                                                <option value="true">Published</option>
                                                <option value="false">NOT Published</option>
                                        </select>
                                    </div>
                                    <p className="text-danger">{this.state.errorMessage}</p>
                                </div>
                                
                                <button className="btn btn-success">Save</button>
                        </form> 
                        </div>
                    </div>
                    
                )
                :(
                    <div className="list-group">
                        <div className="list-group-item">
                            <h6><b>Topic Name:</b> {this.state.title}</h6>
                            <h6><b>Topic Description:</b> {this.state.description}</h6>
                            <button className="btn btn-primary btnEdit" onClick={this.onEdit}>Edit</button>
                        </div>
                    </div>
                )
            }
            
            <div className="page-header subtopicHeader">
                <h3>Sub-Topics</h3>
                <h6>Choose a sub-topic to edit</h6>
            </div>
           
            <div className="list-group">
                {this.props.location.state.topic.subTopics.map(subTopic => {
                    return (
                        <Subtopic key={subTopic._id} subtopic={subTopic}/>
                    );
                })} 
            </div>

            {
                this.state.subtopicCount <= 4 ? 
                (
                    <div> 
                         <h6 className="sub-topic-title"> Sub-topics still to add: <b> {5 - this.state.subTopicCountforPublishing} </b></h6>
                         {
                             this.state.stagesRemaining.map(stage => {
                                 return (
                                    <AddSubtopic 
                                        key={stage} 
                                        stage={stage} 
                                        parentid={this.props.location.state.topic._id} 
                                        onSubAdded={this.onSubAdded} 
                                    />
                                 )
                             })
                         }
                    </div>
                ) : 
                
                (
                    null
                )
            }

           

        </div>
      )
  }
} 
  
export default TopicDetail;
