import React, { FC } from 'react';
import styled from 'styled-components';
import theme from '../../../../theme';
import { useApps } from '../../../../store/apps-context';
import { allApps } from '../../../../features/allApps';

interface AppIconProps {
  tag: string;
  colors: any;
  icon: JSX.Element;
  id: number;
}

interface IconWrapperProps {
  colors: any;
}

const IconTag = styled.div`
  display: none;
  transition: ${theme.transitions.defaultTransition};
`;

const IconWrapper = styled.div<IconWrapperProps>`
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    ${(props) => props.colors[0]},
    ${(props) => props.colors[1]}
  );
  border-radius: 1rem;
  margin: 0 0.2rem;
  box-shadow: ${theme.shadows.defaultShadow};
  cursor: pointer;
  &:hover {
    ${IconTag} {
      display: block;
      position: absolute;
      top: -1.5rem;
      background-color: ${theme.colors.transparentGrayish};
      color: ${theme.colors.black};
      padding: 0.1rem 0.5rem;
      border-radius: 0.2rem;
      font-size: 0.8rem;
    }
  }
  @media (max-width: 375px) {
    margin-top: 0.5rem;
  }
`;

export const AppIcon: FC<AppIconProps> = ({ tag, colors, icon, id }) => {
  const { apps, setApps } = useApps();

  const handleClick = (id: number) => {
    const allOpenedApps = [...apps];
    const appOpenedIndex = allOpenedApps.findIndex((el) => el.name === tag);
    if (appOpenedIndex !== -1) {
      allOpenedApps.splice(appOpenedIndex, 1);
    }
    const app = allApps.find((el) => el.id === id).app;
    allOpenedApps.push(app);
    setApps(allOpenedApps);
  };

  return (
    <IconWrapper colors={colors} onClick={() => handleClick(id)}>
      {icon}
      <IconTag>{tag}</IconTag>
    </IconWrapper>
  );
};
