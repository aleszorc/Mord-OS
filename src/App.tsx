import React from 'react';
import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import { Routes } from './routes';
import { Providers } from './providers';

export const GlobalStyle = createGlobalStyle`

  html {
    font-size: 16px;
    height: 100%;
  }

  body {
    margin: 0;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
    height: 100%;
  }

  a {
    color: ${theme.colors.pinkish};
    text-decoration: none;
    :visited {
      color: ${theme.colors.pinkish}
    }
  }

  textarea:focus, input:focus{
    outline: none;
}
`;

const App = () => {
  return (
    <Providers>
      <GlobalStyle />
      <Routes />
    </Providers>
  );
};

export default App;
