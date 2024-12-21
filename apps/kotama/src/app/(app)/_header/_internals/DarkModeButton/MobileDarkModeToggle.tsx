/** @format */

import { Drawer, DrawerContent, DrawerTitle } from '@/src/components/ui/drawer';

import { DrawerTrigger } from '@/src/components/ui/drawer';
import DarkModeTrigger from './DarkModeTrigger';

import MobileDrawer from './MobileDrawer';
const MobileDarkModeToggle = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DarkModeTrigger className='w-5 h-5' />
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-8 my-4'>
          <DrawerTitle className='text-xl font-bold text-center mb-6'>
            Dark Mode Toggle
          </DrawerTitle>
          <MobileDrawer className='mb-4' />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileDarkModeToggle;
