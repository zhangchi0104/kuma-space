/** @format */

import data from './data.json';
import ConstructionProgress from './_internals/ConstructionProgress';
export default function ProgressPage() {
  const { currentFocus, ...todos } = data;
  const segments: Record<string, { done: number; total: number }> = {};
  for (const [key, value] of Object.entries(todos)) {
    segments[key] = value.reduce(
      (acc, curr) => ({
        done: acc.done + (curr.checked ? 1 : 0),
        total: acc.total + 1,
      }),
      { done: 0, total: 0 }
    );
  }

  return (
    <div className='self-start'>
      <p className='text-lg font-medium'>
        <span className='mr-2'>📌 Current Stage: </span>
        <span className='text-muted-foreground'>{data.currentFocus}</span>
        <div>
          <ConstructionProgress segments={segments} />
        </div>
      </p>
    </div>
  );
}
