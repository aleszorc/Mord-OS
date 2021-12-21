import { useState, createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (auth: boolean) => {
    if (auth) {
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
