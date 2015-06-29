var gulp = require("gulp");
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');

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
// gulp.task

// 监控 CSS 和 JavaScript
gulp.task('watchCssJavaScript',function() {
    gulp.watch('src/css/**/*.css',['minify-css']);
});

// gulp.task('default',['minify-css','watchCssJavaScript']);