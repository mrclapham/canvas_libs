var gulp = require('gulp');
var gutil = require('gulp-util');
var streamify = require('gulp-streamify');
var rename = require("gulp-rename");
var reactify = require("reactify");
var source = require('vinyl-source-stream');
var less = require('gulp-less');


// Standard handler
function standardHandler(err){
    // Notification
    var notifier = Notification();
    notifier.notify({ message: 'Error: ' + err.message });
    // Log to console
    util.log(util.colors.red('Error'), err.message);
}


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
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./app/js/**/*.js'])
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('browse_app', function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./app/js/app.js'])
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});

// Less task
gulp.task('less', function () {
    gulp.src('./less/app.less')
        .pipe(less())
        .on('error', standardHandler)
        .pipe(gulp.dest('./app/css'));

    gulp.src('./node_modules/bootstrap/less/bootstrap.less')
        .pipe(less())
        .on('error', standardHandler )
        .pipe(gulp.dest('./app/css'));
});

// Watch tasks
gulp.task('watch-less', function () {
    gulp.watch(['less/*.less'], ['less']);
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
