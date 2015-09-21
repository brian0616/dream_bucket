'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Bucket = mongoose.model('Bucket');
	// twilio = require('twilio'),
	
/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logOut();
	res.redirect('/');
};


exports.addBucket = function(req, res) {
	console.log(req.body);
	// User.find({$or: [{_id: req.body._user},{_id: req.body._tagged}]},function(err,users){
	User.findOne({providerID: req.body._user},function(err,user){
		if(err) {
			console.log("User not found");
		} else {
			console.log("here is the adding");
			console.log(user);
			var bucket = new Bucket(req.body);
			user.buckets.push(bucket);
			bucket.save();
			user.save(function(err){
				if(err){
					console.log("Error");
				} else{
					User.findOne({providerID: req.body._tagged},function(err,tagged){
						console.log('tagging friends in bucket');
						tagged.buckets.push(bucket)
						console.log(tagged);
						bucket.save();
						tagged.save();

					})

					res.json(bucket);
				}
			})
		}
	})

};



exports.getBucket = function(req, res) {
	console.log("getBUcket HERE");
	console.log(req.body);
	var done = [];
	var user = [];
	var tagged = [];
	var bucket = [];
	Bucket.find({_user: req.body.id}, function(err, results){
		if(err){
			console.log("ERRORERROEROEROEROERO");
		} else {
			console.log("results HERE");
			for(var i = 0; i<results.length; i++){
				// console.log(results[i].title);
				// console.log(results[i].done);
				if(results[i].done){
					done.push(results[i]);
				} else{
					bucket.push(results[i]);
				}
			}

			Bucket.find({_tagged: req.body.id}, function(err, results){
				if(err){
				console.log("ERRORERROEROEROEROERO");
				} else {

					for(var j = 0; j<results.length; j++){
						// console.log(results[j].title);
						// console.log(results[j].done);
						if(results[j].done){
							done.push(results[j]);
						} else{
							tagged.push(results[j]);
				}
			}
				var bucketlist = {user: bucket, tagged: tagged, done: done};
				res.json(bucketlist);
				}
			})
		  };
	   })
	};



exports.doneBucket = function(req, res) {
	Bucket.update({_id: req.body._id}, {done: true}, function(err, event) {
		if(err) {
			console.log("Problem changing DONE status");
		} else {
			console.log(event);
			res.json(event);
		}
	})
};

/**
 * OAuth callback
 */
exports.saveOAuthUserProfile = function(req, profile, done) {
	console.log("user server controller save oauth");
	console.log(profile);
	// console.log(profile);
    User.findOne({
            // provider: profile.provider,
            providerID: profile.providerID
        },
        function(err, user) {
                if (!user) {
                        user = new User(profile);
                        user.save(function(err) {
                            if (err) {
                                console.log("error saving new user");
                            }
                             user.accessToken = profile.accessToken;
                			user.friends = profile.friends.data;

                            return done(err, user);
                        });
                }
                else {
                	console.log("CAME TO HERE");

                	user.accessToken = profile.accessToken;
                	user.friends = profile.friends.data;

                    done(err, user);
                }
            }

    );
};
