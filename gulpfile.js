import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { copyFiles, copyLib } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otf2ttf, ttf2woff, fonts2Style } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

function watcher() {
  gulp.watch(path.watch.files, copyFiles);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.parallel(copyFiles, copyLib, html, scss, js, images);

const fonts = gulp.series(otf2ttf, ttf2woff, fonts2Style);

const dev = gulp.series(
  reset,
  fonts,
  mainTasks,
  gulp.parallel(watcher, server)
);
const build = gulp.series(reset, fonts, mainTasks);
const deployZip = gulp.series(reset, fonts, mainTasks, zip);

export { svgSprive };
export { dev };
export { build };
export { deployZip };

gulp.task("default", dev);
