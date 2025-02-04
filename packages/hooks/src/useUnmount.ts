import { useEffect } from 'react';

/**
 * 在组件卸载时执行清理操作
 * @param fn 需要执行的清理函数
 */
export const useUnmount = (fn: () => void) => {
    useEffect(() => {
        return () => {
            fn?.();
        };
    }, []);
};
