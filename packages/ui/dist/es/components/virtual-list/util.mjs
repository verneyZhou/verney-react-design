const getItemMetaData = (measuredData2, index) => {
  const { measuredDataMap, lastMeasuredItemIndex } = measuredData2;
  return measuredDataMap[index] || { height: 0, offset: 0 };
};
const getStartIndex = (props, scrollOffset, measuredData2) => {
  const { data } = props;
  const itemCount = data.length;
  let index = 0;
  while (true) {
    const currentOffset = getItemMetaData(measuredData2, index).offset;
    if (currentOffset >= scrollOffset) return index;
    if (index >= itemCount) return itemCount;
    index++;
  }
};
const getEndIndex = (props, startIndex, measuredData2) => {
  const { visibleHeight = 400, data, pageMode, pageModeVisibleSize = 20 } = props;
  if (pageMode) {
    return Math.min(startIndex + pageModeVisibleSize - 1, data.length - 1);
  }
  const startItem = getItemMetaData(measuredData2, startIndex);
  const maxOffset = startItem.offset + visibleHeight;
  let offset = startItem.offset + startItem.height;
  let endIndex = startIndex;
  while (offset <= maxOffset && endIndex < data.length - 1) {
    endIndex++;
    const currentItem = getItemMetaData(measuredData2, endIndex);
    offset += currentItem.height;
  }
  return endIndex;
};
const getRangeToRender = (props, scrollOffset, measuredData2) => {
  const { data = [], bufferSize = 3 } = props;
  const startIndex = getStartIndex(props, scrollOffset, measuredData2);
  const endIndex = getEndIndex(props, startIndex, measuredData2);
  return [
    Math.max(0, startIndex - bufferSize),
    // 预留bufferSize的空间
    Math.min(data.length - 1, endIndex + bufferSize),
    startIndex,
    endIndex
  ];
};
function getOffset(props, containerRef) {
  var _a;
  if (props.pageMode) {
    return document.documentElement.scrollTop || document.body.scrollTop;
  } else {
    return (containerRef == null ? void 0 : containerRef.current) ? (_a = containerRef == null ? void 0 : containerRef.current) == null ? void 0 : _a.scrollTop : 0;
  }
}
function scrollToOffset(props, containerRef) {
  const { pageMode, presetOffset = 0 } = props;
  if (!presetOffset) return;
  if (pageMode) {
    document.body.scrollTop = presetOffset;
    document.documentElement.scrollTop = presetOffset;
  } else if (containerRef == null ? void 0 : containerRef.current) {
    containerRef.current.scrollTop = presetOffset;
  }
}
const throttle = (func, delay) => {
  let lastTime = 0;
  console.log("====throttle");
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      func(...args);
    }
  };
};
export {
  getEndIndex,
  getItemMetaData,
  getOffset,
  getRangeToRender,
  getStartIndex,
  scrollToOffset,
  throttle
};
//# sourceMappingURL=util.mjs.map
