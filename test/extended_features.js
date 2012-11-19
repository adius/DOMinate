var expect = require('expect.js');
var DOMinate = require('..');
require('./document-mock');
var ns = 'http://www.w3.org/1999/xhtml';

describe('extended', function () {
	describe('syntax-sugar class', function () {
		it('works with just a class', function () {
			var element = document.createElementNS(ns, 'div');
			DOMinate([element, ['a.new']]);
			expect(element.children.length).to.be(1);
			expect(element.children[0].__ns).to.be(ns);
			expect(element.children[0].__tag).to.be('a');
			expect(element.children[0].className).to.be('new');
		});
		it('works with a class and an id', function () {
			var element = document.createElementNS(ns, 'div');
			DOMinate([element, ['a#b.new']]);
			expect(element.children.length).to.be(1);
			expect(element.children[0].__ns).to.be(ns);
			expect(element.children[0].__tag).to.be('a');
			expect(element.children[0].className).to.be('new');
			expect(element.children[0].id).to.be('b');
		});
		it('works with class and id reversed', function () {
			var element = document.createElementNS(ns, 'div');
			DOMinate([element, ['a.new#b']]);
			expect(element.children.length).to.be(1);
			expect(element.children[0].__ns).to.be(ns);
			expect(element.children[0].__tag).to.be('a');
			expect(element.children[0].className).to.be('new');
			expect(element.children[0].id).to.be('b');
		});
	});
	describe('namespace support', function () {
		describe('when a namespace is passed as the second argument', function () {
			it('is used to create the elements', function () {
				var svgNS = 'http://www.w3.org/2000/svg';
				var element = document.createElementNS(ns, 'div');
				DOMinate(
				    [element,
				        ['svg', {height: 100, width: 100},
				            ['circle', {cx: 10, cy: 10, r: 5, style: 'fill:green'}]
				        ]
				    ], svgNS
				);
				expect(element.__ns).to.be(ns);
				expect(element.__tag).to.be('div');
				expect(element.children.length).to.be(1);

				var svg = element.children[0];
				expect(svg.__ns).to.be(svgNS);
				expect(svg.__tag).to.be('svg');
				expect(svg.height).to.be(100);
				expect(svg.width).to.be(100);
				expect(svg.children.length).to.be(1);

				var circle = svg.children[0];
				expect(circle.__ns).to.be(svgNS);
				expect(circle.__tag).to.be('circle');
				expect(circle.cx).to.be(10);
				expect(circle.cy).to.be(10);
				expect(circle.r).to.be(5);
				expect(circle.style).to.be('fill:green');
				expect(circle.children.length).to.be(0);
			});
		});
	});
});