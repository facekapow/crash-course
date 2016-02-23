# crash-course
The simplest testing framework, ever. Browser friendly, too.

## Install
Node:
```bash
npm install --save crash-course
```

Bower:
```bash
bower install crash-course --save
```
Bower continued (or just download the script and save it somewhere):
```html
<script src="/path-to-the-script/crash.js"></script>
```

[require.js](http://requirejs.org/) compatible, too.

## Usage
Node:
```js
'use strict';

var crash_course = require('crash-course');
var someTest = crash_course('someTest');

someTest.case(function(t) {
  // do things...
  if (passed) {
    t.pass('yay!');
  } else {
    t.fail('oh noes.');
  }
});
```

Browser:
```js
'use strict';
// assumes you've already included crash.js
var someTest = crash_course('someTest');
someTest.case(function(t) {
  // stuff
  if (passed) {
    t.pass('yippee!');
  } else {
    t.fail('ummmmm. well, then.');
  }
});
```

## API
Requiring the module returns a function:

### `crash_course(description[, fancy])`
Returns a test with the provided `description`, and if provided, `fancy` describes whether it should output with colors. Note: `fancy` has no effect in browsers, since you can't output color to the console in the browser.

#### `test.case(testFunction)`
The `testFunction` receives 1 argument: a new `Case`.

#### `test.freeform()`
Returns a new `Case`. Useful when testing things that require a regular `this` context.

### `Case`
The `Case` class has 3 methods:
#### `pass`, `fail`, and `warn`
Each function outputs the corresponding status for the test case and accepts an optional description.
However, if you call more than one or call one more than once, the function will throw (you can't call `pass` and then `fail`, or call `pass` twice).
