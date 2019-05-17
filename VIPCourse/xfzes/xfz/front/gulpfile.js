var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename"); //导入插件
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var bs = require('browser-sync').create()
var sass = require("gulp-sass")
//gulp-utli这个插件中有一个方法是log，可以打印出当前js中的错误信息
var util = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps")


var path = {
    'css':'./src/css/**/',//**表示可能有多个目录
    'js':'./src/js/',
    'images':'./src/images/',
    'css_dist':'./dist/css/',
    'js_dist':'./dist/js/', //编译完之后存放的路径
    'images_dist':'./dist/images/',
    'html':'./templates/**/',
}
//定义一个css的任务
gulp.task("css",function () {
    gulp.src(path.css +'*.scss')
        .pipe(sass().on("error",sass.logError))
        .pipe(cssnano())
        .pipe(rename({"suffix":".min"}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream())//重新加载
})

//定义一个处理js文件的任务
gulp.task("js",function () {
    gulp.src(path.js +'*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify().on("error",util.log))
        .pipe(rename({"suffix":".min"}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream())//重新加载
});

//定义处理图片文件的任务
gulp.task('images',function () {
   gulp.src(path.images +'*.*')
       .pipe(cache(imagemin()))
       .pipe(gulp.dest(path.images_dist))
       .pipe(bs.stream())//重新加载
});
//处理html的任务
gulp.task("html",function () {
    gulp.src(path.html+ '*.html')
        .pipe(bs.stream())
})

//定义监听文件修改的任务
gulp.task("watch",function () {
    gulp.watch(path.html+'*.html',['html'])
    gulp.watch(path.css+'*.scss',['css']);//监听后执行css这个任务
    gulp.watch(path.js + '*.js',['js']);
    gulp.watch(path.images + '*.*',['images'])
});

//初始化browser-syc的任务
gulp.task("bs",function () {
    bs.init({
        'server':{
            'baseDir':'./'
        }
    })
})

//创建一个默认的任务
// gulp.task("default",['bs','watch']);
//监听django文件的修改
gulp.task("default",['watch']);