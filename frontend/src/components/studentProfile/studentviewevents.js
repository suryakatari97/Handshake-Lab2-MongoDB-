import React, { Component } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import axios from "axios";
import "../../App.css";
import vieweventModal from "./vieweventModal";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getID } from "../auth/HelperApis";
import swal from "sweetalert";

class studentviewevents extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      searchString: "",
      displayAck: false,
      success: false,
      viewevent:null,
      modal: false
    };
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
  }
  searchChangeHandler(e) {
    this.setState({ searchString: e.target.value });
  }
  showModal = () => {
    console.log("hello");
    this.setState({
      modal: !this.state.modal
      //events: this.state.events
    });
  };

  showModal1 = (viewevent) => {
    console.log("hello");
    this.setState({
      modal: !this.state.modal,
      viewevent: viewevent
    });
  };
  async componentDidMount() {
    const user_id = getID();
    axios("/events/viewevents", {
      method: "get",
      params: { user_id: user_id }
    }).then(response => {
      this.setState({
        events: this.state.events.concat(response.data.events) //events[0]
      });
      console.log(this.state.events);
    });
  }

  register = event_id => {
    axios.defaults.withCredentials = true;
    const user_id = getID();
    const reg = "Registered";
    console.log("In REGISTER EVENT CLICK");
    console.log(event_id);

    const registerevent = {
      event_id: event_id,
      user_id: user_id,
      Registration: reg
    };
    console.log(registerevent);
    axios
      .post("/events/eventregister", registerevent)
      .then(res =>
        swal({
          title: "Congratulations!",
          text: "You Successfully registered for the Event!",
          icon: "success",
          button: "OK"
        }).then(() => {
          window.location.reload();
        })
      )
      .catch(error => console.log(error.response.data));
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
      </button>
    );
    let eventsList = this.state.events.map(viewevent => {
      let str1 = viewevent.date_of_event;
      let d = str1.substring(0, str1.indexOf("T"));
      if (
        viewevent.event_name
          .toUpperCase()
          .includes(this.state.searchString.toUpperCase())
      ) {
        return (
          <div class="card w-100" id="eventscard">
            <div class="card-body">
              <div className="row">
                <h5 class="card-title col-7" id="eventtext">
                  Event name: {viewevent.event_name}
                </h5>
                <div className="col-3">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    onClick={() => this.showModal1(viewevent)}
                  >
                    View Event Details
                  </button>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => this.register(viewevent.event_id)}
                  >
                    Register
                  </button>
                </div>
              </div>
              <p class="card-text" id="eventtext">
                Company Name: {viewevent.company_name}
              </p>
              <p class="card-text" id="eventtext">
                eligibility: {viewevent.eligibility}
              </p>
              <div className="row">
                <div className="col-10"></div>
              </div>
            </div>
          </div>
        );
      }
    });

    return (
     
      <div className="viewevent">
        <StudentNavbar />
        <div id="events">
        <div className="container">
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                onChange={this.searchChangeHandler}
                value={this.state.searchString}
                placeholder="Search"
                aria-label="Search"
              />
              <Link
                to="/getStudentEvents"
                className="btn btn-outline-dark my-2 my-sm-0"
              >
                View Registered Events
              </Link>
            </form>
          </nav>
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="dash-one">
                <h4 className="font-weight-bold">Events</h4>
                {this.state.events.length > 0 ? (
                  <div className="col-10">
                    {eventsList}
                    {this.state.viewevent != null ? (
                        <Modal
                      isOpen={this.state.modal}
                      toggle={() => this.showModal()}
                      className="modal-popup"
                      scrollable
                    >
                      <ModalHeader
                        toggle={() => this.showModal()}
                        close={closeBtn}
                      >
                        EventDetails
                      </ModalHeader>
                      <ModalBody className="modal-body">
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Event Name: {this.state.viewevent.event_name}
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Event Description:{" "}
                            {this.state.viewevent.event_description}
                          </h4>
                          <br />
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Location:{this.state.viewevent.location}
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            DATE: {this.state.viewevent.date_of_event}
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            TIME: {(this.state.viewevent.time)}
                          </h4>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        {/* <Button
                        color="secondary"
                        onClick={() => this.showModal()}
                      >
                        Cancel
                      </Button> */}
                      </ModalFooter>
                    </Modal> 
                    ) : (
                      null
                    )}
                    
                  </div>
                ) : (
                  <div>
                    <h4 style={{ margin: "3em" }}>No new events to display!</h4>
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

export default studentviewevents;
