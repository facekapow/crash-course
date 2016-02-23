'use strict';

(function(cb) {
  var noop = (function(str) {return str;});
  var colors = {
    yellow: noop,
    green: noop,
    red: noop
  }
  if (typeof module !== 'undefined' && module.exports) {
    colors = require('colors/safe');
    module.exports = cb(colors);
  } else if (typeof define !== 'undefined') {
    define(cb(colors));
  } else {
    window.crash_course = cb(colors);
  }
})(function(colors) {
  return function(desc, fancy) {
    if (fancy === null || fancy === undefined) fancy = true;
    console.log('test - ' + desc);
    var current = 1;
    function Case() {
      var self = this;
      this._ran = false;
      this._out = function(txt, msg, color) {
        console.log('  * case ' + current + ' - ' + ((fancy) ? colors[color](txt) : txt));
        if (msg) console.log('    ' + msg);
        current++;
      }
      this._throwErr = function() {
        throw new Error('Case status method (\'pass\', \'fail\', and \'warn\') called more than once.');
      }
      this.pass = function(passMsg) {
        if (self._ran) self._throwErr();
        self._out('pass', passMsg, 'green');
        this._ran = true;
      };
      this.fail = function(errMsg) {
        if (self._ran) self._throwErr();
        self._out('fail', errMsg, 'red');
        this._ran = true;
      }
      this.warn = function(warnMsg) {
        if (self._ran) self._throwErr();
        self._out('warn', warnMsg, 'yellow');
        this._ran = true;
      }
    }
    return {
      case: function(func) {
        func(new Case());
      },
      freeform: function() {
        return new Case();
      }
    }
  }
});
