import React, { Component } from "react";
import { isFieldEmpty } from "../auth/HelperApis";

class CompanyHeader extends Component {
  render() {
    console.log(this.props);
    const { companyDetails } = this.props.profile;
    console.log(companyDetails[0]);

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body  text-black mb-2">
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
                {companyDetails[0].company_name}
              </h1>
              <p className="lead text-center">
                Company located{" "}
                {isFieldEmpty(companyDetails[0].location) ? null : (
                  <span>at {companyDetails[0].location}</span>
                )}
              </p>
              <p>
                Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles,
                 energy generation and storage systems.
                 It also provides vehicle service centers, supercharger station, and self-driving capability.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyHeader;
