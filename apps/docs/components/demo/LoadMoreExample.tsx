import { Waterfall } from '@verney/ui';
import React, { useState, useCallback } from 'react';

const mockData = (page: number) => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: page * 10 + i,
    title: `标题${page * 10 + i + 1}`,
    image: `https://picsum.photos/300/${Math.floor(Math.random() * 200 + 300)}?random=${page * 10 + i}`,
    desc: '这是一段示例描述文本，用于演示瀑布流布局的效果。'
  }));
};

const LoadMoreExample: React.FC = () => {
  const [data, setData] = useState(() => mockData(0));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    
    // 模拟异步加载
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newData = mockData(page);
    setData(prev => [...prev, ...newData]);
    setPage(prev => prev + 1);
    setHasMore(page < 5); // 最多加载5页
    setLoading(false);
  }, [page, loading]);

  return (
    <div style={{ height: '600px', overflow: 'auto', padding: '16px', background: '#f5f5f5' }}>
      <Waterfall
        dataSource={data}
        columns={2}
        gutter={16}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        loadingComponent={
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            加载中...
          </div>
        }
        noMoreComponent={
          <div style={{ textAlign: 'center', padding: '16px 0', color: '#999' }}>
            没有更多数据了
          </div>
        }
        renderItem={(item) => (
          <div 
            style={{ 
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}
          >
            <img 
              src={item.image} 
              alt={item.title}
              style={{ 
                width: '100%',
                height: 'auto',
                display: 'block'
              }} 
            />
            <div style={{ padding: '12px' }}>
              <h3 style={{ margin: '0 0 8px' }}>{item.title}</h3>
              <p style={{ 
                margin: 0,
                fontSize: '14px',
                color: '#666',
                lineHeight: 1.5
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default LoadMoreExample;