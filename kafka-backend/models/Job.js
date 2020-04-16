var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create Schema
var JobSchema = new Schema({
  job_id: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  posting_date: {
    type: Date
  },
  application_deadline: {
    type: Date
  },
  location: {
    type: String,
    required:true
  },
  salary: {
    type: String,
  },
  job_description: {
    type: String,
    default: ''
  },
  job_category: {
    type: String,
    default: ''
  },
  name:{
    type:String,
    }
});
    
//module.exports = Job = mongoose.model('Job', JobSchema);

var Job = mongoose.model("Job", JobSchema);
exports.Job = Job;
exports.JobSchema = JobSchema;