module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cfg: grunt.file.readJSON('.couchapprc'),

		connect: {
			server: {
				options: {
					port: 9090,
					base: 'src/_attachments',
					keepalive:true
				}
			 }
		},
		'couch-compile': {
			website: {
				files: {
					'build/website.json': 'src'
				}
			}
		},
		'couch-push': {
			options: {
			  user: "<%= cfg.couchdb.username %>",
			  pass: "<%= cfg.couchdb.password %>",
			},
			couchdb: {
				files: {
					'<%= cfg.couchdb.url %>/<%= cfg.couchdb.couch %>': 'build/website.json'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-couch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect']);
	grunt.registerTask('compile', ['couch-compile']);
	grunt.registerTask('deploy', ['couch-compile', 'couch-push']);

};