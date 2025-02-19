import { default as React } from 'react';
export interface VirtualListProps {
    data: any[];
    uniqueKey?: string;
    pageMode?: boolean;
    visibleHeight?: number;
    pageModeVisibleSize?: number;
    itemEstimatedHeight?: number;
    renderItem: (item: object, index: number, list: any[]) => React.ReactNode;
    wrapperClass?: string;
    wrapperStyle?: React.CSSProperties;
    bufferSize?: number;
    onLoadMore?: () => Promise<unknown>;
    hasMore?: boolean;
    renderLoadMore?: (loading: boolean, hasMore: boolean) => React.ReactNode;
    isShowLoadMore?: boolean;
    itemWrapperClass?: string;
    topThreshold?: number;
    onScrollTop?: () => void;
    onScroll?: (evt: Event) => void;
    presetOffset?: number;
}
export interface measuredDataProps {
    measuredDataMap: {
        [key: number]: {
            offset: number;
            height: number;
        };
    };
    lastMeasuredItemIndex: number;
}
export declare const VirtualList: React.FC<VirtualListProps>;
/**
 * 加载图片
 * 加载更多增加loader组件传参
 * 缓存优化，滚动优化
 * pageMode模式
 * 测试用例，文档用例，发版
 * 项目中引用
 * 博客
 */
