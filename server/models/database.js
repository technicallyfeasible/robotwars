/**
 * Database connection wrapper
 */

'use strict';

var MongoClient = require('mongodb').MongoClient;

var Database = {

	/**
	 * Initialize singleton with config
	 * @param config
	 */
	init: function (config) {
		this.config = config;
	},

	/**
	 * Connect to db and invoke callback when ready
	 * @param callback
	 */
	connect: function(callback) {
		if (!callback)
			return;
		try {
			MongoClient.connect(this.config.url, function (err, db) {
				callback(err, db, function () {
					db.close();
				});
			});
		} catch(e) {
			callback(e, null, function() {});
		}
	}
};

module.exports = Database;
