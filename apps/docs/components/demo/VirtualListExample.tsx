import { VirtualList } from '@verney/ui';
import React, { useState, useCallback, memo } from 'react';

import ShadowDOMWrapper from '../ShadowDOMWrapper';

const mockData = (page: number) => {
    return Array.from({ length: 10 }, (_, i) => ({
        id: page * 10 + i,
        title: `标题${page * 10 + i + 1}`,
        content: '这是一段示例描述文本，用于演示虚拟滚动列表的效果。'.repeat(
            Math.floor(Math.random() * 3) + 1,
        ),
    }));
};

const VirtualListExample: React.FC = () => {
    const [data, setData] = useState(() => mockData(0));
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const loadMore = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        // 模拟异步加载
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newData = mockData(page);
        setData((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
        setHasMore(page < 5); // 最多加载5页
        setLoading(false);
    }, [page, loading]);

    // 定义组件所需的样式
    const styles = `
    .virtual-list-container {
      height: 400px;
      overflow: auto;
      padding: 16px;
      background: #f5f5f5;
    }
    .virtual-list-item {
      padding: 16px;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .virtual-list-item h3 {
      margin: 0 0 8px;
      font-size: 16px;
    }
    .virtual-list-item p {
      margin: 0;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
  `;

    return (
        <ShadowDOMWrapper styles={styles}>
            <div className="virtual-list-container">
                <VirtualList
                    data={data}
                    visibleHeight={400}
                    itemEstimatedHeight={100}
                    hasMore={hasMore}
                    onLoadMore={loadMore}
                    renderLoadMore={(loading, hasMore) => (
                        <div style={{ textAlign: 'center', padding: '16px 0' }}>
                            {loading ? '加载中...' : hasMore ? '加载更多' : '没有更多数据了'}
                        </div>
                    )}
                    renderItem={(item) => (
                        <div className="virtual-list-item">
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    )}
                />
            </div>
        </ShadowDOMWrapper>
    );
};

export default VirtualListExample;
