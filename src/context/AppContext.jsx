import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // States
  const [showOverlayScreen, setShowOverlayScreen] = useState(false);

  return (
    <AppContext.Provider value={{ showOverlayScreen, setShowOverlayScreen }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
