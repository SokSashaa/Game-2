var gulp = require("gulp");
var gulpClean = require("gulp-clean");
var less = require("gulp-less");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
   dist: 'dist',
   page: 'game/index.html',
   entry: 'game/scripts/test.ts'
};

function cleanDist() {
   return gulp.src(paths.dist, {allowEmpty: true}).pipe(gulpClean({force: true}));
}
function copyHtml() {
   return gulp.src([paths.page])
      .pipe(gulp.dest(paths.dist, {allowEmpty: true}));
}

function buildJs() {
   return browserify({
      basedir: '.',
      debug: true,
      entries: [paths.entry],
      cache: {},
      packageCache: {}
   })
      .plugin(tsify)
      .bundle()
      .pipe(source('libCG.js'))
      .pipe(gulp.dest(paths.dist, {allowEmpty: true}));
}
function buildStyle () {
   return gulp.src(paths.style)
      .pipe(less())
      .pipe(gulp.dest(paths.dist, {allowEmpty: true}))
}
exports.default = gulp.series(cleanDist, copyHtml, buildJs);
