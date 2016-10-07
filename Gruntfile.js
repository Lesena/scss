//����������� ������� ������ � nodejs
module.exports = function(grunt) {
var mapValues = require('lodash.mapvalues');

  // ������������� ������� GruntJS
  grunt.initConfig({
     //���� ��� ����������� less � css
        less: {
            development: {
                options: {
                    //�������, �������������� �� ����
                    compress: false
                },
                files: {
                    //��� �������������� ������� ���� ��� ���������
                    //�������������� ����
                    "src/sass/stylemain.css": "src/less/stylemain.less"
                }
            }
        },
    //���������� JS ������
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
    // ������ ������ JS �����
    uglify: {
       options: {
                //����� �� �������������� (false) ��� ������ ������� (true)
                beautify: false
            },
            my_target: {
                files: {
                        //���� �� ������ ����� main.js, � ����� �� ����� ��������� �
                        //������� �� �������.
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
		
     //���� ���� �� ����� postcss, �� ������ �� ����� ����� ����� ������ �������� � css
        //autoprefixer ������� ��� ���, ���� ����� � caniuse.com
        autoprefixer: {
                //�������� ���� � ������� ����� ���������� ��������, �� ��� ��� �����������
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
	   //��� ����� �� ����� ����� ������ �������
            less: {
                //��� ��������� �� ������ ������� ������� **/**/*.less - ��������
                //������� �� ����� .less �������, ������� ��������� �� 2� �������
                //����������� �� ����� less/
                files: ['src/sass/*.less'],
                //����� ����� ���� ��������� ��� ��������� ������ .less
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

  // �������� �������, ������� �������������� �����������
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-jsmin-sourcemap');
   //��������� �������� ������� ����������� ��� ������
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-lodash');
  // ��� ������� ����� ���������� ����� �� ����� �� � ������� ����������� grunt, � ������� Enter
  grunt.registerTask('default', ['concat', 'jsmin-sourcemap', 'uglify', 'sass','cssmin','autoprefixer','less']);
 grunt.registerTask('dev',['connect','concat','sass','uglify','imagemin','watch']);
  };