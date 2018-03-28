let lr          = require('tiny-lr'),
    gulp        = require('gulp'),
    less        = require('gulp-less'),
    livereload  = require('gulp-livereload'),
    myth        = require('gulp-myth'),
    csso        = require('gulp-csso'),
    imagemin    = require('gulp-imagemin'),
    uglify      = require('gulp-uglify'),
    minify      = require('gulp-minify'),
    concat      = require('gulp-concat'),
    connect     = require('connect'),
    watch       = require('gulp-watch'),
    server      = lr();

var pump = require('pump');

gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('public/'))
        .pipe(livereload(server))
});

gulp.task('assets', function() {
    gulp.src('src/assets/*')
        .pipe(gulp.dest('public/assets/'))
        .pipe(livereload(server))
})

gulp.task('css', function() {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('public/css'))
        .pipe(livereload(server))
})

gulp.task('less', function(){
    gulp.src('src/less/*.less')
        .on('error', console.log)
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload(server))
});

gulp.task('js', function() {
    gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('public/js'))
        .pipe(livereload(server))
});

gulp.task('images', function() {
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('public/img'))
});

gulp.task('http-server', function() {
    connect()
        .use(require('connect-livereload')())
        .use(connect.static('public/'))
        .listen('9000');

    let now = new Time();
    now.parseTime();
    now = '[' + now.hours + ':' + now.min + ':' + now.sec + '] ';
    console.log(now + 'Server listening on http://localhost:9000');
});

/* Говнокод для изменения формата времени */
function Time() {
    this.time = new Date();
    this.hours = this.time.getHours();
    this.min = this.time.getMinutes();
    this.sec = this.time.getSeconds();

    this.parseTime = function() {
        this.hours > 9 ? 0 : this.hours = 0+''+this.hours;
        this.min > 9 ? 0 : this.min = 0+''+this.min;
        this.sec > 9 ? 0 : this.sec = 0+''+this.sec;
    }
}



/* Предварительная сборка проектаб его просмотр и запуск на сервере */
gulp.task('watch', function() {
    /* Предварительная сборка проекта */
    gulp.run('html');
    gulp.run('assets');
    gulp.run('css');
    gulp.run('less');
    gulp.run('js');
    gulp.run('images');


    livereload.listen();

        gulp.watch('src/*.html', function() {
            gulp.run('html');
        });
        gulp.watch('src/assets/*', function() {
            gulp.run('assets');
        });
        gulp.watch('src/css/*.css', function() {
            gulp.run('css');
        });
        gulp.watch('src/less/**/*.less', function() {
            gulp.run('less');
        });
        gulp.watch('src/js/**/*.js', function() {
            gulp.run('js');
        });
        gulp.watch('src/img/**/*', function() {
            gulp.run('images');
        });

    gulp.run('http-server');
});



/* Сборка проекта */
gulp.task('build', function() {
    /* html */
    gulp.src('src/*.html')
        .pipe(gulp.dest('build/'));

    /* assets */
    gulp.src('src/assets/*')
        .pipe(gulp.dest('build/assets'));

    /* css */
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('build/css'));

    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(myth())
        .pipe(csso())
        .pipe(gulp.dest('build/css'));

    /* js */
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js'));

    /* image */
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});


gulp.task('concat', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('index.js'))
        .pipe(minifyjs())
        .pipe(gulp.dest('build/js'))
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('build/js')
    ],
    cb
  );
});