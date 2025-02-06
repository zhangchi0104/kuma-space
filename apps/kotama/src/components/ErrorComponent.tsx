/** @format */

'use client';
import ErrorSection from '@/src/components/ErrorSection';
import { ErrorProps } from '@repo/types';
import { useTranslations } from 'next-intl';
const ErrorComponent = ({ error, reset }: ErrorProps) => {
  const t = useTranslations('Common.Error');
  return (
    <ErrorSection
      title={t('title')}
      description={t('description')}
      reset={reset}
    />
  );
};

export default ErrorComponent;
