import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import theme from '../../../../../theme';
import * as Icons from '../../../../../assets/icons';
import { useApps } from '../../../../../store/apps-context';
import { FlexCenter } from '../../../../../styles';

interface AppTopBarProps {
  name: string;
  color: string;
  isFullscreen: boolean;
  handleToggleFullScreen: () => void;
}

interface AppTopBarWrapperProps {
  color: string;
}

const AppTopBarWrapper = styled.div<AppTopBarWrapperProps>`
  background-color: ${(props) => props.color};
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  cursor: grabbing;
  @media (max-width: 375px) {
    height: 3rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    justify-content: center;
  }
`;

const AppName = styled.h4`
  @media (max-width: 375px) {
    font-size: 1.3rem;
    text-transform: uppercase;
  }
`;

const AppTopBarIcons = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 375px) {
    display: none;
  }
`;

const IconWrapper = css`
  ${FlexCenter}
  height: 1.4rem;
  width: 1.4rem;
  border-radius: 0.7rem;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.blackish};
    color: ${theme.colors.white};
  }
`;

const ResizeIconWrapper = styled.div`
  ${IconWrapper}
  margin-right: 0.2rem;
`;

const CloseIconWrapper = styled.div`
  ${IconWrapper}
  margin-right: 1rem;
`;

export const AppTopBar: FC<AppTopBarProps> = ({
  name,
  color,
  isFullscreen,
  handleToggleFullScreen,
}) => {
  const { apps, setApps } = useApps();

  const handleClose = () => {
    const openedApps = [...apps];
    const appIndex = openedApps.findIndex((el) => el.name === name);
    if (appIndex !== -1) {
      openedApps.splice(appIndex, 1);
      setApps(openedApps);
    }
  };

  return (
    <AppTopBarWrapper color={color} className="handle" onTouchEnd={handleClose}>
      <div />
      <AppName>{name}</AppName>
      <AppTopBarIcons>
        <ResizeIconWrapper onClick={handleToggleFullScreen}>
          {!isFullscreen ? <Icons.Expand /> : <Icons.Compress />}
        </ResizeIconWrapper>
        <CloseIconWrapper onClick={handleClose}>
          <Icons.Close />
        </CloseIconWrapper>
      </AppTopBarIcons>
    </AppTopBarWrapper>
  );
};
