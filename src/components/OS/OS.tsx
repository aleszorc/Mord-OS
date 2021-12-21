import React, { FC, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { Layout } from '../Layout';
import { AppsBar } from './components/AppsBar';
import { InfoBar } from './components/InfoBar';
import uuid from 'react-uuid';
import { useApps } from '../../store/apps-context';
import { useAuth } from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Desktop = styled.div`
  height: 100%;
  width: 100%;
`;
export const OS: FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { apps } = useApps();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <Desktop>
        {apps.map((app) => (
          <Fragment key={uuid()}>{app.component}</Fragment>
        ))}
        <InfoBar />
        <AppsBar />
      </Desktop>
    </Layout>
  );
};
