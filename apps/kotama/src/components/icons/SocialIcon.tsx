/** @format */
'use client';
import { FC } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBilibili } from '@fortawesome/free-brands-svg-icons/faBilibili';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { socialIconColor, socialIconSize } from './common';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
type SocialIconMappings = {
  [key: string]: {
    url?: (id: string) => string;
    icon: FC<{ className?: string }>;
    bgColor: string;
    onClick?: (id: string) => void;
  };
};
const socialIconMappings: SocialIconMappings = {
  github: {
    url: (id: string) => `https://github.com/${id}`,
    icon: ({ className }) => (
      <FontAwesomeIcon icon={faGithub} className={className} />
    ),
    bgColor: 'bg-github',
  },
  linkedin: {
    url: (id: string) => `https://linkedin.com/in/${id}`,
    icon: ({ className }) => (
      <FontAwesomeIcon icon={faLinkedinIn} className={className} />
    ),
    bgColor: 'bg-linkedin',
  },
  bilibili: {
    url: (id: string) => `https://space.bilibili.com/${id}`,
    icon: ({ className }) => (
      <FontAwesomeIcon icon={faBilibili} className={className} />
    ),
    bgColor: 'bg-bilibili',
  },
  mail: {
    icon: ({ className }) => (
      <FontAwesomeIcon icon={faEnvelope} className={className} />
    ),
    bgColor: 'bg-mail',
  },
};

type SocialIconProps = {
  name: string;
  className?: string;
  id: string;
};

const SocialIcon: FC<SocialIconProps> = ({ name, className, id }) => {
  const userStlyes = className?.split(' ') ?? [];
  if (!(name in socialIconMappings)) {
    throw new Error('Invalid social icon name');
  }
  const { icon: Icon, url, bgColor, onClick } = socialIconMappings[name];
  const iconContainerStyle = clsx(
    [...userStlyes],
    bgColor,
    'rounded-full',
    'flex items-center justify-center',
    'p-2 w-8 h-8'
  );
  let onButtonClick;
  if (onClick) {
    onButtonClick = () => onClick(id);
  } else if (url) {
    onButtonClick = () => window.open(url(id), '_blank');
  }

  const iconStyle = clsx(socialIconColor, socialIconSize);
  return (
    <div className={iconContainerStyle}>
      <button
        className='flex items-center justify-center'
        onClick={onButtonClick}
      >
        <Icon className={iconStyle} />
      </button>
    </div>
  );
};

export default SocialIcon;
