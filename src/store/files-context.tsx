import { useState, createContext, useContext } from 'react';

const contents = [
  {
    id: 1,
    name: 'Documents',
    size: '--',
    date_created: '05/07/2020',
    files: true,
  },
  {
    id: 2,
    name: 'Downloads',
    size: '--',
    date_created: '13/01/2021',
    files: true,
  },
  {
    id: 3,
    name: 'Photos',
    size: '--',
    date_created: '24/08/2019',
    files: true,
  },
  {
    id: 4,
    name: 'Music',
    size: '--',
    date_created: '19/12/2021',
    files: true,
  },
  {
    id: 5,
    name: 'blueprint.jpg',
    size: '5.08 mb',
    date_created: '14/07/2021',
    files: false,
  },
  {
    id: 6,
    name: 'financials.xlsx',
    size: '1.43 mb',
    date_created: '17/03/2019',
    files: false,
  },
  {
    id: 7,
    name: 'NDA.docx',
    size: '1.03 mb',
    date_created: '17/11/2021',
    files: false,
  },
];

export const FilesContext = createContext([] as any);

export const FilesContextProvider = (props: any) => {
  const [files, setFiles] = useState(contents);

  return (
    <FilesContext.Provider value={{ files, setFiles }}>
      {props.children}
    </FilesContext.Provider>
  );
};

export const useFiles = () => useContext(FilesContext);
