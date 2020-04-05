import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { isFieldEmpty } from "../auth/HelperApis";

 class viewStudentEducation extends Component {
     
    render() {
        var { education } = this.props;
        education = Object.values(education);
        console.log(education);
        
        const eduItems = education.map((education,i) => (
          //   <div className="align-middle">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">Education</h5>
              <p class="card-text" id="eventtext">
                College Name: {education[i].college_name}
              </p>
              <p class="card-text" id="eventtext">
                Location: {education[i].location}
              </p>
              <p class="card-text" id="eventtext">
                Degree: {education[i].degree}
              </p>
              <p class="card-text" id="eventtext">
                Major: {education[i].major}
              </p>
              <p class="card-text" id="eventtext">
                Year Passing: {education[i].year_passing}
              </p>
              <p class="card-text" id="eventtext">
                CGPA : {education[i].cgpa}
              </p>
              <a href="/studentEducation" className="btn btn-primary">
                Edit
              </a>
            </div>
          </div>
          //   </div>
        ));
        return (
          <div>
            {/* {eduItems.length > 0 ? (
              { eduItems }
            ) : (
              <p className="text-center">No Education Details</p>
            )} */}
            {eduItems}
          </div>
        );
    }
}

export default connect(null)(withRouter(viewStudentEducation));