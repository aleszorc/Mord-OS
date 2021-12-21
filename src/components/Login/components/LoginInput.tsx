import React, { FC } from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import { SubmitButton } from './SubmitButton';

interface LoginInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  placeholder?: string;
  submit?: boolean;
  onSubmit?: () => void;
  type?: string;
  value: string;
}

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  height: 2rem;
  width: 10rem;
  background-color: ${theme.colors.grayish};
  border: none;
  border-radius: 2.5rem;
  margin-top: 0.5rem;
  padding: 0;
  padding-left: 1rem;
  box-shadow: ${theme.shadows.defaultShadow};
  ::placeholder {
    color: ${theme.colors.blackish};
  }
`;

export const LoginInput: FC<LoginInputProps> = ({
  name,
  onChange,
  onSubmit,
  placeholder,
  submit,
  value,
  type,
}) => {
  return (
    <InputWrapper>
      <Input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(e) => onChange(e, name)}
        value={value}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
      />
      {submit && value && <SubmitButton onSubmit={onSubmit} />}
    </InputWrapper>
  );
};
