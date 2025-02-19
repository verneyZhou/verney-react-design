import classNames from 'classnames';
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import './style.scss';
import VirtualListItem from './virtual-list-item';
import {
    estimatedHeight,
    getItemMetaData,
    getRangeToRender,
    scrollToOffset,
    getOffset,
    getClientSize,
    getScrollSize,
    throttle,
} from './util';
import useIntersectionObserver from './useIntersectionObserver';

export interface VirtualListProps {
    data: any[]; // 列表数据
    uniqueKey?: string; // 唯一标识
    pageMode?: boolean; // 是否开启整页滚动模式
    visibleHeight?: number; // 可视区域高度
    pageModeVisibleSize?: number; // 整页滚动模式下，显示的size数
    itemEstimatedHeight?: number; // 预估item高度
    renderItem: (item: object, index: number, list: any[]) => React.ReactNode; // 渲染每一项的函数
    wrapperClass?: string; // 容器类名
    wrapperStyle?: React.CSSProperties; // 容器样式
    bufferSize?: number; // 缓冲区域大小
    onLoadMore?: () => Promise<unknown>; // 加载更多数据
    hasMore?: boolean; // 是否还有更多数据
    renderLoadMore?: (loading: boolean, hasMore: boolean) => React.ReactNode; // 渲染加载更多
    isShowLoadMore?: boolean; // 是否显示加载更多
    itemWrapperClass?: string; // item容器类名
    topThreshold?: number; // 顶部阈值
    onScrollTop?: () => void; // 滚动到顶部

    onScroll?: (evt: Event) => void; // 滚动事件
    presetOffset?: number; // 预设的滚动偏移量
}

export interface measuredDataProps {
    measuredDataMap: {
        [key: number]: {
            offset: number; // 当前项距离顶部的距离
            height: number; // 当前项的高度
        };
    };
    lastMeasuredItemIndex: number; // 最后一个已经缓存过高度的索引
}

export const VirtualList: React.FC<VirtualListProps> = (props) => {
    const {
        wrapperClass = '',
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
        itemWrapperClass = '',
        topThreshold = 0,
        onScrollTop,
        onScroll,
    } = props;
    const [scrollOffset, setScrollOffset] = useState(0); // 滚动偏移量
    const containerRef = useRef<HTMLDivElement>(null); // 用于获取滚动容器的ref
    const loadMoreRef = useRef<HTMLDivElement>(null); // 用于获取loadMore的ref
    const [loading, setLoading] = useState(false); // 加载状态
    // const [, setState] = useState({}); // 强制更新组件
    // 计算可视区域高度
    const [measuredData, setMeasuredData] = useState<measuredDataProps>({
        measuredDataMap: {},
        lastMeasuredItemIndex: -1,
    });

    // measuredData初始化
    useEffect(() => {
        setMeasuredData((prevData) => {
            const measuredDataMap = { ...prevData.measuredDataMap };
            let lastMeasuredItemIndex = prevData.lastMeasuredItemIndex;
            for (let i = 0; i < sourceList.length; i++) {
                if (measuredDataMap[i] === undefined) {
                    const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex] || {};
                    const offset =
                        (lastMeasuredItem?.offset || 0) + (lastMeasuredItem?.height || 0);
                    measuredDataMap[i] = { height: itemEstimatedHeight, offset };
                    lastMeasuredItemIndex = i;
                }
            }
            return {
                measuredDataMap,
                lastMeasuredItemIndex,
            };
        });
    }, [sourceList, itemEstimatedHeight]);

    // 监听滚动事件
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 使用节流函数包装handleScroll，200ms内只执行一次
        const handleScroll = throttle((evt) => {
            const offset = getOffset(props, containerRef);
            // console.log('scroll', evt, offset, +new Date());
            setScrollOffset(offset);
            onScroll?.(evt);
        }, 50);

        if (props.presetOffset) {
            setTimeout(() => {
                scrollToOffset(props, containerRef); // 预设滚动偏移量
            }, 100);
        }

        if (pageMode) {
            document.addEventListener('scroll', handleScroll);
            return () => document.removeEventListener('scroll', handleScroll);
        } else {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [pageMode]);

    useEffect(() => {
        if (scrollOffset - topThreshold <= 0 && onScrollTop) {
            onScrollTop();
        }
    }, [scrollOffset]);

    // 监听loadMore的可见性
    const handleLoadMore = useCallback(
        (isVisible: boolean) => {
            if (isVisible && hasMore && !loading) {
                setLoading(true);
                onLoadMore?.().finally(() => {
                    setLoading(false);
                });
            }
        },
        [hasMore, onLoadMore, loading],
    );
    // 监听loadMore的可见性
    useIntersectionObserver([loadMoreRef.current], handleLoadMore, null, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
    });

    // 当item尺寸变化时，更新滚动偏移量
    const sizeChangeHandle = (index: number, domNode: any) => {
        const height = domNode?.offsetHeight || 0; // 获取domNode的高度
        setMeasuredData((prevData) => {
            const measuredDataMap = { ...prevData.measuredDataMap };
            const { lastMeasuredItemIndex } = prevData;
            // console.log('sizeChangeHandle', index, height, prevData);
            const itemMetaData = measuredDataMap[index];
            if (itemMetaData.height === height) {
                return prevData;
            }
            itemMetaData.height = height;
            let offset = itemMetaData.offset + itemMetaData.height;
            // 重新计算从索引 0 到当前项的所有偏移量
            for (let i = index + 1; i <= lastMeasuredItemIndex; i++) {
                const item = measuredDataMap[i];
                measuredDataMap[i] = {
                    ...item,
                    offset: offset,
                };
                offset += item.height;
            }
            return {
                measuredDataMap,
                lastMeasuredItemIndex,
            };
        });

        // const { measuredDataMap, lastMeasuredItemIndex } = measuredData;
        // const itemMetaData = measuredDataMap[index];
        // if (itemMetaData.height === height) {
        //     return;
        // }
        // itemMetaData.height = height; // 更新元数据信息: 真实高度
        // let offset = itemMetaData.offset || 0;
        // for (let i = index; i <= lastMeasuredItemIndex; i++) {
        //     const item = measuredDataMap[i];
        //     offset += item.height;
        //     measuredDataMap[i] = { ...item, offset: offset };
        // }
        // setMeasuredData((prev) => {
        //     return {
        //         ...prev,
        //         measuredDataMap: measuredDataMap,
        //     };
        // });
        // 强制更新组件
        // setState({});
    };

    // 获取当前可视区内的项
    const getCurrentChildren = useCallback(() => {
        const [startIndex, endIndex] = getRangeToRender(props, scrollOffset, measuredData);
        const items = [];
        for (let index = startIndex; index <= endIndex; index++) {
            // const item = getItemMetaData(props, index); // 获取当前项的元数据
            // const itemStyle = {
            //     height: item.size,
            //     height: item.height,
            //     width: '100%',
            // };
            const itemKey = uniqueKey ? sourceList[index][uniqueKey] : index;
            items.push(
                <VirtualListItem
                    key={itemKey}
                    itemKey={itemKey}
                    index={index}
                    // style={itemStyle}
                    itemWrapperClass={itemWrapperClass}
                    onSizeChange={sizeChangeHandle}
                >
                    {renderItem(sourceList[index], index, sourceList)}
                </VirtualListItem>,
            );
        }
        return items;
    }, [scrollOffset, renderItem]);

    // 计算总高度
    const totalHeight = useMemo(() => {
        // return estimatedHeight(itemEstimatedHeight, sourceList.length, measuredData);
        const { lastMeasuredItemIndex, measuredDataMap } = measuredData;
        if (lastMeasuredItemIndex >= 0) {
            const lastMeasuredItem = measuredDataMap[lastMeasuredItemIndex];
            return lastMeasuredItem.offset + lastMeasuredItem.height;
        } else {
            return 0;
        }
    }, [measuredData]);

    /**
     * 容器样式处理
     */
    const wrapperClassName = useMemo(() => {
        return classNames('verney-virtual-list__wrapper', wrapperClass);
    }, [wrapperClass]);
    const wrapperStyleMemo: React.CSSProperties = useMemo(() => {
        return {
            ...wrapperStyle,
            height: pageMode ? 'auto' : visibleHeight,
            overflow: pageMode ? 'visible' : 'auto',
            position: 'relative',
        };
    }, [wrapperStyle, visibleHeight, pageMode]);
    const contentContainerStyle: React.CSSProperties = useMemo(() => {
        let loadMoreheight = 0;
        if (loadMoreRef) {
            loadMoreheight = loadMoreRef?.current?.clientHeight || 0;
        }
        return {
            height: totalHeight + loadMoreheight,
        };
    }, [totalHeight]);
    const translateContainerStyle: React.CSSProperties = useMemo(() => {
        const [startIndex] = getRangeToRender(props, scrollOffset, measuredData);
        const startItem = getItemMetaData(measuredData, startIndex);
        // console.log('startItem', startItem, startIndex);
        return {
            transform: `translateY(${startItem.offset}px) translateZ(0)`,
        };
    }, [scrollOffset, measuredData]);

    return (
        <div ref={containerRef} className={wrapperClassName} style={wrapperStyleMemo}>
            <div className="verney-virtual-content" style={contentContainerStyle} role="group">
                <div style={translateContainerStyle} className="verney-virtual-translate">
                    {getCurrentChildren()}
                    {sourceList.length ? (
                        <div ref={loadMoreRef} className="verney-virtual-loadmore">
                            {renderLoadMore ? (
                                renderLoadMore(loading, hasMore)
                            ) : isShowLoadMore ? (
                                <div className="verney-virtual-loadmore__text">
                                    {loading ? '加载中...' : hasMore ? '加载更多' : '没有更多了~'}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

/**
 * 加载图片
 * 加载更多增加loader组件传参
 * 缓存优化，滚动优化
 * pageMode模式
 * 测试用例，文档用例，发版
 * 项目中引用
 * 博客
 */
