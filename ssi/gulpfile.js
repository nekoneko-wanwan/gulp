/* gulp-webserverはlivereloadが遅いので、BrowserSyncを使う */

var gulp        = require("gulp");
var browserSync = require("browser-sync").create();
var ssi         = require("browsersync-ssi");

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
      directory: false,
      middleware: [
        ssi({
          baseDir: __dirname + "/root",
          ext: ".html"
        })
      ]
    },
    open: false,
    port: 8001  // localhost:8001 
  });
});

/* watch */
/* htmlファイルはhtmlとして正しい形式（タグ）が入っていないと動作しないので注意 */
gulp.task("watch", function() {
  gulp.watch(watch_paths).on("change", browserSync.reload);
});

// CI -> $ gulp
gulp.task("default", ["server", "watch"]);