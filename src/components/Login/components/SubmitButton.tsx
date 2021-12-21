import React, { FC } from 'react';
import styled from 'styled-components';
import { ArrowCircleRight } from '../../../assets/icons';
import theme from '../../../theme';

interface SubmitButtonProps {
  onSubmit: () => void;
}

const IconWrapper = styled.div`
  position: absolute;
  top: 0.1rem;
  right: -0.5rem;
  cursor: pointer;
  opacity: 1;
  transition: ${theme.transitions.defaultTransition};
  padding: 1rem;
  &:hover {
    opacity: 0.5;
  }
`;

export const SubmitButton: FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <IconWrapper onClick={onSubmit}>
      <ArrowCircleRight />
    </IconWrapper>
  );
};
