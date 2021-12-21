import React, { FC } from 'react';
import styled from 'styled-components';
import { FlexCenter } from '../../styles';

const Main = styled.div`
  ${FlexCenter}
  height: 100vh;
  max-height: 100vh;
  background-color: black;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(/images/background/mountains.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Layout: FC = ({ children }) => {
  return <Main>{children}</Main>;
};
