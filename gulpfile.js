'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mocha = require('gulp-mocha');

var src = {};


// The default task
gulp.task('default', ['serve']);

// start the server and restart if the source changes
gulp.task('test', [], function () {
	src.testFiles = './test/**/*.spec.*';
	$.util.log('Running tests.');
	return gulp.src(src.testFiles)
		.pipe(mocha({reporter: 'spec'}))
		.once('error', function () {
			this.emit('end');
		});
});

// start the server and restart if the source changes
gulp.task('serve', ['test'], function (cb) {
    src.serverFiles = './server/**/*.*';

    var started = false;
    var cp = require('child_process');
    var assign = require('lodash').assign;

    var server = (function startup() {
        var child = cp.fork('./server/server.js', {
            env: assign({
                NODE_ENV: 'development'
            }, process.env)
        });
        child.once('message', function (message) {
            if (message.match(/^online$/)) {
                if (!started) {
                    started = true;
                    gulp.watch([src.serverFiles, src.testFiles], ['test', function (file) {
                        $.util.log('Restarting development server.');
                        server.kill('SIGTERM');
                        server = startup();
                    }]);
                    cb();
                }
            }
        });
        return child;
    })();

    process.on('exit', function () {
		$.util.log('server dying');
        server.kill('SIGTERM');
    });
});

