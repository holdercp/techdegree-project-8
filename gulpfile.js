'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var smaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var del = require('del');
var bs = require('browser-sync');

var DEST = 'dist';

gulp.task('scripts', function scripts() {
  return gulp
    .src('js/**/*.js')
    .pipe(smaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({ dirname: 'scripts', extname: '.min.js' }))
    .pipe(smaps.write('./'))
    .pipe(gulp.dest(DEST));
});

gulp.task('styles', function styles() {
  return gulp
    .src('sass/**/*.scss')
    .pipe(smaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ dirname: 'styles', basename: 'all', extname: '.min.css' }))
    .pipe(smaps.write('./'))
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});

gulp.task('images', function images() {
  return gulp
    .src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest(DEST + '/content'));
});

gulp.task('serve', function serve() {
  bs.init({ server: { baseDir: './' } });
  gulp.watch('sass/**/*.scss', gulp.series('styles'));
});

gulp.task('clean', function clean() {
  return del(DEST);
});

gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('scripts', 'styles', 'images'))
);

gulp.task('default', gulp.series('build', 'serve'));
