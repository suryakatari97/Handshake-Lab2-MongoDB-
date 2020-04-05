import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { getStudentsForEvent } from "../../actions/companyActions";


 class CompanyAddedEvents extends Component {
   eventClick = event_id => {
     console.log(event_id);
     console.log("Came inside event-click");
     this.props.history.push({
       pathname: "/StudentsRegisteredEvent",
       state: {
         event_id: event_id
       }
     });
   };

   render() {
       console.log(this.props);
       var { companyevents } = this.props.companyevents;
       console.log(companyevents);
       
      // companyevents = Object.values(companyevents);
       let eventDetails = companyevents.events.map(event => (
         <div>
           <div class="card w-50" id="eventscard">
             <div class="card-body">
               <div className="row">Event Name: {event.event_name}</div>
               <div className="row">Date of Event: {event.date_of_event}</div>
               <div className="row">Location: {event.location}</div>
               <div className="row">Time:{event.time}</div>
               <div className="row">Eligibility:{event.eligibility}</div>
               <div className="row">
                 Event Description:{event.event_description}
               </div>
               <div className="row">
                 <button
                   type="button"
                   class="btn btn-outline-dark"
                   onClick={() => this.eventClick(event.event_id)}
                 >
                   Registered Students
                 </button>
               </div>
             </div>
           </div>
         </div>
       ));

     return (
       <div className="col-12">
         <div className="dash-one">
           <h4 className="font-weight-bold">All Events</h4>
           {eventDetails.length > 0 ? (
             <div className="col-10">{eventDetails}</div>
           ) : (
             <div>
               <h4 style={{ margin: "3em" }}>
                 No events added, click on 'Add Event' to post an event.
               </h4>
             </div>
           )}
         </div>
       </div>
     );
   }
 }

 CompanyAddedEvents.propTypes = {
   getStudentsForEvent: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired
 };

 const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth,
   studentevents: state.studenteventReducer,
   companyevents: state.companyevents
 });

export default connect(mapStateToProps, { getStudentsForEvent })(
  withRouter(CompanyAddedEvents)
);