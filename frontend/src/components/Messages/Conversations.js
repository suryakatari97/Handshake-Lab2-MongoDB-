import React, { Component } from 'react';
import { getUserName,getUserType } from "../auth/HelperApis";
import axios from 'axios';
import UserMessages from './UserMessages';
import NewConversation from './NewConversation';
import {Link} from 'react-router-dom';
import swal from "sweetalert";

class Conversations extends Component {
    constructor() {
        super()
        this.state = {
            conversations: null,
            otherUserName: null,
            // otherFirstName: null,
            // otherLastName: null,
            // otherProfileImage: null,
            messages: null,
            message: null,
            showNewConversationModal: false
        }
    }

    componentDidMount = () => {
        var name = getUserName();
        const data = {
            userName: name
        }
        axios.post('/getConversations', data)
            .then(response => {
                console.log('conversation data:', response.data);
                if (response.status === 200) {
                    let conversations = response.data
                    this.setState({
                        conversations: conversations
                    })
                } else {
                    console.log("Didn't get conversations")
                }
            }).catch((err) => {
                if (err) {
                    swal('error connecting to database')
                }
            });
    }
    checkUserMessages = (otherUserName) => {
        console.log('in show messages');
        var name = getUserName();
        const data = {
            senderUserName: name,
            receiverUserName: otherUserName
        }
        console.log('in usermessages component', data);

        axios.post('/getMessages', data)
            .then(response => {
                console.log('messages data:', response.data)
                if (response.status === 200) {
                    console.log('response', response.data);

                    let messages = response.data
                    this.setState({
                        messages: messages,
                        otherUserName: otherUserName,
                    })
                }
                else {
                    console.log("Didn't get messages")
                }
            }).catch((err) => {
                if (err) {
                    swal('error connecting to database')
                }
            });
    }

    textChangeHandler = (e) => {
        // e.preventDefault()
        this.setState({
            message: e.target.value
        })
    }

    sendMessage = (receiverUserName) => {
        var name = getUserName();
        if (this.state.message != null && /\S/.test(this.state.message)) {
            let data = {
                message: this.state.message,
                receiverUserName: receiverUserName,
                senderUserName: name
            }
            axios.post('/setMessage', data)
                .then(response => {
                    console.log('messages data:', response.data)
                    if (response.status === 200) {
                        console.log('response', response.data);

                        axios.post('/getMessages', data)
                            .then(response => {
                                console.log('messages data:', response.data)
                                if (response.status === 200) {
                                    console.log('response', response.data);

                                    let messages = response.data
                                    this.setState({
                                        messages: messages,
                                        message: ''
                                    })
                                }
                                else {
                                    console.log("Didn't get messages")
                                }
                            }).catch((err) => {
                                if (err) {
                                    swal('error connecting to database')
                                }
                            });
                    }
                    else {
                        console.log("Didn't set message")
                    }
                }).catch((err) => {
                    if (err) {
                        swal('error connecting to database')
                    }
                });
        }
    }
    getConversationsfromModal = () => {
        var name = getUserName();
        const data = {
            userName: name
        }
        axios.post('/getConversations', data)
            .then(response => {
                console.log('conversations data:', response.data)
                if (response.status === 200) {
                    let conversations = response.data
                    this.startNewConversation()
                    this.setState({
                        conversations: conversations
                    })
                }
                else {
                    console.log("Didn't get conversations")
                }
            }).catch((err) => {
                if (err) {
                    swal('error connecting to database')
                }
            });
    }

    startNewConversation = (e) => {
        this.setState({
            showNewConversationModal: !this.state.showNewConversationModal
        })

    }

    render() {
        let button = null;
        let userType = getUserType();
        if(userType == 'student'){
            button = null;
        }else{
            button = <button className="btn btn-dark" onClick={this.startNewConversation} className='btn btn-' id='newconversation'>Send Messages</button>
        }
        
        let userConversations = null
        if (this.state.conversations) {
            let name = getUserName();
            console.log("conversations",this.state.conversations);
            
            userConversations = this.state.conversations.map((conversations, index) => {
            
                let otherUserName = null
                if (conversations.sender.senderUserName !== name) {
                    otherUserName = conversations.sender.senderUserName
                }
                else {
                    otherUserName = conversations.receiver.receiverUserName
                }
                console.log("otherusername :", otherUserName);
                return (
                    <div className="card row">
                        <button onClick={() => this.checkUserMessages(otherUserName)} className='btn btn-' id='visit-tweet-card-messages'>
                            <div className='col-10' id='user-tweet-message'>
                                <p id='tweet-fullname' className="font-weight-bold">{otherUserName}</p>
                            </div>
                        </button>
                    </div>
                )
            })
        }

        return (
            <div>
                <div id='heading'>
                    <h4>Messages</h4>
                    {/* <button className="btn btn-dark" onClick={this.startNewConversation} className='btn btn-' id='newconversation'>Send Messages</button> */}
                    {button}
                </div>
                <div className='row' id='messages-total'>
                    <div className='col-5 col-md-5 col-lg-4 col-xl-4'>
                        {userConversations}
                    </div>
                    <div className='col-7 col-md-7 col-lg-6 col-xl-6'>
                        <UserMessages
                            otherUserName={this.state.otherUserName}
                            messages={this.state.messages}
                            message={this.props.message}
                            textChangeHandler={this.textChangeHandler.bind(this)}
                            sendMessage={this.sendMessage.bind(this)}
                        />
                    </div>
                </div>
                <NewConversation
                    showNewConversationModal={this.state.showNewConversationModal}
                    startNewConversation={this.startNewConversation.bind(this)}
                    getConversationsfromModal={this.getConversationsfromModal.bind(this)}
                    conversations={this.state.conversations}
                />
            </div>
        )
    }
}
export default Conversations;