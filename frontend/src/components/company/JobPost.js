import React, { Component } from 'react';
import axios from "axios";
import { getID } from "../auth/HelperApis";
import CompanyNavbar from "./CompanyNavbar";
import swal from "sweetalert";
import { Redirect } from "react-router";

 class JobPost extends Component {
   constructor() {
     super();
     this.state = {
       job_title: "",
       posting_date: "",
       app_deadline: "",
       salary: "",
       location: "",
       redirect:false,
       job_description: "",
       job_category: "",
       //id: '',
       errors: {}
     };
     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
   }

   onChange(e) {
     this.setState({ [e.target.name]: e.target.value });
   }
   onSubmit(e) {
     e.preventDefault();
     let company_id = getID();
     console.log(`User Id is : ${company_id}`);
     //this.setState({id : company_id});

     const newJobPost = {
       job_title: this.state.job_title,
       posting_date: this.state.posting_date,
       app_deadline: this.state.app_deadline,
       salary: this.state.salary,
       location: this.state.location,
       job_description: this.state.job_description,
       job_category: this.state.job_category,
       company_id: company_id
     };
     console.log(newJobPost);
     axios
       .post("/jobs/addJobPost", newJobPost)
       .then(res =>
         swal({
           title: "Congratulations!",
           text: "You Successfully posted job!",
           icon: "success",
           button: "OK"
         }).then(() => {
           this.setState({ redirect: true });
         })
       )
       .catch(err => this.setState({ errors: err.response.data }));
   }
   render() {
     let redirectvar = null;
     if (this.state.redirect === true) {
       redirectvar = <Redirect to="/companyDashboard" />;
     }
     return (
       <div>
         <CompanyNavbar />
         {redirectvar}
         <div className="container">
           <div className="col-md-8 m-auto">
             <h1 className="display-4 text-center">Add Job Posting</h1>
             <form onSubmit={this.onSubmit}>
               <div class="form-group">
                 <p>Job Title: </p>
                 <input
                   type="text"
                   className="form-control form-control-lg"
                   placeholder="Job Title"
                   name="job_title"
                   onChange={this.onChange}
                   value={this.state.job_title}
                 />
               </div>

               <div class="form-group">
                 <p>Job Posting Date: </p>
                 <input
                   type="date"
                   placeholder="Posting Date"
                   className="form-control form-control-lg"
                   name="posting_date"
                   value={this.state.posting_date}
                   onChange={this.onChange}
                 />
               </div>

               <div class="form-group">
                 <p>Application Deadline: </p>
                 <input
                   type="date"
                   placeholder="Application Deadline"
                   className="form-control form-control-lg"
                   name="app_deadline"
                   value={this.state.app_deadline}
                   onChange={this.onChange}
                 />
               </div>

               <div class="form-group">
                 <p>salary: </p>
                 <input
                   type="text"
                   placeholder="Salary"
                   className="form-control form-control-lg"
                   name="salary"
                   value={this.state.salary}
                   onChange={this.onChange}
                 />
               </div>

               <div class="form-group" v>
                 <p>Job Location: </p>
                 <input
                   type="text"
                   placeholder="Location"
                   className="form-control form-control-lg"
                   name="location"
                   value={this.state.location}
                   onChange={this.onChange}
                 />
               </div>

               <div class="form-group">
                 <p>Job Description: </p>
                 <input
                   type="text"
                   placeholder="Description"
                   className="form-control form-control-lg"
                   name="job_description"
                   value={this.state.job_description}
                   onChange={this.onChange}
                 />
               </div>

               <div class="form-group">
                 <p>Job Category: </p>
                 <input
                   type="text"
                   placeholder="Category"
                   className="form-control form-control-lg"
                   name="job_category"
                   value={this.state.job_category}
                   onChange={this.onChange}
                 />
               </div>

               <br></br>
               <div class="form-group">
                 <input
                   type="submit"
                   className="btn btn-info btn-block mt-4"
                   value="Post Job"
                 />
               </div>
             </form>
           </div>
         </div>
       </div>
     );
   }
 }

export default JobPost;