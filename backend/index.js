const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const cors = require("cors");
const path = require("path");

const userRouter = require('./routes/signUpSignIn')
const getConversations = require('./routes/getConversations')
const getMessages = require('./routes/getMessages')
const setMessage = require('./routes/setMessage')

app.set('view engine', 'ejs');
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const {mongoDB} = require('./config/settings');
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

app.use('/user', userRouter )
app.use('/', getConversations)
app.use('/', getMessages)
app.use('/', setMessage)

app.listen(port, () => console.log(`Handshake running on port ${port}`));