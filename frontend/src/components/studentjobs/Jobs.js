import React, { Component } from "react";
import StudentNavbar from "../studentProfile/StudentNavbar";
import Nav from "../studentProfile/Nav"
import JobFilter from './JobFilter';

export default class Jobs extends Component {
  render() {
    let home = { home: "Job Search" };
    return (
      <div>
        <StudentNavbar />
        <Nav links={home}/>
        <JobFilter/>
      </div>
    );
  }
}
