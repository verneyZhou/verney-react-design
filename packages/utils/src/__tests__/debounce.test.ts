import { describe, it, expect, vi } from 'vitest';

import { debounce } from '../debounce';

describe('debounce', () => {
    vi.useFakeTimers();

    beforeEach(() => {
        vi.clearAllTimers();
    });

    it('应该在指定延迟后只执行一次', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 1000);

        debouncedFn();
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(500);
        debouncedFn();
        expect(mockFn).not.toBeCalled();

        vi.advanceTimersByTime(1000);
        expect(mockFn).toBeCalledTimes(1);
    });

    it('应该使用最后一次调用的参数', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 1000);

        debouncedFn('first');
        debouncedFn('second');
        debouncedFn('third');

        vi.advanceTimersByTime(1000);
        expect(mockFn).toBeCalledWith('third');
    });

    it('应该保持正确的this上下文', () => {
        const context = { value: 'test' };
        const mockFn = vi.fn(function (this: any) {
            return this.value;
        });

        const debouncedFn = debounce.call(context, mockFn, 1000);
        debouncedFn();

        vi.advanceTimersByTime(1000);
        expect(mockFn.mock.results[0].value).toBe('test');
    });

    it('应该处理0和负数延迟时间', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 0);

        debouncedFn();
        expect(mockFn).not.toBeCalled();
        vi.advanceTimersByTime(0);
        expect(mockFn).toBeCalledTimes(1);

        const negativeDebounced = debounce(mockFn, -1000);
        negativeDebounced();
        expect(mockFn).not.toBeCalled();
        vi.advanceTimersByTime(0);
        expect(mockFn).toBeCalledTimes(2);
    });

    it('应该在快速连续调用时只保留最后一个定时器', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 100);

        for (let i = 0; i < 10; i++) {
            debouncedFn(i);
            vi.advanceTimersByTime(50);
        }

        expect(mockFn).not.toBeCalled();
        vi.advanceTimersByTime(100);
        expect(mockFn).toBeCalledTimes(1);
        expect(mockFn).toBeCalledWith(9);
    });
});
