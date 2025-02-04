import { useCallback, useState } from 'react';

/**
 * 强制组件重新渲染
 * @returns 触发重新渲染的函数
 */
export const useUpdate = () => {
    const [, setState] = useState({});

    return useCallback(() => {
        setState({});
    }, []);
};
