import { j as jsxRuntimeExports } from "../../skip/_virtual/jsx-runtime.mjs";
import classNames from "classnames";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
/* empty css            */
import VirtualListItem from "./virtual-list-item.mjs";
import { throttle, scrollToOffset, getRangeToRender, getItemMetaData, getOffset } from "./util.mjs";
import useIntersectionObserver from "./useIntersectionObserver.mjs";
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
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [measuredData, setMeasuredData] = useState({
    measuredDataMap: {},
    lastMeasuredItemIndex: -1
  });
  useEffect(() => {
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
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = throttle((evt) => {
      const offset = getOffset(props, containerRef);
      setScrollOffset(offset);
      onScroll == null ? void 0 : onScroll(evt);
    }, 50);
    if (props.presetOffset) {
      setTimeout(() => {
        scrollToOffset(props, containerRef);
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
  useEffect(() => {
    if (scrollOffset - topThreshold <= 0 && onScrollTop) {
      onScrollTop();
    }
  }, [scrollOffset]);
  const handleLoadMore = useCallback(
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
  useIntersectionObserver([loadMoreRef.current], handleLoadMore, null, {
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
  const getCurrentChildren = useCallback(() => {
    const [startIndex, endIndex] = getRangeToRender(props, scrollOffset, measuredData);
    const items = [];
    for (let index = startIndex; index <= endIndex; index++) {
      const itemKey = uniqueKey ? sourceList[index][uniqueKey] : index;
      items.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          VirtualListItem,
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
  const totalHeight = useMemo(() => {
    const { lastMeasuredItemIndex, measuredDataMap } = measuredData;
    if (lastMeasuredItemIndex >= 0) {
      const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
      return lastMeasuredItem.offset + lastMeasuredItem.height;
    } else {
      return 0;
    }
  }, [measuredData]);
  const wrapperClassName = useMemo(() => {
    return classNames("verney-virtual-list__wrapper", wrapperClass);
  }, [wrapperClass]);
  const wrapperStyleMemo = useMemo(() => {
    return {
      ...wrapperStyle,
      height: pageMode ? "auto" : visibleHeight,
      overflow: pageMode ? "visible" : "auto",
      position: "relative"
    };
  }, [wrapperStyle, visibleHeight, pageMode]);
  const contentContainerStyle = useMemo(() => {
    var _a;
    let loadMoreheight = 0;
    if (loadMoreRef) {
      loadMoreheight = ((_a = loadMoreRef == null ? void 0 : loadMoreRef.current) == null ? void 0 : _a.clientHeight) || 0;
    }
    return {
      height: totalHeight + loadMoreheight
    };
  }, [totalHeight]);
  const translateContainerStyle = useMemo(() => {
    const [startIndex] = getRangeToRender(props, scrollOffset, measuredData);
    const startItem = getItemMetaData(measuredData, startIndex);
    return {
      transform: `translateY(${startItem.offset}px) translateZ(0)`
    };
  }, [scrollOffset, measuredData]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: wrapperClassName, style: wrapperStyleMemo, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "verney-virtual-content", style: contentContainerStyle, role: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: translateContainerStyle, className: "verney-virtual-translate", children: [
    getCurrentChildren(),
    sourceList.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: loadMoreRef, className: "verney-virtual-loadmore", children: renderLoadMore ? renderLoadMore(loading, hasMore) : isShowLoadMore ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "verney-virtual-loadmore__text", children: loading ? "加载中..." : hasMore ? "加载更多" : "没有更多了~" }) : null }) : null
  ] }) }) });
};
export {
  VirtualList
};
//# sourceMappingURL=virtual-list.mjs.map
