import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MuliChoiceStyles from './MultiChoice.css';

class MultiChoice extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            questionid: this.props.question._id,
            question: this.props.question.question,
            correctAnswer: this.props.question.correctAnswer,
            answer1: this.props.question.answers[0].answer,
            answer2: this.props.question.answers[1].answer,
            answer3: this.props.question.answers[2].answer,
            answer4: this.props.question.answers[3].answer
        }

        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);

    }

    radioChange = (e) => {

        console.log("Radio changed")
        console.log(e.target.value)

        this.setState({
            correctAnswer: e.target.value
        })

    }


    onEdit() {
        this.setState({ isEdit: true });
    }

    onEditSubmit(event) {
        event.preventDefault();
        let currentComponent = this
        // this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.name);
        
        let question = this.questionInput.value
        let correctAnswer = this.state.correctAnswer
        let correctAnswer1 = this.answer1Input.value
        let correctAnswer2 = this.answer2Input.value
        let correctAnswer3 = this.answer3Input.value
        let correctAnswer4 = this.answer4Input.value

        //check for blank
        if (question == '' || correctAnswer == '' || correctAnswer1 == '' || correctAnswer2 == '' || correctAnswer3 == '' || correctAnswer4 == '') {

            console.log("In if block")
            
            this.setState({
                errorMessage: "Please add all fields"
            });

        } else {

            axios.put('https://morning-journey-26383.herokuapp.com/v1/subtopic/editquestionandanswer/' + this.props.subtopicid, {
                questionid: currentComponent.state.questionid,
                question: question,
                correctanswer: correctAnswer,
                answer1answer: correctAnswer1,
                answer2answer: correctAnswer2,
                answer3answer: correctAnswer3,
                answer4answer: correctAnswer4,
            })
            .then(function (response) {
                    console.log(response);
                    currentComponent.setState({
                            isEdit: false,
                            question: question,
                            correctAnswer: correctAnswer,
                            answer1answer: correctAnswer1,
                            answer2answer: correctAnswer2,
                            answer3answer: correctAnswer3,
                            answer4answer: correctAnswer4,
                            errorMessage: ''
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
                    <hr/>
                    <div className="form-group row">
                        <label for="answer1Input" className="col-sm-2 col-form-label"><b>Answer 1: </b></label>
                        <div className="col-sm-8">
                            <input className="form-control" placeholder="Possible Answer" ref={answer1Input => this.answer1Input = answer1Input} defaultValue={this.state.answer1} />
                        </div>
                        <div className="radio col-sm-2">
                            <input type="radio" value={this.state.answer1} name="radiotimes" onChange={this.radioChange}/> Answer<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="answer2Input" className="col-sm-2 col-form-label"><b>Answer 2: </b></label>
                        <div className="col-sm-8">
                            <input className="form-control" placeholder="Possible Answer" ref={answer2Input => this.answer2Input = answer2Input} defaultValue={this.state.answer2} />
                        </div>
                        <div className="radio col-sm-2">
                            <input type="radio" value={this.state.answer2} name="radiotimes" onChange={this.radioChange}/> Answer<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="answer3Input" className="col-sm-2 col-form-label"><b>Answer 3: </b></label>
                        <div className="col-sm-8">
                            <input className="form-control" placeholder="Possible Answer" ref={answer3Input => this.answer3Input = answer3Input} defaultValue={this.state.answer3} />
                        </div>
                        <div className="radio col-sm-2">
                            <input type="radio" value={this.state.answer3} name="radiotimes" onChange={this.radioChange}/> Answer<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="answer4Input" className="col-sm-2 col-form-label"><b>Answer 4: </b></label>
                        <div className="col-sm-8">
                            <input className="form-control" placeholder="Possible Answer" ref={answer4Input => this.answer4Input = answer4Input} defaultValue={this.state.answer4} />
                        </div>
                        <div className="radio col-sm-2">
                            <input type="radio" value={this.state.answer4} name="radiotimes" onChange={this.radioChange}/> Answer<br/>
                        </div>
                    </div>
                        <p className="text-danger">{this.state.errorMessage}</p>
                        <button className="btn btn-success">Save</button>
            </form> 
          )
          :(
            <div>
                <p><b>Question:</b> {this.state.question}</p>
                <p><b>Correct Answer:</b>{this.state.correctAnswer}</p>
                <button className="btn btn-primary multiChoiceEdit" onClick={this.onEdit}>Edit</button>
            </div>
          )
        }

        </div>
      );
    }
  }
  
  
  
  export default MultiChoice;

