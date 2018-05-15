import React, { Component } from 'react';
import axios from 'axios';
import SendNotificaton from './SendNotification';


class Notification extends Component {
    
    constructor(props) {
        super(props);

        //bind function
        this.onNotificationSubmit = this.onNotificationSubmit.bind(this);

        this.state = {
           
            notificationMessage: '',
            notificationConfirmation: '',
            buttonText: "Send"
        };
    }

    onNotificationSubmit(message){
        
        let currentComponent = this

        console.log("Message to submit:", message);

        this.setState({
            buttonText: "Sending"
        })

        axios.post('https://morning-journey-26383.herokuapp.com/v1/apns/send', {
            alert: message,
          })
          .then(function (response) {
            console.log(response);
            console.log('Notification sent successfully');
            // alert('Message sent successfully');
            
            currentComponent.setState({
                notificationConfirmation: 'Message sent successfully',
                notificationMessage: `The following notifcation was sent: ${message}`,
                sentSuccessfully: true,
                buttonText: "Send"
            });

          })
          .catch(function (error) {
            console.log(error);
            console.log('Notification not sent successfully');
            alert('Oops, there was an issue');

            currentComponent.setState({
                notificationConfirmation: 'Oops, something went wrong',
                sentSuccessfully: false,
                buttonText: "Send"
            });

          });

    }

    render() {
    
      return (
        <div className="Wrapper">

            <div className="SendNotification">
                <div className="page-header">
                    <h3>Push Notifications</h3>
                    <h6>Send a short message to all users that have given permission to receive notifications</h6>
                </div>

                <SendNotificaton 
                    onNotificationSubmit={this.onNotificationSubmit} buttonText={this.state.buttonText}
                />

                {
                    this.state.sentSuccessfully ? (
                           
                        <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">{this.state.notificationConfirmation}</h4>
                            <p>The following message was sent...</p>
                            <hr />
                            <p className="mb-0">{this.state.notificationMessage}</p>
                        </div>
              
                    ) : (
                        <div>
                            <div className="alert" role="alert">
                                <h4 className="alert-heading">{this.state.notificationConfirmation}</h4>
                            </div>
                        </div>
                    )
                }
                

            </div>

        </div>
        
      );
    }
  }
  
  
  
  export default Notification;