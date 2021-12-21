import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { AppWindow } from '../../components/OS/components/AppWindow';
import theme from '../../theme';
import * as Icons from '../../assets/icons';
import { FlexCenter } from '../../styles';
import { useBrowserHistory } from '../../store/browser-history-context';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  ${FlexCenter}
  margin: 0.25rem;
  height: 2rem;
  width: 2rem;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;

const UrlInput = styled.input`
  border: none;
  border-radius: 1rem;
  background-color: ${theme.colors.grayish};
  height: 2rem;
  margin: 0.5rem;
  padding-left: 1rem;
  flex-grow: 1;
`;

const BrowserFrame = styled.iframe`
  border: none;
  height: 100%;
`;

export const Browser: FC = () => {
  const { browserHistory, setBrowserHistory, historyIndex, setHistoryIndex } =
    useBrowserHistory();

  const currentSiteUrl = () => browserHistory[historyIndex];

  const [urlInput, setUrlInput] = useState(currentSiteUrl());

  const handleUrlInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const currentBrowserHistory = [...browserHistory];
      currentBrowserHistory.unshift(urlInput);
      setBrowserHistory(currentBrowserHistory);
      setHistoryIndex(0);
    }
  };

  const changeHistoryIndex = (changeType: string) => {
    let currentIndex = historyIndex;

    if (changeType === 'back') {
      if (historyIndex < browserHistory.length - 1) {
        currentIndex += 1;
        setHistoryIndex(currentIndex);
        setUrlInput(browserHistory[currentIndex]);
      }
    }

    if (changeType === 'forward') {
      if (historyIndex > 0) {
        currentIndex -= 1;
        setHistoryIndex(currentIndex);
        setUrlInput(browserHistory[currentIndex]);
      }
    }
  };

  return (
    <AppWindow
      width="60rem"
      height="40rem"
      name="Browser"
      color={theme.colors.lightPurplish}
    >
      <Main>
        <TopBar>
          <ButtonWrapper onClick={() => changeHistoryIndex('back')}>
            <Icons.ArrowCircleLeft />
          </ButtonWrapper>
          <ButtonWrapper onClick={() => changeHistoryIndex('forward')}>
            <Icons.ArrowCircleRight />
          </ButtonWrapper>
          <UrlInput
            placeholder="Enter website address"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => handleUrlInputKeyDown(e)}
          />
        </TopBar>
        <BrowserFrame title="browser" src={browserHistory[historyIndex]} />
      </Main>
    </AppWindow>
  );
};
