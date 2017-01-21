'use strict';

// Dependencies

// Class Definition
class EnvironmentVariable {
	constructor(variableName, config = {}) {
		this.variableName = (() => {
			if (!variableName || typeof variableName !== 'string'){
				throw new TypeError(`variableName must be of type: 'string'`)
			} else {
				return variableName;
			}
		})();

		this.required = (() => {
			 if (config.required && typeof config.required === 'boolean'){
				return config.required
			} else if (config.required && typeof config.required !== 'boolean') {
				throw new TypeError(`'required' property of '${this.variableName}' must be of type: 'boolean'`)
			} else {
				 return false
			 }
		})();

		this.type = (() => {
			//todo: add string and number array
			const isSet = config.hasOwnProperty('type');
			const isValidType = typeof config.type === 'string';
			const isAcceptableValue = [
				'string',
				'number',
				'boolean',
				'any'
			].includes(config.type);
			
			if(isSet && isAcceptableValue && isValidType) {
				return config.type
			} else if(isSet && !isAcceptableValue && isValidType) {
				throw new Error(`'type' property of '${this.variableName}' must be either: 'string', 'number', 'boolean' or 'any'`)
			} else if (isSet && !isValidType) {
				throw new TypeError(`'type' property of '${this.variableName}' must be of type: 'string'`)
			} else {
				return 'any'
			}

		})();

		this.format = (() => {
			const isSet = config.hasOwnProperty('format');
			const isValidString = isSet && typeof config.format === 'string';
			const isValidPattern = isSet && config.format.hasOwnProperty('pattern') && typeof config.format.pattern === 'string';
			const isValidFlags = isValidPattern && config.format.hasOwnProperty('flags')  && typeof config.format.flags === 'string' && /^([gim]{1,3})$/.test(config.format.flags);
			const inValidFlags = isValidPattern && config.format.hasOwnProperty('flags')  && typeof config.format.flags === 'string' && /^([gim]{1,3})$/.test(config.format.flags) === false;
			if (isValidString) {
				return new RegExp(config.format)
			} else if (isValidPattern && !isValidFlags && !config.format.hasOwnProperty('flags')) {
				return new RegExp(config.format.pattern)
			} else if (isValidFlags) {
				return new RegExp(config.format.pattern, config.format.flags)
			} else if (inValidFlags) {
				throw new Error(`invalid 'flags' property of ${this.variableName}.format must be valid 'RegExp' flags: i.e. 'i', 'g' or 'm' or any combination of the same.`)
			} else if (isSet) {
				throw new TypeError(`'format' property of '${this.variableName}' must be of type: 'string' or an 'object' with keys: 'pattern' and 'flags' that have values of type: 'string'`)
			}

		})();
		
		this.log = (() => {
			if(config.log && typeof config.log !== 'boolean') {
				throw new TypeError(`'log' property for '${this.variableName}' must be of type: 'boolean'`)
			} else {
				return config.log || false
			}
		})();

	}
}



// Exports
module.exports = EnvironmentVariable;