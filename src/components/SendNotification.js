import React, { Component } from 'react';
import SendNotificationStyles from './SendNotification.css';

class SendNotification extends Component {
    
    constructor(props) {
        super(props);

        //bind function
        this.onNotificationSubmit = this.onNotificationSubmit.bind(this);
    }

    onNotificationSubmit(event){
        if (this.notificationInput.value !== "") {
            //prevent default action
            event.preventDefault();
            //use networking call from component above
            this.props.onNotificationSubmit(this.notificationInput.value);
            //clear screen
            this.notificationInput.value = "";
        } else {
            alert("Oops, there is nothing to send");
        }
            
    }

    render() {
    
      return (
        <div className="SendNotification">
            <form onSubmit={this.onNotificationSubmit} >
                <div className="form-group">
                    <input className="form-control form-control-lg" placeholder="Notificaiton" ref={notificationInput => this.notificationInput = notificationInput}/>
                    <small id="emailHelp" className="form-text text-muted">Try to keep the notification short and engaging</small>
                    <button className="btn btn-success notificationBtn">{this.props.buttonText}</button>
                </div>
            </form>
        </div>
      );
    }
  }
  
  
  
  export default SendNotification;