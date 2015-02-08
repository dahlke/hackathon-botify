var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var less = require('gulp-less');

var production = process.env.NODE_ENV === 'production';

var compile_js = function(watch) {
    var bundler = browserify('router.js', {
        debug: !production,
        paths: ['./node_modules', './static/js'],
        cache: {},
        packageCache: {},
        fullPaths: watch
    });

    if (watch) {
        bundler = watchify(bundler);
    }

    bundler.transform(reactify, {
        //global: true,
        harmony: true,
        strip_types: true,
        everything: true,
        target: "es5"
    });

    var rebundle = function() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./static/js'));
    };

    bundler.on('update', rebundle);
    bundler.on('log', gutil.log.bind(gutil));

    return rebundle();
};

var compile_less = function() {
    var path = require('path');
    gulp.task('less', function () {
        gulp.src('./static/styles/less/styles.less')
            .pipe(less())
            .pipe(gulp.dest('./static/styles'));
    });

};

gulp.task('less', function() {
    compile_less();
});

gulp.task('js', function() {
    return compile_js(false);
});

gulp.task('lint', function() {
    return gulp.src('./static/js/**/*.js')
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('build', function() {
    compile_js(false);
    compile_less();
});

gulp.task('watch', function() {
    // monitor less for changes
    gulp.watch('./static/styles/less/*.less', ['less']);
    gulp.watch('./static/styles/less/*/*.less', ['less']);

    // return the js bundler in watch mode
    return compile_js(true);
});
