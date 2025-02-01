import classNames from 'classnames';
import React, {
    useRef,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import './style.scss';

interface ItemMetaData {
    size: number;
    offset: number;
    column?: number;
}

interface MeasuredData {
    measuredDataMap: Record<number, ItemMetaData>;
    lastMeasuredItemIndex: number;
}

export interface VirtualListProps {
    /** 列表数据 */
    items: any[];
    /** 容器高度 */
    height: number;
    /** 列数 */
    columnCount?: number;
    /** 预估的每项高度 */
    estimatedItemHeight?: number;
    /** 缓冲区大小 */
    overscan?: number;
    /** 加载更多的触发阈值 */
    loadMoreThreshold?: number;
    /** 加载更多回调 */
    onLoadMore?: () => void;
    /** 渲染每一项的函数 */
    renderItem: (item: any, index: number) => React.ReactNode;
    /** 是否正在加载更多 */
    isLoading?: boolean;
    /** 类名 */
    className?: string;
    /** 布局模式 - 瀑布流或者列表 */
    mode?: 'waterfall' | 'list';
}

export const VirtualList: React.FC<VirtualListProps> = ({
    items,
    height,
    columnCount = 1,
    mode = 'list',
    estimatedItemHeight = 50,
    overscan = 3,
    loadMoreThreshold = 100,
    onLoadMore,
    renderItem,
    isLoading = false,
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [resizeCount, setResizeCount] = useState(0);

    // 将measuredData移到组件内部
    const measuredDataRef = useRef<MeasuredData>({
        measuredDataMap: {},
        lastMeasuredItemIndex: -1,
    });

    // 添加列高度追踪
    const columnHeights = useRef<number[]>([]);

    // 初始化列高度
    useEffect(() => {
        columnHeights.current = new Array(columnCount).fill(0);
    }, [columnCount]);

    // 添加items变化的处理
    useEffect(() => {
        // 重置测量数据
        measuredDataRef.current = {
            measuredDataMap: {},
            lastMeasuredItemIndex: -1,
        };
        // 重置列高度
        columnHeights.current = new Array(columnCount).fill(0);
        // 触发重新渲染
        setResizeCount((c) => c + 1);
    }, [items, columnCount]);

    // 估算总高度
    const estimateTotalHeight = useCallback(() => {
        const { measuredDataMap, lastMeasuredItemIndex } =
            measuredDataRef.current;
        let measuredHeight = 0;
        let estimatedHeight = 0;

        if (lastMeasuredItemIndex >= 0) {
            const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
            measuredHeight = lastMeasuredItem.offset + lastMeasuredItem.size;
        }

        const unmeasuredItemsCount = items.length - (lastMeasuredItemIndex + 1);
        estimatedHeight =
            measuredHeight + unmeasuredItemsCount * estimatedItemHeight;

        return estimatedHeight;
    }, [items.length, estimatedItemHeight]);

    // 修改获取item元数据的逻辑
    const getItemMetadata = useCallback(
        (index: number): ItemMetaData => {
            const { measuredDataMap, lastMeasuredItemIndex } =
                measuredDataRef.current;

            if (index > lastMeasuredItemIndex) {
                if (mode === 'waterfall') {
                    // 瀑布流布局：找到最短的列
                    const minHeight = Math.min(...columnHeights.current);
                    const columnIndex =
                        columnHeights.current.indexOf(minHeight);

                    const size = estimatedItemHeight;
                    const offset = minHeight;

                    measuredDataMap[index] = {
                        size,
                        offset,
                        column: columnIndex,
                    };

                    // 更新列高度
                    columnHeights.current[columnIndex] = offset + size;
                } else {
                    // 列表布局：线性排列
                    let offset = 0;
                    if (lastMeasuredItemIndex >= 0) {
                        const lastMeasuredItem =
                            measuredDataMap[lastMeasuredItemIndex];
                        offset =
                            lastMeasuredItem.offset + lastMeasuredItem.size;
                    }

                    measuredDataMap[index] = {
                        size: estimatedItemHeight,
                        offset,
                        column: 0,
                    };
                }
                measuredDataRef.current.lastMeasuredItemIndex = index;
            }

            return (
                measuredDataMap[index] || {
                    size: estimatedItemHeight,
                    offset: 0,
                    column: 0,
                }
            );
        },
        [estimatedItemHeight, mode, columnCount]
    );

    // 修改可视区域计算逻辑
    const getVisibleRange = useCallback(() => {
        if (!containerRef.current) return { start: 0, end: 0 };

        const { clientHeight, scrollTop } = containerRef.current;
        const { measuredDataMap } = measuredDataRef.current;

        // 二分查找找到第一个可见的项
        let start = 0;
        let end = items.length - 1;

        while (start <= end) {
            const mid = Math.floor((start + end) / 2);
            const metadata = getItemMetadata(mid);
            if (!metadata) {
                start = mid + 1;
                continue;
            }
            // 确保metadata存在且具有有效的offset值
            if (typeof metadata.offset === 'undefined') {
                start = mid + 1;
                continue;
            }

            if (metadata.offset < scrollTop) {
                if (metadata.offset + metadata.size > scrollTop) {
                    start = mid;
                    break;
                }
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }

        // 从找到的起始位置向后扫描，直到超出可见区域
        let endIndex = start;
        let currentOffset = measuredDataMap[start]?.offset || 0;

        while (
            endIndex < items.length &&
            currentOffset < scrollTop + clientHeight
        ) {
            const metadata = getItemMetadata(endIndex);
            currentOffset = metadata.offset + metadata.size;
            endIndex++;
        }

        // 添加缓冲区
        const startIndex = Math.max(0, start - overscan);
        endIndex = Math.min(items.length - 1, endIndex + overscan);

        return {
            start: startIndex,
            end: endIndex,
        };
    }, [items.length, overscan, getItemMetadata]);

    // 处理滚动事件
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        setScrollTop(scrollTop);

        // 触发加载更多
        if (
            onLoadMore &&
            !isLoading &&
            scrollHeight - scrollTop - clientHeight < loadMoreThreshold
        ) {
            onLoadMore();
        }
    }, [onLoadMore, isLoading, loadMoreThreshold]);

    // 修改渲染逻辑
    const visibleContent = useMemo(() => {
        const visibleRange = getVisibleRange();
        const start = visibleRange ? visibleRange.start : 0;
        const end = visibleRange ? visibleRange.end : 0;
        const visibleItems = [];

        for (let i = start; i <= end; i++) {
            const itemMetadata = getItemMetadata(i);
            const item = items[i];

            if (!item) continue;

            const itemStyle: React.CSSProperties =
                mode === 'waterfall'
                    ? {
                          width: `${100 / columnCount}%`,
                          position: 'absolute',
                          left: `${((itemMetadata?.column || 0) * 100) / columnCount}%`,
                          top: `${itemMetadata?.offset || 0}px`,
                          padding: '8px',
                          boxSizing: 'border-box',
                      }
                    : {
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: `${itemMetadata?.offset || 0}px`,
                          padding: '8px',
                          boxSizing: 'border-box',
                      };

            visibleItems.push(
                <div
                    key={i}
                    className={classNames('verney-virtual-list-item', {
                        'verney-virtual-list-item-waterfall':
                            mode === 'waterfall',
                    })}
                    data-index={i}
                    style={itemStyle}
                >
                    {renderItem(item, i)}
                </div>
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
        getVisibleRange,
    ]);

    // 修改 ResizeObserver 回调
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            let needsUpdate = false;

            entries.forEach((entry) => {
                const index = Number(entry.target.getAttribute('data-index'));
                if (!isNaN(index)) {
                    const oldSize =
                        measuredDataRef.current.measuredDataMap[index]?.size ||
                        0;
                    const newSize = entry.contentRect.height;

                    if (oldSize !== newSize) {
                        const metadata =
                            measuredDataRef.current.measuredDataMap[index];
                        metadata.size = newSize;

                        // 更新后续项的位置
                        if (
                            mode === 'waterfall' &&
                            metadata.column !== undefined
                        ) {
                            columnHeights.current[metadata.column] +=
                                newSize - oldSize;
                        } else {
                            for (
                                let i = index + 1;
                                i <=
                                measuredDataRef.current.lastMeasuredItemIndex;
                                i++
                            ) {
                                const item =
                                    measuredDataRef.current.measuredDataMap[i];
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

        const items = containerRef.current.getElementsByClassName(
            'verney-virtual-list-item'
        );
        Array.from(items).forEach((item) => {
            resizeObserver.observe(item);
        });

        return () => {
            resizeObserver.disconnect();
        };
    }, [scrollTop, mode]);

    const totalHeight = estimateTotalHeight();

    return (
        <div className="verney-virtual-list">
            <div
                ref={containerRef}
                className={classNames(
                    'verney-virtual-list-container',
                    className
                )}
                style={{ height, width: '100%' }}
                onScroll={handleScroll}
            >
                <div
                    className="verney-virtual-list-content"
                    style={{ height: totalHeight, width: '100%' }}
                >
                    <div
                        className={classNames('verney-virtual-list-items', {
                            'verney-virtual-list-items-waterfall':
                                mode === 'waterfall',
                        })}
                        style={{ width: '100%', position: 'relative' }}
                    >
                        {visibleContent}
                    </div>
                </div>
                {isLoading && (
                    <div className="verney-virtual-list-loading">加载中...</div>
                )}
            </div>
        </div>
    );
};
