/** @format */

// 'use client';
import React, { Children } from 'react';
type ComposeProvidersProps = React.PropsWithChildren<{}>;
const FlattenProviders: React.FC<ComposeProvidersProps> = ({ children }) => {
  const childrenList = Children.toArray(children);
  const reduced = childrenList.reduceRight((child: any, parent: any) =>
    React.cloneElement(parent, { children: child })
  );
  return reduced;
};

export default FlattenProviders;
