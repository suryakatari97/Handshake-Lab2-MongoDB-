var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messagesSchema = new Schema({
    sender:
    {
        email : {
            type: String
        },
        senderUserName : {
            type: String
        }
    },
    receiver:
    {
        email : {
            type : String
        },
        receiverUserName : {
            type: String
        }
    },
    messages:[
        {
            sent_by:{
                type:String
            },
            message:{
                type:String
            },
            messageTime: {
                type: Date,
                default:Date.now
            }
        }
    ]
});

module.exports = messages = mongoose.model("messages", messagesSchema)