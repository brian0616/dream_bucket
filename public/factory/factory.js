mainApplicationModule.factory('factory', function($http){
	var factory = {};
	var user;

	factory.getBucket = function(data, callback) {
		
		var userID = {id: data};
		console.log(userID);
		$http.post('/get_bucket', userID).success(function(output) {
			console.log(output);
			callback(output);
		})
	}

	factory.addBucket = function (bucket, callback) {
		// console.log(bucket);
		$http.post('/add_bucket', bucket).success(function(output){
			callback(output);	
		})
	}

	factory.tagFriend = function(bucket, callback){
		// console.log(bucket);
		var data = {friend: bucket._tagged, bucket: bucket};
		$http.post('/tag_friend', data).success(function(output){
			callback(output);
		})
	}

	factory.doneBucket = function(event, callback) {

		$http.post('/done_bucket', event).success(function(output){
			console.log(output);
			callback(output);
		})
	}

	return factory;
});