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
        livereload: true,
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
    }


  });

  // �������� �������, ������� �������������� �����������
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
   //��������� �������� ������� ����������� ��� ������
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-lodash');
  // ��� ������� ����� ���������� ����� �� ����� �� � ������� ����������� grunt, � ������� Enter
  grunt.registerTask('default', ['concat', 'uglify', 'sass','cssmin','autoprefixer','less']);
};