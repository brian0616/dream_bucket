'use strict';

// Authentication service for user variables
angular.module('mean').factory('Authentication',[

	function() {
		var _this = this;
		var user;

		_this._data = {
			user: window.user
		};
		user = _this._data; 

			return user;
	}
]);