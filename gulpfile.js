const { task, src, dest, parallel, watch } = require('gulp')
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

const index = () => {
  return src('./src/index.pug')
  .pipe(pug({ pretty: true }))
  .pipe(dest('./docs'))
};
task('index', index);

const styles = () => {
  return src('./src/assets/scss/styles.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(dest('./docs/assets/css'));
};
task('styles', styles);

const images = () => {
  return src('./src/assets/images/**/*')
  .pipe(dest('./docs/assets/images'))
};
task('images', images);

task('watch', () => {
  watch('./src/index.pug', index);
  watch('./src/assets/scss/**/*', styles);
  watch('./src/assets/images/**/*', images);
});

exports.default = parallel('index', 'styles', 'images');
