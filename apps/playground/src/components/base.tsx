import { Button, Input } from '@verney/ui';
import React, { useState } from 'react';

const Base = () => {
    return (
        <div>
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">UI 组件测试</h2>
                <div className="space-x-2 mb-4">
                    <Button>默认按钮</Button>
                    <Button type="primary">主要按钮</Button>
                    <Button type="dashed">虚线按钮</Button>
                    <Input />
                </div>
            </section>
        </div>
    );
};

export default Base;
