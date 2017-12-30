module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
        build: ['bundle.js']
    },
    uglify: {
        options: {
            sourceMap: true
        },
        build: {
            files: {
                'bundle.js': ['src/*.js']
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'uglify']);

};