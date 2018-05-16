import React, { Component } from 'react';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import './MyComponent';

import MyComponent from './MyComponent';
import ProductsManager from './ProductsManager';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Notification from './components/Notification';
import Challenge from './components/Challenge';
import TodayChallenge from './components/TodayChallenge';
import Challengesuccessfullyposted from './components/Challengesuccessfullyposted';
import ManageQuestions from './components/ManageQuestions';
import TopicDetail from './components/TopicDetail';
import SubtopicDetail from './components/SubtopicDetail';
import Header from './components/Header';
import Home from './components/Home';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';
import AuthenticationTracking from './AuthenticationTracking';
import AddTopic from './components/AddTopic';

// //token storage
const token = localStorage.getItem('token')

// //check token...
if (token) {
  let currentComponent = this
  let authTracking = AuthenticationTracking.getInstance()
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
    //force to signin?
   

  })
  .catch(function (error) {
    console.log("Issue with token... ")
    console.log(error);
    
    //don't log in
    authTracking.setAuthStatus(false);
  });
}

//local storage
const products = [
  {
    name: 'iPad',
    price: 200
  },
  {
    name:'iPhone',
    price: 650
  }
]

localStorage.setItem('products', JSON.stringify(products));

const BasicRouter = () => (

 

  <Router>
    <div>
    
      <Header />
     
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/notification" component={Notification} />
      <Route path="/signin" component={SignIn}/>
      <PrivateRoute path="/products" component={ProductsManager} />
      <PrivateRoute path="/addchallenge" component={Challenge} />
      <PrivateRoute path="/todaychallenge" component={TodayChallenge} />
      <PrivateRoute path="/challengesuccessfullyposted" component={Challengesuccessfullyposted} />
      <PrivateRoute path="/mananagequestions" component={ManageQuestions} />
      <PrivateRoute path="/topic/:id" component={TopicDetail}/>
      <PrivateRoute path="/subtopic/:id" component={SubtopicDetail}/>
      <PrivateRoute path="/addtopic/" component={AddTopic}/>
      </div>
  </Router>
);

export default BasicRouter;