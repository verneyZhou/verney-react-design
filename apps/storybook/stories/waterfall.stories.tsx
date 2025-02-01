import type { Meta, StoryObj } from '@storybook/react';
import { Waterfall } from '@verney/ui';
import React, { useState } from 'react';

const meta = {
    title: 'Components/Waterfall',
    component: Waterfall,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Waterfall>;

export default meta;
type Story = StoryObj<typeof meta>;

function randomString(): string {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result = '';
    const len = Math.floor(Math.random() * chars.length);
    return chars.slice(0, len);
}

// 模拟数据
const mockData = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    image: `https://picsum.photos/300/${200 + Math.floor(Math.random() * 200)}`,
    description: `This is description ${randomString()}`,
}));

export const Default: Story = {
    args: {
        dataSource: mockData,
        columns: 2,
        gutter: 16,
        renderItem: (item) => (
            <div
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div style={{ padding: '12px' }}>
                    <h3>{item.title}</h3>
                    <p style={{ wordBreak: 'break-all' }}>{item.description}</p>
                </div>
            </div>
        ),
    },
};

export const ThreeColumns: Story = {
    args: {
        ...Default.args,
        columns: 3,
    },
};

export const WithLoadMore: Story = {
    render: () => {
        const [data, setData] = useState(mockData.slice(0, 10));
        const [loading, setLoading] = useState(false);
        const [hasMore, setHasMore] = useState(true);

        const handleLoadMore = () => {
            console.log('handleLoadMore');
            setLoading(true);
            // 模拟异步加载
            setTimeout(() => {
                const currentLength = data.length;
                const nextData = mockData.slice(
                    currentLength,
                    currentLength + 10
                );
                setData([...data, ...nextData]);
                setLoading(false);
                if (currentLength + 10 >= mockData.length) {
                    setHasMore(false);
                }
            }, 1000);
        };

        return (
            <Waterfall
                dataSource={data}
                columns={2}
                gutter={16}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                renderItem={(item) => (
                    <div
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            style={{ height: '200px' }}
                        />
                        <div style={{ padding: '12px' }}>
                            <h3>{item.title}</h3>
                            <p style={{ wordBreak: 'break-all' }}>
                                {item.description}
                            </p>
                        </div>
                    </div>
                )}
            />
        );
    },
};
