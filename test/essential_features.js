var expect = require('expect.js');
var DOMinate = require('..');
require('./document-mock');
var ns = 'http://www.w3.org/1999/xhtml';

describe('essential', function () {
	it('attaches to the first element', function () {
		var element = document.createElementNS(ns, 'div');
		DOMinate([element, ['div']]);
		expect(element.children.length).to.be(1);
		expect(element.children[0].__tag).to.be('div');
		expect(element.children[0].__ns).to.be(ns);
	});

	it('recursively builds a DOM', function () {
		var element = document.createElementNS(ns, 'div');
		DOMinate(
			[element,
				['div',
					['p', 'test',
						['a', '2']
					]
				]
			]
		);
		expect(element.children.length).to.be(1);

		element = element.children[0];
		expect(element.__tag).to.be('div');
		expect(element.__ns).to.be(ns);
		expect(element.children.length).to.be(1);

		element = element.children[0];
		expect(element.__tag).to.be('p');
		expect(element.__ns).to.be(ns);
		expect(element.children.length).to.be(2)

		var text = element.children[0];
		expect(text.text).to.be('test');
		var a = element.children[1];
		expect(a.__tag).to.be('a');
		expect(a.__ns).to.be(ns);
		expect(a.children.length).to.be(1);
		expect(a.children[0].text).to.be('2');
	});

	it('sets properties when given an object', function () {
		var element = document.createElementNS(ns, 'div');
		DOMinate(
			[element,
				['div', {
					id: 'important',
					class: 'test', // class is restricted word
					'data-info': 'none' // attribute with dash
				}]
			]
		);
		expect(element.children.length).to.be(1);
		element = element.children[0];
		expect(element.__tag).to.be('div');
		expect(element.__ns).to.be(ns);
		expect(element.id).to.be('important');
		expect(element.className).to.be('test');
		expect(element['data-info']).to.be('none');
	});
});