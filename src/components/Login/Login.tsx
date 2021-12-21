import React, { FC, useState } from 'react';
import { Layout } from '../Layout';
import styled, { css } from 'styled-components';
import { LoginLogo, LoginInput } from './components';
import theme from '../../theme';
import { login } from '../../services/auth';
import { useAuth } from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 20rem;
`;

const LoginInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = css`
  margin: 0;
  font-size: 0.8rem;
`;

const ErrorBox = styled.div`
  height: 1rem;
`;

const ErrorText = styled.p`
  ${Text}
  color: ${theme.colors.redish};
  padding-top: 0.2rem;
`;

const InfoText = styled.div`
  ${Text}
  color: ${theme.colors.grayish};
  padding-top: 0.5rem;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 1rem;
`;

export const Login: FC = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setLoginCredentials({ ...loginCredentials, [name]: e.target.value });
  };

  const handleSubmit = () => {
    if (loginCredentials.email !== '' && loginCredentials.password !== '') {
      const isUser = login(loginCredentials.email, loginCredentials.password);
      if (isUser) {
        setAuth(true);
        setIsError(false);
        navigate('/app', { replace: true });
      }
    }
    setLoginCredentials({ email: '', password: '' });
    setIsError(true);
  };

  return (
    <Layout>
      <LoginBox>
        <LoginLogo />
        <LoginInputs>
          <LoginInput
            placeholder="Enter email"
            type="email"
            name="email"
            onChange={handleChange}
            value={loginCredentials.email}
          />
          <LoginInput
            placeholder="Enter password"
            type="password"
            name="password"
            onChange={handleChange}
            value={loginCredentials.password}
            submit
            onSubmit={handleSubmit}
          />
          <ErrorBox>
            {isError && <ErrorText>Wrong email or password.</ErrorText>}
          </ErrorBox>
          <InfoText>
            No account? Sign up for early access{' '}
            <a href="mailto:sales@mordos.com"> here!</a>
          </InfoText>
        </LoginInputs>
      </LoginBox>
      <Footer>
        <InfoText>
          © {new Date().getFullYear()} MordOS Inc. All rights reserved.
        </InfoText>
      </Footer>
    </Layout>
  );
};
