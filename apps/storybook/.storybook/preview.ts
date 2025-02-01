import type { Preview } from '@storybook/react';
import '@verney/ui/dist/style.css'; // 引入UI组件库样式

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
