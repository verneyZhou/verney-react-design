"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("../../_virtual/jsx-runtime.js");
const classNames = require("classnames");
const require$$0 = require("react");
const reactIntersectionObserver = require("react-intersection-observer");
;/* empty css            */
const Waterfall = ({
  dataSource = [],
  columns = 2,
  gutter = 16,
  defaultItemHeight = 200,
  enableAnimation = true,
  animationDuration = 300,
  animationEasing = "ease-out",
  renderItem,
  className,
  style,
  loading = false,
  hasMore = true,
  onLoadMore,
  loadingComponent = "加载中...",
  noMoreComponent = "没有更多了"
}) => {
  const containerRef = require$$0.useRef(null);
  const [columnHeights, setColumnHeights] = require$$0.useState([]);
  const [renderedItems, setRenderedItems] = require$$0.useState([]);
  const [pendingData, setPendingData] = require$$0.useState([]);
  const heightsMapRef = require$$0.useRef(/* @__PURE__ */ new Map());
  const processingRef = require$$0.useRef(false);
  const loadingRef = require$$0.useRef(loading);
  const loadMoreTimeoutRef = require$$0.useRef(
    null
  );
  const renderedIndexesRef = require$$0.useRef(/* @__PURE__ */ new Set());
  const taskQueueRef = require$$0.useRef({
    tasks: [],
    isProcessing: false
  });
  const addTask = require$$0.useCallback((task) => {
    taskQueueRef.current.tasks.push(task);
    if (!taskQueueRef.current.isProcessing) {
      processNextTask();
    }
  }, []);
  const processNextTask = require$$0.useCallback(async () => {
    if (taskQueueRef.current.isProcessing || taskQueueRef.current.tasks.length === 0) {
      return;
    }
    taskQueueRef.current.isProcessing = true;
    const currentTask = taskQueueRef.current.tasks[0];
    try {
      await currentTask();
      taskQueueRef.current.tasks.shift();
      taskQueueRef.current.isProcessing = false;
      if (taskQueueRef.current.tasks.length > 0) {
        processNextTask();
      }
    } catch (error) {
      console.error("Task execution failed:", error);
      taskQueueRef.current.isProcessing = false;
    }
  }, []);
  const createDataProcessTask = require$$0.useCallback((data) => {
    return async () => {
      const newData = data.filter(
        (_, index) => !renderedIndexesRef.current.has(index)
      );
      if (newData.length > 0) {
        setPendingData((prev) => [...prev, ...newData]);
      }
      return new Promise((resolve) => {
        const checkComplete = () => {
          const allItemsProcessed = renderedIndexesRef.current.size === data.length;
          if (allItemsProcessed) {
            resolve();
          } else {
            setTimeout(checkComplete, 100);
          }
        };
        checkComplete();
      });
    };
  }, []);
  const debouncedLoadMore = require$$0.useCallback(() => {
    if (loadMoreTimeoutRef.current) {
      clearTimeout(loadMoreTimeoutRef.current);
    }
    loadMoreTimeoutRef.current = setTimeout(() => {
      if (!loadingRef.current && hasMore && onLoadMore && !taskQueueRef.current.isProcessing) {
        const loadMoreTask = async () => {
          loadingRef.current = true;
          await onLoadMore();
        };
        addTask(loadMoreTask);
      }
    }, 200);
  }, [hasMore, onLoadMore, addTask]);
  require$$0.useEffect(() => {
    if (columnHeights.length !== columns) {
      setColumnHeights(new Array(columns).fill(0));
      setRenderedItems(new Array(columns).fill(0).map(() => []));
      renderedIndexesRef.current.clear();
      heightsMapRef.current.clear();
    }
    const processTask = createDataProcessTask(dataSource);
    addTask(processTask);
  }, [
    columns,
    dataSource,
    createDataProcessTask,
    addTask,
    columnHeights.length
  ]);
  require$$0.useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  const { ref: loadMoreRef, inView: loadMoreInView } = reactIntersectionObserver.useInView({
    threshold: 1,
    // 改为1，表示完全可见时才触发
    rootMargin: "0px"
    // 改为0px，不再提前触发
  });
  require$$0.useEffect(() => {
    console.log("loadMoreInView", loadMoreInView);
    if (loadMoreInView) {
      debouncedLoadMore();
    }
    return () => {
      if (loadMoreTimeoutRef.current) {
        clearTimeout(loadMoreTimeoutRef.current);
      }
    };
  }, [loadMoreInView, debouncedLoadMore]);
  const getMinHeightColumn = require$$0.useCallback(() => {
    const minHeight = Math.min(...columnHeights);
    return columnHeights.indexOf(minHeight);
  }, [columnHeights]);
  const updateColumnHeight = require$$0.useCallback(
    (index, height, columnIndex) => {
      if (heightsMapRef.current.get(index) === height) return;
      const oldHeight = heightsMapRef.current.get(index) || 0;
      heightsMapRef.current.set(index, height);
      renderedIndexesRef.current.add(index);
      setColumnHeights((prev) => {
        const newHeights = [...prev];
        newHeights[columnIndex] = newHeights[columnIndex] - oldHeight + height;
        return newHeights;
      });
      processingRef.current = false;
    },
    []
  );
  const processNextItem = require$$0.useCallback(() => {
    if (processingRef.current || pendingData.length === 0) return;
    processingRef.current = true;
    const columnIndex = getMinHeightColumn();
    if (columnIndex > -1) {
      const [nextItem, ...rest] = pendingData;
      const currentIndex = dataSource.indexOf(nextItem);
      if (renderedIndexesRef.current.has(currentIndex)) {
        setPendingData(rest);
        processingRef.current = false;
        return;
      }
      setPendingData(rest);
      setRenderedItems((prev) => {
        const newItems = [...prev];
        newItems[columnIndex] = [
          ...newItems[columnIndex],
          /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx(
            WaterfallItem,
            {
              item: nextItem,
              index: currentIndex,
              columnIndex,
              gutter,
              defaultItemHeight,
              enableAnimation,
              animationDuration,
              animationEasing,
              renderItem,
              updateColumnHeight
            },
            currentIndex
          )
        ];
        return newItems;
      });
    }
  }, [
    pendingData,
    columnHeights,
    gutter,
    renderItem,
    dataSource,
    getMinHeightColumn,
    defaultItemHeight,
    updateColumnHeight,
    enableAnimation,
    animationDuration,
    animationEasing
  ]);
  require$$0.useEffect(() => {
    if (!processingRef.current) {
      processNextItem();
    }
  }, [processNextItem, pendingData, processingRef.current]);
  return /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: classNames("verney-waterfall", className),
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gutter,
        ...style
      },
      children: [
        renderedItems.map((column, index) => /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("div", { className: "verney-waterfall-column", children: column }, index)),
        /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx(
          "div",
          {
            ref: loadMoreRef,
            className: "verney-waterfall-loader",
            style: {
              width: "100%",
              pointerEvents: "none"
            },
            children: loading ? loadingComponent : !hasMore && noMoreComponent
          }
        )
      ]
    }
  );
};
Waterfall.displayName = "Waterfall";
const WaterfallItem = require$$0.memo(({
  item,
  index,
  columnIndex,
  gutter,
  defaultItemHeight,
  enableAnimation = true,
  animationDuration = 300,
  animationEasing = "ease-out",
  updateColumnHeight,
  renderItem
}) => {
  const itemRef = require$$0.useRef(null);
  const [isLoaded, setIsLoaded] = require$$0.useState(false);
  const [isVisible, setIsVisible] = require$$0.useState(false);
  const timeoutRef = require$$0.useRef(null);
  const hasUpdatedRef = require$$0.useRef(false);
  const updateHeight = require$$0.useCallback(() => {
    if (!hasUpdatedRef.current && itemRef.current) {
      hasUpdatedRef.current = true;
      const height = itemRef.current.offsetHeight;
      if (height > 0) {
        updateColumnHeight(index, height, columnIndex);
        if (enableAnimation) {
          setTimeout(() => setIsVisible(true), 50);
        } else {
          setIsVisible(true);
        }
      }
    }
  }, [index, columnIndex, updateColumnHeight, enableAnimation]);
  require$$0.useEffect(() => {
    if (!itemRef.current) return;
    const images = itemRef.current.getElementsByTagName("img");
    timeoutRef.current = setTimeout(() => {
      if (!hasUpdatedRef.current && itemRef.current) {
        updateHeight();
      }
    }, 200);
    if (images.length === 0) {
      updateHeight();
      return;
    }
    let loadedImages = 0;
    const totalImages = images.length;
    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === totalImages && itemRef.current) {
        setIsLoaded(true);
        updateHeight();
      }
    };
    Array.from(images).forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      Array.from(images).forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, [index, columnIndex, defaultItemHeight, updateHeight]);
  return /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx(
    "div",
    {
      ref: itemRef,
      className: "verney-waterfall-item",
      style: {
        marginBottom: gutter,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(20px)",
        transition: enableAnimation ? `opacity ${animationDuration}ms ${animationEasing}, transform ${animationDuration}ms ${animationEasing}` : "none"
      },
      children: renderItem == null ? void 0 : renderItem(item, index)
    }
  );
});
exports.Waterfall = Waterfall;
//# sourceMappingURL=waterfall.js.map
