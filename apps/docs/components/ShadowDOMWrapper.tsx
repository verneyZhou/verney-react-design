import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
// import '@verney/ui/style.css';

/**
 * ShadowDOMWrapper 组件的属性接口
 * @interface ShadowDOMWrapperProps
 * @property {React.ReactNode} children - 需要在 Shadow DOM 中渲染的子元素
 * @property {string} [styles] - 可选的 CSS 样式字符串
 */
interface ShadowDOMWrapperProps {
  children: React.ReactNode;
  styles?: string;
  useLibraryStyles?: boolean;
}

/**
 * ShadowDOMWrapper 组件
 * 用于创建独立的 Shadow DOM 环境，实现样式隔离
 */
const ShadowDOMWrapper: React.FC<ShadowDOMWrapperProps> = ({ children, styles = '', useLibraryStyles = true }) => {
  // 存储宿主元素的引用
  const hostRef = useRef<HTMLDivElement>(null);
  // 存储 Shadow Root 的引用
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  // 存储 Shadow DOM 中的容器元素引用
  const containerRef = useRef<HTMLDivElement | null>(null);
  // 存储 React Root 实例的引用
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);
  // 存储样式元素的引用
  const styleElementRef = useRef<HTMLStyleElement | null>(null);

  // 初始化 Shadow DOM
  useEffect(() => {
    if (!hostRef.current || shadowRootRef.current) return;

    try {
      // 创建 Shadow DOM，mode: 'open' 允许外部访问 Shadow DOM
      shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });
      
      // 在 Shadow DOM 中创建容器元素
      containerRef.current = document.createElement('div');
      shadowRootRef.current.appendChild(containerRef.current);
      
      // 为容器创建 React Root 实例，用于后续渲染
      if (containerRef.current) {
        rootRef.current = createRoot(containerRef.current);
      }
    } catch (error) {
      console.error('Failed to initialize Shadow DOM:', error);
    }

    // 清理函数：组件卸载时清理所有引用
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
      containerRef.current = null;
      shadowRootRef.current = null;
    };
  }, []); // 仅在组件挂载时执行一次

  // 处理样式更新
  useEffect(() => {
    if (!shadowRootRef.current) return;

    // 移除旧的样式元素，避免样式冲突
    if (styleElementRef.current) {
      styleElementRef.current.remove();
      styleElementRef.current = null;
    }

    // 如果提供了样式，创建新的样式元素并添加到 Shadow DOM
    if (styles || useLibraryStyles) {
      styleElementRef.current = document.createElement('style');
      
      // 获取所有样式表
      const allStyleSheets = Array.from(document.styleSheets);
      
      // 获取组件库样式
      const verneyStyles = useLibraryStyles ? 
        allStyleSheets
          .find((sheet:any) => {
            try {
              const firstRule = sheet?.ownerNode?.innerText;
              return firstRule && firstRule.includes('/* @verney-ui */');
            } catch {
              return false;
            }
          })
          ?.cssRules || [] : [];
      
      // 获取 Tailwind 样式
    //   const tailwindStyles = allStyleSheets
    //     .filter((sheet:any) => {
    //       try {
    //         const rules = sheet?.cssRules;
    //         return rules && Array.from(rules).some(rule => 
    //           rule.cssText.includes('@tailwind') || 
    //           rule.cssText.includes('--tw-') ||
    //           sheet?.ownerNode?.id?.includes('tailwind')
    //         );
    //       } catch {
    //         return false;
    //       }
    //     })
    //     .flatMap((sheet:any) => Array.from(sheet.cssRules));

    console.log('=====verneyStyles', verneyStyles);
      
      // 组合所有样式
      const combinedStyles = [
        ...Array.from(verneyStyles).map(rule => rule.cssText),
        // ...Array.from(tailwindStyles).map(rule => rule.cssText),
        styles
      ].join('\n');
      
      styleElementRef.current.textContent = combinedStyles;
      shadowRootRef.current.appendChild(styleElementRef.current);
    }

    // 清理函数：移除样式元素
    return () => {
      if (styleElementRef.current) {
        styleElementRef.current.remove();
        styleElementRef.current = null;
      }
    };
  }, [styles, useLibraryStyles]); // 当样式变化时重新执行

  // 处理内容更新：当 children 改变时重新渲染
  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.render(<>{children}</>);
  }, [children]);

  // 返回作为 Shadow DOM 宿主的 div 元素
  return <div ref={hostRef} />;
};

export default ShadowDOMWrapper;