import { describe, it, expect, vi } from 'vitest';

import { throttle } from '../throttle';

describe('throttle', () => {
    vi.useFakeTimers();

    beforeEach(() => {
        vi.clearAllTimers();
    });

    it('应该立即执行第一次调用', () => {
        const mockFn = vi.fn();
        const throttledFn = throttle(mockFn, 1000);

        throttledFn();
        expect(mockFn).toBeCalledTimes(1);
    });

    it('在节流时间内应该忽略额外的调用', () => {
        const mockFn = vi.fn();
        const throttledFn = throttle(mockFn, 1000);

        throttledFn();
        vi.advanceTimersByTime(500);
        throttledFn();
        expect(mockFn).toBeCalledTimes(1);
    });

    it('应该在延迟后执行最后一次调用', () => {
        const mockFn = vi.fn();
        const throttledFn = throttle(mockFn, 1000);

        throttledFn('first');
        vi.advanceTimersByTime(500);
        throttledFn('second');
        vi.advanceTimersByTime(1000);

        expect(mockFn).toBeCalledTimes(2);
        expect(mockFn.mock.calls[1][0]).toBe('second');
    });

    it('应该保持正确的this上下文', () => {
        const context = { value: 'test' };
        const mockFn = vi.fn(function (this: any) {
            return this.value;
        });

        const throttledFn = throttle.call(context, mockFn, 1000);
        throttledFn();

        expect(mockFn.mock.results[0].value).toBe('test');
    });

    it('应该处理0和负数延迟时间', () => {
        const mockFn = vi.fn();
        const throttledFn = throttle(mockFn, 0);

        throttledFn();
        expect(mockFn).toBeCalledTimes(1);

        const negativeThrottled = throttle(mockFn, -1000);
        negativeThrottled();
        expect(mockFn).toBeCalledTimes(2);
    });

    it('应该在连续快速调用时保持正确的调用频率', () => {
        const mockFn = vi.fn();
        const throttledFn = throttle(mockFn, 100);

        // 模拟连续快速调用
        for (let i = 0; i < 5; i++) {
            throttledFn(i);
            vi.advanceTimersByTime(50); // 每次调用间隔50ms
        }

        expect(mockFn).toBeCalledTimes(1); // 第一次调用立即执行
        expect(mockFn).toHaveBeenCalledWith(0); // 第一次调用的参数

        vi.advanceTimersByTime(100); // 等待节流时间
        expect(mockFn).toBeCalledTimes(2); // 应该执行最后一次调用
        expect(mockFn).toHaveBeenCalledWith(4); // 最后一次调用的参数
    });

    it('应该在最后一次调用后正确执行', () => {
        const mockFn = vi.fn();
        const throttledFn = throttle(mockFn, 100);

        throttledFn('first');
        vi.advanceTimersByTime(50);
        throttledFn('second');
        vi.advanceTimersByTime(100);

        expect(mockFn).toBeCalledTimes(2);
        expect(mockFn.mock.calls).toEqual([['first'], ['second']]);
    });
});
