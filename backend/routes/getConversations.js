const express = require("express");
const router = express.Router();
const messages = require("../models/messages");

router.post("/getConversations", async(req,res)=> {
    console.log("In getConversations post");

    return await messages.find({
        $or: [{ "sender.senderUserName": req.body.senderUserName }, { "receiver.receiverUserName": req.body.receiverUserName}]
    })
    .select()
    .then(result => {
        console.log("got conversations");
        res.end(JSON.stringify(result));   
    })
        .catch(err => {
            console.log(err);
            res.end("could not get messages");
        })
});

module.exports = router;