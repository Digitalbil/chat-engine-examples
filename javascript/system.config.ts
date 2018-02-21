SystemJS.config({
	baseURL: '../../',

	map: {
		app: '_dist/javascript',
		tslib: 'node_modules/tslib/tslib.js'
	},

	packages: {
		app: {
			defaultExtension: 'js'
		}
	}
});
