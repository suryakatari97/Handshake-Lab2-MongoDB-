import React, { Component } from 'react';
import StudentNavbar from "./StudentNavbar";
import Nav from "./Nav";
import ApplicationFilter from './ApplicationFilter';


 class Applications extends Component {
    render() {
        let home = {home: "Applications"};
        return (
            <div>
                <StudentNavbar/>
                <Nav links={home}/>
                <ApplicationFilter/>
            </div>
        )
    }
}
export default Applications;