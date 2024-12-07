/** @format */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { camelCaseToTitle } from '~/utils/fns';
import { cn } from '~/utils/shadcn';
import { BaseStyleProps } from '~/utils/typings';
type ConstructionTasksProps = BaseStyleProps & {
  data: Record<string, { title: string; checked: boolean }[]>;
};

const renderTitleToTabsTrigger = (key: string) => (
  <TabsTrigger key={`TabsTrigger-${key}`} className='flex-1' value={key}>
    {camelCaseToTitle(key)}
  </TabsTrigger>
);
const ConstructionTasks: React.FC<ConstructionTasksProps> = ({
  className,
  data,
}) => {
  const keys = Object.keys(data);
  const pairs = Object.entries(data);
  return (
    <Tabs
      className={cn('w-full flex flex-col', className)}
      defaultValue={keys[0]}
    >
      <TabsList className='w-full flex flex-row'>
        {keys.map((key) => renderTitleToTabsTrigger(key))}
      </TabsList>
      {pairs.map(([key, value]) => (
        <ConstructionTabContent
          key={key}
          value={key}
          data={value}
          className='w-full'
        />
      ))}
    </Tabs>
  );
};

type ConstructionTabContentProps = {
  data: { title: string; checked: boolean }[];
  value: string;
} & BaseStyleProps;
const ConstructionTabContent: React.FC<ConstructionTabContentProps> = ({
  data,
  value,
  className,
}) => {
  const completedTasks = data.filter((item) => item.checked);
  const incompletedTasks = data.filter((item) => !item.checked);
  return (
    <TabsContent
      value={value}
      className={cn(
        'p-4 rounded-sm border border-dashed mt-6 md:mt-4 space-y-1',
        className
      )}
    >
      {incompletedTasks.map((item) => (
        <p key={`TabsContent-item-${item.title}`}>{item.title}</p>
      ))}
      {completedTasks.map((item) => (
        <p
          key={`TabsContent-item-${item.title}`}
          className='text-muted-foreground line-through w-full'
        >
          {item.title}
        </p>
      ))}
    </TabsContent>
  );
};

export default ConstructionTasks;
