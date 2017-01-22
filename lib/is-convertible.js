'use strict';

exports.isBooleanString = value => {
	return ['true', 'false'].indexOf(value) >= 0;
};

exports.isNumberString = value => {
	return typeof value === 'string' && !Number.isNaN(Number(value));
};