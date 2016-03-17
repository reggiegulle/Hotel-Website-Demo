module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
        css_files: {
            files: [
                {src:'bower_components/bootstrap/dist/css/bootstrap.css' , dest: 'src/css/bootstrap.css'},
                {src:'bower_components/bootstrap/dist/css/bootstrap-theme.css' , dest: 'src/css/bootstrap-theme.css'},
                {src:'bower_components/datatables.net-dt/css/jquery.dataTables.css' , dest: 'src/css/jquery.dataTables.css'},
                {src:'bower_components/datatables.net-responsive-dt/css/responsive.dataTables.css' , dest: 'src/css/responsive.dataTables.css'},
                {src:'bower_components/slick-carousel/slick/slick.css' , dest: 'src/css/slick.css'},
                {src:'bower_components/slick-carousel/slick/slick-theme.css' , dest: 'src/css/slick-theme.css'}
            ]
        },
        bootstrap_fonts_src: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/fonts/',
                    src: ['**.**'],
                    dest: 'src/fonts/'
                }
            ]
        },
        bootstrap_fonts_dest: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/fonts/',
                    src: ['**.**'],
                    dest: 'dest/fonts/'
                }
            ]
        },
        datatables_images_src: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/datatables.net-dt/images/',
                    src: ['**.**'],
                    dest: 'src/images/'
                }
            ]
        },
        datatables_images_dest: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/datatables.net-dt/images/',
                    src: ['**.**'],
                    dest: 'dest/images/'
                }
            ]
        },
        slick_loader_src: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/slick-carousel/slick/',
                    src: ['ajax-loader.gif'],
                    dest: 'src/images/'
                }
            ]
        },
        slick_loader_dest: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/slick-carousel/slick/',
                    src: ['ajax-loader.gif'],
                    dest: 'dest/images/'
                }
            ]
        },
        slick_fonts_src: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/slick-carousel/slick/fonts/',
                    src: ['**.**'],
                    dest: 'src/fonts/'
                }
            ]
        },
        slick_fonts_src: {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/slick-carousel/slick/fonts/',
                    src: ['**.**'],
                    dest: 'dest/fonts/'
                }
            ]
        },
        javascript_files: {
             files: [
                {src:'bower_components/bootstrap/dist/js/bootstrap.js' , dest: 'src/js/bootstrap.js'},
                {src:'bower_components/datatables.net/js/jquery.dataTables.js', dest: 'src/js/jquery.dataTables.js'},
                {src:'bower_components/datatables.net-responsive/js/datatables.responsive.js', dest: 'src/js/dataTables.responsive.js'},
                {src:'bower_components/bxslider-4/dist/jquery.bxslider.js', dest: 'src/js/jquery.bxslider.js'}
            ]    
        }   
    },
    less: {
        dist: {
            options: {
                compress: false
             },
        files: {
            'src/css/style-child.css': 'src/css/*.less' 
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!style-child-src.css'],
          dest: 'dest/css',
          ext: '.min.css',
          extDot: 'last'
        }]
      }
    },
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['*.js', '!*.min.js', '!hotel-snippet.js'],
          dest: 'dest/js',
          ext: '.min.js',
          extDot: 'last'
        }] 
      }
    },
    watch: {
      styles: {
        files: 'src/css/*.less',
        tasks: ['default'],
        options: {
          event: ['all']
        }
      },
      js_scripts: {
        files: ['src/js/*.js', '!src/js/*.min.js', '!src/js/hotel-snippet.js'],
        tasks: ['default'],
        options: {
          event: ['all']
        }
      }
    } 
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['less', 'cssmin', 'uglify']);

};