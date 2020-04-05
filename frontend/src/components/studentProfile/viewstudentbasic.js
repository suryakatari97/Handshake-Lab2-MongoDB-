import React, { Component } from 'react'
import { isFieldEmpty } from "../auth/HelperApis";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

 class viewstudentbasic extends Component {
    render() {
        const { profile } = this.props;
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img
                      className="rounded-circle"
                      //src={profile.user.avatar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-6 text-center">
                    {profile[0].first_name} {profile[0].last_name}
                  </h1>
                  {/* <p className="lead text-center">
                    Student{" "}
                    {isFieldEmpty(profile[0].school) ? null : (
                      <span>at {profile[0].school}</span>
                    )}
                  </p> */}
                  {isFieldEmpty(profile[0].city) ? null : (
                    <p>
                      {profile[0].city} , {profile[0].state}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
    }
}


export default connect(null)(withRouter(viewstudentbasic));