'use strict';
const path = require('path');
const remote = require('@electron/remote');
const Conf = require('conf');

class ElectronStore extends Conf {
	constructor(opts) {
		const defaultCwd = (remote.app || remote.remote.app).getPath('documents');

		opts = Object.assign({name: 'config'}, opts);

		if (opts.cwd) {
			opts.cwd = path.isAbsolute(opts.cwd) ? opts.cwd : path.join(defaultCwd, opts.cwd);
		} else {
			opts.cwd = defaultCwd;
		}

		opts.configName = opts.name;
		delete opts.name;
		super(opts);
	}

	openInEditor() {
		electron.shell.openItem(this.path);
	}
}

module.exports = ElectronStore;
