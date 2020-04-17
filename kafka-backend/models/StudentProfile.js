const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const StudentProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'Student'
  },
  fname:{
    type: String
  },
  lname: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  dob: {
    type: Date
  },
  major: {
    type: String,
    required:true
  },
  career_obj: {
    type: String,
  },
  skill_set: {
    type: [String],
    required: true
  },
  phone_number: {
    type: Number,
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      education_major: {
        type: String,
        required: true
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String
      },
      description: {
        type: String
      },
      location: {
        type: String
      },
      cgpa: {
        type: String
      }
    }
  ]
});

module.exports = StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);
