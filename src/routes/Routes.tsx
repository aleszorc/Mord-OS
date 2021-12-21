import React, { FC } from 'react';
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from 'react-router-dom';
import { Login } from '../components/Login';
import { OS } from '../components/OS';

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<OS />} />
      </BrowserRoutes>
    </BrowserRouter>
  );
};
