var connection = new require('./kafka/Connection');
var signupLoginTopics = require('./services/signupLoginTopics.js');
var getAndPostJobAndApplyTopic = require('./services/getAndPostJobAndApplyTopic');
var getAndPostEventTopic = require('./services/getAndPostEventTopic')
var studentProfileTopics = require('./services/studentProfileTopics')
const { mongoDB } = require('./config/settings');
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
})

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        switch (topic_name) {

            case 'signupLogin_topic':
                fname.signupLoginService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'postJobAndApply_topic':
                fname.getAndPostJobAndApplyService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'addEventAndRegister_topic':
                fname.getAndPostEventService(data.data, function (err, res){
                    response(data, res, producer);
                    return;
                });
            case 'studentProfile_topic':
                fname.studentProfileService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
        }
    });
}

function response(data, res, producer) {
    console.log('after handle', res);
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }
    ];
    producer.send(payloads, function (err, data) {
        console.log('producer send', data);
    });
    return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("login_topic",login);
handleTopicRequest("signupLogin_topic", signupLoginTopics);
handleTopicRequest("postJobAndApply_topic", getAndPostJobAndApplyTopic);
handleTopicRequest("addEventAndRegister_topic", getAndPostEventTopic);
handleTopicRequest("studentProfile_topic", studentProfileTopics);
