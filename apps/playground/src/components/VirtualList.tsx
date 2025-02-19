import { Button, Input, VirtualList } from '@verney/ui';
import React, { useState } from 'react';

function randomString(): string {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const len = Math.floor(Math.random() * chars.length);
    return chars.slice(0, len);
}
// 生成测试数据
const generateItems = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        title: `Item ${i}`,
        height: Math.floor(Math.random() * 100) + 50,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
        image: `https://picsum.photos/300/${200 + Math.floor(Math.random() * 200)}`,
        description: `This is description ${randomString()}`,
    }));

const VirtualListDemo: React.FC = () => {
    const [showChild, setShowChild] = useState('pagemode');

    const [list, setList] = useState(() => generateItems(10));
    const [waterfallItems, setWaterfallItems] = useState(() => generateItems(20));
    const [isLoadingSingle, setIsLoadingSingle] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingWaterfall, setIsLoadingWaterfall] = useState(false);

    const loadMore = async () => {
        return new Promise((resolve) => {
            setIsLoadingSingle(true);
            setTimeout(() => {
                const newItems = generateItems(10);
                setList((prevItems) => {
                    const list = [...prevItems, ...newItems];
                    if (list.length >= 50) {
                        setHasMore(false);
                    }
                    return list;
                });
                setIsLoadingSingle(false);
                resolve(true);
            }, 1000);
        });
    };

    const loadMoreWaterfall = () => {
        setIsLoadingWaterfall(true);
        setTimeout(() => {
            const newItems = generateItems(10);
            setWaterfallItems((prevItems) => [...prevItems, ...newItems]);
            setIsLoadingWaterfall(false);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            <div>
                <div className="flex justify-center items-center gap-2 mb-4">
                    {['infinite', 'pagemode'].map((item) => {
                        return (
                            <Button key={item} onClick={() => setShowChild(item)}>
                                {item}
                            </Button>
                        );
                    })}
                </div>
                <h3 className="text-lg font-semibold mb-2">{showChild}</h3>
                {showChild === 'infinite' ? (
                    <VirtualList
                        wrapperClass={'vitual-list-wrapper'}
                        data={list}
                        visibleHeight={400}
                        onLoadMore={loadMore}
                        hasMore={hasMore}
                        onScrollTop={() => console.log('scrollTop')}
                        pageMode={false}
                        renderItem={(item, index, data) => (
                            <div
                                style={{
                                    // height: item.height,
                                    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
                                    padding: '16px',
                                    // borderRadius: '8px',
                                    // marginBottom: '8px',
                                    // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                            >
                                <h2>
                                    列表项 {index}，标题: {item.title}
                                </h2>
                                <img src={item.image} alt="" />
                                <p style={{ wordBreak: 'break-all' }}>{item.description}</p>
                            </div>
                        )}
                    />
                ) : (
                    <VirtualList
                        wrapperClass={'vitual-list-wrapper'}
                        data={list}
                        onLoadMore={loadMore}
                        hasMore={hasMore}
                        onScrollTop={() => console.log('scrollTop')}
                        pageMode={true}
                        pageModeVisibleSize={15}
                        renderItem={(item, index, data) => (
                            <div
                                style={{
                                    // height: item.height,
                                    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
                                    padding: '16px',
                                    // borderRadius: '8px',
                                    // marginBottom: '8px',
                                    // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                            >
                                <h2>
                                    列表项 {index}，标题: {item.title}
                                </h2>
                                <img src={item.image} alt="" />
                                <p style={{ wordBreak: 'break-all' }}>{item.description}</p>
                            </div>
                        )}
                    />
                )}
            </div>

            {/* <div>
                <h3 className="text-lg font-semibold mb-2">瀑布流布局</h3>
                <div style={{ width: '1000px' }}>
                    <VirtualList
                        items={waterfallItems}
                        height={600}
                        columnCount={3}
                        mode="waterfall"
                        estimatedItemHeight={100}
                        onLoadMore={loadMoreWaterfall}
                        isLoading={isLoadingWaterfall}
                        renderItem={(item) => (
                            <div
                                style={{
                                    height: item.height,
                                    backgroundColor: item.backgroundColor,
                                    padding: '16px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                            >
                                瀑布流项 {item.id} (高度: {item.height}px)
                            </div>
                        )}
                    />
                </div>
            </div> */}
        </div>
    );
};

export default VirtualListDemo;
