import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import AuthenticationTracking from '../AuthenticationTracking';
import axios from 'axios';
import logo from '../img/logo-small.png';
import HomeStyles from './Home.css';

class Home extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            stat: false
        };

        this.removeToken = this.removeToken.bind(this);
        this.signInPressed = this.signInPressed.bind(this);
    }
  
    componentDidMount(){
        let authstatus = AuthenticationTracking.getInstance()
        console.log("....Status", authstatus.getAuthStatus())
        let stat = authstatus.getAuthStatus()
        this.setState({
            stat: stat
        })
    }
    //
    componentWillMount(){

        let authTracking = AuthenticationTracking.getInstance()
        const token = localStorage.getItem('token')
        let currentComponent = this

        axios.get('https://morning-journey-26383.herokuapp.com/v1/account/me', 
            { 
                headers: { Authorization: "Bearer " + token 
            }})
            .then(function (response) {
                console.log("Checking auth... all good")
                console.log(response);
                //log in
                authTracking.setAuthStatus(true);
                //force to signin?
                currentComponent.setState({
                    stat: true
                })

            })
            .catch(function (error) {
                console.log("Issue with token... ")
                console.log(error);
                //don't log in
                authTracking.setAuthStatus(false);
                currentComponent.setState({
                    stat: false
                })
            });

        // let authstatus = AuthenticationTracking.getInstance()
        // console.log("....Status", authstatus.getAuthStatus())
        // let stat = authstatus.getAuthStatus()
        // this.setState({
        //     stat: stat
        // })

    }

    removeToken() {
        //remove token
        console.log("TOKEN REMOVED")
        localStorage.removeItem('token')
        //go to to login
        let currentComponent = this;
        currentComponent.props.history.push("/SignIn");
    }

    signInPressed(){
        //go to to login
        let currentComponent = this;
        currentComponent.props.history.push("/SignIn");
    }

    render() {

    var logOutStyle = {
        float: 'right',
        marginTop: '25px'
    }

      return (
        
        <div className="Wrapper">

        { this.state.stat ? (
            <div>
                <div className="page-header">
                    <h3>This is the administration site for Maths App on iOS</h3>
                </div>

                <div className="row">

                    <div className="col-md-4"> 
                        <div className="card">
                            <div className="card-header">
                                Today Challenge
                            </div>
                        <div className="card-body">
                                <p className="card-text">Write and publish today's challenge</p>
                                <Link className="btn btn-primary homeBtn" to="/addchallenge">Add Challenge</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4"> 
                        <div className="card">
                            <div className="card-header">
                                Manage Questions
                            </div>
                        <div className="card-body">
                                <p className="card-text">Manage the topics and questions within the app</p>
                                <Link className="btn btn-primary homeBtn" to="/mananagequestions">Manage Questions</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4"> 
                        <div className="card">
                            <div className="card-header">
                                Send Notification
                            </div>
                        <div className="card-body">
                                <p className="card-text">Send a push notification to all users</p>
                                <Link className="btn btn-primary homeBtn" to="/notification">Send Notification</Link>
                            </div>
                        </div>
                     </div>

                </div>

                <div>
                    <button onClick={this.removeToken} style={logOutStyle} className="btn btn-secondary btn-sm">Log Out</button>
                </div>

            </div>
           
        ) : (
            <div>
                <div className="page-header">
                    <div>
                        <img className="image-log-in" src={logo} alt="" width="150" height="150" />
                        <div className="words-log-in">
                            <br/>
                            <h1 className="title-log-in">Maths App administration site</h1>
                            <button onClick={this.signInPressed} className="btn btn-primary homeBtn">Log In</button> 
                        </div>
                    </div>
                </div>
            </div>
        )}
           
        </div>
        
      );
    }
  }
  
  export default withRouter(Home);