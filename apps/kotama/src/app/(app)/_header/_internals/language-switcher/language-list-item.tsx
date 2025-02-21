/** @format */

import { BaseStyleProps } from '@/src/utils/typings';

import { Locale } from '@/src/i18n/config';
import { cn } from '@/src/utils/shadcn';
import { CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@/src/components/ui/button';

type LanguageListItemProps = {
  selected?: boolean;
  value: Locale;
  localizedName: string;
  nativeName: string;
} & BaseStyleProps;
const LanguageListItem: React.FC<LanguageListItemProps> = ({
  value,
  localizedName,
  nativeName,
  className,
  selected,
}) => {
  return (
    <button
      data-locale={value}
      className='text-start w-full hover:bg-muted transition-colors px-2 py-1 rounded-md flex bg-transparent flex-row items-center justify-between'
    >
      <div className={cn(className)}>
        <p className={cn('text-sm', selected && 'font-bold')}>
          {localizedName}
        </p>
        <p
          className={cn(
            'text-xs text-muted-foreground',
            selected && 'font-bold'
          )}
        >
          {nativeName}
        </p>
      </div>
      {selected && <CheckIcon className='w-5 h-5' />}
    </button>
  );
};

export default LanguageListItem;
