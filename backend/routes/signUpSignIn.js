'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../kafka/client');

router.post("/signUpStudent", async function (req, res) {
    // console.log(req.body);
    // const { errors, isValid } = validate.validateRegisterStudentInput(req.body);
    // console.log(isValid);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    console.log("In signup student route");
    console.log(req.body);
    kafka.make_request("signupLogin_topic", { "path": "studentSignup", "body": req.body }, function (err, results) {
        console.log("In make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.message);
            } else {
                return res.status(results.status).send(results.errors);
            }
        }
    });
});

router.post("/signUpCompany", async function (req, res) {
    // console.log(req.body);
    // const { errors, isValid } = validate.validateRegisterCompanyInput(req.body);
    // console.log(isValid);
    // console.log(errors);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    console.log("In signup company route");
    console.log(req.body);
    kafka.make_request("signupLogin_topic", { "path": "companySignup", "body": req.body }, function (err, results) {
        console.log("In make request call back");
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            console.log(err);
            return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else", results);
            if (results.status === 200) {
                return res.status(results.status).send(results.message);
            } else {
                return res.status(results.status).send(results.errors);
            }
        }
    })
});

router.post("/signIn", async function (req, res) {
    console.log("in signin route..");
    // const { errors, isValid } = validateLoginInput(req.body);
    // console.log(isValid);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    console.log(req.body);

    kafka.make_request("signupLogin_topic", { "path": "login", "body": req.body }, function (err, results) {
        console.log("in make request call back signupLogin_topic");
        console.log(results);
        console.log(err);
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
    });
});

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    }
);

module.exports = router;