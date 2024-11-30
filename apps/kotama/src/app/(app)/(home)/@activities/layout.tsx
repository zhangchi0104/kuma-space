/** @format */

import React from 'react';

const ActivitiesLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2'>{children}</section>
  );
};

export default ActivitiesLayout;
