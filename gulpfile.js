'use strict';

var gulp = require( 'gulp' );
var autoprefixer = require( 'gulp-autoprefixer' );
var concat = require( 'gulp-concat' );
var fileinclude = require('gulp-file-include');
var sass = require( 'gulp-sass' );
var sourcemaps = require( 'gulp-sourcemaps' );

gulp.task( 'sass', function() {
  gulp.src([
      './src/scss/common/bootstrap.scss',
      './src/scss/style.scss'
    ])
    .pipe( autoprefixer() )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( 'build/css/' ) );
});

gulp.task( 'js', function() {
  gulp.src([
      './node_modules/jquery/dist/jquery.js',
      './node_modules/hammerjs/hammer.js',
      './node_modules/jquery-hammerjs/jquery.hammer.js',
      './node_modules/animejs/anime.js',
      './src/js/libs/**/*.js',
      //'./src/js/timeline/**/*.js',
      //'./src/js/biografia/**/*.js',
      './src/js/jogo-do-mix/**/*.js',
    ])
    .pipe( sourcemaps.init() )
    .pipe( concat( 'script.js' ) )
    .pipe( gulp.dest( 'build/js/' ) );
});

gulp.task( 'html', function() {
  // gulp.src(['./src/html/timeline/index.html' ])
  //   .pipe( fileinclude() )
  //   .pipe( concat( 'timeline.html' ) )
  //   .pipe( gulp.dest( 'build/' ) );

  gulp.src(['./src/html/jogo-do-mix/index.html' ])
    .pipe( fileinclude() )
    .pipe( concat( 'jogo-do-mix.html' ) )
    .pipe( gulp.dest( 'build/' ) );

  // gulp.src(['./src/html/biografia/index.html' ])
  //   .pipe( fileinclude() )
  //   .pipe( concat( 'biografia.html' ) )
  //   .pipe( gulp.dest( 'build/' ) );
});

gulp.task( 'default', ['sass', 'js', 'html'] );

gulp.task( 'dev', ['default'], function() {
  gulp.watch(['./src/scss/**/*.scss'], ['sass'] );
  gulp.watch(['./src/js/**/*.js'], ['js'] );
  gulp.watch(['./src/html/**/*.html'], ['html'] );
});


