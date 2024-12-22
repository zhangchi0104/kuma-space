/** @format */
import DarkModeTrigger from '../desktop/DarkModeTrigger';

import MobileDrawer from './MobileDrawer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
const MobileDarkModeToggle = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DarkModeTrigger className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent className='w-full max-w-sm rounded-md'>
        <div className=''>
          <DialogHeader className='text-lg font-semibold text-start mb-12'>
            <DialogTitle>Dark Mode Toggle</DialogTitle>
          </DialogHeader>
          <MobileDrawer className='mb-4' />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default MobileDarkModeToggle;
