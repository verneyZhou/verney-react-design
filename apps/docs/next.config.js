const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    mdxOptions: {
        remarkPlugins: [[() => import('remark-gfm')]],
        rehypePlugins: [[() => import('@mapbox/rehype-prism')]],
    },
});

module.exports = withNextra({
  transpilePackages: ['@verney/ui'],
  // 如果需要额外的页面扩展名支持
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // 配置路径别名
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
});
