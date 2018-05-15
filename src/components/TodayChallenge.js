import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import InputQuestion from './InputQuestion';

class TodayChallenge extends Component {
    
    constructor(props) {
        super(props);

        // //bind function
        // this.onNotificationSubmit = this.onNotificationSubmit.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.onQuestionSet = this.onQuestionSet.bind(this);
        this.onAnswerSet = this.onAnswerSet.bind(this);
        this.onCorrectAnswerSet = this.onCorrectAnswerSet.bind(this);
        this.submitChallenge = this.submitChallenge.bind(this);
        // this.validate = this.validate.bind(this);

        this.state = {
            confirmationMessage: '',
            type: 'multiplechoice',
            playdate: '',
            description: '',
            descriptionError: '',
            question1Error:'',
            question2Error:'',
            question3Error:'',
            question4Error:'',
            question5Error:'',
            question1AnswersError:'',
            question2AnswersError:'',
            question3AnswersError:'',
            question4AnswersError:'',
            question5AnswersError:'',
            correctAnswer1Selected: '',
            correctAnswer2Selected: '',
            correctAnswer3Selected: '',
            correctAnswer4Selected: '',
            correctAnswer5Selected: '',
            inputAnswer1Error: '',
            inputAnswer2Error: '',
            inputAnswer3Error: '',
            inputAnswer4Error: '',
            inputAnswer5Error: '',
            questions:[
                {
                    question:'',
                    correctAnswer:'',
                    answers: [
                        {answer:''},
                        {answer:''},
                        {answer:''},
                        {answer:''} 
                    ]     
                },
                {
                    question:'',
                    correctAnswer:'',
                    answers: [
                        {answer:''},
                        {answer:''},
                        {answer:''},
                        {answer:''} 
                    ]
                },
                {
                    question:'',
                    correctAnswer:'',
                    answers: [
                        {answer:''},
                        {answer:''},
                        {answer:''},
                        {answer:''} 
                    ]
                },
                {
                    question:'',
                    correctAnswer:'',
                    answers: [
                        {answer:''},
                        {answer:''},
                        {answer:''},
                        {answer:''} 
                    ]
                },
                {
                    question:'',
                    correctAnswer:'',
                    answers: [
                        {answer:''},
                        {answer:''},
                        {answer:''},
                        {answer:''} 
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        this.setState({
            playdate: parseInt(moment().format("YYYYMMDD"))
        })
    }

    challengetype = (e) => {
        const type = e.target.value;
        this.setState({
            type: type
        })
    }

    setDescription = (e) => {
        const description = e.target.value;
        this.setState({
            description: description
        })
    }

    onQuestionSet(inputQ, questionNumber) {
        console.log("Question set triggered");
    
        let questionsCopy = this.state.questions;

        questionsCopy[questionNumber].question = inputQ

        this.setState({
            questions: questionsCopy
        })

        console.log('New question entered', this.state.questions[questionNumber].question)
    }

    onAnswerSet(questionNumb, inputAns, answerNumb) {

        let questionsCopy = this.state.questions;
        console.log("ANSWER IN MAIN COMPONENT:", inputAns);
        console.log("ANSWER NUMBER", answerNumb);
        
        //switch on answer number...
        // questionsCopy[questionNumb].answerNumb = inputAns
        
        switch(answerNumb) {
            case 'answer1':
                questionsCopy[questionNumb].answers[0].answer = inputAns
                
                this.setState({
                    questions: questionsCopy
                })
                console.log("New answer entered", this.state.questions[questionNumb].answers[0].answer)
                break;

            case 'answer2':
                questionsCopy[questionNumb].answers[1].answer = inputAns

                this.setState({
                    questions: questionsCopy
                })
                console.log("New answer entered", this.state.questions[questionNumb].answers[1].answer)
                break;

            case 'answer3':
                questionsCopy[questionNumb].answers[2].answer = inputAns
                this.setState({
                    questions: questionsCopy
                })
                console.log("New answer entered", this.state.questions[questionNumb].answers[2].answer)
                break;

            case 'answer4':
                questionsCopy[questionNumb].answers[3].answer = inputAns
                this.setState({
                    questions: questionsCopy
                })
                console.log("New answer entered", this.state.questions[questionNumb].answers[3].answer)
                break;
        }
    }

    onCorrectAnswerSet(questionNumber, correctAns) {

        let questionsCopy = this.state.questions;
        questionsCopy[questionNumber].correctAnswer = correctAns

        this.setState({
            questions: questionsCopy
        })
    }

    validate = () => {
        
        let isError = false;
        const errors = {}

        //check for empty string in description
        if (this.state.description.length < 1) {
            isError = true;
            errors.description = "Description is blank";
        }

        //check for empty question 1
        if (this.state.questions[0].question.length < 1) {
            isError = true;
            errors.question1 = "The question is blank";
        }

        //check for empty question 2
        if (this.state.questions[1].question.length < 1) {
            isError = true;
            errors.question2 = "The question is blank";
        }

        //check for empty question 3
        if (this.state.questions[2].question.length < 1) {
            isError = true;
            errors.question3 = "The question is blank";
        }

        //check for empty question 4
        if (this.state.questions[3].question.length < 1) {
            isError = true;
            errors.question4 = "The question is blank";
        }

        //check for empty question 5 
        if (this.state.questions[4].question.length < 1) {
            isError = true;
            errors.question5 = "The question is blank";
        }

        //ANSWER VALIDATION
        if (this.state.questions[0].answers[0].answer < 1 || this.state.questions[0].answers[1].answer < 1 || this.state.questions[0].answers[2].answer < 1 || this.state.questions[0].answers[3].answer < 1) {
            isError = true
            errors.answer1 = "Oops, is an answer blank?"
            errors.inputAnswer1Error = "An answer is required"
        }

        if (this.state.questions[1].answers[0].answer < 1 || this.state.questions[1].answers[1].answer < 1 || this.state.questions[1].answers[2].answer < 1 || this.state.questions[1].answers[3].answer < 1) {
            isError = true
            errors.answer2 = "Oops, is an answer blank?"
            errors.inputAnswer2Error = "An answer is required"
        }

        if (this.state.questions[2].answers[0].answer < 1 || this.state.questions[2].answers[1].answer < 1 || this.state.questions[2].answers[2].answer < 1 || this.state.questions[2].answers[3].answer < 1) {
            isError = true
            errors.answer3 = "Oops, is an answer blank?"
            errors.inputAnswer3Error = "An answer is required"
        }

        if (this.state.questions[3].answers[0].answer < 1 || this.state.questions[3].answers[1].answer < 1 || this.state.questions[3].answers[2].answer < 1 || this.state.questions[3].answers[3].answer < 1) {
            isError = true
            errors.answer4 = "Oops, is an answer blank?"
            errors.inputAnswer4Error = "An answer is required"
        }

        if (this.state.questions[4].answers[0].answer < 1 || this.state.questions[4].answers[1].answer < 1 || this.state.questions[4].answers[2].answer < 1 || this.state.questions[4].answers[3].answer < 1) {
            isError = true
            errors.answer5 = "Oops, is an answer blank?"
            errors.inputAnswer5Error = "An answer is required"
        }

        
        //Check answers
        if (!this.state.questions[0].correctAnswer) {
            isError = true;
            errors.correctAnswer1 = "Choose a correct answer";
        }
        if (!this.state.questions[1].correctAnswer) {
            isError = true;
            errors.correctAnswer2 = "Choose a correct answer";
        }
        
        if (!this.state.questions[2].correctAnswer) {
            isError = true;
            errors.correctAnswer3 = "Choose a correct answer";
        }

        if (!this.state.questions[3].correctAnswer) {
            isError = true;
            errors.correctAnswer4 = "Choose a correct answer";
        }

         if (!this.state.questions[4].correctAnswer) {
            isError = true;
            errors.correctAnswer5 = "Choose a correct answer";
        }

        //append errors to state
        if (isError) {
            this.setState({
                descriptionError: errors.description,
                question1Error:errors.question1,
                question2Error:errors.question2,
                question3Error:errors.question2,
                question4Error:errors.question2,
                question5Error:errors.question2,
                question1AnswersError:errors.answer1,
                question2AnswersError:errors.answer2,
                question3AnswersError:errors.answer3,
                question4AnswersError:errors.answer4,
                question5AnswersError:errors.answer5,
                correctAnswer1Selected: errors.correctAnswer1,
                correctAnswer2Selected: errors.correctAnswer2,
                correctAnswer3Selected: errors.correctAnswer3,
                correctAnswer4Selected: errors.correctAnswer4,
                correctAnswer5Selected: errors.correctAnswer5,
                inputAnswer1Error: errors.inputAnswer1Error,
                inputAnswer2Error: errors.inputAnswer2Error,
                inputAnswer3Error: errors.inputAnswer3Error,
                inputAnswer4Error: errors.inputAnswer4Error,
                inputAnswer5Error: errors.inputAnswer5Error,

            })
        }

       
        return isError;
    }

    // "playdate":20180323
    // createDate = () => {

    //     let date = moment().format("YYYYMMDD");
    //     return date;
    // }

    //replace function
    //remove elements from json.stringify
    //fields to remove
    // descriptionError: '',
    // question1Error:'',
    // question2Error:'',
    // question3Error:'',
    // question4Error:'',
    // question5Error:'',
    // question1AnswersError:'',
    // question2AnswersError:'',
    // question3AnswersError:'',
    // question4AnswersError:'',
    // question5AnswersError:'',
    // correctAnswer1Selected: '',
    // correctAnswer2Selected: '',
    // correctAnswer3Selected: '',
    // correctAnswer4Selected: '',
    // correctAnswer5Selected: '',
    // inputAnswer1Error: '',
    // inputAnswer2Error: '',
    // inputAnswer3Error: '',
    // inputAnswer4Error: '',
    // inputAnswer5Error: '',

    replacer = (key, value) => {
        if (key==="descriptionError") return undefined;
        else if (key==="question1Error") return undefined;
        else if (key==="question2Error") return undefined;
        else if (key==="question3Error") return undefined;
        else if (key==="question4Error") return undefined;
        else if (key==="question5Error") return undefined;
        else if (key==="question1AnswersError") return undefined;
        else if (key==="question2AnswersError") return undefined;
        else if (key==="question3AnswersError") return undefined;
        else if (key==="question4AnswersError") return undefined;
        else if (key==="question5AnswersError") return undefined;
        else if (key==="correctAnswer1Selected") return undefined;
        else if (key==="correctAnswer2Selected") return undefined;
        else if (key==="correctAnswer3Selected") return undefined;
        else if (key==="correctAnswer4Selected") return undefined;
        else if (key==="correctAnswer5Selected") return undefined;
        else if (key==="inputAnswer1Error") return undefined;
        else if (key==="inputAnswer2Error") return undefined;
        else if (key==="inputAnswer3Error") return undefined;
        else if (key==="inputAnswer4Error") return undefined;
        else if (key==="inputAnswer5Error") return undefined;
        else return value;
    }

    submitChallenge = (e) => {
        e.preventDefault();

        console.log("Button clicked");
        // set date
        // const date = this.createDate()
        // console.log("DATE CREATED", date)
        //Error handling - check for blanks
        const err = this.validate();

        //if error doesn't exist move on.
        console.log(err)
        if (!err) {

            console.log("FORM IS VALID");

            //clear errors
            this.setState({
                descriptionError: '',
                question1Error:'',
                question2Error:'',
                question3Error:'',
                question4Error:'',
                question5Error:'',
                question1AnswersError:'',
                question2AnswersError:'',
                question3AnswersError:'',
                question4AnswersError:'',
                question5AnswersError:'',
                correctAnswer1Selected: '',
                correctAnswer2Selected: '',
                correctAnswer3Selected: '',
                correctAnswer4Selected: '',
                correctAnswer5Selected: '',
                inputAnswer1Error: '',
                inputAnswer2Error: '',
                inputAnswer3Error: '',
                inputAnswer4Error: '',
                inputAnswer5Error: ''
            })

            // Configure json - remove other fields

            // alert(JSON.stringify(x, replacer));
            //showing correctly.
            console.log(JSON.stringify(this.state, this.replacer, 2))
            
            // showing incorrectly.
            const results = JSON.stringify(this.state, this.replacer);
            console.log("RESULTS", results);
            
            //clear form - set state to blank? or go back - use history?
            let currentComponent = this

            //submit to server - replace not needed. AXIOS handles JSON parsing. Object was being parsed twice...
            axios.post('https://morning-journey-26383.herokuapp.com/v1/dailychallenge/add', this.state )
              .then(function (response) {
                console.log("LOGGED DAILY CHALLENGE");
                console.log(response);
                
                currentComponent.setState({
                    confirmationMessage: 'Challenge successfully published'
                })

                //push to different page.
                currentComponent.props.history.push("/challengesuccessfullyposted");

              })
              .catch(function (error) {
                console.log("ERROR SENDING DAILY CHALLENGE");
                console.log(error);

                currentComponent.setState({
                    confirmationMessage: 'There was an issue publishing the challenge'
                })

              });
        
            //   Inform the user that everything has gone ok...
            //present message on screen.
            //clear form
        
        }

    }

    render() {
    
      return (
        <div className="Wrapper">

            <div className="page-header">
                <h1>Today Challenge</h1>
                <h6>Create today's unique challenge</h6>
            </div>
            
            <div className="list-group">
            
                <form onSubmit={this.onChallengeSubmit} > 
                    
                    <div className="list-group-item">
                        <label for="challengeType" class="col-form-label">Challenge Type</label>
                        <select class="form-control"
                            name="challengeType"
                            onChange={this.challengetype}
                            >
                                <option value="multiplechoice">Multiple Choice</option>
                                <option value="input">Input</option>
                        </select>
                    

                        <label for="challengeDesc" class="col-form-label">Description</label>
                        <input class="form-control" placeholder="Challenge Description" onBlur={this.setDescription} ref={notificationInput => this.notificationInput = notificationInput}/>    
                        <span>{this.state.descriptionError}</span>
                    
                    </div>

                    { this.state.type === 'multiplechoice' ? 
                        (
                        <div className="list-group">
                            {this.state.questions.map((question,index) => {
                                return (
                                    <MultipleChoiceQuestion 
                                                key={index+1}
                                                questionNumber={index+1}
                                                onQuestionSet = {this.onQuestionSet}
                                                onAnswerSet = {this.onAnswerSet}
                                                onCorrectAnswerSet = {this.onCorrectAnswerSet}
                                                question1Error = {this.state.question1Error}
                                                question2Error = {this.state.question2Error}
                                                question3Error = {this.state.question3Error}
                                                question4Error = {this.state.question4Error}
                                                question5Error = {this.state.question5Error}
                                                question1AnswersError = {this.state.question1AnswersError}
                                                question2AnswersError = {this.state.question2AnswersError}
                                                question3AnswersError = {this.state.question3AnswersError}
                                                question4AnswersError = {this.state.question4AnswersError}
                                                question5AnswersError = {this.state.question5AnswersError}
                                                correctAnswer1Selected = {this.state.correctAnswer1Selected}
                                                correctAnswer2Selected = {this.state.correctAnswer2Selected}
                                                correctAnswer3Selected = {this.state.correctAnswer3Selected}
                                                correctAnswer4Selected = {this.state.correctAnswer4Selected}
                                                correctAnswer5Selected = {this.state.correctAnswer5Selected}
                                    />
                                )
                            })}
                        </div>
                        )
                    : 
                        (
                        <div className="list-group">
                            {this.state.questions.map((question,index) => {
                                return (
                                    <InputQuestion 
                                                key={index+1}
                                                questionNumber={index+1}
                                                onQuestionSet = {this.onQuestionSet}
                                                onAnswerSet = {this.onAnswerSet}
                                                onCorrectAnswerSet = {this.onCorrectAnswerSet}  
                                                question1Error = {this.state.question1Error}
                                                question2Error = {this.state.question2Error}
                                                question3Error = {this.state.question3Error}
                                                question4Error = {this.state.question4Error}
                                                question5Error = {this.state.question5Error}
                                                inputAnswer1Error = {this.state.inputAnswer1Error}
                                                inputAnswer2Error = {this.state.inputAnswer2Error}
                                                inputAnswer3Error = {this.state.inputAnswer3Error}
                                                inputAnswer4Error = {this.state.inputAnswer4Error}
                                                inputAnswer5Error = {this.state.inputAnswer5Error}
                                    />
                                )
                            })}
                        </div>
                        )
                    }
                
                    <button className="btn btn-primary" onClick={this.submitChallenge}>Publish Challenge</button>

                </form>
                <p>{this.state.confirmationMessage}</p>
            </div>
        </div>
      );
    }
  }
  
  
export default withRouter(TodayChallenge);
