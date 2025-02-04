import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';

import { useUnmount } from '../useUnmount';

describe('useUnmount', () => {
    it('应该在组件卸载时执行回调函数', () => {
        const fn = vi.fn();
        const { unmount } = renderHook(() => useUnmount(fn));
        expect(fn).not.toHaveBeenCalled();
        unmount();
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('应该只在组件卸载时执行一次回调函数', () => {
        const fn = vi.fn();
        const { rerender, unmount } = renderHook(() => useUnmount(fn));
        rerender();
        expect(fn).not.toHaveBeenCalled();
        unmount();
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('应该正确处理空回调函数', () => {
        expect(() => {
            const { unmount } = renderHook(() => useUnmount(undefined));
            unmount();
        }).not.toThrow();
    });
});
