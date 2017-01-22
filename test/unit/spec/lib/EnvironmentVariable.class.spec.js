'use strict';
const EnvironmentVariable = require('../../../../lib/EnvironmentVariable.class');
const exampleConfig = require('../../mocks/env.json');

describe('Class: EnvironmentVariable', () => {

	describe('Method: constructor', () => {

		describe('Property: variableName', () => {
			it('should successfully instantiate if it is a string', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV')
				} catch(e) {
					err = e;
				}
				// LOGIC
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.variableName).toBe('NODE_ENV')
			});

			it('should error if its not a string', () => {
				let err, result;
				try {
					result = new EnvironmentVariable(true)
				} catch(e) {
					err = e;
				}
				// LOGIC
				expect(err).toBeDefined();
				expect(result).not.toBeDefined();
				expect(err instanceof TypeError).toBe(true);
			})
		});

		describe('Property: required', () => {
			
			it('should successfully instantiate if it is a boolean', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV', {required:true})
				} catch(e) {
					err = e;
				}
				// LOGIC
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.required).toBe(true)
			});

			it('should successfully set to false if it is not defined', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV', {})
				} catch(e) {
					err = e;
				}
				// LOGIC
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.required).toBe(false)
			});
			
			it('should throw a TypeError if it\'s set to a non-boolean value', () => {
					let err, result;
					try {
						result = new EnvironmentVariable('NODE_ENV',{required:4})
					} catch(e) {
						err = e;
					}
					// LOGIC
					expect(err).toBeDefined();
					expect(result).not.toBeDefined();
					expect(err instanceof TypeError).toBe(true);
				
			})
		});

		describe('Property: type', () => {
			it(`should accept a string of 'string'`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV',{type:'string'})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.type).toBe('string')
			});

			it(`should accept a string of 'number'`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV',{type:'number'})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.type).toBe('number')
			});

			it(`should accept a string of 'boolean'`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV',{type:'boolean'})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.type).toBe('boolean')
			});

			it(`should accept a string of 'any'`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV',{type:'any'})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.type).toBe('any')
			});

			it(`should default to a string of 'any' if not set`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV',{})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.type).toBe('any')
			});

			it(`should accept a string of 'array'`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV',{type:'array'})
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result).not.toBeDefined();
				expect(err instanceof Error).toBe(true)
			});
			
			it(`should throw a typeError if type is a non-string value'`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV', { type: 0 })
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result).not.toBeDefined();
				expect(err instanceof TypeError).toBe(true);
			});
		});

		describe('Property: format', () => {
			it('should default to undefined', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV', {})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.format).not.toBeDefined();
				
			});

			it('should return a RegExp object when supplied a string', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('THRESHOLD_PERCENTAGE', {format:`^[1-9][0-9]?$|^100$`})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.format instanceof RegExp).toBe(true);
				expect(result.format.toString()).toBe('/^[1-9][0-9]?$|^100$/')

			});

			it('should return a RegExp object when supplied an object with a valid pattern key', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('THRESHOLD_PERCENTAGE', {
						format:{
							pattern: `^[1-9][0-9]?$|^100$`
						}
					})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.format instanceof RegExp).toBe(true);
				expect(result.format.toString()).toBe('/^[1-9][0-9]?$|^100$/')

			});

			it('should return a RegExp object when supplied an object with a valid pattern and flags key', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('THRESHOLD_PERCENTAGE', {
						format:{
							pattern: `^[1-9][0-9]?$|^100$`,
							flags: 'ig'
						}
					})
				} catch(e) {
					err = e;
				}
				expect(err).not.toBeDefined();
				expect(result).toBeDefined();
				expect(result.format instanceof RegExp).toBe(true);
				expect(result.format.toString()).toBe('/^[1-9][0-9]?$|^100$/gi')

			});

			it(`should throw a 'TypeError' when supplied a number`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('THRESHOLD_PERCENTAGE', {format:0})
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result).not.toBeDefined();
				expect(err instanceof TypeError).toBe(true);

			});

			it(`should throw a 'TypeError' when supplied an object with a pattern value of type number`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('THRESHOLD_PERCENTAGE', {format:{
						pattern: 0
					}})
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result).not.toBeDefined();
				expect(err instanceof TypeError).toBe(true);

			});

			it(`should throw a 'Error' when supplied an object with an invalid flag`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('THRESHOLD_PERCENTAGE', {format:{
						pattern: `^[1-9][0-9]?$|^100$`,
						flags: 'ifg'
					}})
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result).not.toBeDefined();
				expect(err instanceof Error).toBe(true);
				expect(err.message).toContain(`invalid 'flags' property`)

			});

			it(`should throw a 'TypeError' when supplied an object with flags property of type number`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('THRESHOLD_PERCENTAGE', {format:{
						pattern: `^[1-9][0-9]?$|^100$`,
						flags: 0
					}})
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result).not.toBeDefined();
				expect(err instanceof TypeError).toBe(true);

			});
		});

		describe('Property: log', () => {
			it('should default to false', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV')
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result).toBeDefined();
				expect(result.log).toBe(false);
			});

			it('should accept a boolean and return it', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV', {log: true})
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result).toBeDefined();
				expect(result.log).toBe(true);
			});

			it(`should throw a 'TypeError' if it is provided a non-boolean type`, () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV', {log: 'true'})
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result).toBeUndefined();
				expect(err instanceof TypeError).toBe(true);
			});


		});

		describe('Method: check', () => {
			
			beforeEach(() => {
				process.env.NODE_ENV = 'development';
				process.env.USE_AUTH = 'true';
				process.env.AUTH_SERVER = 'http://blah.com';
				process.env.AUTH_SERVER_PORT = '9000';
				
			});

			it('should validate a valid string', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV', exampleConfig.NODE_ENV);
					result.check();
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result.value).toBe('development');
			});

			it('should validate a valid boolean', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('USE_AUTH', exampleConfig.USE_AUTH);
					result.check();
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result.value).toBe(true);
			});

			it('should validate a valid number', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('AUTH_SERVER_PORT', exampleConfig.AUTH_SERVER_PORT);
					result.check();
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result.value).toBe(9000);
			});

			it('should throw an error if the value of an env var fails to match the proscribed format', () => {
				let err, result;
				try {
					result = new EnvironmentVariable('AUTH_SERVER', exampleConfig.AUTH_SERVER);
					result.check();
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result.value).toBeUndefined();
				expect(result.valid).toBe(false)
			});

			it('should throw an error if the value of an env var is not convertible to the proscribed type, when said type is \'number\'', () => {
				process.env.AUTH_SERVER_PORT = 'some port';
				let err, result;
				try {
					result = new EnvironmentVariable('AUTH_SERVER_PORT', exampleConfig.AUTH_SERVER_PORT);
					result.check();
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result.value).toBeUndefined();
				expect(result.valid).toBe(false)
			});

			it('should throw an error if the value of an env var is not convertible to the proscribed type, when said type is \'boolean\'', () => {
				process.env.USE_AUTH = 'correct';
				let err, result;
				try {
					result = new EnvironmentVariable('USE_AUTH', exampleConfig.USE_AUTH);
					result.check();
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result.value).toBeUndefined();
				expect(result.valid).toBe(false)
			});

			it('should throw an error if the value of an env var is not convertible to the proscribed type, when said type is \'boolean\'', () => {
				delete process.env.NODE_ENV;
				let err, result;
				try {
					result = new EnvironmentVariable('NODE_ENV', exampleConfig.NODE_ENV);
					result.check();
				} catch(e) {
					err = e;
				}
				expect(err).toBeDefined();
				expect(result.value).toBeUndefined();
				expect(result.valid).toBe(false)
			});
			
		});
		

	})


});

