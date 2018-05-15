import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import QuestionStyles from './Question.css';

class Question extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            questionid: this.props.question._id,
            question: this.props.question.question,
            correctAnswer: this.props.question.correctAnswer,
            // answer1: this.props.question.answers[0].answer,
            // answer2: this.props.question.answers[1].answer,
            // answer3: this.props.question.answers[2].answer,
            // answer4: this.props.question.answers[3].answer
        }

        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);

    }


    onEdit() {
        this.setState({ isEdit: true });
    }

    onEditSubmit(event) {
        event.preventDefault();
        // this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);
        let currentComponent = this
        //carry out networking...
        //axios - send details back.

        let question = this.questionInput.value
        let correctAnswer = this.answerInput.value

         //check for blank
         if (question == '' || correctAnswer == '') {

            console.log("In if block")
            
            this.setState({
                errorMessage: "Please add a name and description"
            });

        } else {

            axios.put('https://morning-journey-26383.herokuapp.com/v1/subtopic/editquestionandanswer/' + this.props.subtopicid, {
                questionid: currentComponent.state.questionid,
                question: question,
                correctanswer: correctAnswer,
                answer1answer: correctAnswer,
                answer2answer: correctAnswer,
                answer3answer: correctAnswer,
                answer4answer: correctAnswer,
            })
            .then(function (response) {
                    console.log(response);
                    currentComponent.setState({
                            isEdit: false,
                            question: question,
                            correctAnswer: correctAnswer,
                            answer1answer: correctAnswer,
                            answer2answer: correctAnswer,
                            answer3answer: correctAnswer,
                            answer4answer: correctAnswer,
                            errorMessage: ""
                        });
            })
            .catch(function (error) {
                    console.log(error);
            });

        this.setState({isEdit: false});

        }
    }

    render() {
    
      return (
        <div className="list-group-item">

        {
          this.state.isEdit 
          ? 
          (
            <form onSubmit={this.onEditSubmit}>
                 <div className="form-group row">
                    <label for="questionInput" className="col-sm-2 col-form-label"><b>Question: </b></label>
                    <div className="col-sm-10">
                        <input className="form-control" placeholder="Question" ref={questionInput => this.questionInput = questionInput} defaultValue={this.state.question}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="questionInput" className="col-sm-2 col-form-label"><b>Correct Answer: </b></label>
                    <div className="col-sm-10">
                        <input className="form-control" placeholder="Correct Answer" ref={answerInput => this.answerInput = answerInput} defaultValue={this.state.correctAnswer} />
                        <p className="text-danger">{this.state.errorMessage}</p>
                    </div>
                </div>
                    <button className="btn btn-success">Save</button>
            </form> 
          )
          :(
            <div>
                <p><b>Question:</b> {this.state.question}</p>
                <p><b>Answer:</b> {this.state.correctAnswer}</p>
                <button className="btn btn-primary editBtn" onClick={this.onEdit}>Edit</button>
            </div>
          )
        }

        </div>
      );
    }
  }
  
  
  
  export default Question;

