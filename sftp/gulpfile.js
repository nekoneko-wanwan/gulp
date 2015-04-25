var gulp = require("gulp");
var sftp = require("gulp-sftp");

/* gulpを引数なしで実行したときに、自動で送るファイルのpath */
var target = {
  local : "./root/hoge/**",
  host  : "/var/www/html/public_html/hoge/"
};

/* 必要なものだけSFTPで送る */
gulp.task("sftp", function() {
  gulp.src(target.local)
    .pipe(sftp({
        host: "192.168.33.10",
        port: 22,
        user: "vagrant",
        pass: "vagrant",
        remotePath: target.host
    }));
});

/* ローカルroot以下を全て送る */
/* コマンドラインで実行 -> $ gulp all */
gulp.task("all", function() {
  gulp.src("./root/**")
    .pipe(sftp({
        host: "192.168.33.10",
        port: 22,
        user: "vagrant",
        pass: "vagrant",
        remotePath: "/var/www/html/public_html/"
    }));
});

gulp.task("default", ["sftp"]);
