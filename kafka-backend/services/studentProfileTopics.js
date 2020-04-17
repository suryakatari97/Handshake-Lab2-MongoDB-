'use strict'
const Profile = require('../models/StudentProfile');

exports.studentProfileService = function studentProfileService(msg, callback){
    console.log("In Student Profile Service path:", msg.path);
    switch (msg.path) {
        case "getStudentProfile":
         getStudentProfile(msg, callback);
         break;
        case "updateStudentBasic":
            updateStudentBasic(msg, callback);
            break;
        case "updateStudentWorkExp":
            updateStudentWorkExp(msg, callback);
            break;
        case "updateStudentEducation":
            updateStudentEducation(msg, callback);
            break;  
    }
};

function getStudentProfile(msg, callback) {
    let err = {};
    let response = {};
    console.log("In getStudentProfile service. Msg: ", msg);
    console.log(msg.user.id);
    Profile.findOne({ user: msg.user.id })
        .populate('user', ['name', 'img', 'email'])
        .then(profile => {
            if (!profile) {
                err.noprofile = 'There is no profile for this user';
                err.status = 404;
                return callback(null, err);
            }
            response.data = profile;
            response.status = 200;
            return callback(null, response);
        })
        .catch(err => {
            return callback(null, err);
        });
}

function updateStudentBasic(msg, callback) {
    let err = {};
    let response = {};
    console.log("In updateStudentBasic service. Msg: ", msg);

    Profile.findOne({ user: msg.user.id }).then(profile => {
        if (profile) {
            // Update
            Profile.findOneAndUpdate(
                { user: msg.user.id },
                { $set: msg.profileFields },
                { new: true }
            ).then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
            }).catch(err => console.log(err));
        } else {
            // Save Profile
            new Profile(msg.profileFields).save().then(profile => {
                response.data = profile;
                response.status = 200;
                return callback(null, response);
            }).catch(err => console.log(err));
        }
    });
}

function updateStudentWorkExp(msg, callback) {
    let response = {};
    console.log("In updateStudentWorkExp service. Msg: ", msg);

    Profile.findOneAndUpdate({ user: msg.user.id }).then(profile => {
        const newExp = {
            title: msg.body.title,
            company: msg.body.company,
            location: msg.body.location,
            from: msg.body.from,
            to: msg.body.to,
            current: msg.body.current,
            description: msg.body.description
        };

        // Add to exp array
        profile.experience.unshift(newExp);

        profile.save().then(profile => {
            response.data = profile;
            response.status = 200;
            return callback(null, response);
        }).catch(err => console.log(err));
    });
}

function updateStudentEducation(msg, callback) {
    let response = {};
    console.log("In updateStudentEducation service. Msg: ", msg);
    Profile.findOneAndUpdate({ user: msg.user.id }).then(profile => {
        const newEdu = {
            school: msg.body.school,
            degree: msg.body.degree,
            education_major: msg.body.education_major,
            from: msg.body.from,
            to: msg.body.to,
            current: msg.body.current,
            cgpa: msg.body.cgpa,
        };

        // Add to edu array
        profile.education.unshift(newEdu);

        profile.save().then(profile => {
            response.data = profile;
            response.status = 200;
            return callback(null, response);
        }).catch(err => console.log(err));
    });
}