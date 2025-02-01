/**
 * 修正 JavaScript 浮点数计算精度问题
 */

/**
 * 将数字转换为整数，避免科学计数法
 */
function toInteger(num: number): { times: number; num: number } {
    const str = num.toString();
    const decimal = str.split('.')[1];
    const times = decimal ? decimal.length : 0;
    const intNum = Number(str.replace('.', ''));
    return { times, num: intNum };
}

/**
 * 精确加法
 */
export function add(num1: number, num2: number): number {
    const { times: times1, num: int1 } = toInteger(num1);
    const { times: times2, num: int2 } = toInteger(num2);
    const maxTimes = Math.max(times1, times2);
    const base = Math.pow(10, maxTimes);
    const fixedNum1 =
        times1 < maxTimes ? int1 * Math.pow(10, maxTimes - times1) : int1;
    const fixedNum2 =
        times2 < maxTimes ? int2 * Math.pow(10, maxTimes - times2) : int2;
    return (fixedNum1 + fixedNum2) / base;
}

/**
 * 精确减法
 */
export function subtract(num1: number, num2: number): number {
    return add(num1, -num2);
}

/**
 * 精确乘法
 */
export function multiply(num1: number, num2: number): number {
    const { times: times1, num: int1 } = toInteger(num1);
    const { times: times2, num: int2 } = toInteger(num2);
    return (int1 * int2) / Math.pow(10, times1 + times2);
}

/**
 * 精确除法
 */
export function divide(num1: number, num2: number): number {
    const { times: times1, num: int1 } = toInteger(num1);
    const { times: times2, num: int2 } = toInteger(num2);
    return (int1 / int2) * Math.pow(10, times2 - times1);
}
