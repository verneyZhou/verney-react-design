import { add } from '@verney/utils';
import React, { useState } from 'react';

const Util = () => {
    const result = add(1, 2);
    return (
        <div className="container mx-auto px-4 py-8">
            <section>
                <h2 className="text-xl font-semibold mb-4">工具函数测试</h2>
                <div>
                    <p>add(1, 2) = {result}</p>
                </div>
            </section>
        </div>
    );
};

export default Util;
