import React, { FC } from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { useComments } from '../../services/data-services';
import { AppWindow } from '../../components/OS/components/AppWindow';
import uuid from 'react-uuid';

const Main = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

const MessageBox = styled.div`
  display: flex;
  width: 25rem;
  border-radius: 0.2rem;
  box-shadow: ${theme.shadows.card};
  padding: 1rem;
  margin: 0.5rem 1rem;
  @media (max-width: 375px) {
    width: 80%;
  }
`;

const AvatarWrapper = styled.div`
  width: fit-content;
  position: relative;
`;

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.lightGreenish};
  border-radius: 1rem;
  font-weight: bold;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
`;

const Name = styled.h4`
  margin: 0;
  padding-top: 0.4rem;
`;

const Body = styled.p`
  font-size: 0.8rem;
`;

export const Reads: FC = () => {
  const { data, error } = useComments();

  error && <Body>Something went wrong.</Body>;

  return (
    <>
      {data && (
        <AppWindow
          name="Reads"
          color={theme.colors.lighterGreenish}
          height="40rem"
        >
          <Main>
            {data.slice(1, 50).map((message) => (
              <MessageBox key={uuid()}>
                <AvatarWrapper>
                  <Avatar>{message.email[0]}</Avatar>
                </AvatarWrapper>
                <Message>
                  <Name>{message.name}</Name>
                  <Body>{message.body}</Body>
                </Message>
              </MessageBox>
            ))}
          </Main>
        </AppWindow>
      )}
    </>
  );
};
