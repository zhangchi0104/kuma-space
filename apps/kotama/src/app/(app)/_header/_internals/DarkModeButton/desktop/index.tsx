/** @format */

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import DarkModeButtonContent from './DarkModeButtonContent';
import DarkModeTrigger from './DarkModeTrigger';
import { BaseStyleProps } from '@/src/utils/typings';
const DesktopDarkModeToggle: React.FC<BaseStyleProps> = ({ className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DarkModeTrigger className={className} />
      </DropdownMenuTrigger>
      <DarkModeButtonContent />
    </DropdownMenu>
  );
};
export default DesktopDarkModeToggle;
