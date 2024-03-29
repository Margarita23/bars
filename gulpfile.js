const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false })
      .pipe(rm())
   })

// replace img
task('img', () =>{
    return src(`${SRC_PATH}/assets/images/**/*.*`)
        .pipe(dest(`${DIST_PATH}/assets/images/`));
});

task('svg', () =>{
    return src(`${SRC_PATH}/assets/icons/**/*.*`)
        .pipe(dest(`${DIST_PATH}/assets/icons/`));
});

task('fonts', () =>{
    return src(`${SRC_PATH}/assets/fonts/*.*`)
        .pipe(dest(`${DIST_PATH}/assets/fonts/`));
});

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true}));
})

task('styles', () => {
    return src([...STYLE_LIBS, 'src/styles/style.scss'])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload( {stream: true} ));
});

task('scripts', () => {
    return src([...JS_LIBS, 'src/scripts/*.js'])
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js'), {newLine: ';'})
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload( {stream: true} ));
   });

task('server', () => {
    browserSync.init({
       server: {
           baseDir: `./${DIST_PATH}`
       },
       open: false
   });
});

task('watch', () => {
    watch('./src/styles/**/*.scss', series('styles'));  
    watch('./src/*.html', series('copy:html'));  
    watch('./src/scripts/*.js', series('scripts'));
    watch('./src/assets/images/**/*', series('img'));
});

task('build',
 series(
   'clean',
   parallel('copy:html', 'styles', 'svg', 'img', 'fonts', 'scripts'))
);

task( 'default',
    series(
        'clean',
        parallel('copy:html', 'styles', 'svg', 'img', 'fonts', 'scripts'),
        parallel('watch', 'server')
    )
);