"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("../../_virtual/jsx-runtime.js");
const classNames = require("classnames");
const require$$0 = require("react");
;/* empty css            */
const virtualListItem = require("./virtual-list-item.js");
const util = require("./util.js");
const useIntersectionObserver = require("./useIntersectionObserver.js");
const VirtualList = (props) => {
  const {
    wrapperClass = "",
    wrapperStyle = {},
    uniqueKey,
    data: sourceList,
    itemEstimatedHeight = 50,
    pageMode = false,
    visibleHeight,
    renderItem,
    onLoadMore,
    hasMore = false,
    renderLoadMore,
    isShowLoadMore = true,
    itemWrapperClass = "",
    topThreshold = 0,
    onScrollTop,
    onScroll
  } = props;
  const [scrollOffset, setScrollOffset] = require$$0.useState(0);
  const containerRef = require$$0.useRef(null);
  const loadMoreRef = require$$0.useRef(null);
  const [loading, setLoading] = require$$0.useState(false);
  const [measuredData, setMeasuredData] = require$$0.useState({
    measuredDataMap: {},
    lastMeasuredItemIndex: -1
  });
  require$$0.useEffect(() => {
    setMeasuredData((prevData) => {
      const measuredDataMap = { ...prevData.measuredDataMap };
      let lastMeasuredItemIndex = prevData.lastMeasuredItemIndex;
      for (let i = 0; i < sourceList.length; i++) {
        if (measuredDataMap[i] === void 0) {
          const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex] || {};
          const offset = ((lastMeasuredItem == null ? void 0 : lastMeasuredItem.offset) || 0) + ((lastMeasuredItem == null ? void 0 : lastMeasuredItem.height) || 0);
          measuredDataMap[i] = { height: itemEstimatedHeight, offset };
          lastMeasuredItemIndex = i;
        }
      }
      return {
        measuredDataMap,
        lastMeasuredItemIndex
      };
    });
  }, [sourceList, itemEstimatedHeight]);
  require$$0.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = util.throttle((evt) => {
      const offset = util.getOffset(props, containerRef);
      setScrollOffset(offset);
      onScroll == null ? void 0 : onScroll(evt);
    }, 50);
    if (props.presetOffset) {
      setTimeout(() => {
        util.scrollToOffset(props, containerRef);
      }, 100);
    }
    if (pageMode) {
      document.addEventListener("scroll", handleScroll);
      return () => document.removeEventListener("scroll", handleScroll);
    } else {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [pageMode]);
  require$$0.useEffect(() => {
    if (scrollOffset - topThreshold <= 0 && onScrollTop) {
      onScrollTop();
    }
  }, [scrollOffset]);
  const handleLoadMore = require$$0.useCallback(
    (isVisible) => {
      if (isVisible && hasMore && !loading) {
        setLoading(true);
        onLoadMore == null ? void 0 : onLoadMore().finally(() => {
          setLoading(false);
        });
      }
    },
    [hasMore, onLoadMore, loading]
  );
  useIntersectionObserver.default([loadMoreRef.current], handleLoadMore, null, {
    root: null,
    rootMargin: "0px",
    threshold: 1
  });
  const sizeChangeHandle = (index, domNode) => {
    const height = (domNode == null ? void 0 : domNode.offsetHeight) || 0;
    setMeasuredData((prevData) => {
      const measuredDataMap = { ...prevData.measuredDataMap };
      const { lastMeasuredItemIndex } = prevData;
      const itemMetaData = measuredDataMap[index];
      if (itemMetaData.height === height) {
        return prevData;
      }
      itemMetaData.height = height;
      let offset = itemMetaData.offset + itemMetaData.height;
      for (let i = index + 1; i <= lastMeasuredItemIndex; i++) {
        const item = measuredDataMap[i];
        measuredDataMap[i] = {
          ...item,
          offset
        };
        offset += item.height;
      }
      return {
        measuredDataMap,
        lastMeasuredItemIndex
      };
    });
  };
  const getCurrentChildren = require$$0.useCallback(() => {
    const [startIndex, endIndex] = util.getRangeToRender(props, scrollOffset, measuredData);
    const items = [];
    for (let index = startIndex; index <= endIndex; index++) {
      const itemKey = uniqueKey ? sourceList[index][uniqueKey] : index;
      items.push(
        /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx(
          virtualListItem.default,
          {
            itemKey,
            index,
            itemWrapperClass,
            onSizeChange: sizeChangeHandle,
            children: renderItem(sourceList[index], index, sourceList)
          },
          itemKey
        )
      );
    }
    return items;
  }, [scrollOffset, renderItem]);
  const totalHeight = require$$0.useMemo(() => {
    const { lastMeasuredItemIndex, measuredDataMap } = measuredData;
    if (lastMeasuredItemIndex >= 0) {
      const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
      return lastMeasuredItem.offset + lastMeasuredItem.height;
    } else {
      return 0;
    }
  }, [measuredData]);
  const wrapperClassName = require$$0.useMemo(() => {
    return classNames("verney-virtual-list__wrapper", wrapperClass);
  }, [wrapperClass]);
  const wrapperStyleMemo = require$$0.useMemo(() => {
    return {
      ...wrapperStyle,
      height: pageMode ? "auto" : visibleHeight,
      overflow: pageMode ? "visible" : "auto",
      position: "relative"
    };
  }, [wrapperStyle, visibleHeight, pageMode]);
  const contentContainerStyle = require$$0.useMemo(() => {
    var _a;
    let loadMoreheight = 0;
    if (loadMoreRef) {
      loadMoreheight = ((_a = loadMoreRef == null ? void 0 : loadMoreRef.current) == null ? void 0 : _a.clientHeight) || 0;
    }
    return {
      height: totalHeight + loadMoreheight
    };
  }, [totalHeight]);
  const translateContainerStyle = require$$0.useMemo(() => {
    const [startIndex] = util.getRangeToRender(props, scrollOffset, measuredData);
    const startItem = util.getItemMetaData(measuredData, startIndex);
    return {
      transform: `translateY(${startItem.offset}px) translateZ(0)`
    };
  }, [scrollOffset, measuredData]);
  return /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("div", { ref: containerRef, className: wrapperClassName, style: wrapperStyleMemo, children: /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("div", { className: "verney-virtual-content", style: contentContainerStyle, role: "group", children: /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsxs("div", { style: translateContainerStyle, className: "verney-virtual-translate", children: [
    getCurrentChildren(),
    sourceList.length ? /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("div", { ref: loadMoreRef, className: "verney-virtual-loadmore", children: renderLoadMore ? renderLoadMore(loading, hasMore) : isShowLoadMore ? /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("div", { className: "verney-virtual-loadmore__text", children: loading ? "加载中..." : hasMore ? "加载更多" : "没有更多了~" }) : null }) : null
  ] }) }) });
};
exports.VirtualList = VirtualList;
//# sourceMappingURL=virtual-list.js.map
