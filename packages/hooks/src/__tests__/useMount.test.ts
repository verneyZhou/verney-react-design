import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';

import { useMount } from '../useMount';

describe('useMount', () => {
    it('应该在组件挂载时执行回调函数', () => {
        const fn = vi.fn();
        renderHook(() => useMount(fn));
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('应该只在组件挂载时执行一次回调函数', () => {
        const fn = vi.fn();
        const { rerender } = renderHook(() => useMount(fn));
        rerender();
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('应该正确处理空回调函数', () => {
        expect(() => {
            renderHook(() => useMount(undefined));
        }).not.toThrow();
    });
});
