import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserName } from "../auth/HelperApis";

 class UserMessages extends Component {
     constructor() {
         super()
         this.state = {
             messages: null
         }
     }

    render() {

        console.log(this.props);

        if (this.props.otherUserName) {
            var name = getUserName();
            let messages = this.props.messages[0].messages;
            let showMessages = messages.map((message) => {
                if (message.message != null && message.message != "") {
                    const sentByMe = message.sent_by === name ? 'from-me' : 'not-me'
                    return (
                        <div>
                            <div className={`message ${sentByMe}`}>
                                <div className='message-body'>
                                    {message.message}
                                </div>
                            </div>
                        </div>
                    )
                }
            })
            return (
                <div>
                    <div className='card-header'>
                        {/* <div className='col-2' id='user-image' ><img src={UserImage} alt='logo' /></div> */}
                        <p className="font-weight-bold" id='tweet-fullname'>{this.props.otherUserName}</p>
                    </div>
                    <div id='containerElement'>
                        {showMessages}
                    </div>
                    <div id='align-bottom'>
                        <input type="text" className=" form-control col-8 align-bottom"
                            onChange={this.props.textChangeHandler}
                            value={this.props.message}
                            placeholder="start a new message..."
                            required />
                        <div className='col-1 col-xl-1'></div>
                        <button onClick={() => this.props.sendMessage(this.props.otherUserName)} className="btn btn-primary col-3 col-xl-2" type='submit'>Send</button>
                        <div className='col-1 col-xl-1'></div>
                    </div>
                </div>
            );
        
        }
            else {
        return (
            <div>
                
            </div>
        )
            }
    }
}
export default UserMessages;