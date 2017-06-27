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
    position: 'left'
  });
  left.addEventListener('mouseenter', function (e) {
    popLeft.pin();
  });
  left.addEventListener('mouseleave', function (e) {
    popLeft.unpin();
  });
  /**
   * Make sure it closes on mouseleave,
   * unlike others
   */
  popLeft.popover.addEventListener('mouseleave', popLeft.unpin);

  var right = document.getElementById('popoverParentRight');
  var popRight = new _index2.default({
    target: right,
    popover: '\n      <div class="my-popover right">\n        <h5 class="mv0">Right</h5>\n      </div>\n    ',
    position: 'right'
  });
  right.addEventListener('mouseenter', function (e) {
    popRight.pin();
  });
  right.addEventListener('mouseleave', function (e) {
    popRight.unpin();
  });

  var top = document.getElementById('popoverParentTop');
  var popTop = new _index2.default({
    target: top,
    popover: '\n      <div class="my-popover top">\n        <h5 class="mv0">Top</h5>\n      </div>\n    ',
    position: 'top'
  });
  top.addEventListener('mouseenter', function (e) {
    popTop.pin();
  });
  top.addEventListener('mouseleave', function (e) {
    popTop.unpin();
  });

  var bottom = document.getElementById('popoverParentBottom');
  var popBottom = new _index2.default({
    target: bottom,
    popover: '\n      <div class="my-popover bottom">\n        <h5 class="mv0">Bottom</h5>\n      </div>\n    ',
    position: 'bottom'
  });
  bottom.addEventListener('mouseenter', function (e) {
    popBottom.pin();
  });
  bottom.addEventListener('mouseleave', function (e) {
    popBottom.unpin();
  });
});

},{"../package/dist/index.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _tackjs = require('tackjs');

var _tarry = require('tarry.js');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Popover = function () {
  function Popover(_ref) {
    var target = _ref.target,
        _ref$popover = _ref.popover,
        popover = _ref$popover === undefined ? null : _ref$popover,
        _ref$position = _ref.position,
        position = _ref$position === undefined ? 'bottom' : _ref$position,
        _ref$transitionSpeed = _ref.transitionSpeed,
        transitionSpeed = _ref$transitionSpeed === undefined ? 200 : _ref$transitionSpeed;

    _classCallCheck(this, Popover);

    this.target = target;
    this.popover = this.createPopover(popover);
    this.position = position;
    this.transitionSpeed = transitionSpeed;

    this.state = {
      pinned: false,
      busy: false
    };

    this.pin = this.pin.bind(this);
    this.unpin = this.unpin.bind(this);
    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
    this.isExternalClick = this.isExternalClick.bind(this);
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
      this.setState({
        busy: false
      });
    }
  }, {
    key: 'pin',
    value: function pin() {
      var _this = this;

      if (this.state.busy || this.state.pinned) return;

      this.setState({
        busy: true
      });

      var render = (0, _tarry.tarry)(function () {
        return document.body.appendChild(_this.popover);
      });
      var pin = (0, _tarry.tarry)(function () {
        return (0, _tackjs.tack)(_this.popover, _this.target, _this.position);
      });
      var show = (0, _tarry.tarry)(function () {
        return _this.popover.classList.add('is-visible');
      });
      var done = (0, _tarry.tarry)(function () {
        return _this.setState({
          busy: false,
          pinned: true
        });
      });

      (0, _tarry.queue)(render, pin, show(0), done)();

      this.popover.addEventListener('mouseenter', this.block);
      this.popover.addEventListener('mouseleave', this.unblock);
      document.addEventListener('click', this.isExternalClick);
    }
  }, {
    key: 'unpin',
    value: function unpin() {
      var _this2 = this;

      (0, _tarry.tarry)(function () {
        if (_this2.state.busy || !_this2.state.pinned) return;

        _this2.setState({
          busy: true
        });

        _this2.popover.removeEventListener('mouseenter', _this2.block);
        _this2.popover.removeEventListener('mouseleave', _this2.unblock);
        document.removeEventListener('click', _this2.isExternalClick);

        var hide = (0, _tarry.tarry)(function () {
          return _this2.popover.classList.add('is-hiding');
        });
        var remove = (0, _tarry.tarry)(function () {
          return document.body.removeChild(_this2.popover);
        });
        var done = (0, _tarry.tarry)(function () {
          _this2.popover.classList.remove('is-hiding');
          _this2.popover.classList.remove('is-visible');
          _this2.setState({
            busy: false,
            pinned: false
          });
        });

        (0, _tarry.queue)(hide, remove(_this2.transitionSpeed), done)();
      }, 0)();
    }
  }, {
    key: 'isExternalClick',
    value: function isExternalClick(e) {
      if (e.target !== this.popover && !this.popover.contains(e.target)) {
        this.unpin();
      }
    }
  }, {
    key: 'createPopover',
    value: function createPopover(pop) {
      var popover = document.createElement('div');
      popover.id = 'popover';
      popover.className = 'popover';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIi4uL3BhY2thZ2UvZGlzdC9pbmRleC5qcyIsIi4uL3BhY2thZ2Uvbm9kZV9tb2R1bGVzL3RhY2tqcy9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9ub2RlX21vZHVsZXMvdGFycnkuanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxPQUFPLGdCQUFQLENBQXdCLGtCQUF4QixFQUE0QyxhQUFLO0FBQy9DLE1BQU0sT0FBTyxTQUFTLGNBQVQsQ0FBd0IsbUJBQXhCLENBQWI7QUFDQSxNQUFNLFVBQVUsb0JBQVk7QUFDMUIsWUFBUSxJQURrQjtBQUUxQiwyR0FGMEI7QUFPMUIsY0FBVTtBQVBnQixHQUFaLENBQWhCO0FBU0EsT0FBSyxnQkFBTCxDQUFzQixZQUF0QixFQUFvQyxhQUFLO0FBQ3ZDLFlBQVEsR0FBUjtBQUNELEdBRkQ7QUFHQSxPQUFLLGdCQUFMLENBQXNCLFlBQXRCLEVBQW9DLGFBQUs7QUFDdkMsWUFBUSxLQUFSO0FBQ0QsR0FGRDtBQUdBOzs7O0FBSUEsVUFBUSxPQUFSLENBQWdCLGdCQUFoQixDQUFpQyxZQUFqQyxFQUErQyxRQUFRLEtBQXZEOztBQUVBLE1BQU0sUUFBUSxTQUFTLGNBQVQsQ0FBd0Isb0JBQXhCLENBQWQ7QUFDQSxNQUFNLFdBQVcsb0JBQVk7QUFDM0IsWUFBUSxLQURtQjtBQUUzQiw2R0FGMkI7QUFPM0IsY0FBVTtBQVBpQixHQUFaLENBQWpCO0FBU0EsUUFBTSxnQkFBTixDQUF1QixZQUF2QixFQUFxQyxhQUFLO0FBQ3hDLGFBQVMsR0FBVDtBQUNELEdBRkQ7QUFHQSxRQUFNLGdCQUFOLENBQXVCLFlBQXZCLEVBQXFDLGFBQUs7QUFDeEMsYUFBUyxLQUFUO0FBQ0QsR0FGRDs7QUFJQSxNQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLGtCQUF4QixDQUFaO0FBQ0EsTUFBTSxTQUFTLG9CQUFZO0FBQ3pCLFlBQVEsR0FEaUI7QUFFekIseUdBRnlCO0FBT3pCLGNBQVU7QUFQZSxHQUFaLENBQWY7QUFTQSxNQUFJLGdCQUFKLENBQXFCLFlBQXJCLEVBQW1DLGFBQUs7QUFDdEMsV0FBTyxHQUFQO0FBQ0QsR0FGRDtBQUdBLE1BQUksZ0JBQUosQ0FBcUIsWUFBckIsRUFBbUMsYUFBSztBQUN0QyxXQUFPLEtBQVA7QUFDRCxHQUZEOztBQUlBLE1BQU0sU0FBUyxTQUFTLGNBQVQsQ0FBd0IscUJBQXhCLENBQWY7QUFDQSxNQUFNLFlBQVksb0JBQVk7QUFDNUIsWUFBUSxNQURvQjtBQUU1QiwrR0FGNEI7QUFPNUIsY0FBVTtBQVBrQixHQUFaLENBQWxCO0FBU0EsU0FBTyxnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxhQUFLO0FBQ3pDLGNBQVUsR0FBVjtBQUNELEdBRkQ7QUFHQSxTQUFPLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLGFBQUs7QUFDekMsY0FBVSxLQUFWO0FBQ0QsR0FGRDtBQUdELENBekVEOzs7QUNGQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3Qzs7QUFJQSxJQUFJLFdBQVcsT0FBTyxNQUFQLElBQWlCLFVBQVUsTUFBVixFQUFrQjtBQUFFLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxVQUFVLE1BQTlCLEVBQXNDLEdBQXRDLEVBQTJDO0FBQUUsUUFBSSxTQUFTLFVBQVUsQ0FBVixDQUFiLENBQTJCLEtBQUssSUFBSSxHQUFULElBQWdCLE1BQWhCLEVBQXdCO0FBQUUsVUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsTUFBckMsRUFBNkMsR0FBN0MsQ0FBSixFQUF1RDtBQUFFLGVBQU8sR0FBUCxJQUFjLE9BQU8sR0FBUCxDQUFkO0FBQTRCO0FBQUU7QUFBRSxHQUFDLE9BQU8sTUFBUDtBQUFnQixDQUFoUTs7QUFFQSxJQUFJLGVBQWUsWUFBWTtBQUFFLFdBQVMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0MsS0FBbEMsRUFBeUM7QUFBRSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUFFLFVBQUksYUFBYSxNQUFNLENBQU4sQ0FBakIsQ0FBMkIsV0FBVyxVQUFYLEdBQXdCLFdBQVcsVUFBWCxJQUF5QixLQUFqRCxDQUF3RCxXQUFXLFlBQVgsR0FBMEIsSUFBMUIsQ0FBZ0MsSUFBSSxXQUFXLFVBQWYsRUFBMkIsV0FBVyxRQUFYLEdBQXNCLElBQXRCLENBQTRCLE9BQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixXQUFXLEdBQXpDLEVBQThDLFVBQTlDO0FBQTREO0FBQUUsR0FBQyxPQUFPLFVBQVUsV0FBVixFQUF1QixVQUF2QixFQUFtQyxXQUFuQyxFQUFnRDtBQUFFLFFBQUksVUFBSixFQUFnQixpQkFBaUIsWUFBWSxTQUE3QixFQUF3QyxVQUF4QyxFQUFxRCxJQUFJLFdBQUosRUFBaUIsaUJBQWlCLFdBQWpCLEVBQThCLFdBQTlCLEVBQTRDLE9BQU8sV0FBUDtBQUFxQixHQUFoTjtBQUFtTixDQUE5aEIsRUFBbkI7O0FBRUEsSUFBSSxVQUFVLFFBQVEsUUFBUixDQUFkOztBQUVBLElBQUksU0FBUyxRQUFRLFVBQVIsQ0FBYjs7QUFFQSxTQUFTLGVBQVQsQ0FBeUIsUUFBekIsRUFBbUMsV0FBbkMsRUFBZ0Q7QUFBRSxNQUFJLEVBQUUsb0JBQW9CLFdBQXRCLENBQUosRUFBd0M7QUFBRSxVQUFNLElBQUksU0FBSixDQUFjLG1DQUFkLENBQU47QUFBMkQ7QUFBRTs7QUFFekosSUFBSSxVQUFVLFlBQVk7QUFDeEIsV0FBUyxPQUFULENBQWlCLElBQWpCLEVBQXVCO0FBQ3JCLFFBQUksU0FBUyxLQUFLLE1BQWxCO0FBQUEsUUFDSSxlQUFlLEtBQUssT0FEeEI7QUFBQSxRQUVJLFVBQVUsaUJBQWlCLFNBQWpCLEdBQTZCLElBQTdCLEdBQW9DLFlBRmxEO0FBQUEsUUFHSSxnQkFBZ0IsS0FBSyxRQUh6QjtBQUFBLFFBSUksV0FBVyxrQkFBa0IsU0FBbEIsR0FBOEIsUUFBOUIsR0FBeUMsYUFKeEQ7QUFBQSxRQUtJLHVCQUF1QixLQUFLLGVBTGhDO0FBQUEsUUFNSSxrQkFBa0IseUJBQXlCLFNBQXpCLEdBQXFDLEdBQXJDLEdBQTJDLG9CQU5qRTs7QUFRQSxvQkFBZ0IsSUFBaEIsRUFBc0IsT0FBdEI7O0FBRUEsU0FBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLFNBQUssT0FBTCxHQUFlLEtBQUssYUFBTCxDQUFtQixPQUFuQixDQUFmO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsU0FBSyxlQUFMLEdBQXVCLGVBQXZCOztBQUVBLFNBQUssS0FBTCxHQUFhO0FBQ1gsY0FBUSxLQURHO0FBRVgsWUFBTTtBQUZLLEtBQWI7O0FBS0EsU0FBSyxHQUFMLEdBQVcsS0FBSyxHQUFMLENBQVMsSUFBVCxDQUFjLElBQWQsQ0FBWDtBQUNBLFNBQUssS0FBTCxHQUFhLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBYjtBQUNBLFNBQUssS0FBTCxHQUFhLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBYjtBQUNBLFNBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBZjtBQUNBLFNBQUssZUFBTCxHQUF1QixLQUFLLGVBQUwsQ0FBcUIsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBdkI7QUFDRDs7QUFFRCxlQUFhLE9BQWIsRUFBc0IsQ0FBQztBQUNyQixTQUFLLFVBRGdCO0FBRXJCLFdBQU8sU0FBUyxRQUFULENBQWtCLEtBQWxCLEVBQXlCLEVBQXpCLEVBQTZCO0FBQ2xDLFdBQUssS0FBTCxHQUFhLFNBQVMsRUFBVCxFQUFhLEtBQUssS0FBbEIsRUFBeUIsS0FBekIsQ0FBYjs7QUFFQSxZQUFNLENBQUMsR0FBRyxPQUFPLEtBQVgsRUFBa0IsRUFBbEIsRUFBc0IsQ0FBdEIsR0FBTjtBQUNEO0FBTm9CLEdBQUQsRUFPbkI7QUFDRCxTQUFLLE9BREo7QUFFRCxXQUFPLFNBQVMsS0FBVCxHQUFpQjtBQUN0QixXQUFLLFFBQUwsQ0FBYztBQUNaLGNBQU07QUFETSxPQUFkO0FBR0Q7QUFOQSxHQVBtQixFQWNuQjtBQUNELFNBQUssU0FESjtBQUVELFdBQU8sU0FBUyxPQUFULEdBQW1CO0FBQ3hCLFdBQUssUUFBTCxDQUFjO0FBQ1osY0FBTTtBQURNLE9BQWQ7QUFHRDtBQU5BLEdBZG1CLEVBcUJuQjtBQUNELFNBQUssS0FESjtBQUVELFdBQU8sU0FBUyxHQUFULEdBQWU7QUFDcEIsVUFBSSxRQUFRLElBQVo7O0FBRUEsVUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLElBQW1CLEtBQUssS0FBTCxDQUFXLE1BQWxDLEVBQTBDOztBQUUxQyxXQUFLLFFBQUwsQ0FBYztBQUNaLGNBQU07QUFETSxPQUFkOztBQUlBLFVBQUksU0FBUyxDQUFDLEdBQUcsT0FBTyxLQUFYLEVBQWtCLFlBQVk7QUFDekMsZUFBTyxTQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE1BQU0sT0FBaEMsQ0FBUDtBQUNELE9BRlksQ0FBYjtBQUdBLFVBQUksTUFBTSxDQUFDLEdBQUcsT0FBTyxLQUFYLEVBQWtCLFlBQVk7QUFDdEMsZUFBTyxDQUFDLEdBQUcsUUFBUSxJQUFaLEVBQWtCLE1BQU0sT0FBeEIsRUFBaUMsTUFBTSxNQUF2QyxFQUErQyxNQUFNLFFBQXJELENBQVA7QUFDRCxPQUZTLENBQVY7QUFHQSxVQUFJLE9BQU8sQ0FBQyxHQUFHLE9BQU8sS0FBWCxFQUFrQixZQUFZO0FBQ3ZDLGVBQU8sTUFBTSxPQUFOLENBQWMsU0FBZCxDQUF3QixHQUF4QixDQUE0QixZQUE1QixDQUFQO0FBQ0QsT0FGVSxDQUFYO0FBR0EsVUFBSSxPQUFPLENBQUMsR0FBRyxPQUFPLEtBQVgsRUFBa0IsWUFBWTtBQUN2QyxlQUFPLE1BQU0sUUFBTixDQUFlO0FBQ3BCLGdCQUFNLEtBRGM7QUFFcEIsa0JBQVE7QUFGWSxTQUFmLENBQVA7QUFJRCxPQUxVLENBQVg7O0FBT0EsT0FBQyxHQUFHLE9BQU8sS0FBWCxFQUFrQixNQUFsQixFQUEwQixHQUExQixFQUErQixLQUFLLENBQUwsQ0FBL0IsRUFBd0MsSUFBeEM7O0FBRUEsV0FBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsWUFBOUIsRUFBNEMsS0FBSyxLQUFqRDtBQUNBLFdBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLFlBQTlCLEVBQTRDLEtBQUssT0FBakQ7QUFDQSxlQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEtBQUssZUFBeEM7QUFDRDtBQWhDQSxHQXJCbUIsRUFzRG5CO0FBQ0QsU0FBSyxPQURKO0FBRUQsV0FBTyxTQUFTLEtBQVQsR0FBaUI7QUFDdEIsVUFBSSxTQUFTLElBQWI7O0FBRUEsT0FBQyxHQUFHLE9BQU8sS0FBWCxFQUFrQixZQUFZO0FBQzVCLFlBQUksT0FBTyxLQUFQLENBQWEsSUFBYixJQUFxQixDQUFDLE9BQU8sS0FBUCxDQUFhLE1BQXZDLEVBQStDOztBQUUvQyxlQUFPLFFBQVAsQ0FBZ0I7QUFDZCxnQkFBTTtBQURRLFNBQWhCOztBQUlBLGVBQU8sT0FBUCxDQUFlLG1CQUFmLENBQW1DLFlBQW5DLEVBQWlELE9BQU8sS0FBeEQ7QUFDQSxlQUFPLE9BQVAsQ0FBZSxtQkFBZixDQUFtQyxZQUFuQyxFQUFpRCxPQUFPLE9BQXhEO0FBQ0EsaUJBQVMsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsT0FBTyxlQUE3Qzs7QUFFQSxZQUFJLE9BQU8sQ0FBQyxHQUFHLE9BQU8sS0FBWCxFQUFrQixZQUFZO0FBQ3ZDLGlCQUFPLE9BQU8sT0FBUCxDQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsV0FBN0IsQ0FBUDtBQUNELFNBRlUsQ0FBWDtBQUdBLFlBQUksU0FBUyxDQUFDLEdBQUcsT0FBTyxLQUFYLEVBQWtCLFlBQVk7QUFDekMsaUJBQU8sU0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixPQUFPLE9BQWpDLENBQVA7QUFDRCxTQUZZLENBQWI7QUFHQSxZQUFJLE9BQU8sQ0FBQyxHQUFHLE9BQU8sS0FBWCxFQUFrQixZQUFZO0FBQ3ZDLGlCQUFPLE9BQVAsQ0FBZSxTQUFmLENBQXlCLE1BQXpCLENBQWdDLFdBQWhDO0FBQ0EsaUJBQU8sT0FBUCxDQUFlLFNBQWYsQ0FBeUIsTUFBekIsQ0FBZ0MsWUFBaEM7QUFDQSxpQkFBTyxRQUFQLENBQWdCO0FBQ2Qsa0JBQU0sS0FEUTtBQUVkLG9CQUFRO0FBRk0sV0FBaEI7QUFJRCxTQVBVLENBQVg7O0FBU0EsU0FBQyxHQUFHLE9BQU8sS0FBWCxFQUFrQixJQUFsQixFQUF3QixPQUFPLE9BQU8sZUFBZCxDQUF4QixFQUF3RCxJQUF4RDtBQUNELE9BM0JELEVBMkJHLENBM0JIO0FBNEJEO0FBakNBLEdBdERtQixFQXdGbkI7QUFDRCxTQUFLLGlCQURKO0FBRUQsV0FBTyxTQUFTLGVBQVQsQ0FBeUIsQ0FBekIsRUFBNEI7QUFDakMsVUFBSSxFQUFFLE1BQUYsS0FBYSxLQUFLLE9BQWxCLElBQTZCLENBQUMsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixFQUFFLE1BQXhCLENBQWxDLEVBQW1FO0FBQ2pFLGFBQUssS0FBTDtBQUNEO0FBQ0Y7QUFOQSxHQXhGbUIsRUErRm5CO0FBQ0QsU0FBSyxlQURKO0FBRUQsV0FBTyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsRUFBNEI7QUFDakMsVUFBSSxVQUFVLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFkO0FBQ0EsY0FBUSxFQUFSLEdBQWEsU0FBYjtBQUNBLGNBQVEsU0FBUixHQUFvQixTQUFwQjs7QUFFQSxhQUFPLEdBQVAsS0FBZSxRQUFmLEdBQTBCLFFBQVEsU0FBUixHQUFvQixHQUE5QyxHQUFvRCxRQUFRLFdBQVIsQ0FBb0IsR0FBcEIsQ0FBcEQ7O0FBRUEsYUFBTyxPQUFQO0FBQ0Q7QUFWQSxHQS9GbUIsQ0FBdEI7O0FBNEdBLFNBQU8sT0FBUDtBQUNELENBMUlhLEVBQWQ7O0FBNElBLFFBQVEsT0FBUixHQUFrQixPQUFsQjs7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFBvcG92ZXIgZnJvbSAnLi4vcGFja2FnZS9kaXN0L2luZGV4LmpzJ1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGUgPT4ge1xuICBjb25zdCBsZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcG92ZXJQYXJlbnRMZWZ0JylcbiAgY29uc3QgcG9wTGVmdCA9IG5ldyBQb3BvdmVyKHtcbiAgICB0YXJnZXQ6IGxlZnQsXG4gICAgcG9wb3ZlcjogYFxuICAgICAgPGRpdiBjbGFzcz1cIm15LXBvcG92ZXIgbGVmdFwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJtdjBcIj5MZWZ0PC9oNT5cbiAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcG9zaXRpb246ICdsZWZ0J1xuICB9KVxuICBsZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlID0+IHtcbiAgICBwb3BMZWZ0LnBpbigpXG4gIH0pXG4gIGxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGUgPT4ge1xuICAgIHBvcExlZnQudW5waW4oKVxuICB9KVxuICAvKipcbiAgICogTWFrZSBzdXJlIGl0IGNsb3NlcyBvbiBtb3VzZWxlYXZlLFxuICAgKiB1bmxpa2Ugb3RoZXJzXG4gICAqL1xuICBwb3BMZWZ0LnBvcG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHBvcExlZnQudW5waW4pXG5cbiAgY29uc3QgcmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wb3ZlclBhcmVudFJpZ2h0JylcbiAgY29uc3QgcG9wUmlnaHQgPSBuZXcgUG9wb3Zlcih7XG4gICAgdGFyZ2V0OiByaWdodCxcbiAgICBwb3BvdmVyOiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibXktcG9wb3ZlciByaWdodFwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJtdjBcIj5SaWdodDwvaDU+XG4gICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHBvc2l0aW9uOiAncmlnaHQnXG4gIH0pXG4gIHJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlID0+IHtcbiAgICBwb3BSaWdodC5waW4oKVxuICB9KVxuICByaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZSA9PiB7XG4gICAgcG9wUmlnaHQudW5waW4oKVxuICB9KVxuXG4gIGNvbnN0IHRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3BvdmVyUGFyZW50VG9wJylcbiAgY29uc3QgcG9wVG9wID0gbmV3IFBvcG92ZXIoe1xuICAgIHRhcmdldDogdG9wLFxuICAgIHBvcG92ZXI6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJteS1wb3BvdmVyIHRvcFwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJtdjBcIj5Ub3A8L2g1PlxuICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwb3NpdGlvbjogJ3RvcCdcbiAgfSlcbiAgdG9wLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlID0+IHtcbiAgICBwb3BUb3AucGluKClcbiAgfSlcbiAgdG9wLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBlID0+IHtcbiAgICBwb3BUb3AudW5waW4oKVxuICB9KVxuXG4gIGNvbnN0IGJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3BvdmVyUGFyZW50Qm90dG9tJylcbiAgY29uc3QgcG9wQm90dG9tID0gbmV3IFBvcG92ZXIoe1xuICAgIHRhcmdldDogYm90dG9tLFxuICAgIHBvcG92ZXI6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJteS1wb3BvdmVyIGJvdHRvbVwiPlxuICAgICAgICA8aDUgY2xhc3M9XCJtdjBcIj5Cb3R0b208L2g1PlxuICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwb3NpdGlvbjogJ2JvdHRvbSdcbiAgfSlcbiAgYm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlID0+IHtcbiAgICBwb3BCb3R0b20ucGluKClcbiAgfSlcbiAgYm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBlID0+IHtcbiAgICBwb3BCb3R0b20udW5waW4oKVxuICB9KVxufSlcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF90YWNranMgPSByZXF1aXJlKCd0YWNranMnKTtcblxudmFyIF90YXJyeSA9IHJlcXVpcmUoJ3RhcnJ5LmpzJyk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBQb3BvdmVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQb3BvdmVyKF9yZWYpIHtcbiAgICB2YXIgdGFyZ2V0ID0gX3JlZi50YXJnZXQsXG4gICAgICAgIF9yZWYkcG9wb3ZlciA9IF9yZWYucG9wb3ZlcixcbiAgICAgICAgcG9wb3ZlciA9IF9yZWYkcG9wb3ZlciA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZWYkcG9wb3ZlcixcbiAgICAgICAgX3JlZiRwb3NpdGlvbiA9IF9yZWYucG9zaXRpb24sXG4gICAgICAgIHBvc2l0aW9uID0gX3JlZiRwb3NpdGlvbiA9PT0gdW5kZWZpbmVkID8gJ2JvdHRvbScgOiBfcmVmJHBvc2l0aW9uLFxuICAgICAgICBfcmVmJHRyYW5zaXRpb25TcGVlZCA9IF9yZWYudHJhbnNpdGlvblNwZWVkLFxuICAgICAgICB0cmFuc2l0aW9uU3BlZWQgPSBfcmVmJHRyYW5zaXRpb25TcGVlZCA9PT0gdW5kZWZpbmVkID8gMjAwIDogX3JlZiR0cmFuc2l0aW9uU3BlZWQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUG9wb3Zlcik7XG5cbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLnBvcG92ZXIgPSB0aGlzLmNyZWF0ZVBvcG92ZXIocG9wb3Zlcik7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMudHJhbnNpdGlvblNwZWVkID0gdHJhbnNpdGlvblNwZWVkO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBpbm5lZDogZmFsc2UsXG4gICAgICBidXN5OiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLnBpbiA9IHRoaXMucGluLmJpbmQodGhpcyk7XG4gICAgdGhpcy51bnBpbiA9IHRoaXMudW5waW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLmJsb2NrID0gdGhpcy5ibG9jay5iaW5kKHRoaXMpO1xuICAgIHRoaXMudW5ibG9jayA9IHRoaXMudW5ibG9jay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaXNFeHRlcm5hbENsaWNrID0gdGhpcy5pc0V4dGVybmFsQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQb3BvdmVyLCBbe1xuICAgIGtleTogJ3NldFN0YXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGUsIGNiKSB7XG4gICAgICB0aGlzLnN0YXRlID0gX2V4dGVuZHMoe30sIHRoaXMuc3RhdGUsIHN0YXRlKTtcblxuICAgICAgY2IgJiYgKDAsIF90YXJyeS50YXJyeSkoY2IsIDApKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYmxvY2snLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBibG9jaygpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBidXN5OiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1bmJsb2NrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5ibG9jaygpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBidXN5OiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncGluJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGluKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuc3RhdGUuYnVzeSB8fCB0aGlzLnN0YXRlLnBpbm5lZCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYnVzeTogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIHZhciByZW5kZXIgPSAoMCwgX3RhcnJ5LnRhcnJ5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKF90aGlzLnBvcG92ZXIpO1xuICAgICAgfSk7XG4gICAgICB2YXIgcGluID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKDAsIF90YWNranMudGFjaykoX3RoaXMucG9wb3ZlciwgX3RoaXMudGFyZ2V0LCBfdGhpcy5wb3NpdGlvbik7XG4gICAgICB9KTtcbiAgICAgIHZhciBzaG93ID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMucG9wb3Zlci5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XG4gICAgICB9KTtcbiAgICAgIHZhciBkb25lID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGJ1c3k6IGZhbHNlLFxuICAgICAgICAgIHBpbm5lZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAoMCwgX3RhcnJ5LnF1ZXVlKShyZW5kZXIsIHBpbiwgc2hvdygwKSwgZG9uZSkoKTtcblxuICAgICAgdGhpcy5wb3BvdmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLmJsb2NrKTtcbiAgICAgIHRoaXMucG9wb3Zlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy51bmJsb2NrKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5pc0V4dGVybmFsQ2xpY2spO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VucGluJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5waW4oKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3RoaXMyLnN0YXRlLmJ1c3kgfHwgIV90aGlzMi5zdGF0ZS5waW5uZWQpIHJldHVybjtcblxuICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgIGJ1c3k6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMyLnBvcG92ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIF90aGlzMi5ibG9jayk7XG4gICAgICAgIF90aGlzMi5wb3BvdmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBfdGhpczIudW5ibG9jayk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3RoaXMyLmlzRXh0ZXJuYWxDbGljayk7XG5cbiAgICAgICAgdmFyIGhpZGUgPSAoMCwgX3RhcnJ5LnRhcnJ5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5wb3BvdmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGluZycpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHJlbW92ZSA9ICgwLCBfdGFycnkudGFycnkpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChfdGhpczIucG9wb3Zlcik7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZG9uZSA9ICgwLCBfdGFycnkudGFycnkpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpczIucG9wb3Zlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRpbmcnKTtcbiAgICAgICAgICBfdGhpczIucG9wb3Zlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGJ1c3k6IGZhbHNlLFxuICAgICAgICAgICAgcGlubmVkOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAoMCwgX3RhcnJ5LnF1ZXVlKShoaWRlLCByZW1vdmUoX3RoaXMyLnRyYW5zaXRpb25TcGVlZCksIGRvbmUpKCk7XG4gICAgICB9LCAwKSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2lzRXh0ZXJuYWxDbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRXh0ZXJuYWxDbGljayhlKSB7XG4gICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMucG9wb3ZlciAmJiAhdGhpcy5wb3BvdmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICB0aGlzLnVucGluKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlUG9wb3ZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVBvcG92ZXIocG9wKSB7XG4gICAgICB2YXIgcG9wb3ZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcG9wb3Zlci5pZCA9ICdwb3BvdmVyJztcbiAgICAgIHBvcG92ZXIuY2xhc3NOYW1lID0gJ3BvcG92ZXInO1xuXG4gICAgICB0eXBlb2YgcG9wID09PSAnc3RyaW5nJyA/IHBvcG92ZXIuaW5uZXJIVE1MID0gcG9wIDogcG9wb3Zlci5hcHBlbmRDaGlsZChwb3ApO1xuXG4gICAgICByZXR1cm4gcG9wb3ZlcjtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUG9wb3Zlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUG9wb3ZlcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgZ2V0Q29vcmRzID0gZXhwb3J0cy5nZXRDb29yZHMgPSBmdW5jdGlvbiBnZXRDb29yZHMoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkZ2V0Qm91bmRpbmdDID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGwgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MubGVmdCxcbiAgICAgIHIgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MucmlnaHQsXG4gICAgICB0ID0gX2VsZW1lbnQkZ2V0Qm91bmRpbmdDLnRvcCxcbiAgICAgIGIgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MuYm90dG9tO1xuXG4gIHZhciBfd2luZG93ID0gd2luZG93LFxuICAgICAgeSA9IF93aW5kb3cucGFnZVlPZmZzZXQ7XG5cblxuICByZXR1cm4ge1xuICAgIGhlaWdodDogYiAtIHQsXG4gICAgd2lkdGg6IHIgLSBsLFxuICAgIHRvcDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiBsICsgKHIgLSBsKSAvIDJcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiBsICsgKHIgLSBsKSAvIDJcbiAgICB9LFxuICAgIGxlZnQ6IHtcbiAgICAgIHk6IHQgKyAoYiAtIHQpIC8gMixcbiAgICAgIHg6IGxcbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICB5OiB0ICsgKGIgLSB0KSAvIDIsXG4gICAgICB4OiByXG4gICAgfSxcbiAgICB0b3BMZWZ0OiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IGxcbiAgICB9LFxuICAgIGJvdHRvbUxlZnQ6IHtcbiAgICAgIHk6IHkgKyBiLFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgdG9wUmlnaHQ6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogclxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgIHk6IHkgKyBiLFxuICAgICAgeDogclxuICAgIH1cbiAgfTtcbn07XG5cbnZhciBwb3NpdGlvbiA9IGV4cG9ydHMucG9zaXRpb24gPSBmdW5jdGlvbiBwb3NpdGlvbih0YXJnZXQsIHNjb3BlLCBwbGFjZW1lbnQpIHtcbiAgdmFyIGMgPSBnZXRDb29yZHMoc2NvcGUpW3BsYWNlbWVudF07XG4gIHZhciBlID0gZ2V0Q29vcmRzKHRhcmdldCk7XG4gIHZhciBfd2luZG93MiA9IHdpbmRvdyxcbiAgICAgIHkgPSBfd2luZG93Mi5wYWdlWU9mZnNldDtcblxuXG4gIHZhciB2cCA9IHtcbiAgICB0b3A6IHksXG4gICAgYm90dG9tOiB5ICsgd2luZG93LmlubmVySGVpZ2h0LFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IHdpbmRvdy5pbm5lcldpZHRoXG4gIH07XG5cbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgdG9wOiB7XG4gICAgICB4OiBlLndpZHRoIC8gMixcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIHg6IGUud2lkdGggLyAyLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IGUuaGVpZ2h0IC8gMlxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiBlLmhlaWdodCAvIDJcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgIHg6IGUud2lkdGgsXG4gICAgICB5OiBlLmhlaWdodFxuICAgIH0sXG4gICAgdG9wUmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiBlLmhlaWdodFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIGJvdHRvbVJpZ2h0OiB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH1cbiAgfTtcblxuICB2YXIgcG9zeCA9IGMueCAtIG9mZnNldHNbcGxhY2VtZW50XS54O1xuICB2YXIgcG9zeSA9IGMueSAtIG9mZnNldHNbcGxhY2VtZW50XS55O1xuXG4gIGlmIChwb3N4IDwgdnAubGVmdCkge1xuICAgIHBvc3ggPSB2cC5sZWZ0O1xuICB9IGVsc2UgaWYgKHBvc3ggKyBlLndpZHRoID4gdnAucmlnaHQpIHtcbiAgICBwb3N4ID0gdnAucmlnaHQgLSBlLndpZHRoO1xuICB9XG5cbiAgaWYgKHBvc3kgPCB2cC50b3ApIHtcbiAgICBwb3N5ID0gdnAudG9wO1xuICB9IGVsc2UgaWYgKHBvc3kgKyBlLmhlaWdodCA+IHZwLmJvdHRvbSkge1xuICAgIHBvc3kgPSB2cC5ib3R0b20gLSBlLmhlaWdodDtcbiAgfVxuXG4gIHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgcG9zeCArICdweCkgdHJhbnNsYXRlWSgnICsgcG9zeSArICdweCknO1xufTtcblxudmFyIHRhY2sgPSBleHBvcnRzLnRhY2sgPSBmdW5jdGlvbiB0YWNrKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCkge1xuICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtdGFja2VkJyk7XG4gIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCk7XG5cbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCk7XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXRhY2tlZCcpO1xuICAgIH1cbiAgfTtcbn07IiwiZnVuY3Rpb24gbmV4dChhcmdzKXtcbiAgYXJncy5sZW5ndGggPiAwICYmIGFyZ3Muc2hpZnQoKS5hcHBseSh0aGlzLCBhcmdzKVxufVxuXG5mdW5jdGlvbiBydW4oY2IsIGFyZ3Mpe1xuICBjYigpXG4gIG5leHQoYXJncylcbn1cblxuZnVuY3Rpb24gdGFycnkoY2IsIGRlbGF5KXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICB2YXIgb3ZlcnJpZGUgPSBhcmdzWzBdXG4gICAgXG4gICAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygb3ZlcnJpZGUpe1xuICAgICAgcmV0dXJuIHRhcnJ5KGNiLCBvdmVycmlkZSlcbiAgICB9XG4gICAgXG4gICAgJ251bWJlcicgPT09IHR5cGVvZiBkZWxheSA/IChcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgcnVuKGNiLCBhcmdzKVxuICAgICAgfSwgZGVsYXkpIFxuICAgICkgOiAoXG4gICAgICBydW4oY2IsIGFyZ3MpXG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXVlKCl7XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gIHJldHVybiB0YXJyeShmdW5jdGlvbigpe1xuICAgIG5leHQoYXJncy5zbGljZSgwKSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0ge1xuICB0YXJyeTogdGFycnksXG4gIHF1ZXVlOiBxdWV1ZVxufVxuIl19
