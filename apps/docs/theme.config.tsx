import { DocsThemeConfig } from 'nextra-theme-docs';

import { components } from './components/MDXComponents';

const config: DocsThemeConfig = {
    logo: <span>Verney Design</span>,
    project: {
        link: 'https://github.com/verney-design/verney-design',
    },
    docsRepositoryBase: 'https://github.com/verney-design/verney-design',
    useNextSeoProps() {
        return {
            titleTemplate: '%s – Verney Design',
        };
    },
    components: components as Record<string, React.FC>,
    footer: {
        text: 'Verney React Design © 2024',
    },
};

export default config;
