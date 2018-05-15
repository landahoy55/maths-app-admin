import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Redirect, Route, Link, withRouter } from "react-router-dom";
import axios from 'axios';
import AuthenticationTracking from '../AuthenticationTracking';
import logo from '../img/logo-small.png';
import SignInStyles from './SignIn.css';


class SignIn extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          errorStatus:'',
          errorMessage:''
        }
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("On submit tapped");

        //clear local storage
        localStorage.removeItem('token');

        const email = this.userNameInput.value;
        const password = this.passwordInput.value;
        
        let currentComponent = this
        
        //perform networking
        //store token
        axios.post('https://morning-journey-26383.herokuapp.com/v1/account/web', {
            email: email,
            password: password
          })
          .then(function (response) {
            console.log(response);
            localStorage.setItem('token', response.data.token)
            let authTracking = AuthenticationTracking.getInstance()
            authTracking.setAuthStatus(true);

            console.log("Auth Status", authTracking.getAuthStatus());
            currentComponent.props.history.push("/");
            

          })
          .catch(function (error) {
            console.log(error);

            console.log("ERROR", error.response.statusText)
            console.log("Error Data", error.response.data.message)
            
            currentComponent.setState({
              errorMessage: error.response.data.message,
              errorStatus: error.response.statusText
            })

            let authTracking = AuthenticationTracking.getInstance()
            authTracking.setAuthStatus(false);

            // currentComponent.setState({
            //   errorMessage: error
            // })

        });

    }

    
    render() {
      
      
      let authTracking = AuthenticationTracking.getInstance()
      let currentComponent = this
      if (authTracking.getAuthStatus() === true) {
        console.log("Auth is true");
        currentComponent.props.history.push("/");
      }

      //inline style example
      var formStyle = {
        width: '100%',
        maxWidth: '330px',
        padding: '15px',
        margin: 'auto'
      }

      return (

        <div className="signin-form text-center"> 
            <form style={formStyle} onSubmit={this.onSubmit}>
      
                  <img className="" src={logo} alt="" width="150" height="150" />
                  <h1 className="h5 mb-3 font-weight-normal">Administrator Log In</h1>

                  <label forHTML="userNameInput" className="sr-only">Email address</label>
                  <input placeholder="Username" className="form-control formInputFields" ref={userNameInput => this.userNameInput = userNameInput} defaultValue=""/>
                  
                  <label forHTML="passwordInput" className="sr-only">Password</label>
                  <input type="password" placeholder="Password" className="form-control formInputFields" ref={passwordInput => this.passwordInput = passwordInput} defaultValue="" />
                  
                  <button className="btn btn-primary signInBtn">Log In</button>
                
            </form> 

            <div className="errorMessages-sign-in">
              <p className="errorMessage-sign-in">{this.state.errorStatus}</p>
              <p className="errorMessage-sign-in">{this.state.errorMessage}</p>
            </div>

        </div>
      );
    }
  }


  

export default withRouter(SignIn);