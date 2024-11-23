/** @format */

import clsx from 'clsx';
import HeaderImage from './HeaderImage';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
/** @format */
const menuBarContainerStyle = clsx(
  'flex',
  'flex-row',
  'justify-center',
  'items-center',
  'mx-auto',
  'px-4',
  'space-x-8'
);
type MenuBarProps = {
  className?: string;
};
const menuBarItemStyle = clsx('text-md', 'cursor-pointer', 'py-2 px-4');
const MenuBar: FC<MenuBarProps> = ({ className }) => {
  const t = useTranslations('Home.MenuBar');
  return (
    <div className={className}>
      <HeaderImage className='mr-4' />
      <div className={menuBarContainerStyle}>
        <Link className={menuBarItemStyle} href='/'>
          {t('home')}
        </Link>
        <Link className={menuBarItemStyle} href='/blogs'>
          {t('blog')}
        </Link>
        <Link className={menuBarItemStyle} href='/about'>
          {t('aboutMe')}
        </Link>
        <Link className={menuBarItemStyle} href='/friends'>
          {t('friends')}
        </Link>
      </div>
    </div>
  );
};
export default MenuBar;
