var gulp = require("gulp");
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

// 配置 Sass 编译
gulp.task('sass', function() {
    return sass('src/sass/') 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('src/css'));
});

gulp.task('watchSassBuild',function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

// 自动编译 Sass
gulp.task('asb',['sass','watchSassBuild']);

// 压缩 CSS
gulp.task('minify-css', function() {
  return gulp.src('src/css/**/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// 压缩 JavaScript
gulp.task('js', function () {
   return gulp.src(['src/js/**/*.js','!src/js/**/*.min.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

// 监控 CSS 和 JavaScript
gulp.task('watchCssJavaScript',function() {
    gulp.watch('src/css/**/*.css',['minify-css']);
    gulp.watch(['src/js/**/*.js','!src/js/**/*.min.js'],['js']);
});

// 自动压缩 CSS JavaScript
gulp.task('acj',['minify-css','js','watchCssJavaScript']);

// 完整的自动流程
gulp.task('default',['asb','acj']);