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

      var render = (0, _tarry.tarry)(function () {
        return document.body.appendChild(_this2.popover);
      });
      var pin = (0, _tarry.tarry)(function () {
        return (0, _tackjs.tack)(_this2.popover, _this2.target, _this2.position);
      });
      var show = (0, _tarry.tarry)(function () {
        return _this2.popover.classList.add('is-visible');
      });
      var done = (0, _tarry.tarry)(function () {
        return _this2.setState({
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
    value: function unpin(force) {
      var _this3 = this;

      this.setState({
        requestClose: true
      });

      (0, _tarry.tarry)(function () {
        if (!force && (_this3.state.busy || !_this3.state.pinned)) return;

        _this3.setState({
          busy: true
        });

        _this3.popover.removeEventListener('mouseenter', _this3.block);
        _this3.popover.removeEventListener('mouseleave', _this3.unblock);
        document.removeEventListener('click', _this3.isExternalClick);

        var hide = (0, _tarry.tarry)(function () {
          return _this3.popover.classList.add('is-hiding');
        });
        var remove = (0, _tarry.tarry)(function () {
          return document.body.removeChild(_this3.popover);
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

        (0, _tarry.queue)(hide, remove(_this3.transitionSpeed), done)();
      }, 0)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIi4uL3BhY2thZ2UvZGlzdC9pbmRleC5qcyIsIi4uL3BhY2thZ2Uvbm9kZV9tb2R1bGVzL3RhY2tqcy9kaXN0L2luZGV4LmpzIiwiLi4vcGFja2FnZS9ub2RlX21vZHVsZXMvdGFycnkuanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxPQUFPLGdCQUFQLENBQXdCLGtCQUF4QixFQUE0QyxhQUFLO0FBQy9DLE1BQU0sT0FBTyxTQUFTLGNBQVQsQ0FBd0IsbUJBQXhCLENBQWI7QUFDQSxNQUFNLFVBQVUsb0JBQVk7QUFDMUIsWUFBUSxJQURrQjtBQUUxQiwyR0FGMEI7QUFPMUIsY0FBVSxNQVBnQjtBQVExQixxQkFBaUI7QUFSUyxHQUFaLENBQWhCO0FBVUEsT0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixhQUFLO0FBQ2xDLFlBQVEsTUFBUjtBQUNELEdBRkQ7QUFHQTtBQUNBO0FBQ0E7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQyxDQXJFRDs7O0FDRkE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSSxXQUFXLE9BQU8sTUFBUCxJQUFpQixVQUFVLE1BQVYsRUFBa0I7QUFBRSxPQUFLLElBQUksSUFBSSxDQUFiLEVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBQb3BvdmVyIGZyb20gJy4uL3BhY2thZ2UvZGlzdC9pbmRleC5qcydcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBlID0+IHtcbiAgY29uc3QgbGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3BvdmVyUGFyZW50TGVmdCcpXG4gIGNvbnN0IHBvcExlZnQgPSBuZXcgUG9wb3Zlcih7XG4gICAgdGFyZ2V0OiBsZWZ0LFxuICAgIHBvcG92ZXI6IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJteS1wb3BvdmVyIGxlZnRcIj5cbiAgICAgICAgPGg1IGNsYXNzPVwibXYwXCI+TGVmdDwvaDU+XG4gICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHBvc2l0aW9uOiAnbGVmdCcsXG4gICAgdHJhbnNpdGlvblNwZWVkOiAyMDBcbiAgfSlcbiAgbGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIHBvcExlZnQudG9nZ2xlKClcbiAgfSlcbiAgLy8gbGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZSA9PiB7XG4gIC8vICAgcG9wTGVmdC51bnBpbigpXG4gIC8vIH0pXG5cbi8vICAgY29uc3QgcmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wb3ZlclBhcmVudFJpZ2h0Jylcbi8vICAgY29uc3QgcG9wUmlnaHQgPSBuZXcgUG9wb3Zlcih7XG4vLyAgICAgdGFyZ2V0OiByaWdodCxcbi8vICAgICBwb3BvdmVyOiBgXG4vLyAgICAgICA8ZGl2IGNsYXNzPVwibXktcG9wb3ZlciByaWdodFwiPlxuLy8gICAgICAgICA8aDUgY2xhc3M9XCJtdjBcIj5SaWdodDwvaDU+XG4vLyAgICAgICA8L2Rpdj5cbi8vICAgICBgLFxuLy8gICAgIHBvc2l0aW9uOiAncmlnaHQnXG4vLyAgIH0pXG4vLyAgIHJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlID0+IHtcbi8vICAgICBwb3BSaWdodC5waW4oKVxuLy8gICB9KVxuLy8gICByaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZSA9PiB7XG4vLyAgICAgcG9wUmlnaHQudW5waW4oKVxuLy8gICB9KVxuXG4vLyAgIGNvbnN0IHRvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3BvdmVyUGFyZW50VG9wJylcbi8vICAgY29uc3QgcG9wVG9wID0gbmV3IFBvcG92ZXIoe1xuLy8gICAgIHRhcmdldDogdG9wLFxuLy8gICAgIHBvcG92ZXI6IGBcbi8vICAgICAgIDxkaXYgY2xhc3M9XCJteS1wb3BvdmVyIHRvcFwiPlxuLy8gICAgICAgICA8aDUgY2xhc3M9XCJtdjBcIj5Ub3A8L2g1PlxuLy8gICAgICAgPC9kaXY+XG4vLyAgICAgYCxcbi8vICAgICBwb3NpdGlvbjogJ3RvcCdcbi8vICAgfSlcbi8vICAgdG9wLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlID0+IHtcbi8vICAgICBwb3BUb3AucGluKClcbi8vICAgfSlcbi8vICAgdG9wLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBlID0+IHtcbi8vICAgICBwb3BUb3AudW5waW4oKVxuLy8gICB9KVxuXG4vLyAgIGNvbnN0IGJvdHRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3BvdmVyUGFyZW50Qm90dG9tJylcbi8vICAgY29uc3QgcG9wQm90dG9tID0gbmV3IFBvcG92ZXIoe1xuLy8gICAgIHRhcmdldDogYm90dG9tLFxuLy8gICAgIHBvcG92ZXI6IGBcbi8vICAgICAgIDxkaXYgY2xhc3M9XCJteS1wb3BvdmVyIGJvdHRvbVwiPlxuLy8gICAgICAgICA8aDUgY2xhc3M9XCJtdjBcIj5Cb3R0b208L2g1PlxuLy8gICAgICAgPC9kaXY+XG4vLyAgICAgYCxcbi8vICAgICBwb3NpdGlvbjogJ2JvdHRvbSdcbi8vICAgfSlcbi8vICAgYm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBlID0+IHtcbi8vICAgICBwb3BCb3R0b20ucGluKClcbi8vICAgfSlcbi8vICAgYm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBlID0+IHtcbi8vICAgICBwb3BCb3R0b20udW5waW4oKVxuLy8gICB9KVxufSlcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF90YWNranMgPSByZXF1aXJlKCd0YWNranMnKTtcblxudmFyIF90YXJyeSA9IHJlcXVpcmUoJ3RhcnJ5LmpzJyk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBQb3BvdmVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQb3BvdmVyKF9yZWYpIHtcbiAgICB2YXIgdGFyZ2V0ID0gX3JlZi50YXJnZXQsXG4gICAgICAgIF9yZWYkcG9wb3ZlciA9IF9yZWYucG9wb3ZlcixcbiAgICAgICAgcG9wb3ZlciA9IF9yZWYkcG9wb3ZlciA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZWYkcG9wb3ZlcixcbiAgICAgICAgX3JlZiRwb3NpdGlvbiA9IF9yZWYucG9zaXRpb24sXG4gICAgICAgIHBvc2l0aW9uID0gX3JlZiRwb3NpdGlvbiA9PT0gdW5kZWZpbmVkID8gJ2JvdHRvbScgOiBfcmVmJHBvc2l0aW9uLFxuICAgICAgICBfcmVmJHRyYW5zaXRpb25TcGVlZCA9IF9yZWYudHJhbnNpdGlvblNwZWVkLFxuICAgICAgICB0cmFuc2l0aW9uU3BlZWQgPSBfcmVmJHRyYW5zaXRpb25TcGVlZCA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYkdHJhbnNpdGlvblNwZWVkO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBvcG92ZXIpO1xuXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5wb3BvdmVyID0gdGhpcy5jcmVhdGVQb3BvdmVyKHBvcG92ZXIpO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnRyYW5zaXRpb25TcGVlZCA9IHRyYW5zaXRpb25TcGVlZDtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwaW5uZWQ6IGZhbHNlLFxuICAgICAgYnVzeTogZmFsc2UsXG4gICAgICByZXF1ZXN0Q2xvc2U6IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMucGluID0gdGhpcy5waW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnVucGluID0gdGhpcy51bnBpbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYmxvY2sgPSB0aGlzLmJsb2NrLmJpbmQodGhpcyk7XG4gICAgdGhpcy51bmJsb2NrID0gdGhpcy51bmJsb2NrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5pc0V4dGVybmFsQ2xpY2sgPSB0aGlzLmlzRXh0ZXJuYWxDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBvcG92ZXIsIFt7XG4gICAga2V5OiAnc2V0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSwgY2IpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBfZXh0ZW5kcyh7fSwgdGhpcy5zdGF0ZSwgc3RhdGUpO1xuXG4gICAgICBjYiAmJiAoMCwgX3RhcnJ5LnRhcnJ5KShjYiwgMCkoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdibG9jaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJsb2NrKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGJ1c3k6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VuYmxvY2snLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJsb2NrKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGJ1c3k6IGZhbHNlXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLnN0YXRlLnJlcXVlc3RDbG9zZSAmJiBfdGhpcy51bnBpbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndG9nZ2xlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgdGhpcy5zdGF0ZS5waW5uZWQgPyB0aGlzLnVucGluKCkgOiB0aGlzLnBpbigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3BpbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBpbigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5idXN5IHx8IHRoaXMuc3RhdGUucGlubmVkKSByZXR1cm47XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBidXN5OiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgdmFyIHJlbmRlciA9ICgwLCBfdGFycnkudGFycnkpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoX3RoaXMyLnBvcG92ZXIpO1xuICAgICAgfSk7XG4gICAgICB2YXIgcGluID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKDAsIF90YWNranMudGFjaykoX3RoaXMyLnBvcG92ZXIsIF90aGlzMi50YXJnZXQsIF90aGlzMi5wb3NpdGlvbik7XG4gICAgICB9KTtcbiAgICAgIHZhciBzaG93ID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLnBvcG92ZXIuY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xuICAgICAgfSk7XG4gICAgICB2YXIgZG9uZSA9ICgwLCBfdGFycnkudGFycnkpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5zZXRTdGF0ZSh7XG4gICAgICAgICAgYnVzeTogZmFsc2UsXG4gICAgICAgICAgcGlubmVkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgICgwLCBfdGFycnkucXVldWUpKHJlbmRlciwgcGluLCBzaG93KDApLCBkb25lKSgpO1xuXG4gICAgICB0aGlzLnBvcG92ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuYmxvY2spO1xuICAgICAgdGhpcy5wb3BvdmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnVuYmxvY2spO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmlzRXh0ZXJuYWxDbGljayk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndW5waW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bnBpbihmb3JjZSkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICByZXF1ZXN0Q2xvc2U6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICAoMCwgX3RhcnJ5LnRhcnJ5KShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZm9yY2UgJiYgKF90aGlzMy5zdGF0ZS5idXN5IHx8ICFfdGhpczMuc3RhdGUucGlubmVkKSkgcmV0dXJuO1xuXG4gICAgICAgIF90aGlzMy5zZXRTdGF0ZSh7XG4gICAgICAgICAgYnVzeTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBfdGhpczMucG9wb3Zlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgX3RoaXMzLmJsb2NrKTtcbiAgICAgICAgX3RoaXMzLnBvcG92ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIF90aGlzMy51bmJsb2NrKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfdGhpczMuaXNFeHRlcm5hbENsaWNrKTtcblxuICAgICAgICB2YXIgaGlkZSA9ICgwLCBfdGFycnkudGFycnkpKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMzLnBvcG92ZXIuY2xhc3NMaXN0LmFkZCgnaXMtaGlkaW5nJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcmVtb3ZlID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKF90aGlzMy5wb3BvdmVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBkb25lID0gKDAsIF90YXJyeS50YXJyeSkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzMy5wb3BvdmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGluZycpO1xuICAgICAgICAgIF90aGlzMy5wb3BvdmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICBfdGhpczMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYnVzeTogZmFsc2UsXG4gICAgICAgICAgICBwaW5uZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcmVxdWVzdENsb3NlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAoMCwgX3RhcnJ5LnF1ZXVlKShoaWRlLCByZW1vdmUoX3RoaXMzLnRyYW5zaXRpb25TcGVlZCksIGRvbmUpKCk7XG4gICAgICB9LCAwKSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2lzRXh0ZXJuYWxDbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRXh0ZXJuYWxDbGljayhlKSB7XG4gICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMucG9wb3ZlciAmJiAhdGhpcy5wb3BvdmVyLmNvbnRhaW5zKGUudGFyZ2V0KSAmJiBlLnRhcmdldCAhPT0gdGhpcy50YXJnZXQgJiYgIXRoaXMudGFyZ2V0LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICB0aGlzLnVucGluKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlUG9wb3ZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVBvcG92ZXIocG9wKSB7XG4gICAgICB2YXIgcG9wb3ZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcG9wb3Zlci5jbGFzc05hbWUgPSAnbWljcm8tcG9wb3Zlcic7XG5cbiAgICAgIHR5cGVvZiBwb3AgPT09ICdzdHJpbmcnID8gcG9wb3Zlci5pbm5lckhUTUwgPSBwb3AgOiBwb3BvdmVyLmFwcGVuZENoaWxkKHBvcCk7XG5cbiAgICAgIHJldHVybiBwb3BvdmVyO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQb3BvdmVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQb3BvdmVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBnZXRDb29yZHMgPSBleHBvcnRzLmdldENvb3JkcyA9IGZ1bmN0aW9uIGdldENvb3JkcyhlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRnZXRCb3VuZGluZ0MgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgbCA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5sZWZ0LFxuICAgICAgciA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5yaWdodCxcbiAgICAgIHQgPSBfZWxlbWVudCRnZXRCb3VuZGluZ0MudG9wLFxuICAgICAgYiA9IF9lbGVtZW50JGdldEJvdW5kaW5nQy5ib3R0b207XG5cbiAgdmFyIF93aW5kb3cgPSB3aW5kb3csXG4gICAgICB5ID0gX3dpbmRvdy5wYWdlWU9mZnNldDtcblxuXG4gIHJldHVybiB7XG4gICAgaGVpZ2h0OiBiIC0gdCxcbiAgICB3aWR0aDogciAtIGwsXG4gICAgdG9wOiB7XG4gICAgICB5OiB5ICsgdCxcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB5OiB5ICsgYixcbiAgICAgIHg6IGwgKyAociAtIGwpIC8gMlxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgeTogdCArIChiIC0gdCkgLyAyLFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIHk6IHQgKyAoYiAtIHQpIC8gMixcbiAgICAgIHg6IHJcbiAgICB9LFxuICAgIHRvcExlZnQ6IHtcbiAgICAgIHk6IHkgKyB0LFxuICAgICAgeDogbFxuICAgIH0sXG4gICAgYm90dG9tTGVmdDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiBsXG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeTogeSArIHQsXG4gICAgICB4OiByXG4gICAgfSxcbiAgICBib3R0b21SaWdodDoge1xuICAgICAgeTogeSArIGIsXG4gICAgICB4OiByXG4gICAgfVxuICB9O1xufTtcblxudmFyIHBvc2l0aW9uID0gZXhwb3J0cy5wb3NpdGlvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uKHRhcmdldCwgc2NvcGUsIHBsYWNlbWVudCkge1xuICB2YXIgYyA9IGdldENvb3JkcyhzY29wZSlbcGxhY2VtZW50XTtcbiAgdmFyIGUgPSBnZXRDb29yZHModGFyZ2V0KTtcbiAgdmFyIF93aW5kb3cyID0gd2luZG93LFxuICAgICAgeSA9IF93aW5kb3cyLnBhZ2VZT2Zmc2V0O1xuXG5cbiAgdmFyIHZwID0ge1xuICAgIHRvcDogeSxcbiAgICBib3R0b206IHkgKyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICByaWdodDogd2luZG93LmlubmVyV2lkdGhcbiAgfTtcblxuICB2YXIgb2Zmc2V0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHg6IGUud2lkdGggLyAyLFxuICAgICAgeTogZS5oZWlnaHRcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgeDogZS53aWR0aCAvIDIsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogZS5oZWlnaHQgLyAyXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0IC8gMlxuICAgIH0sXG4gICAgdG9wTGVmdDoge1xuICAgICAgeDogZS53aWR0aCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICB0b3BSaWdodDoge1xuICAgICAgeDogMCxcbiAgICAgIHk6IGUuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b21MZWZ0OiB7XG4gICAgICB4OiBlLndpZHRoLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgYm90dG9tUmlnaHQ6IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfVxuICB9O1xuXG4gIHZhciBwb3N4ID0gYy54IC0gb2Zmc2V0c1twbGFjZW1lbnRdLng7XG4gIHZhciBwb3N5ID0gYy55IC0gb2Zmc2V0c1twbGFjZW1lbnRdLnk7XG5cbiAgaWYgKHBvc3ggPCB2cC5sZWZ0KSB7XG4gICAgcG9zeCA9IHZwLmxlZnQ7XG4gIH0gZWxzZSBpZiAocG9zeCArIGUud2lkdGggPiB2cC5yaWdodCkge1xuICAgIHBvc3ggPSB2cC5yaWdodCAtIGUud2lkdGg7XG4gIH1cblxuICBpZiAocG9zeSA8IHZwLnRvcCkge1xuICAgIHBvc3kgPSB2cC50b3A7XG4gIH0gZWxzZSBpZiAocG9zeSArIGUuaGVpZ2h0ID4gdnAuYm90dG9tKSB7XG4gICAgcG9zeSA9IHZwLmJvdHRvbSAtIGUuaGVpZ2h0O1xuICB9XG5cbiAgdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBwb3N4ICsgJ3B4KSB0cmFuc2xhdGVZKCcgKyBwb3N5ICsgJ3B4KSc7XG59O1xuXG52YXIgdGFjayA9IGV4cG9ydHMudGFjayA9IGZ1bmN0aW9uIHRhY2sodGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KSB7XG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy10YWNrZWQnKTtcbiAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcblxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgcG9zaXRpb24odGFyZ2V0LCBzY29wZSwgcGxhY2VtZW50KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gJyc7XG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdGFja2VkJyk7XG4gICAgfVxuICB9O1xufTsiLCJmdW5jdGlvbiBuZXh0KGFyZ3Mpe1xuICBhcmdzLmxlbmd0aCA+IDAgJiYgYXJncy5zaGlmdCgpLmFwcGx5KHRoaXMsIGFyZ3MpXG59XG5cbmZ1bmN0aW9uIHJ1bihjYiwgYXJncyl7XG4gIGNiKClcbiAgbmV4dChhcmdzKVxufVxuXG5mdW5jdGlvbiB0YXJyeShjYiwgZGVsYXkpe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgIHZhciBvdmVycmlkZSA9IGFyZ3NbMF1cbiAgICBcbiAgICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBvdmVycmlkZSl7XG4gICAgICByZXR1cm4gdGFycnkoY2IsIG92ZXJyaWRlKVxuICAgIH1cbiAgICBcbiAgICAnbnVtYmVyJyA9PT0gdHlwZW9mIGRlbGF5ID8gKFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBydW4oY2IsIGFyZ3MpXG4gICAgICB9LCBkZWxheSkgXG4gICAgKSA6IChcbiAgICAgIHJ1bihjYiwgYXJncylcbiAgICApXG4gIH1cbn1cblxuZnVuY3Rpb24gcXVldWUoKXtcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgcmV0dXJuIHRhcnJ5KGZ1bmN0aW9uKCl7XG4gICAgbmV4dChhcmdzLnNsaWNlKDApKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSB7XG4gIHRhcnJ5OiB0YXJyeSxcbiAgcXVldWU6IHF1ZXVlXG59XG4iXX0=
