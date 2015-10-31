var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	User = require('mongoose').model('User'),
	url = require('url'),
	users = require('../../app/controllers/users.server.controller');
	// config = require('../config');

module.exports = function() {
    passport.use(new FacebookStrategy({
        clientID: '502296169929947',
        clientSecret: '88675a0f667696f3c5d96ae620ca7753',
        // callbackURL: 'http://52.27.39.42/oauth/facebook/callback/',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback/',
        profileFields: ['id', 'displayName', 'photos', 'email', 'friends']
    },
    function(req, accessToken, refreshToken, profile, done) {
    	// console.log(profile._json.friends.data);
    
        var providerData = profile._json;

        providerData.accessToken = refreshToken.access_token;
        providerData.refreshToken = refreshToken;
     	providerData.providerID = profile.id
        // console.log(providerData);
        
        var providerUserProfile = {
            name: profile.name.givenName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };
        // console.log(providerUserProfile);
        // console.log("LINELINELNE");
        // console.log(providerData);
        // done(null, profile);
        users.saveOAuthUserProfile(req, providerData, done);
    }));

};