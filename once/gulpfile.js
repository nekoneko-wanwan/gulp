var gulp = require("gulp");
var browserSync = require("browser-sync").create();

/* reload func */
function reload() {
	return browserSync.reload();
}

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

/* watch */
gulp.task("watch", function() {
	var timer;
	gulp.watch("./root/copy/*.html").on("change", function() {

		/* 連続イベントの間引き処理 */
		clearTimeout(timer);
		timer = setTimeout(function () {
			reload();
		}, 200);
	});
});

/* ファイルをコピーしてwatchを大量に発動させる */
gulp.task("copy", function() {
	gulp.src("./root/*html")
		.pipe(gulp.dest("./root/copy/"));
});

/* default */
gulp.task("default", ["server", "watch"]);
