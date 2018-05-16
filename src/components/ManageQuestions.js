import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Topic from './Topic';
import ManageQuestionsStyles from './ManageQuestions.css';

class ManageQuestions extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            topics: [],
            triggerReload: true
        };

        this.addTopic = this.addTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
    }

    addTopic(){
        console.log("Clicked")
    }

    deleteTopic(topic){
        console.log("delete clicked", topic)
        let currentComponent = this
        // let topic = topic
       
        // delete topic
        //https://morning-journey-26383.herokuapp.com/v1/topic/deletetopic/:id
        // delete subtopics
        //https://morning-journey-26383.herokuapp.com/v1/subtopic/deletesubtopic/:id
        // delete topic results
        // https://morning-journey-26383.herokuapp.com/v1/topicresult/deletetopicresults/:id
        // delete subtopic results
        // https://morning-journey-26383.herokuapp.com/v1/subtopicresult/deletesubresults/:id
        // get topics again
        // https://morning-journey-26383.herokuapp.com/v1/topic

        // 1 - delete topic
        // axios.delete('https://morning-journey-26383.herokuapp.com/v1/topic/deletetopic/' + topic._id)
        //     .then(function (response){
        //         console.log("Topic deleted")
        //     })
        //     .catch(function (error) {
        //         console.log("Topic deletion error", error)
        //     });

        // // 2 - delete subtopics
        // //loop over subtopics
        // for (let subTopic of topic.subTopics) {
        //     axios.delete('https://morning-journey-26383.herokuapp.com/v1/subtopic/deletesubtopic/' + subTopic._id)
        //     .then(function (response){
        //         console.log("Subtopic deleted", subTopic._id)
        //     })
        //     .catch(function (error) {
        //         console.log("subtopic deletion error", error)
        //     });
        // }

        // //3 - deleting all related topic results
        // axios.delete('https://morning-journey-26383.herokuapp.com/v1/topicresult/deletetopicresults/' + topic._id)
        //     .then(function (response){
        //         console.log("Topic results deleted", response)
        //     })
        //     .catch(function (error) {
        //         console.log("Topic results deletion error", error)
        //     });

        // //4 - delete all related subtopic results
        // for (let subTopic of topic.subTopics) {
        //     axios.delete('https://morning-journey-26383.herokuapp.com/v1/subtopicresult/deletesubresults/' + subTopic._id)
        //     .then(function (response){
        //         console.log("Subtopic results deleted", subTopic._id)
        //     })
        //     .catch(function (error) {
        //         console.log("subtopic results deletion error", error)
        //     });
        // }

         // 2 - delete subtopics
        //loop over subtopics
        for (let subTopic of topic.subTopics) {
            axios.delete('https://morning-journey-26383.herokuapp.com/v1/subtopic/deletesubtopic/' + subTopic._id)
            .then(function (response){
                console.log("Subtopic deleted", subTopic._id)
            })
            .catch(function (error) {
                console.log("subtopic deletion error", error)
            });
        }

        // // // 2 - delete subtopics
        // //loop over subtopics
        // for (let subTopic of topic.subTopics) {
        //     axios.delete('https://morning-journey-26383.herokuapp.com/v1/subtopic/deletesubtopic/' + subTopic._id)
        //     .then(function (response){
        //         console.log("Subtopic deleted", subTopic._id)
        //     })
        //     .catch(function (error) {
        //         console.log("subtopic deletion error", error)
        //     });
        // }

        //4 - delete all related subtopic results
        for (let subTopic of topic.subTopics) {
            axios.delete('https://morning-journey-26383.herokuapp.com/v1/subtopicresult/deletesubresults/' + subTopic._id)
            .then(function (response){
                console.log("Subtopic results deleted", subTopic._id)
            })
            .catch(function (error) {
                console.log("subtopic results deletion error", error)
            });
        }

         // 1 - delete topic
        axios.delete('https://morning-journey-26383.herokuapp.com/v1/topic/deletetopic/' + topic._id)
            .then(function (response){
                console.log("Topic deleted")

                axios.get('https://morning-journey-26383.herokuapp.com/v1/topic')
                    .then(function (response) {
                        console.log(response.data);
                        currentComponent.setState({
                            topics: response.data,
                            isLoading: false
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Error getting topics")
                });

            })
            .catch(function (error) {
                console.log("Topic deletion error", error)
                alert("Error deleteing topic")
        });


        axios.delete('https://morning-journey-26383.herokuapp.com/v1/topicresult/deletetopicresults/' + topic._id)
            .then(function (response){
                console.log("Topic results deleted", response)

            })
            .catch(function (error) {
                console.log("Topic results deletion error", error)
                alert("Error deleting results")
        });
     

        //refresh once complete

        //perform networking
        // axios.get('https://morning-journey-26383.herokuapp.com/v1/topic')
        //     .then(function (response) {
        //         console.log(response.data);
        //         currentComponent.setState({
        //             topics: response.data,
        //             isLoading: false
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        // });

    }

    componentDidMount() {

        console.log("mounting", this.state.render);
        let currentComponent = this

        //perform networking
        axios.get('https://morning-journey-26383.herokuapp.com/v1/topic')
            .then(function (response) {
                console.log(response.data);
                currentComponent.setState({
                    topics: response.data,
                    isLoading: false
                })
            })
            .catch(function (error) {
                console.log(error);
                alert("Error getting topics")
            });
    }

    render() {
    
      return (
        <div className="Challenge Wrapper">
            <div className="page-header">
                <h3>Manage Questions</h3>
                <h6>From here you can add, delete, and amend topics and questions</h6>
            </div>

            <div className="list-group addTopicHeaderParent">
                 <div className="list-group-item addTopicHeader">
                    <div>
                        <h3 className="list-group-item-text">Add a new topic and related questions</h3>
                        <Link className="btn btn-primary btnAdd" to="/addtopic">Add Topic</Link>
                    </div>
                </div>
            </div>

            <div className="page-header editTopic">
                <h3>Edit an existing topic</h3>
            </div>



            { this.state.isLoading ? 
                
                (<p>Loading</p>)
                
                : 
            
                (
                <div className="list-group">
                   
                    {this.state.topics.map(topic => {
                        return (
                            <Topic delete={this.deleteTopic} key={topic._id} topic={topic}/>
                        );
                    })}  
                </div>
                )
            }
            
        </div>
      );
    }
  }
  
  export default ManageQuestions;