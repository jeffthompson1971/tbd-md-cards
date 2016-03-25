'use strict';

module.exports = function(grunt) {
    // Unified Watch Object
    var watchFiles = {

        clientViews: ['public/modules/**/views/**/*.html'],
        clientJS: ['public/js/*.js', 'public/modules/**/*.js', 'public/common/angular/directives/scripts/*.js'],
        clientCSS: ['public/modules/**/*.css'],
        clientSASS: ['public/modules/**/*.scss', 'public/styles/*.scss']

    };

    // Project Configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            basic: {
                files: {
                    'dist/directives.js': ['directives/*.js'],
                   
                },
            },
        },


        sass: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'scss',
                        src: ['./*.scss'],
                        dest: './dist/',
                        ext: '.css'
                    }

                ]
            }
        },

        clean: [".//dist"],

        copy: {
            templates: {
                expand: true,
                cwd: 'public/common/angular/',
                src: '**/*.html',
                dest: 'public/dist/templates',
                flatten: true,
                filter: 'isFile',
            }
            ,
            othersass: {
                expand: true,
                cwd: 'public/common/',
                src: '**/*.scss',
                dest: 'public/dist/styles',
                flatten: true,
                filter: 'isFile',
            },
            appsass: {
                expand: true,
                cwd: 'public/styles/',
                src: '*.scss',
                dest: 'public/dist/styles',
                flatten: true,
                filter: 'isFile',
            },
        },

        ngtemplates: {

            shares: {

                cwd: '.',

                src: [

                    'templates/*.html'
                ],
                dest: 'dist/templates.js'
            }

        },

        // jshint: {
        //     all: {
        //         src: watchFiles.clientJS.concat(watchFiles.serverJS),
        //         options: {
        //             jshintrc: true
        //         }
        //     }
        // },
        // csslint: {
        //     options: {
        //         csslintrc: '.csslintrc',
        //     },
        //     all: {
        //         src: watchFiles.clientCSS
        //     }
        // },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    './dist/application.min.js': 'public/dist/application.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                  //  'dist/directives.min.css': '<%= applicationCSSFiles %>'
                  'dist/directives.min.css': 'dist/*.css'
                }
            }
        }
        // nodemon: {
        //     dev: {
        //         script: 'server.js',
        //         options: {
        //             nodeArgs: ['--debug'],
        //             ext: 'js,html',
        //             watch: watchFiles.serverViews.concat(watchFiles.serverJS)
        //         }
        //     }
        // },

    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // // A Task for loading the configuration object
    // grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
    //     var init = require('./config/init')();
    //     var config = require('./config/config');
    //     console.log(config.assets.js)
    //     grunt.config.set('applicationJavaScriptFiles', config.assets.js);
    //     grunt.config.set('applicationCSSFiles', config.assets.css);
    // });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    //grunt.registerTask('default', ['clean', 'copy', 'ngtemplates', 'sass', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin','concurrent:default']);

    grunt.registerTask('default', ['clean', 'ngtemplates', 'sass', 'concat', 'cssmin']);

    // // Debug task.
    // grunt.registerTask('debug', ['lint', 'concurrent:debug']);

    // // Secure task(s).
    // grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

    // // Lint task(s).
    // //grunt.registerTask('lint', ['jshint', 'csslint']);

    // // Build task(s).
    // grunt.registerTask('build', ['copy', 'ngtemplates', 'sass', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin']);

    // // Test task.
    // grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
