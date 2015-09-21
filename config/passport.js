var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');

    var info = {};

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        var accessToken = user.accessToken;
                done(null, user);
    });
	require('./strategies/facebook.js')();
    require('./strategies/local.js')();
};