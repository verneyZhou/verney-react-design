import classNames from 'classnames';
import React, { forwardRef } from 'react';
import './style.scss';

export interface InputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'size' | 'prefix' | 'suffix'
    > {
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

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className,
        size = 'middle',
        disabled = false,
        status,
        bordered = true,
        prefix,
        suffix,
        allowClear,
        ...rest
    } = props;

    const inputClassName = classNames(
        'verney-input',
        {
            [`verney-input-${size}`]: size,
            'verney-input-disabled': disabled,
            [`verney-input-${status}`]: status,
            'verney-input-borderless': !bordered,
        },
        className
    );

    return (
        <div className="verney-input-wrapper">
            {prefix && <span className="verney-input-prefix">{prefix}</span>}
            <input
                ref={ref}
                className={inputClassName}
                disabled={disabled}
                {...rest}
            />
            {(suffix || allowClear) && (
                <span className="verney-input-suffix">
                    {allowClear && rest.value && (
                        <button
                            type="button"
                            className="verney-input-clear-icon"
                            onClick={() => {
                                if (rest.onChange) {
                                    const e = new Event('input', {
                                        bubbles: true,
                                    }) as any;
                                    e.target = { value: '' };
                                    rest.onChange(e);
                                }
                            }}
                        >
                            ×
                        </button>
                    )}
                    {suffix}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';
