import React, { FC } from 'react';
import styled from 'styled-components';
import { AppIcon } from './AppIcon';
import { allApps } from '../../../../features/allApps';
import uuid from 'react-uuid';
import { Bar } from '../../../../styles';

const AppsBarBox = styled.div`
  ${Bar}
  left: 0;
  right: 0;
  bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 375px) {
    position: relative;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: transparent;
    width: fit-content;
    bottom: 0;
    margin: 0;
    top: 4rem;
  }
`;

export const AppsBar: FC = () => {
  return (
    <AppsBarBox>
      {allApps.map((app) => (
        <AppIcon
          key={uuid()}
          id={app.id}
          tag={app.tag}
          colors={app.colors}
          icon={app.icon}
        />
      ))}
    </AppsBarBox>
  );
};
