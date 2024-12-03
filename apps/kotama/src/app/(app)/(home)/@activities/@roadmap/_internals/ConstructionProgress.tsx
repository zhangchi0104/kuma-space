/** @format */

import { Progress } from '@/src/components/ui/progress';
import { cn } from '@/src/utils/shadcn';
import { BaseStyleProps } from '@/src/utils/typings';

/** @format */
type ConstructionData = Record<string, { done: number; total: number }>;
type ConstructionProgressProps = {
  segments: ConstructionData;
} & BaseStyleProps;
const ConstructionProgress: React.FC<ConstructionProgressProps> = ({
  segments,
  className,
}) => {
  return (
    <div className={cn('flex flex-row', className)}>
      <div className='grow space-y-6 mt-6'>
        {Object.entries(segments).map(([key, value], i) => (
          <div className='w-full' key={`ConstructionProgress-${key}`}>
            <p className='text-xl'>
              {key} -{' '}
              {((value.done / Math.max(1, value.total)) * 100).toFixed(0)}
              {'%'}
            </p>
            <Progress
              className='h-5 mt-3'
              key={key}
              value={(value.done / value.total) * 100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructionProgress;
