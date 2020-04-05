import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import studentbasic from "./studentProfile/studentbasic";
import studentEducation from "./studentProfile/studentEducation";
import studentExperience from "./studentProfile/studentExperience";
import viewProfile from "./studentProfile/viewProfile";
import studentDashboard from "./studentDashboard/studentDashboard";
import Landing from "./layout/Landing";
import EditStudentProfileBasic from "./studentProfile/EditStudentProfileBasic";
import eventPost from "./eventPost/eventPost";
import viewevents from "./studentProfile/studentviewevents";
import viewStudentProfiles from "./studentProfile/viewStudentProfiles";
import studentRegisteredevents from "./studentProfile/studentRegisteredevents";
import viewstudentjobs from "./studentjobs/Jobs";
import CompanyDashboard from "./company/CompanyDashboard";
import RegisterCompany from "./auth/RegisterCompany";
import companyProfile from "./companyProfile/CompanyProfile";
import JobPost from "./company/JobPost";
import StudentsRegisteredEvent from "./eventPost/StudentsRegisteredEvent";
import StudentsAppliedJob from './company/StudentsAppliedJob';
import EditCompanyProfile from './companyProfile/EditCompanyProfile';
import viewOtherProfile from "./studentProfile/viewOtherProfile";
import companyEventPost from './eventPost/eventPost';
import companyJobPost from './company/JobPost';
import CompanyViewStudentProfile from "./company/CompanyViewStudentProfile";
import Applications from "./studentProfile/Applications";
import Messages from "./Messages/Message";


class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/companyViewStudentProfile" component={CompanyViewStudentProfile}/>
        <Route exact path="/applications" component={Applications} />
        <Route exact path="/jobPost" component={JobPost} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/registerCompany" component={RegisterCompany} />
        <Route exact path="/companyeventPost" component={companyEventPost} />
        <Route exact path="/companyjobPost" component={companyJobPost} />
        <Route exact path="/companyjobPost" component={companyJobPost} />
        <Route path="/companyProfile" component={companyProfile} />
        <Route exact path="/viewOtherProfile" component={viewOtherProfile}/>
        <Route path="/companyDashboard" component={CompanyDashboard} />
        <Route exact path="/studentviewevents" component={viewevents} />
        <Route exact path="/viewstudentjobs" component={viewstudentjobs} />
        {/* studentviews */}
        <Route
          exact
          path="/getStudentEvents"
          component={studentRegisteredevents}
        />
        {/* companyviews */}
        <Route
          exact
          path="/StudentsRegisteredEvent"
          component={StudentsRegisteredEvent}
        />
        <Route path="/EditCompanyProfile" component={EditCompanyProfile} />
        <Route
          exact
          path="/StudentsAppliedJob"
          component={StudentsAppliedJob}
        />

        <Route
          exact
          path="/viewStudentProfiles"
          component={viewStudentProfiles}
        />
        <Route exact path="/studentDashboard" component={viewstudentjobs} />
        <Route exact path="/eventPost" component={eventPost} />

        <Route exact path="/studentbasic" component={studentbasic} />
        <Route exact path="/studentEducation" component={studentEducation} />
        <Route exact path="/studentExperience" component={studentExperience} />
        <Route
          exact
          path="/editstudentbasic"
          component={EditStudentProfileBasic}
        />
        <Route exact path="/viewprofile" component={viewProfile} />
        <Route exact path="/viewMessages" component={Messages} />
      </div>
    );
  }
}

export default Main;
