import React, { FC, useState } from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import * as Icons from '../../assets/icons';
import uuid from 'react-uuid';
import { Button } from '../../styles';
import { AppWindow } from '../../components/OS/components/AppWindow';
import { useNotes } from '../../store/notes-context';

const Main = styled.div`
  display: flex;
  height: 90%;
  width: 100%;
  overflow: scroll;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

const NotesList = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-right: 1px solid ${theme.colors.grayish};
`;

const Note = styled.h5`
  margin: 0;
  padding-bottom: 0.5rem;
  cursor: pointer;
`;

const NewNote = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 100%;
`;

const NewNoteTitle = styled.input`
  border: none;
  font-size: 1.2rem;
`;

const NewNoteText = styled.textarea`
  height: 100%;
  width: 100%;
  padding-top: 0.5rem;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  resize: none;
`;

const SaveButton = styled.div`
  ${Button}
  background-color: ${theme.colors.lightBrownish};
  right: 2rem;
`;

const NewButton = styled.div`
  ${Button}
  background-color: ${theme.colors.lightBrownish};
  left: 2rem;
`;

export const Notes: FC = () => {
  const { notes, setNotes } = useNotes();

  const [newNote, setNewNote] = useState({ title: '', text: '', id: '' });

  const saveNote = () => {
    const currentNotes = [...notes];
    if (newNote.id) {
      const updatedNoteIndex = notes.findIndex((el) => el.id === newNote.id);
      currentNotes[updatedNoteIndex].title = newNote.title;
      currentNotes[updatedNoteIndex].text = newNote.text;
    } else {
      if (newNote.text !== '') {
        currentNotes.push({
          id: uuid(),
          title: newNote.title || 'Untitled',
          text: newNote.text,
        });
        setNewNote({ title: '', text: '', id: '' });
      }
    }
    setNotes(currentNotes);
  };

  return (
    <AppWindow
      name="Notes"
      color={theme.colors.lightBrownish}
      width="30rem"
      height="30rem"
    >
      <Main>
        <NotesList>
          {notes.map((note) => (
            <Note
              onClick={() =>
                setNewNote({ title: note.title, text: note.text, id: note.id })
              }
              key={uuid()}
            >
              {note.title}
            </Note>
          ))}
          <NewButton
            onClick={() => setNewNote({ title: '', text: '', id: '' })}
          >
            <Icons.Plus />
          </NewButton>
        </NotesList>
        <NewNote>
          <NewNoteTitle
            placeholder="Title"
            value={newNote.title}
            name="title"
            type="text"
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <NewNoteText
            placeholder="Note"
            value={newNote.text}
            name="text"
            onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
          />

          <SaveButton onClick={saveNote}>
            <Icons.Save />
          </SaveButton>
        </NewNote>
      </Main>
    </AppWindow>
  );
};
