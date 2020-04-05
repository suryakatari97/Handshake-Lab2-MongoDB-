import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "../studentProfile/StudentNavbar";

class studentDashboard extends Component {
  render() {
    console.log(this.props.auth);
    
    return (
      <div>
        <StudentNavbar />
        
      </div>
    );
  }
}

export default studentDashboard;
