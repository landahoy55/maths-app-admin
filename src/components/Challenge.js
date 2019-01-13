import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChallengeStyles from './Challenge.css';
import moment from 'moment';

class Challenge extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isChallenge: false
        }
    }

    componentDidMount(){

      //date required as...
      var date = new Date();
      var formattedDate = moment(date).format('YYYYMMDD');
      console.log(formattedDate);
      let currentComponent = this
      //get daily challenge
      axios.get('https://morning-journey-26383.herokuapp.com/v1/dailychallenge/today/'+ formattedDate)
                    .then(function (response) {
                        console.log("Challenge up", response.data);
                          if (response.data != null) {
                            currentComponent.setState({
                              isChallenge: true
                          })
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Error getting challenge")
                });
    }

    render() {
    
      return (
        <div className="Challenge App Heading">
            <h1>Daily Challenge</h1>
            {
              this.state.isChallenge ? (
                <div>
                  <p>There is already a challenge today. Add another tomorrow.</p>
                  <p>Why not send a push notification to remind users to take part</p>
                </div>
              ) : (
                <Link className="ChallengeLink" to="/todaychallenge"><h4>Create Today's Challenge</h4></Link>
              )
            }
             
        </div>
      );
    }
  }
  
  
  
  export default Challenge;