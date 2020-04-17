'use strict'
const express = require('express');
const router = express.Router();
const kafka = require('../kafka/client');

router.get('/getStudentProfile',(req,res) => {
    console.log("In getStuprofile API", req.body);
    kafka.make_request("studentProfile_topic", { "path": "getStudentProfile", "user": req.query }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            } else {
                return res.status(results.status).send(results.errors);
            }
        }
    }
    );
});

router.post('/updateStudentBasic',(req,res) => {
    console.log("In student basic  ID : ", req.query);
    console.log("In Student basic BODY", req.body);
    const profileFields = {};
    const studentBasicUpdate = {}
    profileFields.user = req.query.id;
    if (req.body.fname) profileFields.fname = req.body.fname;
    if (req.body.lname) profileFields.lname = req.body.lname;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.state) profileFields.state = req.body.state;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.dob) profileFields.dob = req.body.dob;
    if (req.body.phone_num) profileFields.phone_num = req.body.phone_num;
    if (req.body.career_obj) profileFields.career_obj = req.body.career_obj;
    if (req.body.major) profileFields.major = req.body.major;

    //update basic details
    if (req.body.name) studentBasicUpdate.name = req.body.name;
    if (req.body.email) studentBasicUpdate.email = req.body.email;

    // Skills - Spilt into array
    if (typeof req.body.skill_set !== 'undefined') {
        profileFields.skill_set = req.body.skill_set.split(',');
    }
    kafka.make_request("studentProfile_topic", { "path": "updateStudentBasic", "user": req.query, "profileFields": profileFields }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            } else {
                return res.status(results.status).send(results.errors);
            }
        }
    }
    );
})

router.post('/updateStudentWorkExp',(req,res) => {
    kafka.make_request("studentProfile_topic", { "path": "updateStudentWorkExp", "user": req.query, "body": req.body }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            } else {
                return res.status(results.status).send(results.errors);
            }
        }
    }
    );
})

router.post('/updateStudentEducation',(req,res)=>{
    console.log("in student educations :", req.query);
    console.log("in student educations BODY  :", req.body);
    kafka.make_request("studentProfile_topic", { "path": "updateStudentEducation", "user": req.query, "body": req.body }, function (err, results) {
        console.log("In make request call back", results);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.data);
            } else {
                return res.status(results.status).send(results.errors);
            }
        }
    }
    );
})

module.exports = router;