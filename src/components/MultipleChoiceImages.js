import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'm3zoe3sx';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/landahoy55/upload';

class MultipleChoiceImages extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            correctAnswer: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            uploadedFileCloudinaryURL: ''
        };

        this.questionSet = this.questionSet.bind(this);
        this.answer1Set = this.answer1Set.bind(this);
        this.answer2Set = this.answer2Set.bind(this);
        this.answer3Set = this.answer3Set.bind(this);
        this.answer4Set = this.answer4Set.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
    }

    onImageDrop(files, rejectedFiles) {

        //Docs suggest that a second parameter should allow for error handling. Not working.
        if (rejectedFiles) {
            console.log("REJECTED FILES")
            alert("Not correct file type")
            return
        }

        //cloudinary returns images array. Only single image - so at position one
        this.setState({
            uploadedFile: files[0],
            fileError: ''
        })

        this.handleImageUpload(files[0])

    }

    handleImageUpload(file) {
    //post image to cloudinary
     let upload = request.post(CLOUDINARY_UPLOAD_URL)
                    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                    .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.log(err)
            }

            if (response.body.secure_url !== '') {
                this.questionNumber = this.props.questionNumber - 1;
                this.props.onImageURLset(response.body.secure_url, this.questionNumber)
                this.setState({
                    //image url - add to database...
                    uploadedFileCloudinaryURL: response.body.secure_url
                });
            }
        });
    }


    questionSet = (e) => {
        const question = e.target.value;
        this.setState({
            question: question
        })
        const questionNumber = this.props.questionNumber - 1
        this.props.onQuestionSet(question, questionNumber)
    } 
    
    answer1Set = (e) => {
        const answer1 = e.target.value;
        this.setState({
            answer1: answer1
        })
        const questionNumber = this.props.questionNumber - 1
        this.props.onAnswerSet(questionNumber, answer1, 'answer1')
    }

    answer2Set = (e) => {
        const answer2 = e.target.value;
        this.setState({
            answer2: answer2
        })
        const questionNumber = this.props.questionNumber - 1
        this.props.onAnswerSet(questionNumber, answer2, 'answer2')
    }

    answer3Set = (e) => {
        const answer3 = e.target.value;
        this.setState({
            answer3: answer3
        })

        const questionNumber = this.props.questionNumber - 1
        this.props.onAnswerSet(questionNumber, answer3, 'answer3')
    }

    answer4Set = (e) => {
        const answer4 = e.target.value;
        this.setState({
            answer4: answer4
        })

        const questionNumber = this.props.questionNumber - 1
        this.props.onAnswerSet(questionNumber, answer4, 'answer4')
    }

    radioChange = (e) => {

        console.log(e.target.value);

        const answerSelected = e.target.value;
        let correctAnswer = '';

        const questionNumber = this.props.questionNumber - 1
        
        switch(answerSelected) {
            case 'answer1':
                correctAnswer = this.state.answer1
                this.props.onCorrectAnswerSet(questionNumber, correctAnswer)
                break;
            case 'answer2':
                correctAnswer = this.state.answer2
                this.props.onCorrectAnswerSet(questionNumber, correctAnswer)
                break;
            case 'answer3':
                correctAnswer = this.state.answer3
                this.props.onCorrectAnswerSet(questionNumber, correctAnswer)
                break;
            case 'answer4':
                correctAnswer = this.state.answer4
                this.props.onCorrectAnswerSet(questionNumber, correctAnswer)
                break;
        }

        this.setState({
            correctAnswer: correctAnswer
        })
    }

    // setQuestionClicked(event) {
    //     event.preventDefault();
    //     console.log("Button clicked.");
    //     this.props.onQuestionSet("test","test");
    // }

    render() {

        //move to css file?
        const dropzoneStyle = {
            width  : "20%",
            height : "20%",
            border : "2px dashed #442DB3"
        };

        const imageStyle = {
            width : "200px"
        }
        
    
      return (
        <div className="list-group-item">   
        
            <div className="row">
                <div className="col-sm-2">
                 <label htmlFor="challengeType" className="col-form-label">Question: {this.props.questionNumber}</label>
                </div>
                    <div className="col-sm-10">
                        <input className="form-control" placeholder="Enter a question..." onBlur={this.questionSet} ref={question1 => this.question1 = question1}/>
                    
                        { this.props.questionNumber === 1 ? (
                            <span className="text-danger">{this.props.question1Error}</span>
                        ) : (
                            <span></span>
                        )}

                        { this.props.questionNumber === 2 ? (
                            <span className="text-danger">{this.props.question2Error}</span>
                        ) : (
                            <span></span>
                        )}

                        { this.props.questionNumber === 3 ? (
                            <span className="text-danger">{this.props.question3Error}</span>
                        ) : (
                            <span></span>
                        )}

                        { this.props.questionNumber === 4 ? (
                            <span className="text-danger">{this.props.question4Error}</span>
                        ) : (
                            <span></span>
                        )}

                        { this.props.questionNumber === 5 ? (
                            <span className="text-danger">{this.props.question5Error}</span>
                        ) : (
                            <span></span>
                        )}
                    </div>   
                </div>
                <div className="row">
                    <div className="col-sm-6">
                            <input className="form-control" placeholder="Possible answer..." onBlur={this.answer1Set} ref={answer1Input => this.answer1Input = answer1Input}/>
                    </div>
                    <div className="col-sm-6">
                        <div className="radio">
                            <label className="radio-inline"><input type="radio" value="answer1" name={this.props.questionNumber} onChange={this.radioChange}/> Correct answer</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <input className="form-control" placeholder="Possible answer..." onBlur={this.answer2Set} ref={answer2Input => this.answer2Input = answer2Input}/>
                    </div>
                    <div className="col-sm-6">
                        <input type="radio" value="answer2" name={this.props.questionNumber} onChange={this.radioChange} /> Correct answer<br/>
                    </div>
                </div>
                <div className="row">
                     <div className="col-sm-6">
                        <input className="form-control" placeholder="Possible answer..." onBlur={this.answer3Set} ref={answer3Input => this.answer3Input = answer3Input}/>
                    </div>
                    <div className="col-sm-6">
                        <input type="radio" value="answer3" name={this.props.questionNumber} onChange={this.radioChange} /> Correct answer<br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <input className="form-control" placeholder="Possible answer..." onBlur={this.answer4Set} ref={answer4Input => this.answer4Input = answer4Input}/>
                   </div>
                   <div className="col-sm-6">
                        <input type="radio" value="answer4" name={this.props.questionNumber} onChange={this.radioChange} /> Correct answer<br/>
                    </div>
                </div>
                 
                    { this.props.questionNumber === 1 ? (
                        <span className="text-danger">{this.props.question1AnswersError} {this.props.correctAnswer1Selected}</span>
                    ) : (
                        <span></span>
                    )}

                    { this.props.questionNumber === 2 ? (
                        <span className="text-danger">{this.props.question2AnswersError} {this.props.correctAnswer2Selected}</span>
                    ) : (
                        <span></span>
                    )}

                    { this.props.questionNumber === 3 ? (
                        <span className="text-danger">{this.props.question3AnswersError} {this.props.correctAnswer3Selected}</span>
                    ) : (
                        <span></span>
                    )}

                    { this.props.questionNumber === 4 ? (
                        <span className="text-danger">{this.props.question4AnswersError} {this.props.correctAnswer4Selected}</span>
                    ) : (
                        <span></span>
                    )}

                    { this.props.questionNumber === 5 ? (
                        <span className="text-danger">{this.props.question5AnswersError} {this.props.correctAnswer5Selected}</span>
                    ) : (
                        <span></span>
                    )}

                    {this.state.uploadedFileCloudinaryURL ? 
                        (
                            <div>
                            {this.state.uploadedFileCloudinaryURL === '' ? null : 
                                <div>
                                    <img style={imageStyle} alt={this.state.uploadedFile.name} src={this.state.uploadedFileCloudinaryURL} />
                                 </div>
                                 }
                             </div>
                        ) 
                        : 
                        (
                            <div>
                                <Dropzone
                                    multiple={false}
                                    accept="image/*"
                                    onDrop={this.onImageDrop}
                                    style={dropzoneStyle}
                                >
                                    <p>Drag in an image, or click to upload</p>
                                </Dropzone>
                                     <p className="text-danger">{this.state.fileError}</p>
                            </div>
                        )
                    }
                    

                    

        </div>
      );
    }
  }
  
  
  
  export default MultipleChoiceImages;