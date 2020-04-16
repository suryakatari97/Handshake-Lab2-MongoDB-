var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var EventSchema = new Schema({
  event_name: {
    type: String
  },
  date_of_event: {
    type: Date
  },
  event_description: {
    type: String
  },
  location: {
    type: String,
  },
  time: {
    type: String,
  },
  eligibility: {
    type: String,
    default: ''
  },
  name: {
    type: String,
  }
});
    
//module.exports = Event = mongoose.model('Event', EventSchema); 

var Event = mongoose.model("Event", EventSchema);
exports.Event = Event;
exports.EventSchema = EventSchema;