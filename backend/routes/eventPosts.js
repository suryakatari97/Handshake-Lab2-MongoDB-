const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');

router.post('/addEvent', (req, res) => {
    console.log("In add event route");
    console.log(req.body);

    kafka.make_request("addEventAndRegister_topic", { "path": "addEvent", "body": req.body }, function (err, results) {
        console.log("In event make request call back");
        if (err) {
            return res.status(err.status).send(err.message);
        } else {
            if (results.status === 200) {
                return res.status(results.status).send(results.message);
            } else {
                return res.status(results.status).send(results.errors);
            }
        }
    })
})

router.get('/getCompanyEvents', (req, res) => {
    console.log("In get company events");
    kafka.make_request("addEventAndRegister_topic", { "path": "getCompanyEvents", "body": req.query.id }, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(err.status).send(err.message);
        }
        else if (results.status === 200) {
            console.log("Results found");
            return res.status(results.status).send(results.data);
        } else if (results.status === 400) {
            console.log("No results found");
            return res.status(results.status).send(results.message);
        }
    })
})

router.get('/viewallevents', (req,res) => {
    console.log("In get All events");
    kafka.make_request("addEventAndRegister_topic", {"path":"getallevents"},function(err, results){
        if (err) {
            console.log(err);
            return res.status(err.status).send(err.message);
        }
        else if (results.status === 200) {
            console.log("Results found");
            return res.status(results.status).send(results.data);
        } else if (results.status === 400) {
            console.log("No results found");
            return res.status(results.status).send(results.message);
        }
    })
})


module.exports = router;