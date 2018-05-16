import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MuliChoiceStyles from './MultiChoice.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'm3zoe3sx';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/landahoy55/upload';

class ImageMultiChoice extends Component {
    
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
            answer4: this.props.question.answers[3].answer,
            imageurl: this.props.question.imageurl,
            uploadedFileCloudinaryURL: ''
        }

        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        console.log("QUESTION image url", this.props.question.imageurl)

    }

    componentDidMount(){
        if (this.state.answer1 == this.state.answer2 && this.state.answer1 == this.state.answer3 && this.state.answer1 == this.state.answer4) {
            this.setState({
                sameAnswers: "Update answers!"
            })
        }
    }

    onImageDrop(files, rejectedFiles) {

       if (rejectedFiles) {
           console.log("REJECTED FILES")
           alert("Not correct file type")
           return
       }

        //Docs suggest that a second parameter should allow for error handling. Not working.
        // if (rejected) {
        //     console.log("Incorrect file")
        //     this.setState({
        //         fileError: 'Incorrect file type'
        //     })
        // }

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
                // this.questionNumber = this.props.questionNumber - 1;
                // this.props.onImageURLset(response.body.secure_url, this.questionNumber)
                this.setState({
                    //image url - add to database...
                    uploadedFileCloudinaryURL: response.body.secure_url
                });
            }
        });
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


        //conditional - only update new image if url is present
        let imageurl = this.state.imageurl
   
        if (this.state.uploadedFileCloudinaryURL != '') {     
            imageurl = this.state.uploadedFileCloudinaryURL
        }

        console.log("IMAGE URL ONCE NEW IMAGE UPLOADED", imageurl)

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
                imageurl: imageurl
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
                            imageurl: imageurl,
                            errorMessage: '',
                            sameAnswers:''
                        });
            })
            .catch(function (error) {
                    console.log(error);
                    alert("Issue updating subtopic")
            });

            this.setState({isEdit: false});
        }
    }

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
                            {this.state.correctAnswer == this.state.answer1
                                ? 
                                (<div><input type="radio" value={this.state.answer1} name="radiotimes" checked onChange={this.radioChange}/> Answer<br/></div>):
                                (<div><input type="radio" value={this.state.answer1} name="radiotimes" onChange={this.radioChange}/> Answer<br/></div>)
                            }
                            
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="answer2Input" className="col-sm-2 col-form-label"><b>Answer 2: </b></label>
                        <div className="col-sm-8">
                            <input className="form-control" placeholder="Possible Answer" ref={answer2Input => this.answer2Input = answer2Input} defaultValue={this.state.answer2} />
                        </div>
                        <div className="radio col-sm-2">
                            {this.state.correctAnswer == this.state.answer2
                                ? 
                                (<div><input type="radio" value={this.state.answer2} name="radiotimes" checked onChange={this.radioChange}/> Answer<br/></div>):
                                (<div><input type="radio" value={this.state.answer2} name="radiotimes" onChange={this.radioChange}/> Answer<br/></div>)
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="answer3Input" className="col-sm-2 col-form-label"><b>Answer 3: </b></label>
                        <div className="col-sm-8">
                            <input className="form-control" placeholder="Possible Answer" ref={answer3Input => this.answer3Input = answer3Input} defaultValue={this.state.answer3} />
                        </div>
                        <div className="radio col-sm-2">
                            {this.state.correctAnswer == this.state.answer3
                                ? 
                                (<div><input type="radio" value={this.state.answer3} name="radiotimes" checked onChange={this.radioChange}/> Answer<br/></div>):
                                (<div><input type="radio" value={this.state.answer3} name="radiotimes" onChange={this.radioChange}/> Answer<br/></div>)
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="answer4Input" className="col-sm-2 col-form-label"><b>Answer 4: </b></label>
                        <div className="col-sm-8">
                            <input className="form-control" placeholder="Possible Answer" ref={answer4Input => this.answer4Input = answer4Input} defaultValue={this.state.answer4} />
                        </div>
                        <div className="radio col-sm-2">
                        {this.state.correctAnswer == this.state.answer4
                            ? 
                            (<div><input type="radio" value={this.state.answer4} name="radiotimes" checked onChange={this.radioChange}/> Answer<br/></div>):
                            (<div><input type="radio" value={this.state.answer4} name="radiotimes" onChange={this.radioChange}/> Answer<br/></div>)
                        }
                        </div>
                    </div>
                    
                    {
                        this.state.imageurl !== this.state.uploadedFileCloudinaryURL &&
                        <div>
                            <img style={imageStyle} alt={this.state.imageurl} src={this.state.imageurl} />
                        </div>
                    }
                    

                    {this.state.uploadedFileCloudinaryURL ? 
                        (
                            <div>
                            {
                                this.state.uploadedFileCloudinaryURL === '' ? 
                                <div>
                                    <img style={imageStyle} alt={this.state.imageurl} src={this.state.imageurl} />
                                 </div>
                                : 
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

                    <p className="text-danger">{this.state.errorMessage}</p>
                    <button className="btn btn-success">Save</button>
            </form> 
          )
          :(
            <div>
                <p><b>Question:</b> {this.state.question}</p>
                <p><b>Correct Answer:</b>{this.state.correctAnswer}</p>
                <p className="text-danger">{this.state.sameAnswers}</p>
                <button className="btn btn-primary multiChoiceEdit" onClick={this.onEdit}>Edit</button>
            </div>
          )
        }

        </div>
      );
    }
  }
  
  
  
  export default ImageMultiChoice;

