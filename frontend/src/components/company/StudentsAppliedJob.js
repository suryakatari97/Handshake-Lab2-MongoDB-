import React, { Component } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import { withRouter } from "react-router-dom";
import "react-dropdown/style.css";
import CompanyNavbar from "./CompanyNavbar";
import { Link } from "react-router-dom";

class StudentsAppliedJob extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      studentsForJob: [],
      job_id: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    console.log("in componentDidMount");
    console.log(this.props);
    const job_id = this.props.location.state.job_id;
    console.log(job_id);
    console.log("Came here");
    
    axios("/jobs/getAppliedStudentDetails", {
      method: "get",
      params: { "job_id": job_id },
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(res => {
        const { studentsForJob } = res.data;
        this.setState({ studentsForJob: studentsForJob });
        console.log(studentsForJob);
      })
      .catch(error => console.log(error.response.data));
  }

  reply_click = student_id => {
    console.log(student_id);
    this.props.history.push({
      pathname: "/viewprofile",
      state: {
        student_id: student_id
      }
    });
  };
  onChange = (student, e) => {
    console.log(student);
    console.log(e);
    const job_id = this.props.location.state.job_id;
    const updateAppliedJob = {
      app_status: e.value,
      student_id: student.student_id,
      job_id: job_id
    };
    axios
      .post("/jobs/updateAppliedJob", updateAppliedJob)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const status = ["Pending", "Reviewed", "Rejected"];

    let studentDetails = this.state.studentsForJob.map(student => {
      console.log(student.student_id);
      
      return (
        <div class="card w-50" id="studentscard">
          <div class="card-body">
            <div className="row">
              Student Name:{" "}
              <a href="#" id="eventtext" onClick={() => this.reply_click(student.student_id)}>
                {" "}
                {student.first_name} {student.last_name}
              </a>
              <div className="col-3"></div>
              <Link
                to="/viewOtherProfile"
                className="btn btn-primary btn-sm"
              >
                View Profile
                    </Link>
              <br/>
            </div>
            <div className="row"><br/></div>
            <div className="row" id="eventstext">
              <h4 >Application Status:{" "}</h4>
              <Dropdown
                options={status}
                size="sm"
                onChange={e => this.onChange(student, e)}
                value={student.app_status}
              />
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <CompanyNavbar />
        <div id="studentAppliedJob">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-12">
                <div className="dash-one">
                  <h4 className="font-weight-bold">Applied Students</h4>
                  {studentDetails.length > 0 ? (
                    <div className="col-10">{studentDetails}</div>
                  ) : (
                    <div>
                      <h4 style={{ margin: "3em" }}>
                        No students applied for this job.
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(StudentsAppliedJob);
