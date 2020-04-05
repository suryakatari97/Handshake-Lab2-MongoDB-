import React, { Component } from 'react';
import CompanyNavbar from "./CompanyNavbar";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getCompanyJobs, getCompanyEvents } from "../../actions/companyActions";
import { getCurrentCompanyProfile } from "../../actions/profileActions";
import CompanyPostedJobs from "./CompanyPostedJobs";
import CompanyAddedEvents from "./CompanyAddedEvents";


 class CompanyDashboard extends Component {
   async componentDidMount() {
     if (!this.props.auth.isAuthenticated) {
       this.props.history.push("/login");
     }
     console.log("in componentDidMount", this.props);
     //await this.props.getCurrentCompanyProfile(this.props.auth.user.id);
     await this.props.getCompanyJobs(this.props.auth.user.id);
     await this.props.getCompanyEvents(this.props.auth.user.id);
   }

   render() {
       console.log(this.props);
       //const { profile=[], loading } = this.props.profile;
       // console.log(profile,loading);
       console.log(this.props.companyjobs);
       const { companyjobs = [], job_loading } = this.props.companyjobs;
       console.log(companyjobs, job_loading);
       const { companyevents = [], event_loading } = this.props.companyevents;
       console.log(companyevents, event_loading);
       let landingContent;
       if (
         companyjobs === null ||
         job_loading ||
         companyevents === null ||
         event_loading
       ) {
         landingContent = "Jobs and Events will be displayed below:";
         console.log(landingContent);
       } else if (
         Object.keys(companyjobs).length > 0 ||
         Object.keys(companyevents).length > 0
       ) {
         landingContent = (
           <div>
             
             <div className="row">
               <div className="col-md-6"></div>
               <div className="col-md-6" />
             </div>
             <div>
               <CompanyPostedJobs companyjobs={companyjobs} />
               <CompanyAddedEvents companyevents={companyevents} />
             </div>
           </div>
         );
       }
     return (
       <div>
         <CompanyNavbar />
         <div id="CompanyDashboard">
         <div className="profile">
           <div className="container">
             <div className="row">
               <div className="col-md-12">{landingContent}</div>
             </div>
           </div>
         </div>
         </div>
       </div>
     );
   }
 }

 CompanyDashboard.propTypes = {
   getCompanyJobs: PropTypes.func.isRequired,
   getCompanyEvents: PropTypes.func.isRequired,
   getCurrentCompanyProfile: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired
 };

 const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth,
   companyjobs: state.companyjobs,
   companyevents: state.companyevents
 });


export default connect(mapStateToProps, {
  getCurrentCompanyProfile,
  getCompanyJobs,
  getCompanyEvents
})(CompanyDashboard);