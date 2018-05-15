import React, { Component } from 'react';

class MyComponent extends Component {
 
  //lifecycle
  componentDidMount(){
    console.log("Did mount");
  }
  componentWillMount(){
    console.log("Will mount - useful to carry out AJAX requests");
  }
  
  componentWillUpdate(nextProps, nextState) {
    console.log(this.props, this.state, nextProps, nextState)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props, this.state, prevProps, prevState)
  }

  //can stop component updating.
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {

    return (
      <div className="MyComponent">
        <h1>This is another component....</h1>
        <h2>Props... {this.props.title}</h2>
        <h2>More props... {this.props.name}</h2>
        <div onClick={this.props.onClick}>Click Me</div>
      </div>
    );
  }
}



export default MyComponent;
