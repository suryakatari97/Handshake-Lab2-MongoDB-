import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import '../../App.css'

class vieweventModal extends Component {
  render() {
    console.log("damn");
    if (!this.props.modal) {
      return null;
    }
    const closeBtn = (
      <button className="close" onClick={() => this.props.toggle()}>
        &times;
      </button>
    );

    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={() => this.props.toggle()}
          className="modal-popup"
          scrollable
        >
          <ModalHeader toggle={() => this.props.toggle()} close={closeBtn}>
            EventDetails
          </ModalHeader>
          <ModalBody className="modal-body">
            {/* <div className="form-group">
              <h4 className="font-weight-bold">
                Event Name: {this.props.viewevent.event_name}{" "}
              </h4>
            </div>
            <div className="form-group">
              <h4 className="font-weight-bold">PROJECT DESCRIPTION: </h4>
              <br />
            </div>
            <div className="form-group">
              <h4 className="font-weight-bold">Skills: </h4>
            </div>
            <div className="form-group">
              <h4 className="font-weight-bold">PROJECT URL: </h4>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button> */}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default vieweventModal;
