var Company = require('../models/Company');
var mongoose = require('mongoose');

exports.getAndPostEventService = function getAndPostEventService(msg, callback) {
    console.log("In add event service path");
    switch (msg.path) {
        case "addEvent":
            addEvent(msg, callback);
            break;
        case "getCompanyEvents":
            getCompanyEvents(msg, callback);
            break;
        case "getallevents":
            getallevents(msg, callback);
            break;
    }
}

async function addEvent(msg, callback) {
    let err = {};
    let response = {};
    console.log("In  add event topic service. Msg: ", msg);
    Company.findOne({ _id: msg.body.id }).then(company => {
        console.log("In post event details ", company);
        if (company) {
            const event = {
                event_name: msg.body.event_name,
                date_of_event: msg.body.date_of_event,
                event_description: msg.body.event_description,
                location: msg.body.location,
                time: msg.body.time,
                eligibility: msg.body.eligibility,
                name:msg.body.name
            };
            company.event.push(event);
            company.save().then(company => {
                response.data = company.event;
                response.status = 200;
                response.message = "Event added successfully!";
                return callback(null, response);
            }).catch(err => console.log(err));
        }
    }).catch((error) => {
        err.status = 400;
        err.message = "error in getting company id";
        err.data = error;
        return callback(err, null);
    });
}

async function getCompanyEvents(msg, callback) {
    let err = {};
    let response = {};
    console.log("In  add event topic service. Msg: ", msg);
    return await Company.find({ _id: msg.body }).select('event')
        .then((result) => {
            response.status = 200;
            response.message = "success" + result;
            response.data = result;
            return callback(null, response);
        })
        .catch((error) => {
            err.status = 400;
            err.message = "error in getting comapny jobs";
            err.data = error;
            return callback(err, null);
        });
}

async function getallevents(msg, callback){
    let err = {};
    let response = {};
    console.log("In  get all event topic service. Msg: ", msg);
    return await Company.find({}).select('event')
        .then((result) => {
            response.status = 200;
            response.message = "success" + result;
            response.data = result;
            return callback(null, response);
        })
        .catch((error) => {
            err.status = 400;
            err.message = "error in getting comapny jobs";
            err.data = error;
            return callback(err, null);
        });
}