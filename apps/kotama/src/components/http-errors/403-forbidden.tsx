/** @format */

'use client';

import { useTranslations } from 'next-intl';
import ErrorSection from '../ErrorSection';

const Forbidden = () => {
  const t = useTranslations('Common.Error.forbidden');
  return <ErrorSection title={t('title')} description={t('description')} />;
};

export default Forbidden;
