/** @format */
'use client';

import { useTranslations } from 'next-intl';
import ErrorSection from '../error-section';

const Unauthorized = () => {
  const t = useTranslations('Common.Error.unauthorized');
  return (
    <ErrorSection
      title={t('title')}
      description={t('description')}
      reset={() => {}}
    />
  );
};

export default Unauthorized;
