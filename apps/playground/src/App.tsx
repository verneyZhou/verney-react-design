import { Button, Input } from '@verney/ui';
import { add } from '@verney/utils';

import { HooksTest } from './components/HooksTest';

function App() {
    const result = add(1, 2);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Verney React Design Playground
            </h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">UI 组件测试</h2>
                <div className="space-x-2">
                    <Button>默认按钮</Button>
                    <Button type="primary">主要按钮</Button>
                    <Button type="dashed">虚线按钮</Button>
                    <Input />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">工具函数测试</h2>
                <div>
                    <p>add(1, 2) = {result}</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Hooks 测试</h2>
                <HooksTest />
            </section>
        </div>
    );
}

export default App;
