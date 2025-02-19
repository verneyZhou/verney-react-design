import { useRef, useMemo, useCallback, useEffect } from "react";
const useIntersectionObserver = (nodes, onVisibilityChange, onEntryUpdate, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };
  const observerRef = useRef(null);
  const intersectingStates = useRef(/* @__PURE__ */ new Map());
  const memoizedOptions = useMemo(() => ({ ...defaultOptions, ...options }), [options]);
  const memoizedOnVisibilityChange = useCallback(onVisibilityChange ?? (() => {
  }), [
    onVisibilityChange
  ]);
  const memoizedOnEntryUpdate = useCallback(() => {
  }, [onEntryUpdate]);
  useEffect(() => {
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
  const observe = useCallback((node) => {
    if (observerRef.current && node) {
      observerRef.current.observe(node);
    }
  }, []);
  const unobserve = useCallback((node) => {
    if (observerRef.current && node) {
      observerRef.current.unobserve(node);
    }
  }, []);
  return { observe, unobserve };
};
export {
  useIntersectionObserver as default
};
//# sourceMappingURL=useIntersectionObserver.mjs.map
