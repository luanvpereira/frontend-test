module.exports = function(config) {
	config.set({
		browsers: ['Chrome'],
		files: [
			{ pattern: 'test-context.js', watched: false }
		],
		frameworks: ['jasmine'],
		preprocessors: {
			'test-context.js': ['webpack']
		},
		webpack: {
			module: {
				loaders: [
					{
						test: /\.js$/i,
						loader: 'babel-loader',
						query: {
							presets: ['es2015']
						}
					}
				]
			},
			watch: true
		},
		webpackServer: {
			disableHostCheck: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
				"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
			}
		},
		proxies: {
			'/fazenda.json' : 'http://localhost:8080/fazenda.json'
		}
	});
};