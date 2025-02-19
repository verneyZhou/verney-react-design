import { default as React, FC, ReactNode } from 'react';
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
declare const VirtualListItem: FC<VirtualListItemProps>;
export default VirtualListItem;
