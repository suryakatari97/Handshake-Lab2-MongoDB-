import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  getStudentEducation,
  getStudentExperience
} from "../../actions/profileActions";
import { Link } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentEducation from "./viewStudentEducation";
import StudentExperience from "./viewStudentExperience";
import StudentBasic from "./viewstudentbasic";
import rootURL from "../../config/settings"


class viewProfile extends Component {
   async componentWillMount() {
     console.log(this.props)
      await this.props.getCurrentProfile(this.props.auth.user.id);
      // await this.props.getStudentEducation(this.props.auth.user.id);
      // await this.props.getStudentExperience(this.props.auth.user.id);
  }

  render() {
    //to make sure that profile state is not equal to NULL before we render

    const { user } = this.props.auth;
    const { profile = [], loading } = this.props.profile;
    const { education = [], eduLoading } = this.props.education;
    const { experience = [], expLoading } = this.props.experience;
    console.log(this.props)
    console.log("profile :");
    console.log(profile);
    let viewProfileContent;
    //let a = profile.result[0].carrer_obj;

    if (
      profile == null ||
      loading ||
      education === null ||
      eduLoading ||
      experience === null ||
      expLoading
    ) {
      //viewProfileContent = <Spinner />;
      console.log("hello")
      viewProfileContent = (
        <Link to="/studentbasic" className="btn btn-lg btn-info">
          Create Profile
        </Link>
      );
    } // check if logged in user has profile data
    else {
      let profileImageData = (
        <img
          src="https://static.change.org/profile-img/default-user-profile.svg"
          class="rounded mx-auto d-block"
          alt="..."
          id="image"
        ></img>
      );
      if (profile.user.img) {
        console.log("hi");
        profileImageData = (
          <img
            src={rootURL + "/student/download-file/" + profile.user.img}
            class="rounded mx-auto d-block"
            alt="..."
            id="image"
          ></img>
        );
      }

      //user is logged in but has no profile
      viewProfileContent = (
        <div>
          <p className="lead text-muted">
            Welcome {profile.fname}
          </p>
          <div className="card w-70">
            <div className="card-body">
              {profileImageData}
      <p className="lead text-muted">{profile.fname}{"  "}{profile.lname}</p>
              <p className="lead text-muted">
                {profile.education[0].school}
              </p>
              <p className="lead text-muted">{profile.skill_set}</p>
              <Link to="/editstudentbasic" className="btn btn-primary">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <StudentNavbar />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h1 className="">Profile</h1>
              {viewProfileContent}
              {/* <StudentBasic profile={profile} /> */}
            </div>
            <div className="col-8">
              <div className="card w-100" id="eventscard">
                <div className="card-body">
                  <h5 className="card-title" id="eventtext">
                    Carrer Objective
                  </h5>
                  <br />
                  <h6 className="card-title" id="eventtext">
                    Searching for Internship/co-op opportunity for either Summer or fall of
                    2020
                  </h6>
                </div>
              </div>
              <div>
                <StudentEducation education={profile} />
                <div id="edu"></div>
                <StudentExperience experience={profile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

viewProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getStudentEducation: PropTypes.func.isRequired,
  getStudentExperience: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  education: state.education,
  experience: state.experience,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getStudentEducation,
  getStudentExperience
})(viewProfile);
