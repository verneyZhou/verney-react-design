"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const jsxRuntime = require("../../skip/_virtual/jsx-runtime.mjs");
const classNames = require("classnames");
;/* empty css             */
const Button = ({
  type = "default",
  size = "middle",
  shape = "default",
  loading = false,
  disabled = false,
  danger = false,
  block = false,
  icon,
  htmlType = "button",
  className,
  children,
  ...rest
}) => {
  const prefixCls = "verney-btn";
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${shape}`]: shape !== "default",
    [`${prefixCls}-${size}`]: size !== "middle",
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-danger`]: danger,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-disabled`]: disabled
  });
  const iconNode = loading ? /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("span", { className: `${prefixCls}-loading-icon` }) : icon;
  return /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsxs(
    "button",
    {
      ...rest,
      type: htmlType,
      className: classes,
      disabled: disabled || loading,
      children: [
        iconNode,
        children && /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("span", { children })
      ]
    }
  );
};
exports.default = Button;
//# sourceMappingURL=button.mjs.map
