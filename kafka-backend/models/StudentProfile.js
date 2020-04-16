const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StudentProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'Student'
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
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
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
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ]
});

module.exports = StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);
