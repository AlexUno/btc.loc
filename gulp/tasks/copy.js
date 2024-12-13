export const copyFiles = () => {
  return app.gulp
    .src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files));
};

export const copyLib = () => {
  return app.gulp.src(app.path.src.lib).pipe(app.gulp.dest(app.path.build.lib));
};
