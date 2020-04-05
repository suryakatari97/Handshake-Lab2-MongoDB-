import React, { Component } from 'react';
import Moment from "react-moment";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { getStudentsForJob } from "../../actions/companyActions";
import { connect } from "react-redux";

 class CompanyPostedJobs extends Component {
   jobClick = job_id => {
     console.log("Came inside job-click");
     console.log(job_id);

     this.props.history.push({
       pathname: "/StudentsAppliedJob",
       state: {
         job_id: job_id
       }
     });
   };

   render() {
       console.log(this.props);
       var { companyjobs } = this.props.companyjobs;
       console.log(companyjobs);
      // companyjobs = Object.values(companyjobs);
       let jobDetails = companyjobs.jobs.map(job => (
         <div>
           <div class="card w-50" id="eventscard">
             <div class="card-body">
               <div className="row">Job Title: {job.job_title}</div>
               <div className="row">Posting Date: {job.posting_date}</div>
               <div className="row">
                 Application Deadline:{" "}
                 <Moment format="YYYY/MM/DD"> {job.app_deadline}</Moment>
               </div>
               <div className="row">Salary: {job.salary}</div>
               <div className="row">Job Decsription: {job.job_description}</div>
               <div className="row">Job Category: {job.job_category}</div>
               <div className="row">
                 <button
                   type="button"
                   class="btn btn-outline-dark"
                   onClick={() => this.jobClick(job.job_id)}
                 >
                   Applied Students
                 </button>
               </div>
             </div>
           </div>
         </div>
       ));
     return (
       <div>
         <div className="col-12">
           <div className="dash-one">
             <h4 className="font-weight-bold">All Jobs</h4>
             {jobDetails.length > 0 ? (
               <div className="col-10">{jobDetails}</div>
             ) : (
               <div>
                 <h4 style={{ margin: "3em" }}>
                   No jobs added, click on 'Add Job' to post a new opening.
                 </h4>
               </div>
             )}
           </div>
         </div>
       </div>
     );
   }
 }

 CompanyPostedJobs.propTypes = {
   getStudentsForJob: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired
 };

 const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth,
   jobstudents: state.studentjobReducer,
   companyjobs: state.companyjobs
 });



export default connect(mapStateToProps, { getStudentsForJob })(
  withRouter(CompanyPostedJobs)
);