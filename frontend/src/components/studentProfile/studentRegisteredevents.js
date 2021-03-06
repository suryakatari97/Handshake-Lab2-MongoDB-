import React, { Component } from "react";
import StudentNavbar from "./StudentNavbar";
import axios from "axios";
import "../../App.css";
import vieweventModal from "./vieweventModal";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getID } from "../auth/HelperApis";

class studentRegisteredevents extends Component {
  constructor() {
    super();
    this.state = {
      studentevents: [],
      searchString: "",
      displayAck: false,
      success: false,
      modal: false
    };
    // this.showModal = this.showModal.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
  }
  searchChangeHandler(e) {
    this.setState({ searchString: e.target.value });
  }
  showModal = () => {
    console.log("hello");
    this.setState({
      modal: !this.state.modal
    });
  };

  async componentDidMount() {
    axios.defaults.withCredentials = true;
    const user_id = getID();
    console.log(user_id);

    await axios("/events/getStudentEvents", {
      method: "get",
      params: { "user_id": user_id },
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(response => {
        this.setState({
          studentevents: this.state.studentevents.concat(
            response.data.studentevents
          )
        });
        console.log(this.state.studentevents);
      })
    //   .catch(error => console.log(error.response.data));
  }
 
  render() {
    const closeBtn = (
      <button className="close" onClick={() => this.showModal()}>
        &times;
      </button>
    );
    let eventsList = this.state.studentevents.map(viewevent => {
      let str1 = viewevent.date_of_event;
      let d = str1.substring(0, str1.indexOf("T"));
      if (
        viewevent.company_name
          .toUpperCase()
          .includes(this.state.searchString.toUpperCase())
      ) {
        return (
          <div class="card w-100" id="eventscard">
            <div class="card-body">
              <div className="row">
                <h5 class="card-title col-5" id="eventtext">
                  Event name: {viewevent.event_name}{" "}
                </h5>
                <div className="col-4"></div>
                <div className="col-3">
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    onClick={this.showModal}
                  >
                    View Event Details
                  </button>
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
                          Event Name: {viewevent.event_name}{" "}
                        </h4>
                      </div>
                      <div className="form-group">
                        <h4 className="font-weight-bold">
                          Event Description: {viewevent.event_description}
                        </h4>
                        <br />
                      </div>
                      <div className="form-group">
                        <h4 className="font-weight-bold">
                          Location:{viewevent.location}{" "}
                        </h4>
                      </div>
                      <div className="form-group">
                        <h4 className="font-weight-bold">DATE: {d}</h4>
                      </div>
                      <div className="form-group">
                        <h4 className="font-weight-bold">
                          TIME: {viewevent.time}
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
                  {/* <vieweventModal
                    // viewevent={viewevent}
                    toggle={this.showModal}
                    modal={this.state.modal}
                  /> */}
                </div>
              </div>
              <p class="card-text" id="eventtext">
                Company Name: {viewevent.company_name}
              </p>
              {/* <p class="card-text" id="eventtext">
                location: {viewevent.location}
              </p>
              <p class="card-text" id="eventtext">
                event_description: {viewevent.event_description}
              </p> */}
              <p class="card-text" id="eventtext">
                eligibility: {viewevent.eligibility}
              </p>
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
          <nav class="navbar navbar-light bg-light">
            <form class="form-inline">
              <input
                class="form-control mr-sm-2"
                type="search"
                onChange={this.searchChangeHandler}
                value={this.state.searchString}
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </nav>
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div className="dash-one">
                <h4 className="font-weight-bold">Events</h4>
                {this.state.studentevents.length > 0 ? (
                  <div className="col-10">
                    {eventsList}
                  </div>
                ) : (
                  <div>
                    <h4 style={{ margin: "3em" }}>No  events Registered to display!</h4>
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

export default studentRegisteredevents;
