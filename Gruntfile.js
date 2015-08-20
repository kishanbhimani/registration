// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),


        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },            
            js:{
                files:[{
                        expand: true,
                        cwd: 'app',
                        src: ['**/*.js'],
                        dest: '.tmp/js',
                        ext: '.min.js'
                  }]                
            },
            style:{
                files:[{
                        expand: true,
                        cwd: '.tmp/styles',
                        src: ['*.css'],
                        dest: '.tmp/styles',
                        ext: '.min.css'
                  }]                
            }
            
            
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                sourceMap: true,
                includePaths: ['bower-components']
            },
            server: {
                files: [{
                    expand: true,
                    cwd: 'app/app-content',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                  }]
            }
        },

        
        // Watches files for changes and runs tasks based on the changed files
        watch: {          
          livereload: {
            options: {
              livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'Gruntfile.js',
                'app/{,*/}*.html',
                '.tmp/styles/{,*/}*.css',
                '.tmp/js/{,*/}*.js'
            ]
          }
        },
        
        
        
        
        // The actual grunt server settings
        connect: {
            options: {
                port: 9002,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '192.168.3.58'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                          connect.static('.tmp'),
                          connect().use('/bower-components', connect.static('bower-components')),
                          connect.static('app')
                        ];
                    }
                }
            }
        }
    });

    grunt.registerTask('serve', [
		'sass:server',
       // 'uglify:js', //to minifide javascript files
        'uglify:style',
		'connect:livereload',
        'watch'
	]);
    
    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

};