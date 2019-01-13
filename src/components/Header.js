import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import AuthenticationTracking from '../AuthenticationTracking';
import axios from 'axios';
import HeaderStyles from './Header.css'
    
class Header extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            stat: false
        };

        this.removeToken = this.removeToken.bind(this);
    }

    componentWillMount() {
        //token storage
    const token = localStorage.getItem('token')

    //check token...
    if (token) {
        let authTracking = AuthenticationTracking.getInstance();
        let currentComponent = this;
        //authenticate user - need to add serverside auth checker
        console.log("I am here...");
        console.log(token);
            //check token, update auth status.
            axios.get('https://morning-journey-26383.herokuapp.com/v1/account/me', 
            { 
                headers: { Authorization: "Bearer " + token 
            }})
            .then(function (response) {
                console.log("Checking auth... all good")
                console.log(response);
                //log in
                authTracking.setAuthStatus(true);

                currentComponent.setState({
                    stat: true
                })
            })
            .catch(function (error) {
                console.log("Issue with token... all good")
                console.log(error);
                //don't log in
                authTracking.setAuthStatus(false);

                currentComponent.setState({
                    stat: false
                })
            });
        }
    }

    removeToken() {
        //remove token
        console.log("TOKEN REMOVED")
        localStorage.removeItem('token')
        //go to to login
        let currentComponent = this;
        currentComponent.props.history.push("/SignIn");

    }

    render() {
    
    // const authTracker = AuthenticationTracking.getInstance();
    // const status = authTracker.getAuthStatus();
    // console.log("THIS IS THE STATUS", status);
    
    // <ul className="navbar-nav mr-auto">
    //     <li className="nav-item">
    //         <Link className="nav-link" to="/notification">Send Notification</Link>
    //     </li>
    //     <li className="nav-item">
    //         <Link className="nav-link" to="/addchallenge">Add Challenge</Link>
    //     </li>
    //     <li className="nav-item">
    //         <Link className="nav-link" to="/mananagequestions">Manage Questions</Link>
    //     </li>
    //     <li className="nav-item">
    //         <button onClick={this.removeToken}>Log Out</button>
    //     </li>
    // </ul>

    // navbar-light bg-light
    // <a className="nav-link" onClick={this.removeToken}>Log Out</a>
    // <Link className="nav-link" to="/signin">Sign In</Link>

    return (

        <div>

        {
            this.state.stat ? (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">   
                        <li className="nav-item">
                            
                        </li>
                        </ul>
                    </div>
                </nav>
            ) : (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        
                        </li>
                    </ul>
                    </div>
                </nav>
            )
        }
            

        </div>
        

      );
    }
  }
  
  
  
  export default withRouter(Header);


  