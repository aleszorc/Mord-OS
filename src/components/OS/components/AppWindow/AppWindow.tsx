import React, { FC, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import theme from '../../../../theme';
import { AppTopBar } from './AppTopBar';

interface AppWindowProps {
  name: string;
  color: string;
  height?: string;
  width?: string;
}

interface AppWindowBoxProps {
  height: string;
  width: string;
}

const AppWindowBox = styled.div<AppWindowBoxProps>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.defaultShadow};
  position: absolute;
  z-index: 2;
  border-radius: 0.5rem;
  @media (max-width: 375px) {
    height: 100vh;
    width: 100%;
    border-radius: 0;
  }
`;

export const AppWindow: FC<AppWindowProps> = ({
  name,
  color,
  children,
  height,
  width,
}) => {
  const [isFullscreen, setFullscreen] = useState(false);

  const nodeRef = useRef(null);

  const handleToggleFullScreen = () => setFullscreen(!isFullscreen);

  return (
    <Draggable nodeRef={nodeRef} handle=".handle" bounds="body">
      <AppWindowBox
        ref={nodeRef}
        width={isFullscreen ? '100%' : width}
        height={isFullscreen ? '100%' : height}
      >
        <AppTopBar
          name={name}
          color={color}
          isFullscreen={isFullscreen}
          handleToggleFullScreen={handleToggleFullScreen}
        />
        {children}
      </AppWindowBox>
    </Draggable>
  );
};
