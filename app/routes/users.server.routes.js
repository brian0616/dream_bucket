var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	// Setting up the local authentication
	app.route('/oauth/signout').get(users.signout);
	app.route('/add_bucket').post(users.addBucket);
	app.route('/get_bucket').post(users.getBucket);
	app.route('/done_bucket').post(users.doneBucket);
	
	//FACEBOOK Authentication
	app.get('/oauth/facebook', passport.authenticate('facebook', {
	    failureRedirect: '/',
	    scope:['email', 'user_friends']
	}));

	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
	    failureRedirect: '/',
	    successRedirect: '/',
	    scope:['email', 'user_friends']
	}));



};
