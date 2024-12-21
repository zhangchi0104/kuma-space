/** @format */

import { signOut } from '@/src/auth';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { cn } from '@/src/utils/shadcn';
import { BaseStyleProps } from '@/src/utils/typings';
import { ExitIcon } from '@radix-ui/react-icons';

type ProfileIconProps = {
  name: string;
  avatarUrl: string;
} & BaseStyleProps;
const ProfileIcon: React.FC<ProfileIconProps> = ({
  name,
  avatarUrl,
  className,
}: ProfileIconProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={cn('w-10 h-10', className)}>
          <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-2'>
        <DropdownMenuItem>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className='flex items-center gap-2'>
              <span>
                <ExitIcon />
              </span>
              Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
ProfileIcon.displayName = 'ProfileIcon';
export default ProfileIcon;
