const gulp = import('gulp');
const sass = import('gulp-sass');
const runSequence = import('run-sequence').use(gulp);
const autoprefixer = import('gulp-autoprefixer');
const cssnano = import('gulp-cssnano');
const rigger = import('gulp-rigger');
const browserSync = import('browser-sync').create();

const path = {
    src: {
        html: './src/index.html',
        scss: './src/sass/style.scss',
        watchHtml: './src/html/*.html',
        watchScss: './src/sass/*.scss',
    },
    dest: {
        html: './build/',
        css: './build/css/',
    }
};

gulp.task('html', () => (
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.dest.html))
        .pipe(browserSync.stream())
));

gulp.task('scss', () => (
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
        }))
        .pipe(cssnano())
        .pipe(gulp.dest(path.dest.css))
        .pipe(browserSync.stream())
));

gulp.task('browser-sync', () => (
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })
));

gulp.task('watch', function () {
    gulp.watch(path.src.watchHtml, ['html']);
    gulp.watch(path.src.watchScss, ['scss']);
});


gulp.task('build', (callback) => (
    runSequence('html', 'scss', 'browser-sync', 'watch', callback)));