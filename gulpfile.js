'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');

gulp.task('default', () => {
    gutil.log('Gulp is running!');
    gulp.watch('styles/sass/index.scss', gulp.series('sass-to-css', 'minify-css'));
});

gulp.task('sass-to-css', () => {
    return gulp.src('./styles/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles/css'));
});

gulp.task('minify-css', () => {
    return gulp.src('./styles/css/index.css')
        .pipe(cssmin().on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./styles/css'));
});
