//Стандартный экспорт модуля в nodejs
module.exports = function(grunt) {
var mapValues = require('lodash.mapvalues');

  // Инициализация конфига GruntJS
  grunt.initConfig({
     //таск для конвертации less в css
        less: {
            development: {
                options: {
                    //указать, минифицировать ли файл
                    compress: false
                },
                files: {
                    //тут соответственно указать путь где создавать
                    //конвертируемый файл
                    "src/sass/stylemain.css": "src/less/stylemain.less"
                }
            }
        },
    //Склеивание JS файлов
    concat: {
        main: { src: ['src/js/mysimpleslider.js', 'src/js/slider.js'], dest: 'src/js/scripts.js' }
    },
     imagemin: {
      options: {
        cache: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'src/img/'
        }]
      }
    },
    // Сжатие общего JS файла
    uglify: {
       options: {
                //нужно ли минифицировать (false) или просто склеить (true)
                beautify: false
            },
            my_target: {
                files: {
                        //файл на выходе будет main.js, а файлы на входе указываем в
                        //массиве по порядку.
                        'src/js/scripts.js': [
                        'src/js/sliderjs',
                        'src/js/mysimpleslider.js'
                    ]
                }
            }
    },

    // SASS
    sass: {
      dist: {
        files: [{
		   expand: true,
		   cwd: 'src/css',
		   src: ['*.scss'],
		   dest: 'src/sass',
		   ext: 'main.css'
        }]
      }
    },
	'jsmin-sourcemap': {
      all: {
        src: ['src/js/scripts.js'],
        dest: 'src/js/scripts.jsmin-grunt.js',
        destMap: 'src/js/scripts.jsmin-grunt.js.map'
      }
    },
    // CSS Min
    cssmin: {
         minify: {
    files: [{
      expand: true,
      cwd: 'src/css/',
      src: ['*.css', '!*.min.css'],
      dest: 'src/sass/',
      ext: '.css'
    }, {
      expand: true,
      cwd: 'src/css/',
      src: ['*.min.css'],
      dest: 'src/sass/',
      ext: '.min.css'
    }]
  }
        },
		
     //этот таск из серии postcss, те теперь не нужно будет сразу писать префиксы в css
        //autoprefixer сделает это сам, инфу берет с caniuse.com
        autoprefixer: {
                //указывам файл в котором нужно проставить префиксы, он сам его перезапишит
                no_dest: {
                    src: "src/sass/stylemain.css"
                }
            },
    watch: {
        options: {
    livereload: true
  },
   gruntfile: {
    files: ['Gruntfile.js'],
    tasks: ['src:dev']
  },
      scripts: {
            files: ['js/*.js'],
            tasks: ['concat', 'uglify'],
            options: {
                spawn: false
            }
        },
     css:{
	         files: ['src/css/*.scss'],
			 tasks: ['sass'],
			 options: {
            spawn: false,
        },
	   },
	   //тут пишем за каким типом файлов следить
            less: {
                //тут указываем за какими файлами следить **/**/*.less - означает
                //следить за всеми .less файлами, которые находятся на 2х уровнях
                //вложенности от папки less/
                files: ['src/sass/*.less'],
                //какие таски надо выполнить при изменении файлов .less
                tasks: ['less', 'autoprefixer']
            }
    },
	connect: {
      server: {
        options: {
          port: 3000,
                    livereload: 35729,
                    hostname: 'localhost',
                    base: ['src']
        },
                livereload: {
                    options: {
                        open:true,
                        base: ['src']
                    }
                }
      }
    }


  });

  // Загрузка модулей, которые предварительно установлены
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-jsmin-sourcemap');
   //указываем названия модулей необходимых для работы
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-lodash');
  // Эти задания будут выполнятся сразу же когда вы в консоли напечатание grunt, и нажмете Enter
  grunt.registerTask('default', ['concat', 'jsmin-sourcemap', 'uglify', 'sass','cssmin','autoprefixer','less']);
 grunt.registerTask('dev',['connect','concat','sass','uglify','imagemin','watch']);
  };