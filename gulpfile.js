var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var del = require('del');


gulp.task('scss', function(){
    console.log('Building SCSS to CSS');
    return gulp.src('src/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dev'))
});

gulp.task('packcss', function () {
    return gulp.src(['dev/**/*.css'])
        .pipe(concat('cssdohugao.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
});

gulp.task('start',['scss', 'packcss'], function() {
    console.log('Hugo Almeida - CSS Do Hugão');
});

/**APAGAR */

gulp.task('watch', ['scss'], function(){
    gulp.watch('app/scss/**/*.scss', ['scss']); 
    // Other watchers
})

gulp.task('css', function(){
    console.log('Building CSS - Minify and Union files');
    return gulp.src('dev/**/*.css')
      .pipe(cssnano())
      .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('clean:dev', function() {
    return del.sync('dev');
});

gulp.task('clean:all',['clean:dist', 'clean:dev'], function(){
    console.log("Clean Directories");
});

gulp.task('build', [`clean:all`, `scss`, `css`], function (){
    console.log('Building all files');
});