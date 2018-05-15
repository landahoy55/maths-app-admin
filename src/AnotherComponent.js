
import React, { Component } from 'react';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import './MyComponent'
import MyComponent from './MyComponent';

class App extends Component {

  constructor(props) {
    super(props);

    //bind funcs to component.
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      title: 'Initial title',
      name: 'Initial name'
    };
  }
  
  //setting state
  onClick(){
    this.setState({
      name: "New name",
      title: "New title"
    })
  }

  onChange(event) {
    console.log(event.target.value);
  }

  onSubmit(event) {
    event.preventDefault();
    alert("Submitted");
    console.log(this.input.value);
  }
  
  render() {

    const title = "This is the test app"
    const anotherTitle = "Another one..."
    const list = ['item1', 'item2', 'item3']

    return (
      <div className="App">
        <h1>{ true ? anotherTitle : title }</h1>
        <h5>{this.state.title}</h5>
        <div>
          {
            list.map(item => {
              return (
                <div key={item} onClick={this.onClick}>{item}</div>
              );
            })
          }
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} ref={input => this.input = input}/>
        </form>
        <MyComponent 
          title = {this.state.title}
          name = {this.state.name}
          onClick = {this.onClick}
        />
      </div>
    );
  }
}



export default App;