import React, { Component } from 'react'
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import StudentNavbar from "./StudentNavbar";
import { addEducationRecord } from "../../actions/profileActions";
import { Redirect } from "react-router";


 class studentEducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            cname: "",
            location: "",
            degree: "",
            major: "",
            year_passing: "",
            cgpa:"",
            success:false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

   
    onChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let id = this.props.auth.user.id;
        const eduData = {

            clgName:this.state.cname,
            degree:this.state.degree,
            location:this.state.location,
            major: this.state.major,
            passingYear:this.state.year_passing,
            cgpa:this.state.cgpa,
            id: id
        };
        this.props.addEducationRecord(eduData, this.props.history);
    }
    render() {
        const {errors} = this.state;
        let redirVar = null
        if(this.state.success === true){
            redirVar = <Redirect to="/viewprofile"/>
        }
        return (
          <div className="studentExp">
            <StudentNavbar />
            {redirVar}
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">
                    Enter your Education details
                  </h1>
                  <form noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Collegename"
                      name="cname" //same
                      value={this.state.cname} //same
                      onChange={this.onChange}
                      error={errors.clgName} //backend fname
                    />

                    <TextFieldGroup
                      placeholder="Degree"
                      name="degree" //same
                      value={this.state.degree} //same
                      onChange={this.onChange}
                      error={errors.degree} //backend fname
                    />

                    <TextFieldGroup
                      placeholder="College Location"
                      name="location" //same
                      value={this.state.location} //same
                      onChange={this.onChange}
                      error={errors.location} //backend fname
                    />

                    <TextFieldGroup
                      placeholder="Major"
                      name="major" //same
                      value={this.state.major} //same
                      onChange={this.onChange}
                      error={errors.major} //backend fname
                    />

                    <TextFieldGroup
                      placeholder="Graduated Year"
                      name="year_passing" //same
                      value={this.state.year_passing} //same
                      onChange={this.onChange}
                      error={errors.passingYear} //backend fname
                    />

                    <TextFieldGroup
                      placeholder="CGPA"
                      name="cgpa" //same
                      value={this.state.cgpa} //same
                      onChange={this.onChange}
                      error={errors.cgpa} //backend fname
                    />
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

studentEducation.propTypes = {
  auth: PropTypes.object.isRequired,
  //profile: PropTypes.object.isRequired,
  education: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  //profile: state.profile,
  education: state.education,
  errors: state.errors
});


export default connect(mapStateToProps, { addEducationRecord })(
  withRouter(studentEducation)
);