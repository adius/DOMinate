[![Build Status](https://secure.travis-ci.org/microjs/DOMinate.png?branch=master)](https://travis-ci.org/microjs/DOMinate)
# DOMinate

A **DOM building utility** and **Template engine** build upon **JsonML** with syntax sugar.

## Features
- **Universal:** You can easily make JsonML in almost any programming language
- **Tiny:** Only 0.3k minified and gzipped
- **DOM-ready:** Builds and returns a DOM DocumentFragment
- **Simple:** Build the JsonML Array, parse it.


```javascript
DOMinate(
  [document.body,
    ['h1#logo', 'Static Example', {style:'color:blue'}],
    ['p','some example text'],
    ['ul', {id:'list', class:'bullets'},
      ['li', 'item1'],
      ['li.active', 'item2'],
      ['li',
          ['a', 'item3', {href: '#'}]
      ]
    ]
  ]
);
```

compiles to

```html
<body>
  <h1 id="logo" style="color:blue">Static Example</h1>
  <p>some example text</p>
  <ul id="list" class="bullets">
    <li>item1</li>
    <li class="active">item2</li>
    <li><a href="#">item3</a></li>
  </ul>
</body>
```

## SVG support

```javascript
DOMinate(
  [document.body,
    ['svg', {height: 100, width: 100},
      ['circle', {cx: 10, cy: 10, r: 5, style: 'fill:green'}],
      ['circle', {cx: 20, cy: 20, r: 5, style: 'fill:red'}]
    ]
  ], 'http://www.w3.org/2000/svg'
);
```
compiles to:

```html
<body>
  <svg height="100" width="100">
    <circle cx="10" cy="10" r="5" style="fill:green"></circle>
    <circle cx="20" cy="20" r="5" style="fill:red"></circle>
  </svg>
</body>
```