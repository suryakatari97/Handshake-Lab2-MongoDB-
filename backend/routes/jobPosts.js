const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');


router.post("/addJobPost", (req,res)=> {
    console.log("In jobPosts route");
    console.log(req.body);
    kafka.make_request("postJobAndApply_topic",{"path":"postJob", "body":req.body}, function (err, results) {
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

module.exports = router;