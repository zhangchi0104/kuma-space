/** @format */
import Image from 'next/image';
import ProfileImage from '@/public/images/profile-min.png';
const PortraitImage = () => {
  return (
    <Image
      src={ProfileImage}
      alt='My Profile Image'
      width={350}
      height={350}
      priority={false}
      className='rounded-full mx-auto w-[240px] h-[240px] md:w-auto md:h-auto'
    />
  );
};

export default PortraitImage;
