import classNames from 'classnames';
import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import './style.scss';

export type ButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text';
export type ButtonSize = 'large' | 'middle' | 'small';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
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

const Button: React.FC<ButtonProps> = ({
    type = 'default',
    size = 'middle',
    shape = 'default',
    loading = false,
    disabled = false,
    danger = false,
    block = false,
    icon,
    htmlType = 'button',
    className,
    children,
    ...rest
}) => {
    const prefixCls = 'verney-btn';

    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${shape}`]: shape !== 'default',
        [`${prefixCls}-${size}`]: size !== 'middle',
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-danger`]: danger,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-disabled`]: disabled,
    });

    const iconNode = loading ? (
        <span className={`${prefixCls}-loading-icon`}>
            {/* 这里可以添加loading图标组件 */}
        </span>
    ) : (
        icon
    );

    return (
        <button
            {...rest}
            type={htmlType}
            className={classes}
            disabled={disabled || loading}
        >
            {iconNode}
            {children && <span>{children}</span>}
        </button>
    );
};

export default Button;
