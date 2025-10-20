import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Header from "../shared/Header";
import SideNav from "./SideNav";

const AppLayout = ({ children, className, sideOverlayChild }) => {
  // Context
  const { showOverlayScreen, setShowOverlayScreen } = useContext(AppContext);

  // Ref
  const overlayRef = useRef();

  // Handlers
  const handleClearOverlay = (e) => {
    if (overlayRef?.current && !overlayRef?.current?.contains(e?.target)) {
      setShowOverlayScreen(false);
    }
  };

  // Effects
  useEffect(() => {
    document.addEventListener("mousedown", handleClearOverlay);

    return () => {
      document.removeEventListener("mousedown", handleClearOverlay);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col p-4 gap-4 relative">
      {showOverlayScreen && (
        <div className=" fixed z-15 w-full h-full top-0 left-0 bg-black/40 cursor-auto"></div>
      )}
      <Header />
      <section className="flex-1 ">
        <SideNav />
        <section className={`flex-1 h-full mx-2 md:mx-33 ${className}`}>
          {children}
        </section>
      </section>

      <div
        className={`fixed h-full md:h-[calc(100vh-32px)] md:left-none right-0 md:right-4 top-0 md:top-4 bottom-0 md:bottom-4 z-20 md:w-114 w-full shadow-mainstack-main md:rounded-xl rounded-sm bg-mainstack-primary-white two-sec-transition ${
          !showOverlayScreen ? "translate-x-[500px]" : "translate-x-[0px]"
        }`}
        ref={overlayRef}
      >
        {sideOverlayChild}
      </div>
    </main>
  );
};

export default AppLayout;
