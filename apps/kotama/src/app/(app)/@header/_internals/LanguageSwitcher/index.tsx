/** @format */

import { useLocale, useTranslations } from 'next-intl';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '~/components/ui/dropdown-menu';
import { Locale, locales } from '~/i18n/config';
import { BaseStyleProps } from '~/utils/typings';
import LanguageSwitcherItem from './LanguageSwitcherItem';
import { LanguageIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const LanguageSwitcher: React.FC<BaseStyleProps> = ({ className, style }) => {
  const currentLocale = useLocale() as Locale;
  const t = useTranslations('Home.LanguageSwitcher');
  const classNames = clsx('text-foreground', 'w-5', 'h-5', className);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size={'icon'} style={style}>
          <LanguageIcon className={classNames} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {locales.map((label) => (
          <LanguageSwitcherItem
            selected={label === currentLocale}
            key={`LanguageSwitcherItem-${label}`}
            label={t(label)}
            value={label}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
