import type { Meta, StoryObj } from '@storybook/react';
import { VirtualList } from '@verney/ui';
import React, { useState } from 'react';

function randomString(): string {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result = '';
    const len = Math.floor(Math.random() * chars.length);
    return chars.slice(0, len);
}

const meta = {
    title: 'Components/VirtualList',
    component: VirtualList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof VirtualList>;

export default meta;
type Story = StoryObj<typeof meta>;

function generateItems(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        title: `Item ${i}`,
        description: `This is a description for item ${i}. ${randomString()}`,
    }));
}

export const Default: Story = {
    args: {
        data: generateItems(100),
        visibleHeight: 400,
        itemEstimatedHeight: 80,
        renderItem: (item: any) => (
            <div
                style={{
                    padding: '16px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    margin: '8px',
                }}
            >
                <h3 style={{ margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ margin: 0, color: '#666', wordBreak: 'break-all' }}>
                    {item.description}
                </p>
            </div>
        ),
    },
};

export const PageMode: Story = {
    args: {
        ...Default.args,
        pageMode: true,
        pageModeVisibleSize: 20,
    },
};

export const WithLoadMore: Story = {
    render: () => {
        const [data, setData] = useState(generateItems(30));
        const [loading, setLoading] = useState(false);
        const [hasMore, setHasMore] = useState(true);

        const handleLoadMore = async () => {
            setLoading(true);
            // 模拟异步加载
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const currentLength = data.length;
            const newItems = generateItems(10).map((item) => ({
                ...item,
                id: item.id + currentLength,
            }));
            setData([...data, ...newItems]);
            setLoading(false);
            if (currentLength >= 100) {
                setHasMore(false);
            }
        };

        return (
            <VirtualList
                data={data}
                visibleHeight={400}
                itemEstimatedHeight={80}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                renderLoadMore={(loading, hasMore) => (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#666' }}>
                        {loading ? '加载中...' : hasMore ? '加载更多' : '没有更多数据了'}
                    </div>
                )}
                renderItem={(item: any, index: number) => (
                    <div
                        style={{
                            padding: '16px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            margin: '8px',
                        }}
                    >
                        <h3 style={{ margin: '0 0 8px' }}>
                            {item.title} index: {index}
                        </h3>
                        <p style={{ margin: 0, color: '#666', wordBreak: 'break-all' }}>
                            {item.description}
                        </p>
                    </div>
                )}
            />
        );
    },
};
