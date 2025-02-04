import { default as default_2 } from 'react';

export declare const Button: default_2.FC<ButtonProps>;

declare type ButtonHTMLType = 'submit' | 'button' | 'reset';

export declare interface ButtonProps extends Omit<default_2.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: ButtonType;
    size?: ButtonSize;
    shape?: ButtonShape;
    loading?: boolean;
    disabled?: boolean;
    danger?: boolean;
    block?: boolean;
    icon?: default_2.ReactNode;
    htmlType?: ButtonHTMLType;
    className?: string;
    children?: default_2.ReactNode;
}

declare type ButtonShape = 'default' | 'circle' | 'round';

declare type ButtonSize = 'large' | 'middle' | 'small';

declare type ButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text';

export declare const Input: default_2.ForwardRefExoticComponent<InputProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface InputProps extends Omit<default_2.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
    /**
     * 输入框大小
     */
    size?: 'small' | 'middle' | 'large';
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 输入框状态
     */
    status?: 'error' | 'warning';
    /**
     * 是否显示边框
     */
    bordered?: boolean;
    /**
     * 前缀图标
     */
    prefix?: default_2.ReactNode;
    /**
     * 后缀图标
     */
    suffix?: default_2.ReactNode;
    /**
     * 允许清除内容
     */
    allowClear?: boolean;
}

export declare const VirtualList: default_2.FC<VirtualListProps>;

export declare interface VirtualListProps {
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
    renderItem: (item: any, index: number) => default_2.ReactNode;
    /** 是否正在加载更多 */
    isLoading?: boolean;
    /** 类名 */
    className?: string;
    /** 布局模式 - 瀑布流或者列表 */
    mode?: 'waterfall' | 'list';
}

export declare const Waterfall: default_2.FC<WaterfallProps>;

export declare interface WaterfallProps {
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
    renderItem?: (item: any, index: number) => default_2.ReactNode;
    /**
     * 容器类名
     */
    className?: string;
    /**
     * 容器样式
     */
    style?: default_2.CSSProperties;
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
    loadingComponent?: default_2.ReactNode;
    /**
     * 自定义没有更多数据显示内容
     */
    noMoreComponent?: default_2.ReactNode;
}

export { }
