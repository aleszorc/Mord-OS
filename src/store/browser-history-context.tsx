import { useState, createContext, useContext } from 'react';

export const BrowserHistoryContext = createContext([] as any);

export const BrowserHistoryContextProvider = (props: any) => {
  const [browserHistory, setBrowserHistory] = useState([
    'https://example.com/',
  ]);

  const [historyIndex, setHistoryIndex] = useState(0);

  return (
    <BrowserHistoryContext.Provider
      value={{
        browserHistory,
        setBrowserHistory,
        historyIndex,
        setHistoryIndex,
      }}
    >
      {props.children}
    </BrowserHistoryContext.Provider>
  );
};

export const useBrowserHistory = () => useContext(BrowserHistoryContext);
