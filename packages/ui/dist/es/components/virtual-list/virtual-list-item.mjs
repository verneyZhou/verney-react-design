import { j as jsxRuntimeExports } from "../../skip/_virtual/jsx-runtime.mjs";
import classNames from "classnames";
import { useRef, useEffect, useMemo } from "react";
/* empty css            */
const VirtualListItem = ({
  children,
  itemKey = 0,
  style,
  index = 0,
  onSizeChange,
  itemWrapperClass = ""
}) => {
  const virtualItemRef = useRef(null);
  const resizeObserver = useRef(null);
  useEffect(() => {
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
  const itemWrapperClassName = useMemo(() => {
    return classNames("verney-virtual-list__item", itemWrapperClass);
  }, [itemWrapperClass]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: virtualItemRef, className: itemWrapperClassName, "data-key": itemKey, style, children });
};
export {
  VirtualListItem as default
};
//# sourceMappingURL=virtual-list-item.mjs.map
