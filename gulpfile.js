var gulp = require('gulp');
var gutil = require('gulp-util');
var streamify = require('gulp-streamify');
var rename = require("gulp-rename");
var reactify = require("reactify");
var source = require('vinyl-source-stream');


var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');


var del = require('del');

var watchify = require('gulp-watchify');

var browserify = require("browserify");


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
        .pipe(gulp.dest('../build/build/js'))
});


// Hack to enable configurable watchify watching
var watching = false;
gulp.task('enable-watch-mode', function() { watching = true })

// Browserify and copy js files
gulp.task('build', function(){
        browserify('./app/js/app.js', {
        cache: {},
        packageCache: {},
        fullPaths: true,
        transform: ['reactify'],
        debug: true
    }).bundle();
});


gulp.task('browse', function () {
    var filename = "./app/js/app.js"
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./app/js/*.js'])
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});









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
