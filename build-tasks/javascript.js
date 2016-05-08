"use strict";

const SRC = 'src/**/*.js';
const LIBRARIES = 'src/**/lib/*.js'
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const DIST = 'dist/javascript';

module.exports = function (gulp, tools, defaultTasks, watchTasks, env) {
  // Destructuring not supported yet
  // let {sourcemaps, concat, debug, gutil, runSequence, changed} = tools;

  // Default params not supported yet
  if (!env) {
    env = 'development';
  }

  function compile (watch) {
    gulp.src([SRC, `!${LIBRARIES}`])
    .pipe(watch ? tools.changed(DIST) : tools.gutil.noop())
    .pipe(watch ? tools.plumber() : tools.gutil.noop())
    .pipe(tools.sourcemaps.init())
    .pipe(babel())
    .pipe(tools.concat('vendor.min.js'))
    .pipe(env === 'production' ? uglify() : tools.gutil.noop())
    .pipe(tools.sourcemaps.write('.'))
    .pipe(gulp.dest(DIST))
    .pipe(tools.debug({title: 'Compiling using Babel:'}));
  }

  gulp.task('compile-js', compile);

  gulp.task('watch-js', () => gulp.watch(SRC, () => compile(true)));

  gulp.task('move-lib-js', () => {
    gulp.src(LIBRARIES)
    .pipe(tools.concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DIST));
  });

  gulp.task('build-js', ['compile-js', 'move-lib-js']);

  defaultTasks.push('build-js');
  watchTasks.push('watch-js');
}
