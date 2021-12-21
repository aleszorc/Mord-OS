import React, { FC } from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import { Logo } from '../../../assets/logo/Logo';
import { FlexCenter } from '../../../styles';

const LogoWrapper = styled.div`
  ${FlexCenter}
  height: 8rem;
  width: 8rem;
  flex-direction: column;
  background-color: ${theme.colors.pinkish};
  border-radius: 4rem;
  opacity: 0.8;
  box-shadow: ${theme.shadows.defaultShadow};
`;

const BrandName = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-size: 1.5rem;
`;

export const LoginLogo: FC = () => {
  return (
    <LogoWrapper>
      <Logo />
      <BrandName>Mord</BrandName>
    </LogoWrapper>
  );
};
