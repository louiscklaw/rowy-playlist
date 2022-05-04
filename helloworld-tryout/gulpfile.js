const gulp = require("gulp");
const child_process = require("child_process");
const path = require("path");
const fs = require("fs");
const { parallel } = require("gulp");
var run = require("gulp-run-command").default;

const {
  promises: { readdir },
} = require("fs");

// const getDirectories = async (source) =>
//   (await readdir(source, { withFileTypes: true }))
//     .filter((dirent) => dirent.isDirectory())
//     .map((dirent) => dirent.name);

gulp.task("update_rowy", async () =>
  run(["rm -rf build", "yarn --dev", "yarn build", "yarn deploy"], {
    cwd: "backend/rowy-helloworld",
  })()
);

gulp.task("build_client_cms", async () =>
  run(["yarn build"], {
    cwd: "frontend/client_cms",
  })()
);

gulp.task("update_admin_cms", async () =>
  run(["yarn build"], {
    cwd: "frontend/admin_cms",
  })()
);

gulp.task("update_all", async () => run(["firebase deploy"])());

gulp.task("helloworld", (cb) => {
  console.log("helloworld");
  cb();
});

gulp.task("clean_client_cms", async () => {
  run(["rm -rf frontend/client_cms/node_modules"])();
});

gulp.task("clean_admin_cms", async () => {
  run(["rm -rf frontend/admin_cms/node_modules"])();
});

gulp.task("clean_rowy", async () => {
  run(["rm -rf backend/rowy-helloworld/node_modules"])();
});

gulp.task(
  "clean_all",
  parallel(["clean_client_cms", "clean_admin_cms", "clean_rowy"])
);

gulp.task("yarn_client_cms", async () => {
  run(["yarn --dev"], { cwd: "frontend/client_cms" })();
});

gulp.task("yarn_admin_cms", async () => {
  run(["yarn --dev"], { cwd: "frontend/admin_cms" })();
});

gulp.task("yarn_rowy", async () => {
  run(["yarn --dev"], { cwd: "backend/rowy-helloworld" })();
});

gulp.task(
  "yarn_dev_all",
  parallel(["yarn_client_cms", "yarn_admin_cms", "yarn_rowy"])
);

gulp.task(
  "default",
  gulp.series(
    [
      // "build_client_cms", "update_admin_cms",
      "update_rowy",
      "update_all",
    ],
    (done) => {
      done();
    }
  )
);
