import { default as React } from 'react';
export type ButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text';
export type ButtonSize = 'large' | 'middle' | 'small';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: ButtonType;
    size?: ButtonSize;
    shape?: ButtonShape;
    loading?: boolean;
    disabled?: boolean;
    danger?: boolean;
    block?: boolean;
    icon?: React.ReactNode;
    htmlType?: ButtonHTMLType;
    className?: string;
    children?: React.ReactNode;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
