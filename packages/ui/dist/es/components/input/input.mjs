import { j as jsxRuntimeExports } from "../../skip/_virtual/jsx-runtime.mjs";
import classNames from "classnames";
import { forwardRef } from "react";
/* empty css            */
const Input = forwardRef((props, ref) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "verney-input-wrapper", children: [
    prefix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "verney-input-prefix", children: prefix }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref,
        className: inputClassName,
        disabled,
        ...rest
      }
    ),
    (suffix || allowClear) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "verney-input-suffix", children: [
      allowClear && rest.value && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
export {
  Input
};
//# sourceMappingURL=input.mjs.map
