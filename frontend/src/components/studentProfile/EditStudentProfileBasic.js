import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { isFieldEmpty } from "../auth/HelperApis";
import StudentNavbar from "./StudentNavbar";
import rootURL from "../../config/settings";
import axios from "axios";

class EditStudentProfileBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "", //same
      lname: "",
      dob: "",
      city: "",
      state: "",
      country: "",
      career_obj: "",
      email: "",
      phone_num: "",
      skill_set: "",
      profileImage: "",
      profileImagePreview: undefined,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log("in edit component : ", this.props.auth.user.id);

    this.props.getCurrentProfile(this.props.auth.user.id);

    // console.log("got profile", this.props.profile);
    // console.log("Profile image name", this.props.profile.student_profileImage);
    // this.setState({
    //   profileImagePreview:
    //     rootURL +
    //     "/student/download-file/" +
    //     this.props.profile.student_profileImage
    // });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      console.log(nextProps.profile.profile.result[0]);

      const profile = nextProps.profile.profile.result[0];
      console.log("componentreceiveprops :", profile);
      profile.first_name = !isFieldEmpty(profile.first_name)
        ? profile.first_name
        : "";
      profile.last_name = !isFieldEmpty(profile.last_name)
        ? profile.last_name
        : "";
      profile.dob = !isFieldEmpty(profile.dob) ? profile.dob : "";
      profile.city = !isFieldEmpty(profile.city) ? profile.city : "";
      profile.state = !isFieldEmpty(profile.state) ? profile.state : "";
      profile.country = !isFieldEmpty(profile.country) ? profile.country : "";
      profile.email = !isFieldEmpty(profile.email) ? profile.email : "";
      profile.phone_num = !isFieldEmpty(profile.phone_num)
        ? profile.phone_num
        : "";
      profile.skill_set = !isFieldEmpty(profile.skill_set)
        ? profile.skill_set
        : "";
      profile.career_obj = !isFieldEmpty(profile.career_obj)
        ? profile.career_obj
        : "";

      this.setState({});

      this.setState({
        handle: profile.handle,
        fname: profile.first_name,
        lname: profile.last_name,
        dob: profile.dob,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        email: profile.email,
        phone_num: profile.phone_num,
        skill_set: profile.skill_set,
        career_obj: profile.career_obj,
      });
      if (profile.student_profileImage) {
        this.setState({
          profileImagePreview:
            rootURL + "/student/download-file/" + profile.student_profileImage
        }
        )
      }
    }
  }

  //handle change of profile image
  handleChange = e => {
    const target = e.target;
    const name = target.name;

    if (name === "ProfileImage") {
      console.log(target.files);
      var profilePhoto = target.files[0];
      var data = new FormData();
      data.append("photos", profilePhoto);
      axios.defaults.withCredentials = true;
      axios.post("/student/upload-file", data).then(response => {
        if (response.status === 200) {
          console.log("Profile Photo Name: ", profilePhoto.name);
          this.setState({
            profileImage: profilePhoto.name,
            profileImagePreview:
              rootURL + "/student/download-file/" + profilePhoto.name
          });
        }
      });
    }
  };

  onSubmit(e) {
    e.preventDefault();
    let id = this.props.auth.user.id;
    console.log(this.props.auth);

    const basicData = {
      fname: this.state.fname, //backendvariable:this.state.frontend state variable
      lname: this.state.lname,
      dob: this.state.dob,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      career_obj: this.state.career_obj,
      email: this.state.email,
      phone_num: this.state.phone_num,
      skill_set: this.state.skill_set,
      student_id: id,
      student_profileImage: this.state.profileImage
    };
    //we call redux action using props
    this.props.createProfile(basicData, this.props.history);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    console.log("profile image", this.state.profileImagePreview);
    const { errors } = this.state;
    console.log(errors);
    let profileImageData = (
      <img
        src="https://static.change.org/profile-img/default-user-profile.svg"
        class="rounded mx-auto d-block"
        alt="..."
        id="image"
      ></img>
    );
    if (this.state.profileImagePreview) {
      console.log("hi");
      profileImageData = (
        <img
          src={this.state.profileImagePreview}
          class="rounded mx-auto d-block"
          alt="..."
          id="image"
        ></img>
      );
    }
    return (
      <div className="studentbasic">
        <StudentNavbar />
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit your basic details</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="firstname"
                  name="fname" //same
                  value={this.state.fname} //same
                  onChange={this.onChange}
                  error={errors.fname} //backend fname
                />

                <TextFieldGroup
                  placeholder="lastname"
                  name="lname"
                  value={this.state.lname}
                  onChange={this.onChange}
                  error={errors.lname}
                />
                <TextFieldGroup
                  placeholder="dob"
                  name="dob"
                  value={this.state.dob}
                  onChange={this.onChange}
                  error={errors.dob}
                />
                <TextFieldGroup
                  placeholder="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
                <TextFieldGroup
                  placeholder="state"
                  name="state"
                  value={this.state.state}
                  onChange={this.onChange}
                  error={errors.state}
                />
                <TextFieldGroup
                  placeholder="country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                />
                <TextFieldGroup
                  placeholder="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Phone Number"
                  name="phone_num"
                  value={this.state.phone_num}
                  onChange={this.onChange}
                  error={errors.phone_num}
                />
                <TextAreaFieldGroup
                  placeholder="skill_set"
                  name="skill_set"
                  value={this.state.skill_set}
                  onChange={this.onChange}
                  error={errors.skill_set}
                />
                <TextAreaFieldGroup
                  placeholder="careerObj"
                  name="career_obj"
                  value={this.state.career_obj}
                  onChange={this.onChange}
                  error={errors.career_obj}
                />
                <div className="form-group">
                  <label htmlFor="ProfileImage">
                    <strong>Profile Image : </strong>
                  </label>
                  <br />
                  <input
                    type="file"
                    name="ProfileImage"
                    id="ProfileImage"
                    className="btn btn-sm photo-upload-btn"
                    onChange={this.handleChange}
                  />
                </div>
                <div id="profileImage">{profileImageData}</div>
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditStudentProfileBasic.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

//mapping state to props
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditStudentProfileBasic)
);
