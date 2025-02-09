import { default as React } from 'react';
export interface WaterfallProps {
    /**
     * 数据列表
     */
    dataSource: any[];
    /**
     * 列数
     */
    columns?: number;
    /**
     * 列间距
     */
    gutter?: number;
    /**
     * 默认item高度
     */
    defaultItemHeight?: number;
    /**
     * 是否启用动画
     */
    enableAnimation?: boolean;
    /**
     * 动画持续时间(ms)
     */
    animationDuration?: number;
    /**
     * 动画缓动函数
     */
    animationEasing?: string;
    /**
     * 自定义渲染项
     */
    renderItem?: (item: any, index: number) => React.ReactNode;
    /**
     * 容器类名
     */
    className?: string;
    /**
     * 容器样式
     */
    style?: React.CSSProperties;
    /**
     * 是否正在加载更多
     */
    loading?: boolean;
    /**
     * 是否还有更多数据
     */
    hasMore?: boolean;
    /**
     * 加载更多的回调
     */
    onLoadMore?: () => void;
    /**
     * 自定义加载中显示内容
     */
    loadingComponent?: React.ReactNode;
    /**
     * 自定义没有更多数据显示内容
     */
    noMoreComponent?: React.ReactNode;
}
export declare const Waterfall: React.FC<WaterfallProps>;
