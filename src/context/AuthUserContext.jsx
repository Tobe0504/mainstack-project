import { useEffect } from "react";
import { createContext, useState } from "react";
import { useRequest } from "../hooks/useRequests";
import { getUser } from "../lib/services/userService";

export const AuthUserContext = createContext();

const AuthUserContextProvider = ({ children }) => {
  // States
  const [user, setUser] = useState({
    loading: false,
    data: null,
  });

  // Custom Hooks
  const { makeRequest, loading } = useRequest();

  // Effects
  useEffect(() => {
    makeRequest(getUser).then((res) => {
      setUser(res);
    });
  }, [makeRequest]);

  return (
    <AuthUserContext.Provider value={{ user, loading }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
