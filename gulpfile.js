var gulp = require('gulp');

var watchify = require('gulp-watchify');

var browserify = require("browserify");

var rename = require("gulp-rename");

var bundlePaths = {
    src: [
        'app/js/**/*.js',
        "!app/js/**/lib/**" // Don't bundle libs
    ],
    dest:'build/js/'
}


gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('app/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : true
        }))
        .pipe(gulp.dest('./build/js'))
});


// Hack to enable configurable watchify watching
var watching = false;
gulp.task('enable-watch-mode', function() { watching = true })

// Browserify and copy js files
gulp.task('build', watchify(function(watchify) {
    return gulp.src(bundlePaths.src)
        .pipe(watchify({
            watch:watching
        }))
        .pipe(gulp.dest(bundlePaths.dest))
}))

gulp.task('watchify', ['enable-watch-mode', 'build'])


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
gulp.task('default', ['build'])
