import React, { Component } from 'react';
import {Redirect} from 'react-router';
import Conversations from './Conversations';
import './messages.css';
import { getUserType} from '../auth/HelperApis';
import CompanyNavbar from '../company/CompanyNavbar';
import StudentNavbar from '../studentProfile/StudentNavbar';

class Message extends Component {

    render() {
        let userType = getUserType();
        if (userType == 'student'){
            var navbar = <StudentNavbar />;
        }else{
            var navbar = <CompanyNavbar />;
        }

        return (
            <div>
               {navbar}
                <div className='row' id='font-styling'>
                    <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                    </div>
                    <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                       
                    </div>
                    <div className='col-10 col-sm-10 col-md-10 col-lg-8 col-xl-9' id='center'>
                        <Conversations />
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Message;