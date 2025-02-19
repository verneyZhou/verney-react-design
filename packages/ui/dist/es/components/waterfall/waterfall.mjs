import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime.mjs";
import classNames from "classnames";
import require$$0, { useRef, useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
/* empty css            */
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
  const containerRef = useRef(null);
  const [columnHeights, setColumnHeights] = useState([]);
  const [renderedItems, setRenderedItems] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const heightsMapRef = useRef(/* @__PURE__ */ new Map());
  const processingRef = useRef(false);
  const loadingRef = useRef(loading);
  const loadMoreTimeoutRef = useRef(
    null
  );
  const renderedIndexesRef = useRef(/* @__PURE__ */ new Set());
  const taskQueueRef = useRef({
    tasks: [],
    isProcessing: false
  });
  const addTask = useCallback((task) => {
    taskQueueRef.current.tasks.push(task);
    if (!taskQueueRef.current.isProcessing) {
      processNextTask();
    }
  }, []);
  const processNextTask = useCallback(async () => {
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
  const createDataProcessTask = useCallback((data) => {
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
  const debouncedLoadMore = useCallback(() => {
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
  useEffect(() => {
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
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);
  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 1,
    // 改为1，表示完全可见时才触发
    rootMargin: "0px"
    // 改为0px，不再提前触发
  });
  useEffect(() => {
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
  const getMinHeightColumn = useCallback(() => {
    const minHeight = Math.min(...columnHeights);
    return columnHeights.indexOf(minHeight);
  }, [columnHeights]);
  const updateColumnHeight = useCallback(
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
  const processNextItem = useCallback(() => {
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  useEffect(() => {
    if (!processingRef.current) {
      processNextItem();
    }
  }, [processNextItem, pendingData, processingRef.current]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        renderedItems.map((column, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "verney-waterfall-column", children: column }, index)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const itemRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const hasUpdatedRef = useRef(false);
  const updateHeight = useCallback(() => {
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
  useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
export {
  Waterfall
};
//# sourceMappingURL=waterfall.mjs.map
