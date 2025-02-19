import { useMount, useUnmount } from '@verney/hooks';
import React, { useState } from 'react';

const ChildComponent: React.FC = () => {
    useMount(() => {
        console.log('子组件已挂载');
    });

    useUnmount(() => {
        console.log('子组件已卸载');
    });

    return <div className="p-4 bg-blue-100 rounded">我是子组件</div>;
};

export const HooksTest: React.FC = () => {
    const [showChild, setShowChild] = useState(true);

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Hooks 测试</h2>

            <div className="space-y-4">
                <div className="border p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">useMount & useUnmount 测试</h3>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setShowChild((prev) => !prev)}
                    >
                        {showChild ? '卸载子组件' : '挂载子组件'}
                    </button>
                    <div className="mt-4">{showChild && <ChildComponent />}</div>
                </div>
            </div>
        </div>
    );
};
