import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {createProfile} from '../../actions/profileActions';
import StudentNavbar from './StudentNavbar';

 class studentbasic extends Component {
   constructor(props) {
     super(props);
     this.state = {
       fname: "",//same
       lname: "",
       dob: "",
       city: "",
       state: "",
       country: "",
       career_obj: "",
       email: "",
       phone_num: "",
       skill_set: "",
       errors: {}
     };

     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
   }

   componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
       this.setState({ errors: nextProps.errors });
     }
   }
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
          student_id:id
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
     const { errors } = this.state;
     console.log(errors);
     
     return (
       <div className="studentbasic">
         <StudentNavbar />
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center">
                 Enter your basic details
               </h1>
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
                   placeholder="Date-of-Birth(YYYY-MM-DD)"
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
                   placeholder="career_obj"
                   name="career_obj"
                   value={this.state.career_obj}
                   onChange={this.onChange}
                   error={errors.career_obj}
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

studentbasic.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

//mapping state to props
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { createProfile })(withRouter(studentbasic));
