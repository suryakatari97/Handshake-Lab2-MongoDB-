import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import { getCurrentCompanyProfile } from "../../actions/profileActions";
import CompanyNavbar from "../company/CompanyNavbar"


class CompanyProfile extends Component {
  async componentDidMount() {
    var company_id = null;
    if (this.props.location.state) {
      console.log("came inside location");
      company_id = this.props.location.state.company_id;
    } else if (this.props.auth) {
      console.log("came inside auth");
      company_id = this.props.auth.user.id;
    }
    console.log(company_id);
    await this.props.getCurrentCompanyProfile(company_id);
  }

  render() {
    console.log(this.props);
    const { profile, loading } = this.props.profile;
    console.log(profile);
    let profileContent;
    if (profile === null || loading) {
      profileContent = "Company Profile will be displayed below:";
      console.log(profileContent);
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="navbar-nav ml-auto col-6">
              <Link to="/EditCompanyProfile" className="btn btn-light">
                 Edit Profile
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <CompanyHeader profile={profile} />
        </div>
        
      );
    }

    return (
      <div>
        <CompanyNavbar />
        <div id="companyprofile">
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">{profileContent}</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

CompanyProfile.propTypes = {
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentCompanyProfile })(
  withRouter(CompanyProfile)
);