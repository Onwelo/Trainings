'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            dev: {
                options: {
                    bases: ['app/'],
                    port: 8000,
                    hostname: "127.0.0.1"
                }
            },
            dist: {
                options: {
                    bases: ['dist/'],
                    port: 8001,
                    hostname: "127.0.0.1",
                    livereload: true
                }
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:8000/'
            },
            dist: {
                path: 'http://127.0.0.1:8001/'
            }
        },
        watch: {
            sass: {
                files: ['app/less/*.less'],
                tasks: ['compile-theme']
            }
        },
        copy: {
            dist: {
                files: [
                    {src: 'app/index.html', dest: 'dist/index.html'},
                    {expand: true, cwd: 'app/partials/', src: ['**'], dest: 'dist/partials/'},
                    {src: 'app/favicon.ico', dest: 'dist/favicon.ico'},
                    {src: 'app/apple-touch-icon.png', dest: 'dist/apple-touch-icon.png'},
                    {expand: true, cwd: 'app/img/', src: ['**'], dest: 'dist/img/'},
                    {expand: true, cwd: 'app/bower_components/bootstrap-material-design-theme/fonts/', src: ['Material*'], dest: 'dist/css/fonts/'},
                    {expand: true, cwd: 'app/bower_components/bootstrap-material-design-theme/fonts/', src: ['Roboto*'], dest: 'dist/fonts/'}
                ]
            }
        },
        'useminPrepare': {
            options: {
                dest: 'dist'
            },
            html: 'app/index.html'
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('dist', ['useminPrepare', 'copy', 'concat', 'cssmin', 'uglify', 'usemin']);
    grunt.registerTask('dist-server', ['express:dist', 'open:dist','watch']);
    grunt.registerTask('dev-server', ['express:dev', 'open:dev','watch']);
    
};
