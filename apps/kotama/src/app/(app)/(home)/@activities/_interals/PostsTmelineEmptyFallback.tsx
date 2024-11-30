/** @format */
import { BaseStyleProps } from '@/src/utils/typings';
import { faJava } from '@fortawesome/free-brands-svg-icons/faJava';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/src/utils/shadcn';
const EmptyFallback: React.FC<BaseStyleProps> = ({ className }) => {
  return (
    <div className={cn('text-center text-muted-foreground', className)}>
      <FontAwesomeIcon icon={faJava} size='10x' />
      <div className='mt-4'>
        <p className='text-lg leading-8'>Sit down and relax</p>
        <p className='text-sm leading-8'>More content is coming soon...</p>
      </div>
    </div>
  );
};

export default EmptyFallback;
