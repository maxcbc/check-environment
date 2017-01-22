'use strict';
const isConvertible = require('../../../../lib/is-convertible');

describe('Module: isConvertible', () => {
	
	describe('Method: isBooleanString', () => {
		it(`return truthy value if provided 'true'`, () => {
			expect(isConvertible.isBooleanString('true')).toBe(true)
		});

		it(`return truthy value if provided 'false'`, () => {
			expect(isConvertible.isBooleanString('false')).toBe(true)
		});

		it(`return falsey value if provided a falsey value`, () => {
			expect(isConvertible.isBooleanString(false)).toBe(false)
		});

		it(`return falsey value if provided a truthy value`, () => {
			expect(isConvertible.isBooleanString(true)).toBe(false)
		});

		it(`return falsey value if provided a number value`, () => {
			expect(isConvertible.isBooleanString(544)).toBe(false)
		});

		it(`return falsey value if provided a string value not equal to 'false' or 'true'`, () => {
			expect(isConvertible.isBooleanString('blah')).toBe(false)
		});
	});

	describe('Method isNumberString', () => {
		it(`return falsey value if provided 'one'`, () => {
			expect(isConvertible.isNumberString('one')).toBe(false)
		});

		it(`return falsey value if provided 42`, () => {
			expect(isConvertible.isNumberString(42)).toBe(false)
		});

		it(`return truthy value if provided '42'`, () => {
			expect(isConvertible.isNumberString('42.42')).toBe(true)
		});
	})
	
	
	
	
	
	
	
	
	
	
})