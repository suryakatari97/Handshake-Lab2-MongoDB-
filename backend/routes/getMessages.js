const express = require("express");
const app = express.Router();
const router = express.Router();
const messages = require("../models/messages");

router.post("/getMessages", async (req, res) => {
    console.log("In getMessages post");

    return await messages.find({
        $and: [
            { $or: [{ "sender.senderUserName": req.body.senderUserName }, { "sender.senderUserName": req.body.receiverUserName }] },
            { $or: [{ "receiver.receiverUserName": req.body.senderUserName }, { "receiver.receiverUserName": req.body.receiverUserName }] }
        ]
    })
        .select()
        .then(result => {
            console.log("messages retreived");
            res.end(JSON.stringify(result));

        })
        .catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
})

module.exports=router;