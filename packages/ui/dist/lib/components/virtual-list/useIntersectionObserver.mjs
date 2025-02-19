"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const require$$0 = require("react");
const useIntersectionObserver = (nodes, onVisibilityChange, onEntryUpdate, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };
  const observerRef = require$$0.useRef(null);
  const intersectingStates = require$$0.useRef(/* @__PURE__ */ new Map());
  const memoizedOptions = require$$0.useMemo(() => ({ ...defaultOptions, ...options }), [options]);
  const memoizedOnVisibilityChange = require$$0.useCallback(onVisibilityChange ?? (() => {
  }), [
    onVisibilityChange
  ]);
  const memoizedOnEntryUpdate = require$$0.useCallback(() => {
  }, [onEntryUpdate]);
  require$$0.useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        memoizedOnEntryUpdate(entry);
        const prevIntersecting = intersectingStates.current.get(entry.target);
        const currIntersecting = entry.isIntersecting;
        if (prevIntersecting !== currIntersecting) {
          intersectingStates.current.set(entry.target, currIntersecting);
          memoizedOnVisibilityChange(currIntersecting, entry);
        }
      });
    }, memoizedOptions);
    {
      nodes.forEach((node) => {
        var _a;
        if (node) {
          (_a = observerRef.current) == null ? void 0 : _a.observe(node);
        }
      });
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    nodes,
    memoizedOptions,
    memoizedOnVisibilityChange,
    memoizedOnEntryUpdate,
    intersectingStates
  ]);
  const observe = require$$0.useCallback((node) => {
    if (observerRef.current && node) {
      observerRef.current.observe(node);
    }
  }, []);
  const unobserve = require$$0.useCallback((node) => {
    if (observerRef.current && node) {
      observerRef.current.unobserve(node);
    }
  }, []);
  return { observe, unobserve };
};
exports.default = useIntersectionObserver;
//# sourceMappingURL=useIntersectionObserver.mjs.map
