import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { isFieldEmpty } from "../auth/HelperApis";

 class viewStudentExperience extends Component {
    render() {
var expItems = null;
      if(this.props.experience!=null){
        var { experience } = this.props.experience;
        experience = Object.values(experience);
        console.log(experience);
        
         expItems = experience.map((experience,i) => (
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">Experience</h5>
              <p class="card-text" id="eventtext">
                Company Name: {experience.company}
              </p>
              <p class="card-text" id="eventtext">
                Title: {experience.title}
              </p>
              <p class="card-text" id="eventtext">
                Start Date: {experience.from}
              </p>
              <p class="card-text" id="eventtext">
                End Date: {experience.to}
              </p>
              <p class="card-text" id="eventtext">
                Location: {experience.location}
              </p>
              <p class="card-text" id="eventtext">
                Work Description: {experience.description}
              </p>
              <a href="/studentExperience" className="btn btn-primary">
                Edit
              </a>
            </div>
          </div>
        ));
      }
        return (
          <div>
            {/* {expItems.length > 0 ? (
              { expItems }
            ) : (
              <p className="text-center">No Experience details</p>
            )} */}
            {expItems}
          </div>
        );
    }
}

export default viewStudentExperience;