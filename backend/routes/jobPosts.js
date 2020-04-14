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

router.get('/getCompanyJobs', (req,res) => {
    console.log("Inside getcompanyjobs", req.query.id);
    kafka.make_request('postJobAndApply_topic', { "path": "getCompanyJobs", "body": req.query.id},function(err,results){
        if(err){
            console.log(err);
            return res.status(err.status).send(err.message);
        }
        else if(results.status ===200)
        {
            console.log("Results found");
            return res.status(results.status).send(results.data);
        }else if(results.status === 400){
            console.log("No results found");
            return res.status(results.status).send(results.message);
        }
    })
    
})

module.exports = router;