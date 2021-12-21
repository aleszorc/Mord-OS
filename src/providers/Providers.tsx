import React, { FC } from 'react';
import { AppsContextProvider } from '../store/apps-context';
import { NotesContextProvider } from '../store/notes-context';
import { FilesContextProvider } from '../store/files-context';
import { PhotosContextProvider } from '../store/photos-context';
import { BrowserHistoryContextProvider } from '../store/browser-history-context';
import { AuthContextProvider } from '../store/auth-context';

export const Providers: FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <AppsContextProvider>
        <NotesContextProvider>
          <FilesContextProvider>
            <PhotosContextProvider>
              <BrowserHistoryContextProvider>
                {children}
              </BrowserHistoryContextProvider>
            </PhotosContextProvider>
          </FilesContextProvider>
        </NotesContextProvider>
      </AppsContextProvider>
    </AuthContextProvider>
  );
};
