'use strict';

const path = require('path');
const fs = require('fs');
const EnvironmentVariable = require('./EnvironmentVariable.class');
const YAML = require('yamljs');

class Checker {
	constructor(options) {
		options = options || {};
		this.specLocation = path.resolve(options.specLocation || 'env.yaml');
		this.autoLoad = options.hasOwnProperty('autoLoad') ? options.autoLoad : true;
		// auto-load the spec if autoLoad has not been set to false
		if (this.autoLoad) this.loadSpec();
		
	}
	loadSpec() {
		this.spec = {};
		const ext = path.extname(this.specLocation).toLowerCase();
		if(ext !== '.yaml' && ext !== '.json') {
			throw new Error(`Unsupported file type '${ext}' - accepted types are '.yaml' and '.json'`)
		} else {
			try {
				let parser = ext === '.yaml' ? YAML.parse : JSON.parse;
				this.spec._raw = fs.readFileSync(this.specLocation, 'utf8');
				const parsed = parser(this.spec._raw);
				this.spec.variables = [];
				for(var envVar in parsed) {
					if (parsed.hasOwnProperty(envVar)) {
						this.spec.variables.push(new EnvironmentVariable(envVar, parsed[envVar]))
					}
				}
			} catch(e) {
				throw e
			}
		}
		
	}
	check() {
		let errors = [];
		let results = [];
		if(!this.spec || !this.spec.variables) {
			throw new Error('spec has not yet been loaded')
		} else {
			this.spec.variables.forEach(variable => {
				try {
					results.push(variable.check())
				} catch(err) {
					errors.push(err)
				}
			})
		}

		if(errors.length > 0) {
			errors.forEach(err => console.log(err.message));
			throw new Error('invalid environment variables detected')
		} else {
			let envVars = {};
			results.forEach(variable => envVars[variable.variableName] = variable.value)
			return envVars;
		}
	}
}

module.exports = Checker;