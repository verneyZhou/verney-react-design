"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const jsxRuntime = require("../../skip/_virtual/jsx-runtime.mjs");
const classNames = require("classnames");
const require$$0 = require("react");
;/* empty css             */
const VirtualListItem = ({
  children,
  itemKey = 0,
  style,
  index = 0,
  onSizeChange,
  itemWrapperClass = ""
}) => {
  const virtualItemRef = require$$0.useRef(null);
  const resizeObserver = require$$0.useRef(null);
  require$$0.useEffect(() => {
    if (virtualItemRef.current) {
      const domNode = virtualItemRef.current.firstChild;
      if (!domNode) return;
      resizeObserver.current = new ResizeObserver(() => {
        window.requestAnimationFrame(() => {
          onSizeChange(index, domNode);
        });
      });
      resizeObserver.current.observe(domNode);
    }
    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, []);
  const itemWrapperClassName = require$$0.useMemo(() => {
    return classNames("verney-virtual-list__item", itemWrapperClass);
  }, [itemWrapperClass]);
  return /* @__PURE__ */ jsxRuntime.jsxRuntimeExports.jsx("div", { ref: virtualItemRef, className: itemWrapperClassName, "data-key": itemKey, style, children });
};
exports.default = VirtualListItem;
//# sourceMappingURL=virtual-list-item.mjs.map
