import classNames from 'classnames';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import React, { useState } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  code?: string;
  className?: string;
  language?: Language;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  code,
  className,
  language = 'tsx'
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-white shadow-sm">
      {/* 预览区域 */}
      <div className="p-6 flex items-center justify-center min-h-[120px] border-b">
        {children}
      </div>
      
      {/* 操作栏 */}
      <div className="border-t bg-gray-50/50">
        <div className="flex items-center justify-end">
          <button
            className={classNames(
              'px-4 py-2 text-sm transition-colors duration-200',
              'hover:text-blue-600 hover:bg-blue-50',
              showCode ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            )}
            onClick={() => setShowCode(!showCode)}
          >
            <span className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 18L22 12L16 6" />
                <path d="M8 6L2 12L8 18" />
              </svg>
              {showCode ? '收起代码' : '查看代码'}
            </span>
          </button>
        </div>

        {/* 代码展示区域 */}
        {showCode && code && (
          <div className="border-t">
            <Highlight
              theme={themes.github}
              code={code.trim()}
              language={language}
            >
              {({
                className: highlightClassName,
                style,
                tokens,
                getLineProps,
                getTokenProps
              }) => (
                <pre
                  className={classNames(
                    'overflow-x-auto p-4 text-sm m-0',
                    highlightClassName,
                    className
                  )}
                  style={style}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        )}
      </div>
    </div>
  );
}; 