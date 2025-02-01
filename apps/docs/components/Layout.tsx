import { MDXProvider } from '@mdx-js/react';

import { components } from './MDXComponents';

export function Layout({ children = null }) {
    return (
        <MDXProvider components={components}>
            <div className="container mx-auto px-4 py-8">{children}</div>
        </MDXProvider>
    );
}
