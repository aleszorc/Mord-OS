import { useState, createContext, useContext } from 'react';

export const AppsContext = createContext([] as any);

export const AppsContextProvider = (props: any) => {
  const [apps, setApps] = useState([]);

  return (
    <AppsContext.Provider value={{ apps, setApps }}>
      {props.children}
    </AppsContext.Provider>
  );
};

export const useApps = () => useContext(AppsContext);
