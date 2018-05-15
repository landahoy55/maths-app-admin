import React, { Component } from 'react';
import AddSubTopicForm from './AddSubTopicForm';
import AddSubTopicStyles from './AddSubTopic.css';

class AddSubtopic extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            addSub: false,
            sudAdded: false,
            title: '',
            description: ''
        }

        //bind function
        this.onNotificationSubmit = this.onNotificationSubmit.bind(this);
        this.addSub = this.addSub.bind(this)
        this.closeSub = this.closeSub.bind(this)
    }

    onNotificationSubmit(event){
         
    }

    addSub(){
        this.setState({
            addSub: true
        })   
    }

    closeSub(sub){

        console.log("Data sent back", sub)

        this.setState({
            addSub:false,
            subAdded: true,
            title: sub.data.title,
            description: sub.data.description
        })
    }

    render() {
    
      return (
        <div>
            <div className="list-group">
                <div className="list-group-item">
                    
                    {
                        this.state.subAdded ? (

                            <div className="list-group">
                            <div className="list-group-item">
                                <div class="alert alert-success" role="alert">
                                    <strong>Sub-topic {this.props.stage} Created</strong>
                                </div>
                                    <h6>Name: {this.state.title}</h6>
                                    <h6>Description: {this.state.description}</h6>
                                </div>
                            </div>
                        ) 
                        : (
                            <div>

                            {
                                this.state.addSub ? (
                                   
                                   <AddSubTopicForm stage={this.props.stage} parentid={this.props.parentid} closeSub={this.closeSub}/>
                                ):
                                (
                                    <div>
                                        <h5>Sub-topic {this.props.stage}</h5>
                                        <button onClick={this.addSub} className="btn btn-primary addBtn">Add</button>
                                    </div>
                                )
                            }

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
      );
    }
  }
  
  
  
  export default AddSubtopic;