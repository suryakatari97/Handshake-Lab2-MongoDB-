import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {logoutUser} from "../../actions/authActions";

 class CompanyNavbar extends Component {

   handleLogout(e) {
     e.preventDefault();
     this.props.logoutUser();
     window.location.href = "/";
   }

   render() {
     return (
       <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
         <div className="container">
           <a className="navbar-brand" href="/companyDashboard">
             Company Dashboard
           </a>
           <button
             className="navbar-toggler"
             type="button"
             data-toggle="collapse"
             data-target="#mobile-nav"
           >
             <span className="navbar-toggler-icon"></span>
           </button>

           <div className="collapse navbar-collapse" id="mobile-nav">
             <ul className="navbar-nav">
               <li className="nav-item">
                 <a className="nav-link" href="/companyProfile">
                   {" "}
                   Profile
                 </a>
               </li>
             </ul>

             <ul className="navbar-nav">
               <li className="nav-item">
                 <a className="nav-link" href="/companyjobPost">
                   {" "}
                   Jobs
                 </a>
               </li>
             </ul>

             <ul className="navbar-nav">
               <li className="nav-item">
                 <a className="nav-link" href="/companyeventPost">
                   {" "}
                   Events
                 </a>
               </li>
             </ul>
             
             <ul className="navbar-nav">
               <li className="nav-item">
                 <a className="nav-link" href="/viewStudentProfiles">
                   {" "}
                   viewStudentProfiles
                 </a>
               </li>
             </ul>

             <ul className="navbar-nav">
               <li className="nav-item">
                 <a className="nav-link" href="/viewMessages">
                   {" "}
                   Messages
                 </a>
               </li>
             </ul>

             <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                 <a
                   className="nav-link"
                   href="/"
                   onClick={this.handleLogout.bind(this)}
                 >
                   Logout
                 </a>
               </li>
             </ul>
           </div>
         </div>
       </nav>
     );
   }
 }

 CompanyNavbar.propTypes = {
   logoutUser: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
 };

export default connect(null, { logoutUser })(CompanyNavbar);