import theme from '../theme';
import { css } from 'styled-components';

export const FlexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = css`
  ${FlexCenter}
  position: absolute;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 1.75rem;
  box-shadow: ${theme.shadows.defaultShadow};
  bottom: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const Modal = css`
  ${FlexCenter}
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  bottom: 0;
  flex-direction: column;
`;

export const Bar = css`
  ${FlexCenter}
  position: absolute;
  background-color: ${theme.colors.transparentGrayish};
  width: fit-content;
  padding: 0.3rem;
  border-radius: 1rem;
`;
