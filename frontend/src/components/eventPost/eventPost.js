import React, { Component } from "react";
import axios from "axios";
import NavEvent from "./NavEvent";
import { getID } from "../auth/HelperApis";
import CompanyNavbar from "../company/CompanyNavbar";
import swal from "sweetalert";
import { Redirect } from "react-router";

class eventPost extends Component {
  constructor() {
    super();
    this.state = {
      event_name: "",
      date_of_event: "",
      event_description: "",
      location: "",
      time: "",
      eligibility: "",
      redirect: false,
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
    const newEventPost = {
      event_name: this.state.event_name,
      date_of_event: this.state.date_of_event,
      event_description: this.state.event_description,
      time: this.state.time,
      location: this.state.location,
      eligibility: this.state.eligibility,
      company_id: company_id
    };
    console.log(newEventPost);
    axios
      .post("/events/addEventPost", newEventPost)
      .then(res =>
        swal({
          title: "Congratulations!",
          text: "You Successfully posted the Event!",
          icon: "success",
          button: "OK"
        }).then(() => {
           this.setState({redirect : true});
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
        <div class="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add an Event</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <p>Event Name: </p>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Name"
                    name="event_name"
                    value={this.state.event_name}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <p>Date of the Event: </p>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    placeholder="Event Date"
                    name="date_of_event"
                    value={this.state.date_of_event}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <p>Event Description: </p>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Event Description"
                    name="event_description"
                    value={this.state.event_description}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <p>Event time: </p>
                  <input
                    type="time"
                    placeholder="Time"
                    name="time"
                    className="form-control form-control-lg"
                    value={this.state.time}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <p>Event Location: </p>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <p>Event Eligibility: </p>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Eligibility"
                    name="eligibility"
                    value={this.state.eligibility}
                    onChange={this.onChange}
                  />
                </div>

                <br></br>
                <div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                    value="Add Event"
                  />{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default eventPost;
