import { Button } from '@verney/ui';
import type { ComponentProps } from 'react';

import { CodeBlock } from './CodeBlock';

type MDXComponents = {
    [key: string]: React.ComponentType<any>;
};

export const components: MDXComponents = {
    Button,
    CodeBlock: (props: ComponentProps<typeof CodeBlock>) => (
        <CodeBlock {...props} />
    ),
    // 其他需要在 MDX 中使用的组件
};
