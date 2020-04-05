const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/findusers", async (req,res) => {
    console.log("In findUsers post");
    console.log(req.body.findName);
    return await Student.find({
        $or: [
            { name: { "$regex": new RegExp(req.body.findName)}}
        ]
    })
    .select(['name','_id'])
    .then(result => {
        console.log(result);
        res.end(JSON.stringify(result));   
    })
        .catch(err => {
            console.log("could not find users", err);
            return res.end("could not find users");
        })
})

module.exports = router;