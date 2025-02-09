"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("../../skip/_virtual/jsx-runtime.mjs");
const classNames = require("classnames");
const require$$0 = require("react");
;/* empty css             */
const Input = require$$0.forwardRef((props, ref) => {
  const {
    className,
    size = "middle",
    disabled = false,
    status,
    bordered = true,
    prefix,
    suffix,
    allowClear,
    ...rest
  } = props;
  const inputClassName = classNames(
    "verney-input",
    {
      [`verney-input-${size}`]: size,
      "verney-input-disabled": disabled,
      [`verney-input-${status}`]: status,
      "verney-input-borderless": !bordered
    },
    className
  );
  return /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsxs("div", { className: "verney-input-wrapper", children: [
    prefix && /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("span", { className: "verney-input-prefix", children: prefix }),
    /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx(
      "input",
      {
        ref,
        className: inputClassName,
        disabled,
        ...rest
      }
    ),
    (suffix || allowClear) && /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsxs("span", { className: "verney-input-suffix", children: [
      allowClear && rest.value && /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "verney-input-clear-icon",
          onClick: () => {
            if (rest.onChange) {
              const e = new Event("input", {
                bubbles: true
              });
              e.target = { value: "" };
              rest.onChange(e);
            }
          },
          children: "×"
        }
      ),
      suffix
    ] })
  ] });
});
Input.displayName = "Input";
exports.Input = Input;
//# sourceMappingURL=input.mjs.map
