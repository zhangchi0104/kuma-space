/** @format */

import { PropsWithChildren } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Header from './_header';
config.autoAddCss = false;
type LayoutProps = PropsWithChildren<{
  header?: React.ReactNode;
}>;
const Layout: React.FC<LayoutProps> = ({ children, header }) => {
  return (
    <>
      <Header />
      <div className='max-w-screen-xl mx-auto pt-12'>{children}</div>
    </>
  );
};
export default Layout;
