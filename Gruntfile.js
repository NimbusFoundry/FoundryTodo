/*global module:false*/
module.exports = function(grunt) {
  coffeeFiles = [
  'forum/plugins/account/index.coffee',
  'forum/plugins/forum/components/todolist/index.coffee',
  'forum/plugins/forum/components/example/index.coffee',
  'forum/plugins/forum/index.coffee',
  'forum/app.coffee',
  'core/directives/directives.coffee' 
  ]
  coffeeForCompile = coffeeFiles.reduce(function (pre, current, idx) {
    pre[current.replace(/coffee/,"js")] = current;
    return pre;
  }, {});
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner:'\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      core : {
        src : [
          'app/app.js',
          'app/plugins/todo/*.js'
        ],
        dest : 'dist/app.js'
      },
      dist: {
        src: [
              'dist/main.js',
              'dist/app.js',
              ],
        dest: 'dist/default.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/main.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      },
      coffeeScripts: {
        files: coffeeFiles,
        tasks: ['coffee','concat'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify']);

  grunt.registerTask('build', ['concat', 'uglify']);

};
