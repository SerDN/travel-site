var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssvars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var cssImport = require("postcss-import");
var mixins = require("postcss-mixins");


gulp.task("styles", function(){
    var plugins = [cssImport, mixins, cssvars, nested, autoprefixer];

    return gulp.src("app/assets/styles/styles.css") // elegimos el archivo origen
        .pipe(postcss(plugins)) // hacemos que antes de copiar el archivo, lo convierta a un archivo css válido. En este caso, que permita importar archivos parciales css en uno solo, que convierta las variables (cssvars), convierta el css anidado a css válido, y use autoprefixer (agregue las etiquetas de compatibilidad de cada navegador).
        .on("error", function(errorInfo){ // si ocurre un evento de tipo error, se ejecutará la función.
            console.log(errorInfo.toString());
            this.emit("end");
        })
        .pipe(gulp.dest("app/temp/styles")); // elegimos donde queremos la copia.
});
