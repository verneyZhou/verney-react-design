import classNames from 'classnames';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import './style.scss';

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

export const Waterfall: React.FC<WaterfallProps> = ({
    dataSource = [],
    columns = 2,
    gutter = 16,
    defaultItemHeight = 200,
    enableAnimation = true,
    animationDuration = 300,
    animationEasing = 'ease-out',
    renderItem,
    className,
    style,
    loading = false,
    hasMore = true,
    onLoadMore,
    loadingComponent = '加载中...',
    noMoreComponent = '没有更多了',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [columnHeights, setColumnHeights] = useState<number[]>([]);
    const [renderedItems, setRenderedItems] = useState<React.ReactNode[][]>([]);
    const [pendingData, setPendingData] = useState<any[]>([]);
    const heightsMapRef = useRef<Map<number, number>>(new Map());
    const processingRef = useRef<boolean>(false);
    const loadingRef = useRef(loading);
    const loadMoreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );
    const renderedIndexesRef = useRef<Set<number>>(new Set());

    // 任务队列管理
    const taskQueueRef = useRef<{
        tasks: (() => Promise<void>)[];
        isProcessing: boolean;
    }>({
        tasks: [],
        isProcessing: false,
    });

    // 添加任务到队列
    const addTask = useCallback((task: () => Promise<void>) => {
        taskQueueRef.current.tasks.push(task);

        if (!taskQueueRef.current.isProcessing) {
            processNextTask();
        }
    }, []);

    // 处理下一个任务
    const processNextTask = useCallback(async () => {
        if (
            taskQueueRef.current.isProcessing ||
            taskQueueRef.current.tasks.length === 0
        ) {
            return;
        }

        taskQueueRef.current.isProcessing = true;
        const currentTask = taskQueueRef.current.tasks[0];

        try {
            await currentTask();
            taskQueueRef.current.tasks.shift(); // 移除已完成的任务
            taskQueueRef.current.isProcessing = false;

            // 如果还有任务，继续处理
            if (taskQueueRef.current.tasks.length > 0) {
                processNextTask();
            }
        } catch (error) {
            console.error('Task execution failed:', error);
            taskQueueRef.current.isProcessing = false;
        }
    }, []);

    // 创建数据处理任务
    const createDataProcessTask = useCallback((data: any[]) => {
        return async () => {
            // 只处理新增的数据
            const newData = data.filter(
                (_, index) => !renderedIndexesRef.current.has(index)
            );

            if (newData.length > 0) {
                setPendingData((prev) => [...prev, ...newData]);
            }

            // 等待所有数据渲染完成
            return new Promise<void>((resolve) => {
                const checkComplete = () => {
                    const allItemsProcessed =
                        renderedIndexesRef.current.size === data.length;
                    if (allItemsProcessed) {
                        resolve();
                    } else {
                        setTimeout(checkComplete, 100);
                    }
                };
                checkComplete();
            });
        };
    }, []);

    // 防抖处理的onLoadMore
    const debouncedLoadMore = useCallback(() => {
        if (loadMoreTimeoutRef.current) {
            clearTimeout(loadMoreTimeoutRef.current);
        }

        loadMoreTimeoutRef.current = setTimeout(() => {
            if (
                !loadingRef.current &&
                hasMore &&
                onLoadMore &&
                !taskQueueRef.current.isProcessing
            ) {
                // 创建加载更多任务
                const loadMoreTask = async () => {
                    loadingRef.current = true;
                    await onLoadMore();
                };
                addTask(loadMoreTask);
            }
        }, 200);
    }, [hasMore, onLoadMore, addTask]);

    // 初始化
    useEffect(() => {
        // 只在列数改变时重置布局
        if (columnHeights.length !== columns) {
            setColumnHeights(new Array(columns).fill(0));
            setRenderedItems(new Array(columns).fill(0).map(() => []));
            renderedIndexesRef.current.clear();
            heightsMapRef.current.clear();
        }

        // 数据更新时，只处理新数据
        const processTask = createDataProcessTask(dataSource);
        addTask(processTask);
    }, [
        columns,
        dataSource,
        createDataProcessTask,
        addTask,
        columnHeights.length,
    ]);

    // 更新loading状态
    useEffect(() => {
        loadingRef.current = loading;
    }, [loading]);

    /**
     * 加载更多处理
     */
    // 使用 useInView 监听加载更多的触发器元素
    const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
        threshold: 1, // 改为1，表示完全可见时才触发
        rootMargin: '0px', // 改为0px，不再提前触发
    });
    // 处理加载更多
    useEffect(() => {
        console.log('loadMoreInView', loadMoreInView);
        if (loadMoreInView) {
            debouncedLoadMore();
        }
        return () => {
            if (loadMoreTimeoutRef.current) {
                clearTimeout(loadMoreTimeoutRef.current);
            }
        };
    }, [loadMoreInView, debouncedLoadMore]);

    // 计算每个item应该放在哪一列
    const getMinHeightColumn = useCallback(() => {
        const minHeight = Math.min(...columnHeights);
        return columnHeights.indexOf(minHeight);
    }, [columnHeights]);

    // 更新列高度并处理下一个数据
    const updateColumnHeight = useCallback(
        (index: number, height: number, columnIndex: number) => {
            if (heightsMapRef.current.get(index) === height) return;

            const oldHeight = heightsMapRef.current.get(index) || 0;
            heightsMapRef.current.set(index, height);
            renderedIndexesRef.current.add(index);

            setColumnHeights((prev) => {
                const newHeights = [...prev];
                newHeights[columnIndex] =
                    newHeights[columnIndex] - oldHeight + height;
                return newHeights;
            });

            processingRef.current = false;
        },
        []
    );

    // 处理单个数据的方法
    const processNextItem = useCallback(() => {
        if (processingRef.current || pendingData.length === 0) return;

        processingRef.current = true;
        const columnIndex = getMinHeightColumn();

        if (columnIndex > -1) {
            const [nextItem, ...rest] = pendingData;
            const currentIndex = dataSource.indexOf(nextItem);

            // 如果这个数据已经渲染过，跳过
            if (renderedIndexesRef.current.has(currentIndex)) {
                setPendingData(rest);
                processingRef.current = false;
                return;
            }

            setPendingData(rest);
            setRenderedItems((prev) => {
                const newItems = [...prev];
                newItems[columnIndex] = [
                    ...newItems[columnIndex],
                    <WaterfallItem
                        key={currentIndex}
                        item={nextItem}
                        index={currentIndex}
                        columnIndex={columnIndex}
                        gutter={gutter}
                        defaultItemHeight={defaultItemHeight}
                        enableAnimation={enableAnimation}
                        animationDuration={animationDuration}
                        animationEasing={animationEasing}
                        renderItem={renderItem}
                        updateColumnHeight={updateColumnHeight}
                    />,
                ];
                return newItems;
            });
        }
    }, [
        pendingData,
        columnHeights,
        gutter,
        renderItem,
        dataSource,
        getMinHeightColumn,
        defaultItemHeight,
        updateColumnHeight,
        enableAnimation,
        animationDuration,
        animationEasing,
    ]);

    // 监听状态变化，处理下一个数据
    useEffect(() => {
        if (!processingRef.current) {
            processNextItem();
        }
    }, [processNextItem, pendingData, processingRef.current]);

    return (
        <div
            ref={containerRef}
            className={classNames('verney-waterfall', className)}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: gutter,
                ...style,
            }}
        >
            {renderedItems.map((column, index) => (
                <div key={index} className="verney-waterfall-column">
                    {column}
                </div>
            ))}

            {/* 加载更多触发器 */}
            <div
                ref={loadMoreRef}
                className="verney-waterfall-loader"
                style={{
                    width: '100%',
                    pointerEvents: 'none',
                }}
            >
                {loading ? loadingComponent : !hasMore && noMoreComponent}
            </div>
        </div>
    );
};

Waterfall.displayName = 'Waterfall';

// 渲染单个item
const WaterfallItem = React.memo(({
    item,
    index,
    columnIndex,
    gutter,
    defaultItemHeight,
    enableAnimation = true,
    animationDuration = 300,
    animationEasing = 'ease-out',
    updateColumnHeight,
    renderItem,
}: {
    item: any;
    index: number;
    columnIndex: number;
    gutter: number;
    defaultItemHeight: number;
    enableAnimation?: boolean;
    animationDuration?: number;
    animationEasing?: string;
    updateColumnHeight: (
        index: number,
        height: number,
        columnIndex: number
    ) => void;
    renderItem?: (item: any, index: number) => React.ReactNode;
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasUpdatedRef = useRef<boolean>(false);

    // 更新高度的函数
    const updateHeight = useCallback(() => {
        if (!hasUpdatedRef.current && itemRef.current) {
            hasUpdatedRef.current = true;
            const height = itemRef.current.offsetHeight;
            if (height > 0) {
                updateColumnHeight(index, height, columnIndex);
                // 添加一个小延迟，让元素在高度更新后再显示
                if (enableAnimation) {
                    setTimeout(() => setIsVisible(true), 50);
                } else {
                    setIsVisible(true);
                }
            }
        }
    }, [index, columnIndex, updateColumnHeight, enableAnimation]);

    // 监听图片加载
    useEffect(() => {
        if (!itemRef.current) return;

        const images = itemRef.current.getElementsByTagName('img');

        // 设置 200ms 后的默认高度更新
        timeoutRef.current = setTimeout(() => {
            if (!hasUpdatedRef.current && itemRef.current) {
                updateHeight();
            }
        }, 200);

        if (images.length === 0) {
            // 如果没有图片，直接使用实际高度
            updateHeight();
            return;
        }

        let loadedImages = 0;
        const totalImages = images.length;

        const handleImageLoad = () => {
            loadedImages++;
            if (loadedImages === totalImages && itemRef.current) {
                setIsLoaded(true);
                updateHeight();
            }
        };

        Array.from(images).forEach((img) => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener('load', handleImageLoad);
                img.addEventListener('error', handleImageLoad);
            }
        });

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            Array.from(images).forEach((img) => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
        };
    }, [index, columnIndex, defaultItemHeight, updateHeight]);

    return (
        <div
            ref={itemRef}
            className="verney-waterfall-item"
            style={{
                marginBottom: gutter,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : 'translateY(20px)',
                transition: enableAnimation
                    ? `opacity ${animationDuration}ms ${animationEasing}, transform ${animationDuration}ms ${animationEasing}`
                    : 'none',
            }}
        >
            {renderItem?.(item, index)}
        </div>
    );
});
