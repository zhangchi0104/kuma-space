/** @format */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { LanguageIcon } from '@heroicons/react/24/outline';
import LanguageList from './LanguageList';
import { Button } from '@/src/components/ui/button';
import { useTranslations } from 'next-intl';

const LanguageSwitcher = () => {
  const t = useTranslations('Header.LanguageSwitcher');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <LanguageIcon className='w-5 h-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm'>
        <DialogHeader className='text-start'>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <LanguageList />
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSwitcher;
