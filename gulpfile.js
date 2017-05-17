'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const pref = require('gulp-autoprefixer');
const brow = require('browser-sync');

gulp.task('pug', () => {
  return gulp.src('./dev/*pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', () => {
  return gulp.src('./dev/scss/styles.scss')
    .pipe(sass({ outputStyle: 'nested' }).on('error', sass.logError))
    .pipe(pref({browsers: '> 2%', cascade: true}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(brow.stream());
});

gulp.task('watch', ['pug', 'styles'], () => {
  gulp.watch('./dev/*pug', ['pug']);
  gulp.watch('./dev/scss/*scss', ['styles']);
  gulp.watch('./dist/*html', brow.reload);
});

gulp.task('default', ['watch'], () => {
  brow.init({ server: './dist/' });
});
