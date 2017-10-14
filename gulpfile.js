const gulp = require('gulp')
const connect = require('gulp-connect')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('default', ['server', 'watch'])

gulp.task('copy', () => {
  gulp.src(['src/*.html', 'src/assets/css/**', 'src/assets/images/**'])
    .pipe(gulp.dest('docs'))
})

gulp.task('server', () => {
  connect.server({
    root: 'src',
    livereload: true,
    port: 8080
  })
})

gulp.task('sass', () => {
  gulp.src('src/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/assets/css'))
})

gulp.task('html', () => {
  gulp.src('src/*.html')
    .pipe(connect.reload())
})
gulp.task('css', () => {
  gulp.src('src/assets/css/**/*.css')
    .pipe(connect.reload())
})

gulp.task('watch', () => {
  gulp.watch('src/*.html', ['html'])
  gulp.watch('src/assets/sass/**/*.scss', ['sass'])
  gulp.watch('src/assets/css/**/*.css', ['css'])
})
