const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const Student = require('../models/Student');
const Company = require('../models/Company');

exports.signupLoginService = function signupLoginService(msg, callback) {
    console.log("In Signup Login Service path:", msg.path);
    switch (msg.path) {
        case "studentSignup":
            studentSignup(msg, callback);
            break;
        case "companySignup":
            companySignup(msg, callback);
            break;
        case "login":
            login(msg, callback);
            break;
    }
};

function studentSignup(msg, callback) {
    let err = {};
    let response = {};
    console.log("In studentSignup topic service. Msg: ", msg);
    Student.findOne({ email: msg.body.email })
        .then(user => {
            if (user) {
                err.status = 400;
                err.errors = { email: "Email already exists" };
                console.log(err);
                console.log("Returning error");
                callback(null, err);
            } else {
                const newStudent = new Student({
                    name: msg.body.name,
                    email: msg.body.email,
                    password: msg.body.password,
                    school: msg.body.school
                });


                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newStudent.password, salt, (err, hash) => {
                        if (err) throw err;
                        newStudent.password = hash;
                        newStudent
                            .save()
                            .then(user => console.log(user))
                            .catch(err => console.log(err));
                    });
                });

                console.log("Student registered successfully");
                response.status = 200;
                response.message = "Student Signup Success";
                return callback(null, response);
            }
        });
}

function companySignup(msg, callback) {

    console.log("In companySignup topic service. Msg: ", msg);
    let response = {};
    let err = {};
    Company.findOne({ email: msg.body.email })
        .then(user => {
            if (user) {
                err.status = 400;
                err.errors = { email: "Email already exists" };
                console.log(err);
                console.log("Returning error");
                callback(null, err);
            } else {
                const newCompany = new Company({
                    name: msg.body.name,
                    email: msg.body.email,
                    password: msg.body.password,
                    location: msg.body.location
                });


                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newCompany.password, salt, (err, hash) => {
                        if (err) throw err;
                        newCompany.password = hash;
                        newCompany
                            .save()
                            .then(user => console.log(user))
                            .catch(err => console.log(err));
                    });
                });

                console.log("Company registered successfully");
                response.status = 200;
                response.message = "Company Signup Success";
                return callback(null, response);
            }
        });
}

async function login(msg, callback) {
    console.log("Inside loginUser in kafka backend signupLogin topics!");
    let response = {};
    let err = {};
    console.log("Msg Body", msg.body);
    try {
        console.log(msg.body);
        let { email, password, userType } = msg.body;
        console.log(msg.body);
        email = email.toLowerCase().trim();
        // Find user by email
        let User = Student;
        if (userType === 'company') {
            User = Company;
        }
        console.log("Here to find user");

        let user = await User.findOne({
            email: msg.body.email
        });

        if (!user) {
            err.status = 400;
            err.errors = { email: "User Not Found" }
            console.log(err);
            return callback(null, err);
        } else {
            console.log(user);
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                console.log("Invalid User");
                err.status = 400;
                err.errors = { password: "Password Incorrect" };
                console.log(err);
                return callback(null, err);
            } else {
                console.log("Valid User modified");
                const payload = { id: user.id, name: user.name, email:user.email, userType: userType }; // Create JWT Payload

                console.log(payload);
                console.log("in sigin " + response);
                var token = jwt.sign(payload, keys.secret, {
                    expiresIn: 900000 // in seconds
                });
                response.status = 200;
                response.data = {
                    success: true,
                    token: 'Bearer ' + token
                };
                console.log("in sigin " +response);
                return callback(null, response);
            }
        }
    } catch (error) {
        err.status = 500;
        err.message = "Internal Server Error";
        return callback(err, null);
    }
}