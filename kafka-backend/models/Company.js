var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { JobSchema } = require('./Job');
var {EventSchema} = require('./Event');

//schema
CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    location: {
        type: String,
        default: '',
        required: true,
    },
    img: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: Number,
        default: ''
    },
    job:[JobSchema],
    event:[EventSchema]
});

module.exports = mongoose.model('Company', CompanySchema); 