var gulp = require("gulp");
var watch = require("gulp-watch");
var browserSync = require("browser-sync").create();

gulp.task("watch", function(){

    browserSync.init({ // creamos el servidor web
        notify: false,
        server: {
            baseDir: "app" // le pasamos la ruta del index.html
        }
    });

    watch("app/index.html", function(){ // le decimos que escuche por cambios en el archivo index.html, y que cuando haya un cambio ejecute el método reload (recargará la pagina automáticamente).
        browserSync.reload();
    });

    watch("app/assets/styles/**/*.css", function(){ // cada vez que haya un cambio en un archivo .css hará saltar la tarea cssInject.
        gulp.start("cssInject");
    });
});

// hacemos que autorefresque la pagina cada vez que haya un cambio en un archivo .css
gulp.task("cssInject", ["styles"], function(){ // antes de correr la tarea cssInject, primero correrá la tarea styles.
    return gulp.src("app/temp/styles/styles.css")
        .pipe(browserSync.stream());
});
