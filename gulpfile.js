var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
 

gulp.task('default', ['scss', 'jshint'], function() {
  gulp.src(["src/javascripts/*.js"])
  .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write("./sourcemaps"))
  .pipe(gulp.dest("./build/javascripts"))
});


gulp.task('jshint', function(){
  gulp.src(["src/javascripts/*.js"])
  .pipe(jshint())
  .pipe(jshint.reporter("default"))
});


gulp.task('scss', function () {
    gulp.src(['src/stylesheets/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./build/stylesheets'));
});


gulp.task('uglify', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

//gulp.watch('main.js', 'default');