var gulp        = require("gulp");
var browserSync = require("browser-sync").create();
var compass     = require("gulp-compass");
var plumber     = require("gulp-plumber");


var watch_paths = [
  "./root/**/*.css",
  "./root/**/*.html",
  "./root/**/*.js"
];


/* static server */
gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "./root/",
      directory: false
    },
    open: false,
    port: 8001  // localhost:8001 
  });
});


/* compass */
gulp.task("compass", function() {
    gulp.src("root/scss/**/*.scss")
        .pipe(plumber()) //エラーが出てもwatchを止めない
    .pipe(compass({
        config_file: "root/scss/config.rb", //compassの設定ファイルの場所
        css: "root/css/", //出力するcssのフォルダ場所
        sass: "root/scss" //sassファイルの場所
    }));
});


/* watch */
gulp.task("watch", function() {
    gulp.watch("root/scss/**/*.scss", ["compass"]);
});


/* reload */
gulp.task("reload", function() {
  gulp.watch(watch_paths).on("change", browserSync.reload);
});


gulp.task("default", ["server", "compass", "watch", "reload"]);
