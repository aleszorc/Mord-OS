import { useState, createContext, useContext } from 'react';

export const NotesContext = createContext([] as any);

export const NotesContextProvider = (props: any) => {
  const [notes, setNotes] = useState([
    { id: '1', title: 'Shopping list', text: 'Buy milk' },
    { id: '2', title: 'To-do', text: 'Take out the laundry' },
  ]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
