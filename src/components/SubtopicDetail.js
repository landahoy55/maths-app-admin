import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Subtopic from './Subtopic';
import Question from './Question';
import MultiChoice from './MultiChoice';
import ImageMultiChoice from './ImageMultiChoice';
import SubtopicDetailStyles from './SubtopicDetail.css';
import VoiceQuestion from './VoiceQuestion'

class SubtopicDetail extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            title: this.props.location.state.subtopic.title,
            description: this.props.location.state.subtopic.description,
            stage: this.props.location.state.subtopic.stage,
            quizType: this.props.location.state.subtopic.quizType
        }

        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.quizTypeChange = this.quizTypeChange.bind(this);
        
    }

    componentDidMount() {
        console.log("THIS IS THE SUBTOPIC", this.props.location.state.subtopic);
    }

    quizTypeChange(event) {
        event.preventDefault();
        console.log("PICKER VALUE", event.target.value)
        //set state.

        let currentComponent = this;
        this.setState({
            quizType: event.target.value
        });

    }

    onEdit() {
        this.setState({ isEdit: true });
    }

    onEditSubmit(event) {
        event.preventDefault();
        // this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);
        

        //additonal binding
        let currentComponent = this
        let title = this.titleInput.value
        let description = this.descriptionInput.value
        let quizType = this.state.quizType
        console.log("Quiz type to log -", quizType)

        //check for blank
        if (title == '' || description == '') {

            console.log("In if block")
            
            this.setState({
                errorMessage: "Please add a name and description"
            });

        } else {

            //axios - update subtopic.
            axios.put('https://morning-journey-26383.herokuapp.com/v1/subtopic/editsubtopic/' + this.props.location.state.subtopic._id, {
                title: title,
                description: description,
                quizType: quizType,
                stage: currentComponent.state.stage
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
                console.log(error);
                alert("Error updating subtopic")
            });

            this.setState({isEdit: false});

        }

    }


    render() {
    
      return (
        <div className="Wrapper">
            
            <div className="page-header">
                <h1>Manage Sub-Topic</h1>
                <h6>Edit the sub-topic title and description, or a question</h6>
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
                                        <p className="text-danger">{this.state.errorMessage}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="titleInput" className="col-sm-2 col-form-label"><b>Quiz Type</b></label>
                                    <div className="col-sm-10">
                                        <select className="form-control"
                                            name="quizType"
                                            value={this.state.quizType}
                                            onChange={this.quizTypeChange}
                                            >
                                                <option value="multipleChoice">Multiple Choice</option>
                                                <option value="input">Input</option>
                                                <option value="multipleChoiceImage">Images</option>
                                                <option value="voiceInput">Voice</option>
                                                <option value="handWriting">Handwriting</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="btn btn-success">Save</button>
                        </form> 
                        </div>
                    </div>

                ):(
                    <div className="list-group">
                    <div className="list-group-item">
                        <h6><b>Subtopic Name:</b> {this.state.title}</h6>
                        <h6><b>Subtopic Description:</b> {this.state.description}</h6>
                        <button className="btn btn-primary subtopicEditBtn" onClick={this.onEdit}>Edit</button>
                    </div>
                </div>
                )
            }

            <div className="page-header subtopicQuestions">
                <h3>Questions</h3>
                <h6>Choose a quesiton to edit</h6>
            </div>
            

            { 
                this.state.quizType === 'multipleChoiceImage' && 
            
                <div className="list-group">
                    {this.props.location.state.subtopic.questions.map(question => {
                        return (
                            <ImageMultiChoice key={question._id} subtopicid={this.props.location.state.subtopic._id} question={question}/>
                                );
                            }
                        )
                    }
                </div>
        
            }

            {
                this.state.quizType === "multipleChoice" &&
                
                    <div className="list-group">
                        {this.props.location.state.subtopic.questions.map(question => {
                            return (
                                <MultiChoice key={question._id} subtopicid={this.props.location.state.subtopic._id} question={question}/>
                                    );
                                }
                            )
                        }
                     </div>
            }
            
            {
                this.state.quizType === "input" &&

                    <div className="list-group">
                        {this.props.location.state.subtopic.questions.map(question => {
                            return (
                                 <Question key={question._id} subtopicid={this.props.location.state.subtopic._id} question={question}/>
                                 );
                             }
                            )
                        }
                    </div>
        
            }

            {
                this.state.quizType === "voiceInput" &&

                    <div className="list-group">
                        {this.props.location.state.subtopic.questions.map(question => {
                            return (
                                 <VoiceQuestion key={question._id} subtopicid={this.props.location.state.subtopic._id} question={question}/>
                                 );
                             }
                            )
                        }
                    </div>
        
            }

            {
                this.state.quizType === "handWriting" &&

                    <div className="list-group">
                        {this.props.location.state.subtopic.questions.map(question => {
                            return (
                                 <VoiceQuestion key={question._id} subtopicid={this.props.location.state.subtopic._id} question={question}/>
                                 );
                             }
                            )
                        }
                    </div>
        
            }

            

        </div>
      )
  }
} 
  
export default SubtopicDetail;


