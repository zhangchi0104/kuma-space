/** @format */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { LanguageIcon } from '@heroicons/react/24/outline';
import LanguageList from './LanguageList';
import { Button } from '@/src/components/ui/button';

const LanguageSwitcher = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <LanguageIcon className='w-5 h-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Language</DialogTitle>
        </DialogHeader>
        <LanguageList />
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSwitcher;
