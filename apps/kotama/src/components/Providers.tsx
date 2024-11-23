/** @format */

'use client';
import React from 'react';
import FlattenProviders from './ComposeProviders';
import { store } from '../atoms/store';
import BreakpointDetector from './utils/BreakpointDetector';
import { Provider as JotaiProvider } from 'jotai';

const ClientProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <FlattenProviders>
      <JotaiProvider store={store} />
      <BreakpointDetector />
      {children}
    </FlattenProviders>
  );
};

export default ClientProviders;
