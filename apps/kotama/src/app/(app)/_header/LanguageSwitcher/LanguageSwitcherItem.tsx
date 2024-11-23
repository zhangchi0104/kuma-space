/** @format */

import { cn } from '@/src/utils/shadcn';
import { CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { Locale } from '~/i18n/config';
import { BaseStyleProps } from '~/utils/typings';
import { setUserLocale } from '~/utils/userLocale';
export interface LanguageSwitcherItemProps {
  selected: boolean;
  label: string;
  value: Locale;
}

const LanguageSwitcherItem: React.FC<
  LanguageSwitcherItemProps & BaseStyleProps
> = ({ selected, label, value, style, className }) => {
  const classNames = clsx('flex', 'space-between', className);
  return (
    <DropdownMenuItem
      style={style}
      className={classNames}
      onClick={() => {
        setUserLocale(value);
      }}
    >
      <div className='w-full flex flex-row justify-between'>
        <span className={clsx(selected && 'font-semibold')}>{label}</span>
        {selected && <CheckIcon className='w-5 ' />}
      </div>
    </DropdownMenuItem>
  );
};

export default LanguageSwitcherItem;
