import { add, subtract, multiply, divide } from '../math';

describe('数学计算函数', () => {
    describe('add', () => {
        it('应该正确处理整数相加', () => {
            expect(add(1, 2)).toBe(3);
            expect(add(0, 5)).toBe(5);
            expect(add(-1, 1)).toBe(0);
        });

        it('应该正确处理小数相加', () => {
            expect(add(0.1, 0.2)).toBe(0.3);
            expect(add(1.234, 2.345)).toBe(3.579);
            expect(add(0.1234, 0.0001)).toBe(0.1235);
        });
    });

    describe('subtract', () => {
        it('应该正确处理整数相减', () => {
            expect(subtract(5, 3)).toBe(2);
            expect(subtract(0, 5)).toBe(-5);
            expect(subtract(-1, -1)).toBe(0);
        });

        it('应该正确处理小数相减', () => {
            expect(subtract(0.3, 0.1)).toBe(0.2);
            expect(subtract(3.456, 1.234)).toBe(2.222);
            expect(subtract(1.0001, 0.0001)).toBe(1);
        });
    });

    describe('multiply', () => {
        it('应该正确处理整数相乘', () => {
            expect(multiply(2, 3)).toBe(6);
            expect(multiply(0, 5)).toBe(0);
            expect(multiply(-2, 3)).toBe(-6);
        });

        it('应该正确处理小数相乘', () => {
            expect(multiply(0.1, 0.2)).toBe(0.02);
            expect(multiply(1.23, 4.56)).toBe(5.6088);
            expect(multiply(0.001, 0.01)).toBe(0.00001);
        });
    });

    describe('divide', () => {
        it('应该正确处理整数相除', () => {
            expect(divide(6, 2)).toBe(3);
            expect(divide(0, 5)).toBe(0);
            expect(divide(-6, 2)).toBe(-3);
        });

        it('应该正确处理小数相除', () => {
            expect(divide(0.3, 0.1)).toBe(3);
            expect(divide(5.6088, 4.56)).toBe(1.23);
            expect(divide(0.00001, 0.001)).toBe(0.01);
        });

        it('应该处理除数为0的情况', () => {
            expect(() => divide(1, 0)).toThrow();
            expect(() => divide(0, 0)).toThrow();
        });
    });
});
