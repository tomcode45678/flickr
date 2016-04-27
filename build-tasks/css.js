"use strict";

const SRC = 'src/scss/**/*.scss';
const sass = require('gulp-sass');
const DIST = 'dist/css';

module.exports = function (gulp, tools, defaultTasks, watchTasks, env) {
  // Destructuring not supported yet
  // let {sourcemaps, concat, debug, gutil, uglify, gutil, runSequence, changed} = tools;

  // Default params not supported yet
  if (!env) {
    env = 'development';
  }

  function compile (watch) {
    gulp.src(SRC)
    .pipe(watch ? tools.changed(DIST) : tools.gutil.noop())
    .pipe(watch ? tools.plumber() : tools.gutil.noop())
    .pipe(tools.sourcemaps.init())
    .pipe(sass())
    .pipe(env === 'production' ? tools.uglify() : tools.gutil.noop())
    .pipe(tools.sourcemaps.write('.'))
    .pipe(gulp.dest(DIST))
    .pipe(tools.debug({title: 'Compiling using Babel:'}));
  }

  gulp.task('compile-css', compile);

  gulp.task('watch-css', () => gulp.watch(SRC, () => compile(true)));

  gulp.task('build-css', ['compile-css']);

  defaultTasks.push('build-css');
  watchTasks.push('watch-css');
}
