'use strict'

let gulp        = require('gulp')
let sass        = require('gulp-sass')
let browserSync = require('browser-sync')
let del         = require('del')
let imagemin    = require('gulp-imagemin')
let uglify      = require('gulp-uglify')
let usemin      = require('gulp-usemin')
let rev         = require('gulp-rev')
let cleanCss    = require('gulp-clean-css')
let flatmap     = require('gulp-flatmap')
let htmlmin     = require('gulp-htmlmin')


gulp.task('sass', () => {
	gulp.src('./css/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(gulp.dest('./css'))
})

gulp.task('sass:watch', () => gulp.watch('./css/*.scss', gulp.series('sass')))

gulp.task('browser-sync', () => {
	var files = ['./*.html','./css/*.css','./img/*.{png,jpg,gif,jpeg}','./js/*.js'];
	browserSync.init(files,{
		server: {
			baseDir: './'
		}
	})
})

gulp.task('default',gulp.parallel('browser-sync','sass:watch'))

gulp.task('clean', () => { return del(['dist']) })

gulp.task('copyfonts', () => gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*').pipe(gulp.dest('./dist/fonts')) )

gulp.task('imagemin', () => {
	return gulp.src('./images/*')
			.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
			.pipe(gulp.dest('dist/images'))
})

gulp.task('usemin', () => {
	return gulp.src('./*.html')
			.pipe(flatmap( (stream,file)=>{
				return stream
					.pipe(usemin({
						css: [rev()],
						html: [ ()=>{ return htmlmin({collapseWhitespace: true}) }],
						js: [uglify(),rev()],
						inlinejs: [uglify()],
						inlinecss: [cleanCss(),'concat']
					}))
			}))
			.pipe(gulp.dest('dist/'))
})

gulp.task('build',gulp.series('clean',gulp.parallel('copyfonts','imagemin','usemin')))