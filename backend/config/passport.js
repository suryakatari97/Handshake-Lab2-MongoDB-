const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Student = require('../models/Student');
const Company = require('../models/Company');
var config = require('./keys');

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret_key
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            console.log("JWT Payload:", jwt_payload);
            let userType = jwt_payload.userType;
            let User = (userType == 'student') ? Student :Company;
            
           User.findOne({email: jwt_payload.email}, function (err, user){
               if(err) {
                   return done(err, false);
               }
               if (user) {
                   delete user.password;
                   console.log("Authentication valid");
                   return done(null, user);
               } else {
                   return done(null, false);
               }
           })
        })
    );
};