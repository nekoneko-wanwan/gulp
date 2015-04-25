/*********************************************
 * インポート
 *********************************************/
var gulp        = require("gulp");
var browserSync = require("browser-sync").create();
var uglify      = require("gulp-uglify");  // 圧縮
var concat      = require("gulp-concat");  // 結合
var jade        = require("gulp-jade");    // jade(htmlテンプレートエンジン)
var compass     = require("gulp-compass");
var plumber     = require("gulp-plumber");
var rimraf      = require("gulp-rimraf");  // ファイル削除


/*********************************************
 * 変数一覧
 *********************************************/
var SRC  = "./_src/";
var DIST = "./deploy/";
var path = {

    //開発用
    dev : {
        scss   : SRC + "scss/**/*.scss",
        coffee : SRC + "coffee/**/*.coffee",
        js : {
            lib : SRC + "js/lib/*.js",  //lib
            origin : [ SRC + "js/*.js", "!" + SRC + "js/lib/*.js"] // 自作
        },
        jade : [SRC + "jade/**/*.jade", "!" + SRC + "jade/**/_*.jade"]  //htmlとして書き出す対象(_partialを除外)
    },
    //公開用
    deploy : {
        root : DIST,
        css  : DIST + "common/css/",
        js   : DIST + "common/js/"
    }
};

var watch_paths = [
  DIST + "**/*.html",
  DIST + "common/css/*.css",
  DIST + "common/js/*.js"
];



/*********************************************
 * static server
 *********************************************/
gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: DIST,
      directory: false
    },
    open: false,
    port: 8001  // localhost:8001 
  });
});



/*********************************************
 * jadeのコンパイル
 *********************************************/
gulp.task("jade", function() {
    gulp.src(path.dev.jade)
    .pipe(plumber())
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest(path.deploy.root));
});



/*********************************************
 * compassのコンパイル
 *********************************************/
gulp.task("compass", function() {
    gulp.src(path.dev.scss)
    .pipe(plumber())  //エラーが出てもwatchを止めない
    .pipe(compass({
        config_file: SRC + "scss/config.rb",  //compassの設定ファイルの場所
        css: path.deploy.css,  //出力するcssのフォルダ場所
        sass: SRC + "scss"  //sassファイルの場所
    }));
});



/*********************************************
 * jsの設定
 *********************************************/
gulp.task("js-min", function() {
    //libの圧縮と結合
    gulp.src(path.dev.js.lib)
    .pipe(plumber())
    .pipe(concat("lib.js"))
    .pipe(uglify({
        preserveComments:"some"
    }))
    .pipe(gulp.dest(path.deploy.js));

    //自作jsの圧縮と結合
    gulp.src(path.dev.js.origin)
    .pipe(plumber())
    .pipe(concat("script.js") )
    .pipe(uglify())
    .pipe(gulp.dest(path.deploy.js));
});


/*********************************************
 * watchの設定
 *********************************************/
gulp.task("watch", function() {

    gulp.watch(path.dev.jade,  ["jade"]);
    gulp.watch(path.dev.scss, ["compass"]);
    gulp.watch([path.dev.js.lib, path.dev.js.origin],   ["js-min"]);

});


gulp.task("reload", function() {
    gulp.watch(watch_paths).on("change", browserSync.reload);
});


/*********************************************
 * 基本実行
 * コマンド -> gulp
 *********************************************/
gulp.task("default", ["server", "jade", "compass", "js-min", "watch", "reload"]);


/*********************************************
 * ファイルの削除
 * 
 * コマンド -> gulp del
 *********************************************/
gulp.task("del", function() {
    return gulp.src(watch_paths, { read: false }) // much faster
           .pipe(rimraf({ force: true }));
});