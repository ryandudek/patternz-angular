"use strict";

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    directoryMap = require("gulp-directory-map"),
    data = require('gulp-data'),
    gutil = require('gulp-util'),
    map = require('vinyl-map'),
    rename = require("gulp-rename"),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');


gulp.task('stylus', function () {
    gulp.src(['./styl/*.styl', '!styl/**/_*'])
        .pipe(stylus({use: [nib()]}))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());

    gulp.src(['./library/styl/*.styl', '!styl/**/_*'])
        .pipe(stylus({use: [nib()]}))
        .pipe(gulp.dest('./library/css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('**/*.html')
      .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['styl/**/*.styl', './library/styl/*.styl'], ['stylus']);
    gulp.watch(['./**/*.html'], ['html']);
    gulp.watch(['./patterns/**/*.html'], ['tree']);
});

// gulp.task('clean', function () {
//     return gulp.src('tmp/patterns', {read: false})
//         .pipe(clean());
// });

gulp.task('tree', function () {
    gulp.src('patterns/**/*.html')
      .pipe(directoryMap({
        filename: 'tree.json'
      }))
      .pipe(gulp.dest('library/data'));
});

gulp.task('connect', function() {
    connect.server({
        root: [__dirname],
        livereload: true
    });
});

gulp.task('default', function(callback) {
    runSequence('stylus',
        ['tree', 'connect', 'watch'],
        callback);
});


// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
