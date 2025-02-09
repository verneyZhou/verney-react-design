import { j as jsxRuntimeExports } from "../../skip/_virtual/jsx-runtime.mjs";
import classNames from "classnames";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
/* empty css            */
const VirtualList = ({
  items,
  height,
  columnCount = 1,
  mode = "list",
  estimatedItemHeight = 50,
  overscan = 3,
  loadMoreThreshold = 100,
  onLoadMore,
  renderItem,
  isLoading = false,
  className
}) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [resizeCount, setResizeCount] = useState(0);
  const measuredDataRef = useRef({
    measuredDataMap: {},
    lastMeasuredItemIndex: -1
  });
  const columnHeights = useRef([]);
  useEffect(() => {
    columnHeights.current = new Array(columnCount).fill(0);
  }, [columnCount]);
  useEffect(() => {
    measuredDataRef.current = {
      measuredDataMap: {},
      lastMeasuredItemIndex: -1
    };
    columnHeights.current = new Array(columnCount).fill(0);
    setResizeCount((c) => c + 1);
  }, [items, columnCount]);
  const estimateTotalHeight = useCallback(() => {
    const { measuredDataMap, lastMeasuredItemIndex } = measuredDataRef.current;
    let measuredHeight = 0;
    let estimatedHeight = 0;
    if (lastMeasuredItemIndex >= 0) {
      const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
      measuredHeight = lastMeasuredItem.offset + lastMeasuredItem.size;
    }
    const unmeasuredItemsCount = items.length - (lastMeasuredItemIndex + 1);
    estimatedHeight = measuredHeight + unmeasuredItemsCount * estimatedItemHeight;
    return estimatedHeight;
  }, [items.length, estimatedItemHeight]);
  const getItemMetadata = useCallback(
    (index) => {
      const { measuredDataMap, lastMeasuredItemIndex } = measuredDataRef.current;
      if (index > lastMeasuredItemIndex) {
        if (mode === "waterfall") {
          const minHeight = Math.min(...columnHeights.current);
          const columnIndex = columnHeights.current.indexOf(minHeight);
          const size = estimatedItemHeight;
          const offset = minHeight;
          measuredDataMap[index] = {
            size,
            offset,
            column: columnIndex
          };
          columnHeights.current[columnIndex] = offset + size;
        } else {
          let offset = 0;
          if (lastMeasuredItemIndex >= 0) {
            const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
            offset = lastMeasuredItem.offset + lastMeasuredItem.size;
          }
          measuredDataMap[index] = {
            size: estimatedItemHeight,
            offset,
            column: 0
          };
        }
        measuredDataRef.current.lastMeasuredItemIndex = index;
      }
      return measuredDataMap[index] || {
        size: estimatedItemHeight,
        offset: 0,
        column: 0
      };
    },
    [estimatedItemHeight, mode, columnCount]
  );
  const getVisibleRange = useCallback(() => {
    var _a;
    if (!containerRef.current) return { start: 0, end: 0 };
    const { clientHeight, scrollTop: scrollTop2 } = containerRef.current;
    const { measuredDataMap } = measuredDataRef.current;
    let start = 0;
    let end = items.length - 1;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const metadata = getItemMetadata(mid);
      if (!metadata) {
        start = mid + 1;
        continue;
      }
      if (typeof metadata.offset === "undefined") {
        start = mid + 1;
        continue;
      }
      if (metadata.offset < scrollTop2) {
        if (metadata.offset + metadata.size > scrollTop2) {
          start = mid;
          break;
        }
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    let endIndex = start;
    let currentOffset = ((_a = measuredDataMap[start]) == null ? void 0 : _a.offset) || 0;
    while (endIndex < items.length && currentOffset < scrollTop2 + clientHeight) {
      const metadata = getItemMetadata(endIndex);
      currentOffset = metadata.offset + metadata.size;
      endIndex++;
    }
    const startIndex = Math.max(0, start - overscan);
    endIndex = Math.min(items.length - 1, endIndex + overscan);
    return {
      start: startIndex,
      end: endIndex
    };
  }, [items.length, overscan, getItemMetadata]);
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop: scrollTop2, scrollHeight, clientHeight } = containerRef.current;
    setScrollTop(scrollTop2);
    if (onLoadMore && !isLoading && scrollHeight - scrollTop2 - clientHeight < loadMoreThreshold) {
      onLoadMore();
    }
  }, [onLoadMore, isLoading, loadMoreThreshold]);
  const visibleContent = useMemo(() => {
    const visibleRange = getVisibleRange();
    const start = visibleRange ? visibleRange.start : 0;
    const end = visibleRange ? visibleRange.end : 0;
    const visibleItems = [];
    for (let i = start; i <= end; i++) {
      const itemMetadata = getItemMetadata(i);
      const item = items[i];
      if (!item) continue;
      const itemStyle = mode === "waterfall" ? {
        width: `${100 / columnCount}%`,
        position: "absolute",
        left: `${((itemMetadata == null ? void 0 : itemMetadata.column) || 0) * 100 / columnCount}%`,
        top: `${(itemMetadata == null ? void 0 : itemMetadata.offset) || 0}px`,
        padding: "8px",
        boxSizing: "border-box"
      } : {
        position: "absolute",
        left: 0,
        right: 0,
        top: `${(itemMetadata == null ? void 0 : itemMetadata.offset) || 0}px`,
        padding: "8px",
        boxSizing: "border-box"
      };
      visibleItems.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: classNames("verney-virtual-list-item", {
              "verney-virtual-list-item-waterfall": mode === "waterfall"
            }),
            "data-index": i,
            style: itemStyle,
            children: renderItem(item, i)
          },
          i
        )
      );
    }
    return visibleItems;
  }, [
    items,
    scrollTop,
    resizeCount,
    columnCount,
    mode,
    renderItem,
    getItemMetadata,
    getVisibleRange
  ]);
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      let needsUpdate = false;
      entries.forEach((entry) => {
        var _a;
        const index = Number(entry.target.getAttribute("data-index"));
        if (!isNaN(index)) {
          const oldSize = ((_a = measuredDataRef.current.measuredDataMap[index]) == null ? void 0 : _a.size) || 0;
          const newSize = entry.contentRect.height;
          if (oldSize !== newSize) {
            const metadata = measuredDataRef.current.measuredDataMap[index];
            metadata.size = newSize;
            if (mode === "waterfall" && metadata.column !== void 0) {
              columnHeights.current[metadata.column] += newSize - oldSize;
            } else {
              for (let i = index + 1; i <= measuredDataRef.current.lastMeasuredItemIndex; i++) {
                const item = measuredDataRef.current.measuredDataMap[i];
                if (item) {
                  item.offset += newSize - oldSize;
                }
              }
            }
            needsUpdate = true;
          }
        }
      });
      if (needsUpdate) {
        setResizeCount((c) => c + 1);
      }
    });
    const items2 = containerRef.current.getElementsByClassName(
      "verney-virtual-list-item"
    );
    Array.from(items2).forEach((item) => {
      resizeObserver.observe(item);
    });
    return () => {
      resizeObserver.disconnect();
    };
  }, [scrollTop, mode]);
  const totalHeight = estimateTotalHeight();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "verney-virtual-list", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: classNames(
        "verney-virtual-list-container",
        className
      ),
      style: { height, width: "100%" },
      onScroll: handleScroll,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "verney-virtual-list-content",
            style: { height: totalHeight, width: "100%" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: classNames("verney-virtual-list-items", {
                  "verney-virtual-list-items-waterfall": mode === "waterfall"
                }),
                style: { width: "100%", position: "relative" },
                children: visibleContent
              }
            )
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "verney-virtual-list-loading", children: "加载中..." })
      ]
    }
  ) });
};
export {
  VirtualList
};
//# sourceMappingURL=virtual-list.mjs.map
