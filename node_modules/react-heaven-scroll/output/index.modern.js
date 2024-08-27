import React, { useContext, useRef, useCallback, useEffect } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var Heaven = React.createContext();
var clamp = function clamp(value) {
  return Math.max(Math.min(value, 1), 0);
};
var useHeaven = function useHeaven() {
  return useContext(Heaven);
};
var HeavenScroll = function HeavenScroll(_ref) {
  var children = _ref.children,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    _ref$resetHeight = _ref.resetHeight,
    resetHeight = _ref$resetHeight === void 0 ? [] : _ref$resetHeight,
    _ref$disable = _ref.disable,
    disable = _ref$disable === void 0 ? false : _ref$disable,
    _ref$velocity = _ref.velocity,
    velocity = _ref$velocity === void 0 ? 0.1 : _ref$velocity,
    _ref$rootId = _ref.rootId,
    rootId = _ref$rootId === void 0 ? 'root' : _ref$rootId;
  var scrollableContainerRef = useRef(null);
  var SCROLL_ID = useRef(null);
  var _useRef = useRef({
      velocity: clamp(velocity),
      current: 0,
      previous: 0,
      requestScrollEvent: 0
    }),
    config = _useRef.current;
  var _useRef2 = useRef({
      delta: 0,
      scroll: 0
    }),
    heaven = _useRef2.current;
  var setScrollerHeight = function setScrollerHeight() {
    var _scrollableContainerR = scrollableContainerRef.current.getBoundingClientRect(),
      height = _scrollableContainerR.height;
    document.getElementById(rootId).style.height = height + "px";
  };
  useResizeObserver(scrollableContainerRef, setScrollerHeight);
  var smoothScrollingHandler = useCallback(function () {
    config.current = window.scrollY;
    var DELTA_SCROLL = (config.current - config.previous) * config.velocity;
    config.previous += DELTA_SCROLL;
    if (Math.abs(config.current - config.previous) < 0.05) {
      config.previous = config.current;
      config.requestScrollEvent = 0;
    }
    heaven.delta = DELTA_SCROLL;
    heaven.scroll = config.previous + DELTA_SCROLL;
    scrollableContainerRef.current.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -" + config.previous + ", 0, 1)";
    SCROLL_ID.current = config.requestScrollEvent > 0 ? requestAnimationFrame(smoothScrollingHandler) : null;
  }, [SCROLL_ID]);
  var scrollHandler = useCallback(function () {
    config.requestScrollEvent++;
    if (!SCROLL_ID.current) SCROLL_ID.current = requestAnimationFrame(smoothScrollingHandler);
  }, [SCROLL_ID, smoothScrollingHandler]);
  useEffect(function () {
    if (disable) return;
    window.addEventListener('scroll', scrollHandler);
    return function () {
      return window.removeEventListener('scroll', scrollHandler);
    };
  }, [disable, scrollHandler]);
  useEffect(function () {
    if (disable) return;
    setScrollerHeight();
    return function () {
      return document.getElementById('root').removeAttribute('style');
    };
  }, [disable].concat(resetHeight));
  return disable ? children : /*#__PURE__*/React.createElement(Heaven.Provider, {
    value: heaven
  }, /*#__PURE__*/React.createElement("div", {
    style: _extends({
      position: 'fixed',
      overflow: 'hidden',
      height: '100%',
      width: '100%'
    }, style)
  }, /*#__PURE__*/React.createElement("main", {
    id: "scrollableContainer",
    ref: scrollableContainerRef,
    style: {
      willChange: "transform"
    }
  }, children)));
};

export default HeavenScroll;
export { useHeaven };
//# sourceMappingURL=index.modern.js.map
