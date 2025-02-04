import { useEffect } from 'react';

/**
 * 在组件挂载时执行一次性的副作用操作
 * @param fn 需要执行的函数
 */
export const useMount = (fn: () => void) => {
    useEffect(() => {
        fn?.();
    }, []);
};
