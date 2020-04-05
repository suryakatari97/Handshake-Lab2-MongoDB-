import React, { Component } from 'react';
import { getUserName } from "../auth/HelperApis";
import { Link } from 'react-router-dom';

 class NewResults extends Component {
     constructor(props) {
         super(props)
         this.state = {
         }
     }

     
    render() {

        console.log("In NewResults " +this.props.Results);
        let parseresults = JSON.parse(this.props.Results)
        let results = null
        if (parseresults) {
            results = parseresults.map((user, index) => {
                if (user.userName !== getUserName()) {
                    // let profileImage = "default_avatar.png"
                    // if (user.profileImage) {
                    //     profileImage = user.profileImage
                    // }
                    return (
                        <div className="card row">
                            <button className='btn btn-' onClick={() => this.props.startConversaton(user.name)}>
                                <div id='visit-tweet-card'>
                                    {/* <div className='col-2' id='user-image' ><img src={UserImage} alt='logo' /></div> */}
                                    <div className='col-10' id='user-tweet-message'>
                                        <Link to='' id='tweet-fullname'><p className="font-weight-bold" id='tweet-fullname'>{user.name}</p></Link>
                                    </div>
                                </div>
                            </button>
                        </div>
                    )
                }
            })

        }

        return (
            <div>
                {results}
            </div>
        )
    }
}
export default NewResults;