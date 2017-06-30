(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _index = require('../package/dist/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function (e) {
  var left = document.getElementById('popoverParentLeft');
  var popLeft = new _index2.default({
    target: left,
    popover: '\n      <div class="my-popover left">\n        <h5 class="mv0">Left</h5>\n      </div>\n    ',
    position: 'left',
    transitionSpeed: 200
  });
  left.addEventListener('click', function (e) {
    popLeft.toggle();
  });
  // left.addEventListener('mouseleave', e => {
  //   popLeft.unpin()
  // })

  //   const right = document.getElementById('popoverParentRight')
  //   const popRight = new Popover({
  //     target: right,
  //     popover: `
  //       <div class="my-popover right">
  //         <h5 class="mv0">Right</h5>
  //       </div>
  //     `,
  //     position: 'right'
  //   })
  //   right.addEventListener('mouseenter', e => {
  //     popRight.pin()
  //   })
  //   right.addEventListener('mouseleave', e => {
  //     popRight.unpin()
  //   })

  //   const top = document.getElementById('popoverParentTop')
  //   const popTop = new Popover({
  //     target: top,
  //     popover: `
  //       <div class="my-popover top">
  //         <h5 class="mv0">Top</h5>
  //       </div>
  //     `,
  //     position: 'top'
  //   })
  //   top.addEventListener('mouseenter', e => {
  //     popTop.pin()
  //   })
  //   top.addEventListener('mouseleave', e => {
  //     popTop.unpin()
  //   })

  //   const bottom = document.getElementById('popoverParentBottom')
  //   const popBottom = new Popover({
  //     target: bottom,
  //     popover: `
  //       <div class="my-popover bottom">
  //         <h5 class="mv0">Bottom</h5>
  //       </div>
  //     `,
  //     position: 'bottom'
  //   })
  //   bottom.addEventListener('mouseenter', e => {
  //     popBottom.pin()
  //   })
  //   bottom.addEventListener('mouseleave', e => {
  //     popBottom.unpin()
  //   })
});

},{"../package/dist/index.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tackjs = require('tackjs');

var _tarry = require('tarry.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Popover = function () {
  function Popover(_ref) {
    var target = _ref.target,
        _ref$popover = _ref.popover,
        popover = _ref$popover === undefined ? null : _ref$popover,
        _ref$position = _ref.position,
        position = _ref$position === undefined ? 'bottom' : _ref$position,
        _ref$transitionSpeed = _ref.transitionSpeed,
        transitionSpeed = _ref$transitionSpeed === undefined ? 0 : _ref$transitionSpeed;

    _classCallCheck(this, Popover);

    this.target = target;
    this.popover = this.createPopover(popover);
    this.position = position;
    this.transitionSpeed = transitionSpeed;

    this.state = {
      pinned: false,
      busy: false,
      requestClose: false
    };

    this.pin = this.pin.bind(this);
    this.unpin = this.unpin.bind(this);
    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
    this.isExternalClick = this.isExternalClick.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    this.focusNode = null;
  }

  _createClass(Popover, [{
    key: 'setState',
    value: function setState(state, cb) {
      this.state = _extends({}, this.state, state);

      cb && (0, _tarry.tarry)(cb, 0)();
    }
  }, {
    key: 'block',
    value: function block() {
      this.setState({
        busy: true
      });
    }
  }, {
    key: 'unblock',
    value: function unblock() {
      var _this = this;

      this.setState({
        busy: false
      }, function () {
        _this.state.requestClose && _this.unpin();
      });
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.state.pinned ? this.unpin() : this.pin();
    }
  }, {
    key: 'pin',
    value: function pin() {
      var _this2 = this;

      if (this.state.busy || this.state.pinned) return;

      this.setState({
        busy: true
      });

      this.focusNode = document.activeElement;

      var render = (0, _tarry.tarry)(function () {
        return document.body.appendChild(_this2.popover);
      });
      var pin = (0, _tarry.tarry)(function () {
        return (0, _tackjs.tack)(_this2.popover, _this2.target, _this2.position);
      });
      var show = (0, _tarry.tarry)(function () {
        _this2.popover.classList.add('is-visible');
        _this2.popover.setAttribute('tabindex', '0');
        _this2.popover.setAttribute('aria-hidden', 'false');
      });
      var focus = (0, _tarry.tarry)(function () {
        return _this2.popover.focus();
      });
      var done = (0, _tarry.tarry)(function () {
        return _this2.setState({
          busy: false,
          pinned: true
        });
      });

      (0, _tarry.queue)(render, pin, show(0), focus(0), done)();

      this.popover.addEventListener('mouseenter', this.block);
      this.popover.addEventListener('mouseleave', this.unblock);
      window.addEventListener('click', this.isExternalClick);
      window.addEventListener('keyup', this.handleKeyup);
      window.addEventListener('resize', this.unpin);
    }
  }, {
    key: 'unpin',
    value: function unpin(force) {
      var _this3 = this;

      this.setState({
        requestClose: true
      });

      if (!force && (this.state.busy || !this.state.pinned)) return;

      (0, _tarry.tarry)(function () {
        _this3.setState({
          busy: true
        });

        _this3.popover.removeEventListener('mouseenter', _this3.block);
        _this3.popover.removeEventListener('mouseleave', _this3.unblock);
        window.removeEventListener('click', _this3.isExternalClick);
        window.removeEventListener('keyup', _this3.handleKeyup);
        window.removeEventListener('resize', _this3.unpin);

        var hide = (0, _tarry.tarry)(function () {
          return _this3.popover.classList.add('is-hiding');
        });
        var remove = (0, _tarry.tarry)(function () {
          return document.body.removeChild(_this3.popover);
        });
        var blur = (0, _tarry.tarry)(function () {
          return _this3.focusNode.focus();
        });
        var done = (0, _tarry.tarry)(function () {
          _this3.popover.classList.remove('is-hiding');
          _this3.popover.classList.remove('is-visible');
          _this3.setState({
            busy: false,
            pinned: false,
            requestClose: false
          });
        });

        (0, _tarry.queue)(hide, remove(_this3.transitionSpeed), blur, done)();
      }, 0)();
    }
  }, {
    key: 'handleKeyup',
    value: function handleKeyup(e) {
      e.keyCode === 27 && this.unpin();
    }
  }, {
    key: 'isExternalClick',
    value: function isExternalClick(e) {
      if (e.target !== this.popover && !this.popover.contains(e.target) && e.target !== this.target && !this.target.contains(e.target)) {
        this.unpin();
      }
    }
  }, {
    key: 'createPopover',
    value: function createPopover(pop) {
      var popover = document.createElement('div');
      popover.className = 'micro-popover';

      popover.role = 'dialog';
      popover.setAttribute('aria-label', 'Share Dialog');
      popover.setAttribute('aria-hidden', 'true');

      typeof pop === 'string' ? popover.innerHTML = pop : popover.appendChild(pop);

      return popover;
    }
  }]);

  return Popover;
}();

exports.default = Popover;
},{"tackjs":3,"tarry.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCoords = exports.getCoords = function getCoords(element) {
  var _element$getBoundingC = element.getBoundingClientRect(),
      l = _element$getBoundingC.left,
      r = _element$getBoundingC.right,
      t = _element$getBoundingC.top,
      b = _element$getBoundingC.bottom;

  var _window = window,
      y = _window.pageYOffset;


  return {
    height: b - t,
    width: r - l,
    top: {
      y: y + t,
      x: l + (r - l) / 2
    },
    bottom: {
      y: y + b,
      x: l + (r - l) / 2
    },
    left: {
      y: t + (b - t) / 2,
      x: l
    },
    right: {
      y: t + (b - t) / 2,
      x: r
    },
    topLeft: {
      y: y + t,
      x: l
    },
    bottomLeft: {
      y: y + b,
      x: l
    },
    topRight: {
      y: y + t,
      x: r
    },
    bottomRight: {
      y: y + b,
      x: r
    }
  };
};

var position = exports.position = function position(target, scope, placement) {
  var c = getCoords(scope)[placement];
  var e = getCoords(target);
  var _window2 = window,
      y = _window2.pageYOffset;


  var vp = {
    top: y,
    bottom: y + window.innerHeight,
    left: 0,
    right: window.innerWidth
  };

  var offsets = {
    top: {
      x: e.width / 2,
      y: e.height
    },
    bottom: {
      x: e.width / 2,
      y: 0
    },
    left: {
      x: e.width,
      y: e.height / 2
    },
    right: {
      x: 0,
      y: e.height / 2
    },
    topLeft: {
      x: e.width,
      y: e.height
    },
    topRight: {
      x: 0,
      y: e.height
    },
    bottomLeft: {
      x: e.width,
      y: 0
    },
    bottomRight: {
      x: 0,
      y: 0
    }
  };

  var posx = c.x - offsets[placement].x;
  var posy = c.y - offsets[placement].y;

  if (posx < vp.left) {
    posx = vp.left;
  } else if (posx + e.width > vp.right) {
    posx = vp.right - e.width;
  }

  if (posy < vp.top) {
    posy = vp.top;
  } else if (posy + e.height > vp.bottom) {
    posy = vp.bottom - e.height;
  }

  target.style.transform = 'translateX(' + posx + 'px) translateY(' + posy + 'px)';
};

var tack = exports.tack = function tack(target, scope, placement) {
  target.classList.add('is-tacked');
  position(target, scope, placement);

  return {
    update: function update() {
      position(target, scope, placement);
    },
    destroy: function destroy() {
      target.style.transform = '';
      target.classList.remove('is-tacked');
    }
  };
};
},{}],4:[function(require,module,exports){
function next(args){
  args.length > 0 && args.shift().apply(this, args)
}

function run(cb, args){
  cb()
  next(args)
}

function tarry(cb, delay){
  return function(){
    var args = [].slice.call(arguments)
    var override = args[0]
    
    if ('number' === typeof override){
      return tarry(cb, override)
    }
    
    'number' === typeof delay ? (
      setTimeout(function(){
        run(cb, args)
      }, delay) 
    ) : (
      run(cb, args)
    )
  }
}

function queue(){
  var args = [].slice.call(arguments)
  return tarry(function(){
    next(args.slice(0))
  })
}

module.exports = exports = {
  tarry: tarry,
  queue: queue
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIi4uL3BhY2thZ2UvZGlzdC9pbmRleC5qcyIsIi4uL3BhY2thZ2Uvbm9kZV9tb2R1bGVzL3RhY2tqcy9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9ub2RlX21vZHVsZXMvdGFycnkuanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxPQUFPLGdCQUFQLENBQXdCLGtCQUF4QixFQUE0QyxhQUFLO0FBQy9DLE1BQU0sT0FBTyxTQUFTLGNBQVQsQ0FBd0IsbUJBQXhCLENBQWI7QUFDQSxNQUFNLFVBQVUsb0JBQVk7QUFDMUIsWUFBUSxJQURrQjtBQUUxQiwyR0FGMEI7QUFPMUIsY0FBVSxNQVBnQjtBQVExQixxQkFBaUI7QUFSUyxHQUFaLENBQWhCO0FBVUEsT0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixhQUFLO0FBQ2xDLFlBQVEsTUFBUjtBQUNELEdBRkQ7QUFHQTtBQUNBO0FBQ0E7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQyxDQXJFRDs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUG9wb3ZlciBmcm9tICcuLi9wYWNrYWdlL2Rpc3QvaW5kZXguanMnXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZSA9PiB7XG4gIGNvbnN0IGxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wb3ZlclBhcmVudExlZnQnKVxuICBjb25zdCBwb3BMZWZ0ID0gbmV3IFBvcG92ZXIoe1xuICAgIHRhcmdldDogbGVmdCxcbiAgICBwb3BvdmVyOiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibXktcG9wb3ZlciBsZWZ0XCI+XG4gICAgICAgIDxoNSBjbGFzcz1cIm12MFwiPkxlZnQ8L2g1PlxuICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwb3NpdGlvbjogJ2xlZnQnLFxuICAgIHRyYW5zaXRpb25TcGVlZDogMjAwXG4gIH0pXG4gIGxlZnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBwb3BMZWZ0LnRvZ2dsZSgpXG4gIH0pXG4gIC8vIGxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGUgPT4ge1xuICAvLyAgIHBvcExlZnQudW5waW4oKVxuICAvLyB9KVxuXG4vLyAgIGNvbnN0IHJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcG92ZXJQYXJlbnRSaWdodCcpXG4vLyAgIGNvbnN0IHBvcFJpZ2h0ID0gbmV3IFBvcG92ZXIoe1xuLy8gICAgIHRhcmdldDogcmlnaHQsXG4vLyAgICAgcG9wb3ZlcjogYFxuLy8gICAgICAgPGRpdiBjbGFzcz1cIm15LXBvcG92ZXIgcmlnaHRcIj5cbi8vICAgICAgICAgPGg1IGNsYXNzPVwibXYwXCI+UmlnaHQ8L2g1PlxuLy8gICAgICAgPC9kaXY+XG4vLyAgICAgYCxcbi8vICAgICBwb3NpdGlvbjogJ3JpZ2h0J1xuLy8gICB9KVxuLy8gICByaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZSA9PiB7XG4vLyAgICAgcG9wUmlnaHQucGluKClcbi8vICAgfSlcbi8vICAgcmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGUgPT4ge1xuLy8gICAgIHBvcFJpZ2h0LnVucGluKClcbi8vICAgfSlcblxuLy8gICBjb25zdCB0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wb3ZlclBhcmVudFRvcCcpXG4vLyAgIGNvbnN0IHBvcFRvcCA9IG5ldyBQb3BvdmVyKHtcbi8vICAgICB0YXJnZXQ6IHRvcCxcbi8vICAgICBwb3BvdmVyOiBgXG4vLyAgICAgICA8ZGl2IGNsYXNzPVwibXktcG9wb3ZlciB0b3BcIj5cbi8vICAgICAgICAgPGg1IGNsYXNzPVwibXYwXCI+VG9wPC9oNT5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgIGAsXG4vLyAgICAgcG9zaXRpb246ICd0b3AnXG4vLyAgIH0pXG4vLyAgIHRvcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZSA9PiB7XG4vLyAgICAgcG9wVG9wLnBpbigpXG4vLyAgIH0pXG4vLyAgIHRvcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZSA9PiB7XG4vLyAgICAgcG9wVG9wLnVucGluKClcbi8vICAgfSlcblxuLy8gICBjb25zdCBib3R0b20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wb3ZlclBhcmVudEJvdHRvbScpXG4vLyAgIGNvbnN0IHBvcEJvdHRvbSA9IG5ldyBQb3BvdmVyKHtcbi8vICAgICB0YXJnZXQ6IGJvdHRvbSxcbi8vICAgICBwb3BvdmVyOiBgXG4vLyAgICAgICA8ZGl2IGNsYXNzPVwibXktcG9wb3ZlciBib3R0b21cIj5cbi8vICAgICAgICAgPGg1IGNsYXNzPVwibXYwXCI+Qm90dG9tPC9oNT5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgIGAsXG4vLyAgICAgcG9zaXRpb246ICdib3R0b20nXG4vLyAgIH0pXG4vLyAgIGJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZSA9PiB7XG4vLyAgICAgcG9wQm90dG9tLnBpbigpXG4vLyAgIH0pXG4vLyAgIGJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZSA9PiB7XG4vLyAgICAgcG9wQm90dG9tLnVucGluKClcbi8vICAgfSlcbn0pXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfdGFja2pzID0gcmVxdWlyZSgndGFja2pzJyk7XG5cbnZhciBfdGFycnkgPSByZXF1aXJlKCd0YXJyeS5qcycpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgUG9wb3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUG9wb3ZlcihfcmVmKSB7XG4gICAgdmFyIHRhcmdldCA9IF9yZWYudGFyZ2V0LFxuICAgICAgICBfcmVmJHBvcG92ZXIgPSBfcmVmLnBvcG92ZXIsXG4gICAgICAgIHBvcG92ZXIgPSBfcmVmJHBvcG92ZXIgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBfcmVmJHBvcG92ZXIsXG4gICAgICAgIF9yZWYkcG9zaXRpb24gPSBfcmVmLnBvc2l0aW9uLFxuICAgICAgICBwb3NpdGlvbiA9IF9yZWYkcG9zaXRpb24gPT09IHVuZGVmaW5lZCA/ICdib3R0b20nIDogX3JlZiRwb3NpdGlvbixcbiAgICAgICAgX3JlZiR0cmFuc2l0aW9uU3BlZWQgPSBfcmVmLnRyYW5zaXRpb25TcGVlZCxcbiAgICAgICAgdHJhbnNpdGlvblNwZWVkID0gX3JlZiR0cmFuc2l0aW9uU3BlZWQgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHRyYW5zaXRpb25TcGVlZDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3BvdmVyKTtcblxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMucG9wb3ZlciA9IHRoaXMuY3JlYXRlUG9wb3Zlcihwb3BvdmVyKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy50cmFuc2l0aW9uU3BlZWQgPSB0cmFuc2l0aW9uU3BlZWQ7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgcGlubmVkOiBmYWxzZSxcbiAgICAgIGJ1c3k6IGZhbHNlLFxuICAgICAgcmVxdWVzdENsb3NlOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLnBpbiA9IHRoaXMucGluLmJpbmQodGhpcyk7XG4gICAgdGhpcy51bnBpbiA9IHRoaXMudW5waW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLmJsb2NrID0gdGhpcy5ibG9jay5iaW5kKHRoaXMpO1xuICAgIHRoaXMudW5ibG9jayA9IHRoaXMudW5ibG9jay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaXNFeHRlcm5hbENsaWNrID0gdGhpcy5pc0V4dGVybmFsQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUtleXVwID0gdGhpcy5oYW5kbGVLZXl1cC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5mb2N1c05vZGUgPSBudWxsO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBvcG92ZXIsIFt7XG4gICAga2V5OiAnc2V0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSwgY2IpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBfZXh0ZW5kcyh7fSwgdGhpcy5zdGF0ZSwgc3RhdGUpO1xuXG4gICAgICBjYiAmJiAoMCwgX3RhcnJ5LnRhcnJ5KShjYiwgMCkoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdibG9jaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJsb2NrKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGJ1c3k6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VuYmxvY2snLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJsb2NrKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGJ1c3k6IGZhbHNlXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLnN0YXRlLnJlcXVlc3RDbG9zZSAmJiBfdGhpcy51bnBpbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndG9nZ2xlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgdGhpcy5zdGF0ZS5waW5uZWQgPyB0aGlzLnVucGluKCkgOiB0aGlzLnBpbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3BpbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBpbigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5idXN5IHx8IHRoaXMuc3RhdGUucGlubmVkKSByZXR1cm47XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBidXN5OiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5mb2N1c05vZGUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICB2YXIgcmVuZGVyID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChfdGhpczIucG9wb3Zlcik7XG4gICAgICB9KTtcbiAgICAgIHZhciBwaW4gPSAoMCwgX3RhcnJ5LnRhcnJ5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoMCwgX3RhY2tqcy50YWNrKShfdGhpczIucG9wb3ZlciwgX3RoaXMyLnRhcmdldCwgX3RoaXMyLnBvc2l0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHNob3cgPSAoMCwgX3RhcnJ5LnRhcnJ5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5wb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgX3RoaXMyLnBvcG92ZXIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG4gICAgICAgIF90aGlzMi5wb3BvdmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGZvY3VzID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLnBvcG92ZXIuZm9jdXMoKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGRvbmUgPSAoMCwgX3RhcnJ5LnRhcnJ5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgIGJ1c3k6IGZhbHNlLFxuICAgICAgICAgIHBpbm5lZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAoMCwgX3RhcnJ5LnF1ZXVlKShyZW5kZXIsIHBpbiwgc2hvdygwKSwgZm9jdXMoMCksIGRvbmUpKCk7XG5cbiAgICAgIHRoaXMucG9wb3Zlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5ibG9jayk7XG4gICAgICB0aGlzLnBvcG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMudW5ibG9jayk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmlzRXh0ZXJuYWxDbGljayk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZUtleXVwKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVucGluKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1bnBpbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVucGluKGZvcmNlKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHJlcXVlc3RDbG9zZTogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZm9yY2UgJiYgKHRoaXMuc3RhdGUuYnVzeSB8fCAhdGhpcy5zdGF0ZS5waW5uZWQpKSByZXR1cm47XG5cbiAgICAgICgwLCBfdGFycnkudGFycnkpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMzLnNldFN0YXRlKHtcbiAgICAgICAgICBidXN5OiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzMy5wb3BvdmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBfdGhpczMuYmxvY2spO1xuICAgICAgICBfdGhpczMucG9wb3Zlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgX3RoaXMzLnVuYmxvY2spO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfdGhpczMuaXNFeHRlcm5hbENsaWNrKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgX3RoaXMzLmhhbmRsZUtleXVwKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIF90aGlzMy51bnBpbik7XG5cbiAgICAgICAgdmFyIGhpZGUgPSAoMCwgX3RhcnJ5LnRhcnJ5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMy5wb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGluZycpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHJlbW92ZSA9ICgwLCBfdGFycnkudGFycnkpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChfdGhpczMucG9wb3Zlcik7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgYmx1ciA9ICgwLCBfdGFycnkudGFycnkpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLmZvY3VzTm9kZS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGRvbmUgPSAoMCwgX3RhcnJ5LnRhcnJ5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMzLnBvcG92ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkaW5nJyk7XG4gICAgICAgICAgX3RoaXMzLnBvcG92ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xuICAgICAgICAgIF90aGlzMy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBidXN5OiBmYWxzZSxcbiAgICAgICAgICAgIHBpbm5lZDogZmFsc2UsXG4gICAgICAgICAgICByZXF1ZXN0Q2xvc2U6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICgwLCBfdGFycnkucXVldWUpKGhpZGUsIHJlbW92ZShfdGhpczMudHJhbnNpdGlvblNwZWVkKSwgYmx1ciwgZG9uZSkoKTtcbiAgICAgIH0sIDApKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaGFuZGxlS2V5dXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVLZXl1cChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDI3ICYmIHRoaXMudW5waW4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc0V4dGVybmFsQ2xpY2snLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0V4dGVybmFsQ2xpY2soZSkge1xuICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzLnBvcG92ZXIgJiYgIXRoaXMucG9wb3Zlci5jb250YWlucyhlLnRhcmdldCkgJiYgZS50YXJnZXQgIT09IHRoaXMudGFyZ2V0ICYmICF0aGlzLnRhcmdldC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgdGhpcy51bnBpbigpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZVBvcG92ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVQb3BvdmVyKHBvcCkge1xuICAgICAgdmFyIHBvcG92ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHBvcG92ZXIuY2xhc3NOYW1lID0gJ21pY3JvLXBvcG92ZXInO1xuXG4gICAgICBwb3BvdmVyLnJvbGUgPSAnZGlhbG9nJztcbiAgICAgIHBvcG92ZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1NoYXJlIERpYWxvZycpO1xuICAgICAgcG9wb3Zlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgICAgdHlwZW9mIHBvcCA9PT0gJ3N0cmluZycgPyBwb3BvdmVyLmlubmVySFRNTCA9IHBvcCA6IHBvcG92ZXIuYXBwZW5kQ2hpbGQocG9wKTtcblxuICAgICAgcmV0dXJuIHBvcG92ZXI7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBvcG92ZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFBvcG92ZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGdldENvb3JkcyA9IGV4cG9ydHMuZ2V0Q29vcmRzID0gZnVuY3Rpb24gZ2V0Q29vcmRzKGVsZW1lbnQpIHtcbiAgdmFyIF9lbGVtZW50JGdldEJvdW5kaW5nQyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBsID0gX2VsZW1lbnQkZ2V0Qm91bmRpbmdDLmxlZnQsXG4gICAgICByID0gX2VsZW1lbnQkZ2V0Qm91bmRpbmdDLnJpZ2h0LFxuICAgICAgdCA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy50b3AsXG4gICAgICBiID0gX2VsZW1lbnQkZ2V0Qm91bmRpbmdDLmJvdHRvbTtcblxuICB2YXIgX3dpbmRvdyA9IHdpbmRvdyxcbiAgICAgIHkgPSBfd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG5cbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IGIgLSB0LFxuICAgIHdpZHRoOiByIC0gbCxcbiAgICB0b3A6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogbCArIChyIC0gbCkgLyAyXG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIHk6IHkgKyBiLFxuICAgICAgeDogbCArIChyIC0gbCkgLyAyXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB5OiB0ICsgKGIgLSB0KSAvIDIsXG4gICAgICB4OiBsXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgeTogdCArIChiIC0gdCkgLyAyLFxuICAgICAgeDogclxuICAgIH0sXG4gICAgdG9wTGVmdDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiBsXG4gICAgfSxcbiAgICBib3R0b21MZWZ0OiB7XG4gICAgICB5OiB5ICsgYixcbiAgICAgIHg6IGxcbiAgICB9LFxuICAgIHRvcFJpZ2h0OiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IHJcbiAgICB9LFxuICAgIGJvdHRvbVJpZ2h0OiB7XG4gICAgICB5OiB5ICsgYixcbiAgICAgIHg6IHJcbiAgICB9XG4gIH07XG59O1xuXG52YXIgcG9zaXRpb24gPSBleHBvcnRzLnBvc2l0aW9uID0gZnVuY3Rpb24gcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KSB7XG4gIHZhciBjID0gZ2V0Q29vcmRzKHNjb3BlKVtwbGFjZW1lbnRdO1xuICB2YXIgZSA9IGdldENvb3Jkcyh0YXJnZXQpO1xuICB2YXIgX3dpbmRvdzIgPSB3aW5kb3csXG4gICAgICB5ID0gX3dpbmRvdzIucGFnZVlPZmZzZXQ7XG5cblxuICB2YXIgdnAgPSB7XG4gICAgdG9wOiB5LFxuICAgIGJvdHRvbTogeSArIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiB3aW5kb3cuaW5uZXJXaWR0aFxuICB9O1xuXG4gIHZhciBvZmZzZXRzID0ge1xuICAgIHRvcDoge1xuICAgICAgeDogZS53aWR0aCAvIDIsXG4gICAgICB5OiBlLmhlaWdodFxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB4OiBlLndpZHRoIC8gMixcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIGxlZnQ6IHtcbiAgICAgIHg6IGUud2lkdGgsXG4gICAgICB5OiBlLmhlaWdodCAvIDJcbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICB4OiAwLFxuICAgICAgeTogZS5oZWlnaHQgLyAyXG4gICAgfSxcbiAgICB0b3BMZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogZS5oZWlnaHRcbiAgICB9LFxuICAgIHRvcFJpZ2h0OiB7XG4gICAgICB4OiAwLFxuICAgICAgeTogZS5oZWlnaHRcbiAgICB9LFxuICAgIGJvdHRvbUxlZnQ6IHtcbiAgICAgIHg6IGUud2lkdGgsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICBib3R0b21SaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9XG4gIH07XG5cbiAgdmFyIHBvc3ggPSBjLnggLSBvZmZzZXRzW3BsYWNlbWVudF0ueDtcbiAgdmFyIHBvc3kgPSBjLnkgLSBvZmZzZXRzW3BsYWNlbWVudF0ueTtcblxuICBpZiAocG9zeCA8IHZwLmxlZnQpIHtcbiAgICBwb3N4ID0gdnAubGVmdDtcbiAgfSBlbHNlIGlmIChwb3N4ICsgZS53aWR0aCA+IHZwLnJpZ2h0KSB7XG4gICAgcG9zeCA9IHZwLnJpZ2h0IC0gZS53aWR0aDtcbiAgfVxuXG4gIGlmIChwb3N5IDwgdnAudG9wKSB7XG4gICAgcG9zeSA9IHZwLnRvcDtcbiAgfSBlbHNlIGlmIChwb3N5ICsgZS5oZWlnaHQgPiB2cC5ib3R0b20pIHtcbiAgICBwb3N5ID0gdnAuYm90dG9tIC0gZS5oZWlnaHQ7XG4gIH1cblxuICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIHBvc3ggKyAncHgpIHRyYW5zbGF0ZVkoJyArIHBvc3kgKyAncHgpJztcbn07XG5cbnZhciB0YWNrID0gZXhwb3J0cy50YWNrID0gZnVuY3Rpb24gdGFjayh0YXJnZXQsIHNjb3BlLCBwbGFjZW1lbnQpIHtcbiAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLXRhY2tlZCcpO1xuICBwb3NpdGlvbih0YXJnZXQsIHNjb3BlLCBwbGFjZW1lbnQpO1xuXG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICBwb3NpdGlvbih0YXJnZXQsIHNjb3BlLCBwbGFjZW1lbnQpO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdpcy10YWNrZWQnKTtcbiAgICB9XG4gIH07XG59OyIsImZ1bmN0aW9uIG5leHQoYXJncyl7XG4gIGFyZ3MubGVuZ3RoID4gMCAmJiBhcmdzLnNoaWZ0KCkuYXBwbHkodGhpcywgYXJncylcbn1cblxuZnVuY3Rpb24gcnVuKGNiLCBhcmdzKXtcbiAgY2IoKVxuICBuZXh0KGFyZ3MpXG59XG5cbmZ1bmN0aW9uIHRhcnJ5KGNiLCBkZWxheSl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgdmFyIG92ZXJyaWRlID0gYXJnc1swXVxuICAgIFxuICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIG92ZXJyaWRlKXtcbiAgICAgIHJldHVybiB0YXJyeShjYiwgb3ZlcnJpZGUpXG4gICAgfVxuICAgIFxuICAgICdudW1iZXInID09PSB0eXBlb2YgZGVsYXkgPyAoXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIHJ1bihjYiwgYXJncylcbiAgICAgIH0sIGRlbGF5KSBcbiAgICApIDogKFxuICAgICAgcnVuKGNiLCBhcmdzKVxuICAgIClcbiAgfVxufVxuXG5mdW5jdGlvbiBxdWV1ZSgpe1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICByZXR1cm4gdGFycnkoZnVuY3Rpb24oKXtcbiAgICBuZXh0KGFyZ3Muc2xpY2UoMCkpXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IHtcbiAgdGFycnk6IHRhcnJ5LFxuICBxdWV1ZTogcXVldWVcbn1cbiJdfQ==
