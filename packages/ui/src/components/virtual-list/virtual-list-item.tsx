import classNames from 'classnames';
import React, { FC, ReactNode, useRef, useEffect, useMemo } from 'react';
import './style.scss';

// 定义组件Props接口
interface VirtualListItemProps {
    /** 子元素 */
    children?: ReactNode;
    /** 索引 */
    index?: number;
    itemKey: number | string;
    /** 样式 */
    style?: React.CSSProperties;
    itemWrapperClass?: string;
    onSizeChange: (index: number, domNode: ChildNode) => void;
}

// 虚拟列表项组件
const VirtualListItem: FC<VirtualListItemProps> = ({
    children,
    itemKey = 0,
    style,
    index = 0,
    onSizeChange,
    itemWrapperClass = '',
}) => {
    const virtualItemRef = useRef<HTMLDivElement>(null);
    const resizeObserver = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        if (virtualItemRef.current) {
            const domNode = virtualItemRef.current.firstChild as Element; // 获取当前item并转换为Element类型
            if (!domNode) return;
            // 初始化ResizeObserver，监听domNode尺寸变化
            resizeObserver.current = new ResizeObserver(() => {
                window.requestAnimationFrame(() => {
                    onSizeChange(index, domNode);
                });
            });
            resizeObserver.current.observe(domNode); // 开始监听domNode尺寸变化
        }
        return () => {
            // 组件卸载时，停止监听domNode尺寸变化
            if (resizeObserver.current) {
                resizeObserver.current.disconnect();
            }
        };
    }, []);

    const itemWrapperClassName = useMemo(() => {
        return classNames('verney-virtual-list__item', itemWrapperClass);
    }, [itemWrapperClass]);
    return (
        <div ref={virtualItemRef} className={itemWrapperClassName} data-key={itemKey} style={style}>
            {children}
        </div>
    );
};

export default VirtualListItem;
