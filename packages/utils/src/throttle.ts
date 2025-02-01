/**
 * 节流函数，用于限制函数的执行频率
 * @param fn 需要节流的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let lastTime = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function (this: unknown, ...args: Parameters<T>) {
        const now = Date.now();

        if (now - lastTime >= delay) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(this, args);
            lastTime = now;
        } else if (!timer) {
            timer = setTimeout(
                () => {
                    fn.apply(this, args);
                    lastTime = Date.now();
                    timer = null;
                },
                delay - (now - lastTime)
            );
        }
    };
}
