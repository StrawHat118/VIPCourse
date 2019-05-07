
var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename"); //导入插件
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var bs = require('browser-sync').create()


gulp.task("greet",function () {
	console.log("hello world");
});

gulp.task("css",function () {
	gulp.src("./css/*.css")
	.pipe(cssnano())//suffix 是后缀的意思，index.css ->index.min.css
	.pipe(rename({"suffix":".min"}))
	.pipe(gulp.dest("./dist/css/"))
	.pipe(bs.stream())
});

gulp.task("js",function () {
	gulp.src("./js/*.js")
	.pipe(concat("index.js"))
	.pipe(uglify())
	.pipe(rename({"suffix":".min"}))
	.pipe(gulp.dest("./dist/js/"))
});

gulp.task("images",function () {
	gulp.src("./images/*.*")
	.pipe(cache(imagemin()))
	.pipe(gulp.dest("./dist/images/"))
})

gulp.task("watch",function () {
	gulp.watch("./css/*.css",['css'])
})

gulp.task("bs",function () {
	bs.init({
		'server':{
			'baseDir':'./'
		}
	})
});

gulp.task("default",['bs','watch']);
