/** @format */

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { ProfileIconProps } from '../props';
import ProfileIcon from '../ProfileIcon';
import { signOut } from '@/src/auth';
import { ExitIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
type SignOutDialogProps = ProfileIconProps;
const SignOutDialog: React.FC<SignOutDialogProps> = ({
  name,
  avatarUrl,
  className,
}) => {
  const t = useTranslations('Header.signOutDialog');
  return (
    <Dialog>
      <DialogTrigger>
        <ProfileIcon name={name} avatarUrl={avatarUrl} className={className} />
      </DialogTrigger>
      <DialogContent className='max-w-sm rounded-md'>
        <DialogHeader className='flex flex-col items-center'>
          <ProfileIcon
            className='absolute top-[-2.5rem] w-20 h-20 shadow-md '
            name={name}
            avatarUrl={avatarUrl}
          />
          <DialogTitle className='pt-6'>
            <p className='text-xl font-semibold'>{t('greeting', { name })}</p>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button
              className='w-full flex flex-row items-center justify-center gap-2'
              type='submit'
            >
              <ExitIcon className='w-4 h-4' />
              <p>{t('signOutButton')}</p>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SignOutDialog;
