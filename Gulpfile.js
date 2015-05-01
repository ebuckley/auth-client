var gulp = require('gulp');

var browserify = require('gulp-browserify'),
	concat = require('gulp-concat');

gulp.task('browserify', function  () {
	return gulp.src('src/frontend/main.js')
		.pipe(browserify({
			transform: ['reactify']
		}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'));		
});

gulp.task('copy', function  () {
	return gulp.src('src/frontend/index.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('watch', function  () {
	gulp.watch('src/**/*.*', ['default']);
})
