import type { VirtualListProps, measuredDataProps } from './virtual-list';

// 元数据
export const measuredData = {
    measuredDataMap: {},
    lastMeasuredItemIndex: -1,
};

// 计算估计高度
export const estimatedHeight = (
    defaultEstimatedItemSize = 50,
    itemCount: number,
    measuredData: measuredDataProps,
) => {
    let measuredHeight = 0;
    const { measuredDataMap, lastMeasuredItemIndex } = measuredData;
    // 计算已经获取过真实高度的项的高度之和
    if (lastMeasuredItemIndex >= 0) {
        const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
        measuredHeight = lastMeasuredItem.offset + lastMeasuredItem.height;
    }
    // 未计算过真实高度的项数
    const unMeasuredItemsCount = itemCount - measuredData.lastMeasuredItemIndex - 1;
    // 预测总高度
    const totalEstimatedHeight = measuredHeight + unMeasuredItemsCount * defaultEstimatedItemSize;
    console.log('===totalEstimatedHeight', totalEstimatedHeight);
    return totalEstimatedHeight;
};

// 获取当前索引项的元数据信息
export const getItemMetaData = (measuredData: measuredDataProps, index: number) => {
    // const { itemEstimatedHeight = 50 } = props;
    const { measuredDataMap, lastMeasuredItemIndex } = measuredData;
    // 如果当前索引比已记录的索引要大，说明要计算当前索引的项的height和offset
    // if (index > lastMeasuredItemIndex) {
    //     let offset = 0;
    //     // 计算当前能计算出来的最大offset值
    //     if (lastMeasuredItemIndex >= 0) {
    //         const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
    //         offset += lastMeasuredItem.offset + lastMeasuredItem.height;
    //     }
    //     // 计算直到index为止，所有未计算过的项
    //     for (let i = lastMeasuredItemIndex + 1; i <= index; i++) {
    //         measuredDataMap[i] = { height: itemEstimatedHeight, offset }; // 更新元数据信息: 真实高度和offset值
    //         offset += itemEstimatedHeight;
    //     }
    //     // 更新已计算的项的索引值
    //     measuredData.lastMeasuredItemIndex = index;
    // }
    return measuredDataMap[index] || { height: 0, offset: 0 };
};

// 获取可视区开始的索引
export const getStartIndex = (
    props: VirtualListProps,
    scrollOffset: number,
    measuredData: measuredDataProps,
) => {
    const { data } = props;
    const itemCount = data.length;
    let index = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const currentOffset = getItemMetaData(measuredData, index).offset; // 获取当前项的offset值
        if (currentOffset >= scrollOffset) return index; // index从0开始遍历，直到找到第一个offset大于等于scrollOffset的项，即为可视区开始的索引
        if (index >= itemCount) return itemCount; // 如果index已经大于等于itemCount，则返回itemCount
        index++;
    }
};

// 获取可视区结束的索引
export const getEndIndex = (
    props: VirtualListProps,
    startIndex: number,
    measuredData: measuredDataProps,
) => {
    const { visibleHeight = 400, data, pageMode, pageModeVisibleSize = 20 } = props;
    // 整页滚动模式
    if (pageMode) {
        return Math.min(startIndex + pageModeVisibleSize - 1, data.length - 1);
    }
    // 获取可视区内开始的项
    const startItem = getItemMetaData(measuredData, startIndex);
    // 可视区内最大的offset值
    const maxOffset = startItem.offset + visibleHeight;
    // 开始项的下一项的offset，之后不断累加此offset，知道等于或超过最大offset，就是找到结束索引了
    let offset = startItem.offset + startItem.height;
    // 结束索引
    let endIndex = startIndex;
    // 累加offset
    while (offset <= maxOffset && endIndex < data.length - 1) {
        endIndex++;
        const currentItem = getItemMetaData(measuredData, endIndex);
        offset += currentItem.height;
    }
    return endIndex;
};

// 获取可视区渲染的项的范围
export const getRangeToRender = (
    props: VirtualListProps,
    scrollOffset: number,
    measuredData: measuredDataProps,
) => {
    const { data = [], bufferSize = 3 } = props;
    const startIndex = getStartIndex(props, scrollOffset, measuredData);
    const endIndex = getEndIndex(props, startIndex, measuredData);
    return [
        Math.max(0, startIndex - bufferSize), // 预留bufferSize的空间
        Math.min(data.length - 1, endIndex + bufferSize),
        startIndex,
        endIndex,
    ];
};
// 获取滚动偏移量
export function getOffset(props: VirtualListProps, containerRef: any) {
    if (props.pageMode) {
        return document.documentElement.scrollTop || document.body.scrollTop;
    } else {
        return containerRef?.current ? containerRef?.current?.scrollTop : 0;
    }
}
// 获取容器可视区高度
export function getClientSize(props: VirtualListProps, containerRef: any) {
    if (props.pageMode) {
        return document.documentElement.clientHeight || document.body.clientHeight;
    } else {
        return containerRef?.current ? containerRef?.current?.clientHeight : 0;
    }
}
// 获取容器滚动高度
export function getScrollSize(props: VirtualListProps, containerRef: any) {
    if (props.pageMode) {
        return document.documentElement.scrollHeight || document.body.scrollHeight;
    } else {
        return containerRef?.current ? containerRef?.current?.scrollHeight : 0;
    }
}
// 滚动到指定位置，预设偏移量
export function scrollToOffset(props: VirtualListProps, containerRef: any) {
    const { pageMode, presetOffset = 0 } = props;
    if (!presetOffset) return;
    if (pageMode) {
        document.body.scrollTop = presetOffset;
        document.documentElement.scrollTop = presetOffset;
    } else if (containerRef?.current) {
        containerRef.current.scrollTop = presetOffset;
    }
}
// 写一个防抖函数
export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
// 写一个节流函数
export const throttle = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let lastTime = 0;
    console.log('====throttle');
    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            func(...args);
        }
    };
};
