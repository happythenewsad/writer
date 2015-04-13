var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
 
gulp.task('default', function() {
  gulp.src(["src/javascripts/*.js"])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
  .pipe(gulp.dest("./build"))
});

gulp.task('jshint', function(){
  gulp.src(["src/javascripts/*.js"])
  .pipe(jshint())
  .pipe(jshint.reporter("default"))
});

//gulp.watch('main.js', 'default');