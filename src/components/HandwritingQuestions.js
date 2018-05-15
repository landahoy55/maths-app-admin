import React, { Component } from 'react';

class HandWritingQuestions extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            correctAnswer: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: ''
        };

        this.questionSet = this.questionSet.bind(this);
        this.correctAnswerSet = this.correctAnswerSet.bind(this);
    }
    
    questionSet = (e) => {
        const question = e.target.value;
        this.setState({
            question: question
        })
        const questionNumber = this.props.questionNumber - 1
        this.props.onQuestionSet(question, questionNumber)
    }

    correctAnswerSet = (e) => {
        const correctAnswer = e.target.value;


        //check if number...
        //if is a two digit number and only two characters

        // isNaN(correctAnswer) &&
        if (correctAnswer.length > 2 || isNaN(correctAnswer)) {
            // alert("NOT A NUMBER")
            console.log("ANSWER LENGTH", correctAnswer.length)
            this.setState({
                errorMessage:"Make sure the answer is a two digit number"
            })
            return
        }

        this.setState({
            correctAnswer: correctAnswer,
            answer1: correctAnswer,
            answer2: correctAnswer,
            answer3: correctAnswer,
            answer4: correctAnswer,
            errorMessage: ""
        })
        const questionNumber = this.props.questionNumber - 1
        this.props.onCorrectAnswerSet(questionNumber, correctAnswer)
        this.props.onAnswerSet(questionNumber, correctAnswer, 'answer1')
        this.props.onAnswerSet(questionNumber, correctAnswer, 'answer2')
        this.props.onAnswerSet(questionNumber, correctAnswer, 'answer3')
        this.props.onAnswerSet(questionNumber, correctAnswer, 'answer4')
    }

    render() {
    
      return (
        <div className="list-group-item"> 
        <label for="challengeType" class="col-form-label">Question Number: {this.props.questionNumber}</label>
                <input class="form-control" placeholder="Question" onBlur={this.questionSet} ref={question1 => this.question1 = question1}/>            
                <input class="form-control" placeholder="Answer" onBlur={this.correctAnswerSet} ref={question1Answer1Input => this.question1Answer1Input = question1Answer1Input}/>

                <div className="text-danger">{this.state.errorMessage}</div>

                { this.props.questionNumber === 1 ? (
                    <span className="text-danger">{this.props.question1Error} {this.props.inputAnswer1Error}</span>
                ) : (
                    <span></span>
                )}

                { this.props.questionNumber === 2 ? (
                    <span className="text-danger">{this.props.question2Error} {this.props.inputAnswer2Error}</span>
                ) : (
                    <span></span>
                )}

                { this.props.questionNumber === 3 ? (
                    <span className="text-danger">{this.props.question3Error} {this.props.inputAnswer3Error}</span>
                ) : (
                    <span></span>
                )}

                { this.props.questionNumber === 4 ? (
                    <span className="text-danger">{this.props.question4Error} {this.props.inputAnswer4Error}</span>
                ) : (
                    <span></span>
                )}

                { this.props.questionNumber === 5 ? (
                    <span className="text-danger">{this.props.question5Error} {this.props.inputAnswer5Error}</span>
                ) : (
                    <span></span>
                )}
        </div>
      );
    }
  }
  
  
  
  export default HandWritingQuestions;