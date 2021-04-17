const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
}

function cleanDist() {
	return del('dist')
}

function images() {
	return src('app/img/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/img'))
}

function conwebp() {
	return src('dist/img/**/*')
		.pipe(webp())
		.pipe(dest('dist/img'))
}

function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.js',
		'app/js/imagesloaded.pkgd.min.js',
		'app/js/jquery.fancybox.min.js',
		'app/js/masonry.pkgd.min.js',
		'app/js/slick.min.js',
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('app/#source/scss/style.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function build() {
	return src([
		'app/css/jquery.fancybox.min.css',
		'app/css/style.min.css',
		'app/fonts/**/*',
		'app/js/main.min.js',
		'app/*.html'
	], { base: 'app' })
		.pipe(dest('dist'))
}

function watching() {
	watch(['app/#source/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.conwebp = conwebp;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);