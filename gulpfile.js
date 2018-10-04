'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var smaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var del = require('del');

var DEST = 'dist';

gulp.task('clean:scripts', function() {
  return del(DEST + '/scripts');
});

gulp.task(
  'scripts',
  gulp.series('clean:scripts', function scripts() {
    return gulp
      .src('js/**/*.js')
      .pipe(smaps.init())
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(rename({ dirname: 'scripts', extname: '.min.js' }))
      .pipe(smaps.write('./'))
      .pipe(gulp.dest(DEST));
  })
);

gulp.task('clean:styles', function() {
  return del(DEST + '/styles');
});

gulp.task(
  'styles',
  gulp.series('clean:styles', function styles() {
    return gulp
      .src('sass/**/*.scss')
      .pipe(smaps.init())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(rename({ dirname: 'styles', basename: 'all', extname: '.min.css' }))
      .pipe(smaps.write('./'))
      .pipe(gulp.dest(DEST));
  })
);

gulp.task('clean:images', function() {
  return del(DEST + '/content');
});

gulp.task(
  'images',
  gulp.series('clean:images', function images() {
    return gulp
      .src('images/*')
      .pipe(imagemin())
      .pipe(gulp.dest(DEST + '/content'));
  })
);

gulp.task('clean', function clean() {
  return del(DEST);
});

gulp.task('build', gulp.parallel('scripts', 'styles', 'images'));

gulp.task('default', function() {
  // place code for your default task here
});
