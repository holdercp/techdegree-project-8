'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var DEST = 'dist';

gulp.task('scripts', function scripts() {
  return gulp
    .src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({ dirname: 'scripts', extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('styles', function styles() {
  return gulp
    .src('sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ dirname: 'styles', basename: 'all', extname: '.min.css' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('default', function() {
  // place code for your default task here
});
