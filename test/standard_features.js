var expect = require('expect.js');
var DOMinate = require('..');
require('./document-mock');
var ns = 'http://www.w3.org/1999/xhtml';

describe('standard', function () {
	it('returns the node that is the first element of the root array', function () {
		var element = document.createElementNS(ns, 'div');
		expect(DOMinate([element, ['a']])).to.be(element);
	});
	
	it('supports id syntax-sugar', function () {
		var element = document.createElementNS(ns, 'div');
		DOMinate([element, ['div#test']]);
		expect(element.children.length).to.be(1);
		expect(element.children[0].__ns).to.be(ns);
		expect(element.children[0].__tag).to.be('div');
		expect(element.children[0].id).to.be('test');
	});
});