var gulp = require('gulp')

var watchify = require('gulp-watchify')

var bundlePaths = {
    src: [
        'app/js/**/*.js',
        "!app/js/**/lib/**" // Don't bundle libs
    ],
    dest:'build/js/'
}


// Hack to enable configurable watchify watching
var watching = false
gulp.task('enable-watch-mode', function() { watching = true })

// Browserify and copy js files
gulp.task('browserify', watchify(function(watchify) {
    return gulp.src(bundlePaths.src)
        .pipe(watchify({
            watch:watching
        }))
        .pipe(gulp.dest(bundlePaths.dest))
}))

gulp.task('watchify', ['enable-watch-mode', 'browserify'])


// Rerun tasks when a file changes
gulp.task('watch', ['watchify'], function () {
    // ... other watch code ...
})
// generate jsdocs
gulp.task('jsdoc', function() {
    if (isPluginEnabled('jsdoc')) {
        return gulp.src(path.join('./src/scripts/**/*.js'))
            .pipe(jsdoc.parser(jsdocOptions, 'jsdoc.json'))
            .pipe(jsdoc.generator('./docs'));
    }
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify'])
