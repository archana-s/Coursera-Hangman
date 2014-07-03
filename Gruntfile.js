module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dev: {
        options: {
          sassDir: './public/',
          cssDir: './public/'
        }
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        url: "https://www.html5rocks.com",
        strategy: "mobile"
      }
    },

    autoprefixer: {
      singleFile: {
        src: './public/styles/main.css',
        dest: './public/styles/main.css'
      }
    },

    watch: {
      css: {
        files: ['./public/styles/*.scss', './public/styles/**/*.scss', './public/elements/**/*.scss', './public/elements/**/**/*.scss'],
        tasks: ['compass'],
        options: {
          livereload: true
        }
      },

      livereload: {
        options: {
          livereload: true
        },
        files: ['./public/styles/*.scss', './public/styles/**/*.scss', './public/elements/**/*.scss', './public/elements/**/**/*.scss']
      },

      express: {
        files:  [ './public/scripts/*.js', './public/scripts/model/*.js', './public/scripts/view/*.js', './public/scripts/controller/*.js', './public/scripts/router/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // Without this option specified express won't be reloaded
        }
      },

      prefixer: {
        files: './public/styles/main.css',
        tasks: ['autoprefixer']
      }
    },

    express: {
      options: {
        port: 8200
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    }

  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-pagespeed');


  // Default task(s).
  grunt.registerTask('server', ['express:dev', 'watch']);
  grunt.registerTask('prefixer', ['autoprefixer']);
};
