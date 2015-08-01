module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jade: {
      main: {
        options: {
          pretty: true,
          data: {
            version: "<%= pkg.version %>"
          }
        },
        files: { "dist/main.html": "src/jade/main.jade" }
      }
    },

    sass: {
      main: {
        options: {
          style: "expanded"
        },
        files: {
          "dist/main.css": "src/scss/main.scss"
        }
      }
    },

    browserify: {
      main: {
        options: {
          transform: ["reactify"]
        },
        files: {
          "dist/main.js": "src/jsx/main.jsx"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['jade', 'sass', 'browserify']);
}