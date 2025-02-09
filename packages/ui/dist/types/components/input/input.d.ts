import { default as React } from 'react';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
    /**
     * 输入框大小
     */
    size?: 'small' | 'middle' | 'large';
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 输入框状态
     */
    status?: 'error' | 'warning';
    /**
     * 是否显示边框
     */
    bordered?: boolean;
    /**
     * 前缀图标
     */
    prefix?: React.ReactNode;
    /**
     * 后缀图标
     */
    suffix?: React.ReactNode;
    /**
     * 允许清除内容
     */
    allowClear?: boolean;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
