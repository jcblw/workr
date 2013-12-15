module.exports = function(grunt) {

  var files = [
      "src/marrow.min.js", 
      "src/workr.js"
    ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner : '/*' + 
      '\n * <%= pkg.name %>.js - <%= pkg.version %> \n' + 
      ' * Description : <%= pkg.description %> \n' +
      ' * Project Url : <%= pkg.repository.url %> \n' +
      ' * Author : <%= pkg.author %> \n' +
      ' * License : <%= pkg.license %> \n' +
      ' */\n\n',
    connect: {
      dist : {
        options : {
          port : 4040,
          keepalive: true
        }
      }
    },
    uglify: {
      options: {
        banner: "<%=banner%>"
      },
      build: {
        src: files,
        dest: 'build/<%= pkg.name.toLowerCase() %>.min.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/workr.js']
    },
    concat: {
      options: {
        banner: "<%=banner%>",
        separator: '\n\n',
        stripBanners : true
      },
      dist: {
        src: files,
        dest: 'build/<%= pkg.name.toLowerCase() %>.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask( 'default', ['connect'] );
  grunt.registerTask( 'build', ['jshint', 'concat', 'uglify'] );

};