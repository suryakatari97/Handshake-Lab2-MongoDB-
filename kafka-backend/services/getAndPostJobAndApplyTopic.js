var Company = require('../models/Company');
var mongoose = require('mongoose');
// async = require("async");

exports.getAndPostJobAndApplyService = function getAndPostJobAndApplyService(msg, callback){
    console.log("In post job and apply job Service path:", msg.path);
    switch (msg.path) {
        case "postJob":
            postJob(msg, callback);
            break;
        case "getCompanyJobs":
            getCompanyJobs(msg, callback);
            break;
        case "getAllJobs":
            getAllJobs(msg, callback);
            break;
    }
}

 async function postJob(msg, callback){
    let err ={};
    let response = {};
    console.log("In post job topic service. Msg: ", msg);
    console.log(msg);
    console.log("message.body is ", msg.body);
    await Company.findOne({_id: msg.body.id}).then(company => {
        console.log("company is", company);
        if (company) {
            const job = {
                title: msg.body.title,
                posting_date: msg.body.posting_date,
                application_deadline: msg.body.application_deadline,
                location: msg.body.location,
                salary: msg.body.salary,
                job_description: msg.body.job_description,
                job_category: msg.body.job_category,
                name:msg.body.name
            };
            company.job.push(job);
            company.save()
            .then(company => {
                response.data = company.job;
                response.status = 200;
                response.message = "Job posted Successfully";
                console.log(response);
                return callback(null, response);
            }).catch(err => console.log(err));
        }
    })
    .catch((error) => {
        err.status = 400;
        err.message = "error in getting company id";
        err.data = error;
        return callback(err, null);
    });
}

async function getCompanyJobs(msg, callback){
    let err ={};
    let response={};
    console.log("in get all companies :" , msg);
    return await Company.find({_id: msg.body}).select('job')
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
};

async function getAllJobs(msg,callback){
    let err = {};
    let response = {};
    console.log("in get all companies :", msg);
    return await Company.find({}).select('job')
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