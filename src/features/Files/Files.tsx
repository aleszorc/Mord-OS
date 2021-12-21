import React, { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import * as Icons from '../../assets/icons';
import uuid from 'react-uuid';
import { useEffect } from 'react';
import { AppWindow } from '../../components/OS/components/AppWindow';
import { useFiles } from '../../store/files-context';
import { Modal, Button } from '../../styles';

const Main = styled.div`
  height: 20rem;
  width: 100%;
  overflow: scroll;
  padding-top: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

const Header = styled.th`
  width: 8rem;
  padding-left: 2rem;
  font-size: 0.8rem;
  text-align: left;
`;

const SortButton = styled.span`
  padding-left: 0.5rem;
`;

const Column = styled.td`
  width: 8rem;
  padding-left: 2rem;
  font-size: 0.8rem;
`;

const FolderIconWrapper = styled.span`
  padding-right: 0.3rem;
`;

const NewFolderButton = styled.div`
  ${Button}
  background-color: ${theme.colors.lightBluish};
  right: 2rem;
`;

const NewFolderModal = styled.div`
  ${Modal}
  position: absolute;
  background-color: ${theme.colors.blackish};
  border-radius: 0.5rem;
`;

const NewFolderInput = styled.input`
  border: none;
  height: 1.5rem;
  padding-left: 0.5rem;
  border-radius: 0.3rem;
`;

export const Files: FC = () => {
  const { files, setFiles } = useFiles();
  const [descSort, setDescSort] = useState(true);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderModalIsOpen, setNewFolderModalIsOpen] = useState(false);

  const inputRef = useRef(null);

  const today = new Date();

  useEffect(() => {
    if (newFolderModalIsOpen) {
      inputRef.current.focus();
    }
  }, [newFolderModalIsOpen]);

  const handleSort = () => {
    setDescSort(!descSort);
    const contents = [...files];
    contents.sort((a, b) => {
      if (a.name < b.name) {
        if (descSort) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a.name > b.name) {
        if (descSort) {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    });
    setFiles(contents);
  };

  const createFolder = () => {
    if (newFolderName !== '') {
      const contents = [...files];
      contents.push({
        id: uuid(),
        name: newFolderName,
        size: '--',
        date_created:
          today.getDate() +
          '/' +
          (today.getMonth() + 1) +
          '/' +
          today.getFullYear(),
        files: true,
      });
      setFiles(contents);
      setNewFolderName('');
      setNewFolderModalIsOpen(false);
    }
  };

  const handleNewFolderInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (e.key) {
      case 'Enter':
        createFolder();
        break;
      case 'Escape':
        setNewFolderModalIsOpen(false);
        setNewFolderName('');
        break;
    }
  };
  return (
    <AppWindow name="Files" color={theme.colors.lightBluish}>
      <Main>
        <table>
          <thead>
            <tr>
              <Header>
                Name
                <SortButton onClick={() => handleSort()}>
                  <Icons.SortDown />
                </SortButton>
              </Header>
              <Header>Size</Header>
              <Header>Date Added</Header>
            </tr>
          </thead>
          <tbody>
            {files.map((content) => (
              <tr key={uuid()}>
                {content.files ? (
                  <Column>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FolderIconWrapper>
                        <Icons.Folder />
                      </FolderIconWrapper>
                      {content.name}
                    </div>
                  </Column>
                ) : (
                  <Column>{content.name}</Column>
                )}
                <Column>{content.size}</Column>
                <Column>{content.date_created}</Column>
              </tr>
            ))}
          </tbody>
        </table>
        <NewFolderButton
          onClick={() => setNewFolderModalIsOpen(!newFolderModalIsOpen)}
        >
          <Icons.FolderPlus />
        </NewFolderButton>
        {newFolderModalIsOpen && (
          <NewFolderModal
            onClick={() => {
              setNewFolderModalIsOpen(!newFolderModalIsOpen);
              setNewFolderName('');
            }}
          >
            <NewFolderInput
              placeholder="New folder"
              value={newFolderName}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => handleNewFolderInputKeyDown(e)}
              onChange={(e) => setNewFolderName(e.target.value)}
              ref={inputRef}
            />
          </NewFolderModal>
        )}
      </Main>
    </AppWindow>
  );
};
