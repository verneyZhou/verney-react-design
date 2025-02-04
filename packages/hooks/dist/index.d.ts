/**
 * 在组件挂载时执行一次性的副作用操作
 * @param fn 需要执行的函数
 */
declare const useMount: (fn: () => void) => void;

/**
 * 在组件卸载时执行清理操作
 * @param fn 需要执行的清理函数
 */
declare const useUnmount: (fn: () => void) => void;

/**
 * 强制组件重新渲染
 * @returns 触发重新渲染的函数
 */
declare const useUpdate: () => () => void;

export { useMount, useUnmount, useUpdate };
