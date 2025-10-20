import React, { useState, useRef, useEffect } from "react";

const Tooltip = ({
  content,
  children,
  offset = 8,
  preferredPosition = "top",
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(preferredPosition);
  const [styles, setStyles] = useState({});
  const [arrowStyles, setArrowStyles] = useState({});
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!visible || !wrapperRef.current || !tooltipRef.current) return;

    const triggerRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let pos = preferredPosition;
    let top = 0,
      left = 0;

    const fitsTop = triggerRect.top >= tooltipRect.height + offset;
    const fitsBottom =
      viewportHeight - triggerRect.bottom >= tooltipRect.height + offset;
    const fitsLeft = triggerRect.left >= tooltipRect.width + offset;
    const fitsRight =
      viewportWidth - triggerRect.right >= tooltipRect.width + offset;

    switch (preferredPosition) {
      case "top":
        if (fitsTop) pos = "top";
        else if (fitsBottom) pos = "bottom";
        else pos = fitsTop ? "top" : "bottom";
        break;
      case "bottom":
        if (fitsBottom) pos = "bottom";
        else if (fitsTop) pos = "top";
        else pos = fitsBottom ? "bottom" : "top";
        break;
      case "left":
        if (fitsLeft) pos = "left";
        else if (fitsRight) pos = "right";
        else pos = fitsRight ? "right" : "left";
        break;
      case "right":
        if (fitsRight) pos = "right";
        else if (fitsLeft) pos = "left";
        else pos = fitsLeft ? "left" : "right";
        break;
      default:
        pos = "top";
    }

    if (pos === "top") {
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    } else if (pos === "bottom") {
      top = triggerRect.bottom + offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    } else if (pos === "left") {
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left - tooltipRect.width - offset;
    } else if (pos === "right") {
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.right + offset;
    }

    top = Math.max(0, Math.min(top, viewportHeight - tooltipRect.height));
    left = Math.max(0, Math.min(left, viewportWidth - tooltipRect.width));

    let arrowOffsetX = 0,
      arrowOffsetY = 0;
    const arrowSize = 8;
    if (pos === "top" || pos === "bottom") {
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      arrowOffsetX = triggerCenterX - left - arrowSize;
      arrowOffsetX = Math.max(
        arrowSize,
        Math.min(tooltipRect.width - arrowSize * 3, arrowOffsetX)
      );
    } else {
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;
      arrowOffsetY = triggerCenterY - top - arrowSize;
      arrowOffsetY = Math.max(
        arrowSize,
        Math.min(tooltipRect.height - arrowSize * 3, arrowOffsetY)
      );
    }

    setPosition(pos);
    setStyles({ top: `${top}px`, left: `${left}px` });
    setArrowStyles({
      top: pos === "left" || pos === "right" ? `${arrowOffsetY}px` : undefined,
      left: pos === "top" || pos === "bottom" ? `${arrowOffsetX}px` : undefined,
    });
  }, [visible, preferredPosition, offset]);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 px-2 py-1 text-sm rounded-0 text-white bg-mainstack-primary-black font-sans font-semibold max-w-100
            shadow-lg whitespace transform transition-opacity duration-200
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
          style={styles}
        >
          {content}

          <div
            className={`
              absolute w-2 h-2 bg-mainstack-primary-black rotate-45
            `}
            style={{
              ...arrowStyles,
              [position === "top"
                ? "bottom"
                : position === "bottom"
                ? "top"
                : position === "left"
                ? "right"
                : "left"]: "-4px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
