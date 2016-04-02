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
                    'dist/tbd-md-cards.js': ['tbd.module.js','directives/scripts/*.js', 'filters/*.js'],
                   
                },
            },
        },


        sass: {
            dist: {
                // files: [
                //     {
                //         expand: true,
                //         cwd: './directives/styles',
                //         src: ['./*.scss'],
                //         dest: './dist/',
                //         ext: '.css'
                //     }

                // ]
                
                  files: [
                    {
                        expand: true,
                       // cwd: './directives/styles',
                        src: ['./**/styles/*.scss'],
                        dest: './dist/',
                        ext: '.css'
                    }

                ]
            }
        },

        clean: ["./dist"],

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

            tbd: {

               cwd: '.',
               options: {
                      prefix: 'templates',
                      
                      url: function(url) { 
                          return  url.split('/').pop();
                       
                      }
               },
                src: [

                    'directives/**/**.html',
                    'views/**/**.html'
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
                  'dist/tbd-md-cards.min.css': 'dist/**/*.css'
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

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'ngtemplates', 'sass', 'concat', 'cssmin']);

  };
