/** @format */

import { BaseStyleProps } from '@/src/utils/typings';
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import clsx from 'clsx';
import { socialIconColor, socialIconSize } from './common';

const MailIcon: FC<BaseStyleProps> = () => {
  const iconStyle = clsx(socialIconSize, socialIconColor, 'p-2');
  return (
    <button className='w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center'>
      <FontAwesomeIcon icon={faEnvelope} className={iconStyle} />
    </button>
  );
};
export default MailIcon;
