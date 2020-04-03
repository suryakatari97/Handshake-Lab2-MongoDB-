var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
StudentSchema = new Schema({
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
    img: {
        type: String,
        default: ''
    },
    school: {
        type: String,
        default: '',
        required: true,
    }
});

module.exports = Student = mongoose.model('Student', StudentSchema); 