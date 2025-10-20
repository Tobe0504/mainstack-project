import { useState, useEffect, useRef } from "react";

const useClearComponent = (initialState = false) => {
  const [show, setShow] = useState(initialState);
  const overlayRef = useRef();

  const handleClearOverlay = (e) => {
    if (overlayRef?.current && !overlayRef?.current?.contains(e?.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClearOverlay);

    return () => {
      document.removeEventListener("mousedown", handleClearOverlay);
    };
  }, []);

  return { show, setShow, overlayRef };
};

export default useClearComponent;
