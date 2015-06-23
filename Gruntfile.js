'use strict';
module.exports = function (grunt) {

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    // https://www.npmjs.com/package/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    // load tasks from the specified Grunt plugin, which must be installed locally via npm
    grunt.loadNpmTasks('grunt-karma');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["./output/"],

        karma: {
            single: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                autoWatch: false
            },
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },

        browserify: {
            options: {
                watch: false,
                browserifyOptions: {
                    debug:true // include source maps.
                },
                transform: [ 'brfs' ]
            },
            dev: {
                expand: true,
                src: ['./lib/**/*.js', './app/**/*.js'],
                dest: './output/',
                options: {
                    keepAlive: false
                }
            },
            package: {
                expand: true,
                src: ['./lib/**/*.js', './app/**/*.js'],
                dest: './output/',
                options: {
                    keepAlive: false
                }
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['resources/**/*'], dest: 'output/'},
                    {expand: true, src: ['app/**/*', '!**/*.js'], dest: 'output/'}
                ]
            }
        },

        jshint: {
            lib: {
                src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
                options: { // see http://jshint.com/docs/options/
                    ignores: ['./lib/GoodParts/*.js'],
                    browser: true,
                    node: true,
                    strict: true,
                    curly: true,
                    eqeqeq: true,
                    forin: true,
                    freeze: true,
                    jasmine: true
                }
            }
        }
    });


    grunt.registerTask('test', ['karma:single']);

    grunt.registerTask('auto-test', ['karma:unit']);

    grunt.registerTask('build', ['clean', 'browserify:package', 'copy']);

    grunt.registerTask('default', ['jshint', 'build']);

};