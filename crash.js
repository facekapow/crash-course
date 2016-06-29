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
    function Case(name) {
      var self = this;
      this.name = name;
      this._ran = false;
      this._out = function(txt, msg, color) {
        console.log('  * case ' + (self.name ? self.name : current) + ' - ' + ((fancy) ? colors[color](txt) : txt));
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
    Case.prototype.pass = Case.prototype.fail = Case.prototype.warn = function() {
      throw new Error('Case not initialized.');
    }
    return {
      case: function(name, catchErr, func) {
        if (typeof name === 'function') {
          func = name;
          name = null;
        }
        if (typeof catchErr === 'function') {
          func = catchErr;
          catchErr = false;
        }
        if (typeof name === 'boolean') {
          catchErr = name;
          name = null;
        }
        if (catchErr) {
          var testCase = new Case(name);
          try {
            func(testCase);
          } catch(e) {
            testCase.fail((e.message) ? e.message : String(e));
          }
        } else {
          func(new Case(name));
        }
      },
      freeform: function(name) {
        return new Case(name);
      }
    }
  }
});
