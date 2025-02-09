import { default as React } from 'react';
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
export declare const VirtualList: React.FC<VirtualListProps>;
