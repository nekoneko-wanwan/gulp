var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("hoge", function(callback) {
  setTimeout(function() {
    console.log("1 hoge");
    callback();
  }, 1000);
});

gulp.task("fuga", function(callback) {
  console.log("2 fuga");
  callback();
});

gulp.task("moge", function(callback) {
  setTimeout(function() {
    console.log("3 moge");
    callback();
  }, 500);
});

/* 普通にやると fuga -> moge -> hoge となる */
gulp.task("default", ["hoge", "fuga", "moge"]);

/* hoge -> fuga -> mogeの順で実行される */
gulp.task("seq", function() {
  runSequence("hoge", "fuga", "moge");
});
