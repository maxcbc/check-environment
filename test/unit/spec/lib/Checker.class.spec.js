'use strict';

const Checker = require('../../../../lib/Checker.class');
const path = require('path');


describe('Class: Checker', () => {

	describe('Method: constructor', () => {

		describe('Property: specLocation', () => {

			it(`should default to the file 'env.yaml' in the current working directory`, () => {
				let err, result;
				try {
					result = new Checker({autoLoad:false})
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result).toBeDefined();
				expect(result.specLocation).toBe(path.resolve('./env.yaml'))
			});
			
			it('should be set to the corresponding value of the options object if set', () => {
				let err, result;
				try {
					result = new Checker({specLocation:'./config/env.yaml', autoLoad:false})
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result).toBeDefined();
				expect(result.specLocation).toBe(path.resolve('./config/env.yaml'))
			})
		});

		describe('Property: autoLoad', () => {

			it(`should default to true`, () => {
				let err, result;
				try {
					result = new Checker()
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result).toBeDefined();
				expect(result.autoLoad).toBe(true)
			});

			it('should be settable to false', () => {
				let err, result;
				try {
					result = new Checker({autoLoad:false})
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result).toBeDefined();
				expect(result.autoLoad).toBe(false)
			})
		});

		describe('Property: spec', () => {

			it(`should be undefined if autoLoad is set to 'false'`, () => {
				let err, result;
				try {
					result = new Checker({autoLoad:false})
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result).toBeDefined();
				expect(result.spec).toBeUndefined()
			});
			
			it(`should be defined if autoLoad is set to 'true'`, () => {
				let err, result;
				try {
					result = new Checker()
				} catch(e) {
					err = e;
				}
				expect(err).toBeUndefined();
				expect(result).toBeDefined();
				expect(result.spec).toBeDefined();
			})

		});
		
	});
	
	describe('Method: loadSpec', () => {

		it('should set the spec property of the object to a parsed version of a valid JSON spec', () => {
			let err, result;
			try {
				result = new Checker({specLocation:'./test/unit/mocks/env.json'});
				result.loadSpec()
			} catch(e) {
				err = e;
			}
			expect(err).toBeUndefined();
			expect(result).toBeDefined();
			expect(result.spec).toBeDefined();
		});

		it('should set the spec property of the object to a parsed version of a valid JSON spec', () => {
			let err, result;
			try {
				result = new Checker({specLocation:'./test/unit/mocks/env.yaml'});
				result.loadSpec()
			} catch(e) {
				err = e;
			}
			expect(err).toBeUndefined();
			expect(result).toBeDefined();
			expect(result.spec).toBeDefined();
		});

		it('should set throw an Error if it loads an invalid JSON spec', () => {
			let err, result;
			try {
				result = new Checker({specLocation:'./test/unit/mocks/bad-json.json'});
				result.loadSpec()
			} catch(e) {
				err = e;
			}
			expect(err).toBeDefined();
			expect(err instanceof Error);
		});

		it('should set throw an Error if it loads an invalid YAML spec', () => {
			let err, result;
			try {
				result = new Checker({specLocation:'./test/unit/mocks/bad-yaml.yaml'});
				result.loadSpec()
			} catch(e) {
				err = e;
			}
			expect(err).toBeDefined();
			expect(err instanceof Error);
		});

		it('should set throw an Error if it loads a spec that is neither a yaml or a json', () => {
			let err, result;
			try {
				result = new Checker({specLocation:'./test/unit/mocks/env.js'});
				result.loadSpec()
			} catch(e) {
				err = e;
			}
			expect(err).toBeDefined();
			expect(err instanceof Error);
		})
	})
});