import { VirtualListProps, measuredDataProps } from './virtual-list';
export declare const measuredData: {
    measuredDataMap: {};
    lastMeasuredItemIndex: number;
};
export declare const estimatedHeight: (defaultEstimatedItemSize: number | undefined, itemCount: number, measuredData: measuredDataProps) => number;
export declare const getItemMetaData: (measuredData: measuredDataProps, index: number) => {
    offset: number;
    height: number;
};
export declare const getStartIndex: (props: VirtualListProps, scrollOffset: number, measuredData: measuredDataProps) => number;
export declare const getEndIndex: (props: VirtualListProps, startIndex: number, measuredData: measuredDataProps) => number;
export declare const getRangeToRender: (props: VirtualListProps, scrollOffset: number, measuredData: measuredDataProps) => number[];
export declare function getOffset(props: VirtualListProps, containerRef: any): any;
export declare function getClientSize(props: VirtualListProps, containerRef: any): any;
export declare function getScrollSize(props: VirtualListProps, containerRef: any): any;
export declare function scrollToOffset(props: VirtualListProps, containerRef: any): void;
export declare const debounce: <T extends (...args: any[]) => void>(func: T, delay: number) => (...args: Parameters<T>) => void;
export declare const throttle: <T extends (...args: any[]) => void>(func: T, delay: number) => (...args: Parameters<T>) => void;
