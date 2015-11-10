var browserify  = require("browserify");
var browserSync = require("browser-sync").create();
var buffer      = require("vinyl-buffer");
var glob        = require("glob");
var gulp        = require("gulp");
var source      = require("vinyl-source-stream");
var uglify      = require("gulp-uglify");

var jsFiles = {
  src: "./root/js/src/**/*.js",  // コンパイルするsrc元
  distDir: "./root/js/dist/"  // 出力するディレクトリ先
};

/* 自動リロードの監視対象 */
var watchPaths = [
  "./root/**/*.css",
  "./root/**/*.html",
  jsFiles.distDir + "*.js"
];

/* static server */
gulp.task("server", function() {
  browserSync.init({
    server: {
      baseDir: "./root/",
      directory: false
    },
    open: false,
    port: 9999  // localhost:9999 
  });
});

/* browserify */
gulp.task("jsCompile", function(){
  var srcFiles = glob.sync(jsFiles.src);
  return browserify({
    entries: srcFiles
  })
  // エラーが出ても止めない
  .bundle().on('error', function(err) {
      console.log("ERROR! \n" + err.message);
      this.emit("end");
  })
  .pipe(source("app.js"))  // 出力ファイル名
  .pipe(buffer())  // uglifyする時には必須
  // .pipe(uglify())  // 圧縮（使用しない変数関数は出力しない。多分）
  .pipe(gulp.dest(jsFiles.distDir));
});

/* watch */
/* htmlファイルはhtmlとして正しい形式（タグ）が入っていないと動作しないので注意 */
gulp.task("watch", function(e) {
  gulp.watch(jsFiles.src, ["jsCompile"]);
  gulp.watch(watchPaths).on("change", browserSync.reload);
});





// CI -> $ gulp
gulp.task("default", ["server", "watch", "jsCompile"]);

