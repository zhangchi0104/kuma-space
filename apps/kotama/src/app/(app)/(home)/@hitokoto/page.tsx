/** @format */

import { client } from '@/src/apis/client';
import { isLocaleCjk } from '@/src/utils/fns';
import type { Hitokoto } from '@repo/db';
import { getLocale } from 'next-intl/server';

const defaultHitokoto: Hitokoto = {
  id: 0,
  content: '心有所想，日复一日，必有精进。',
  fromCharacter: '刻晴',
  fromWork: '原神',
  fromWorkType: 'anime',
};
const fetchHitokoto = async () => {
  const { data, error } = await client.hitokoto.index.get();
  if (error) {
    return defaultHitokoto;
  }
  return data;
};

const HitokotoPage = async () => {
  const hitokoto = await fetchHitokoto();
  const locale = await getLocale();
  const wrapper = isLocaleCjk(locale) ? '「」' : '""';
  const hasSource = hitokoto.fromCharacter || hitokoto.fromWork;
  return (
    <div className='flex flex-col  items-center justify-center py-12'>
      <p className='text-xl md:text-2xl lg:text-3xl text-foreground'>
        {hitokoto.content}
      </p>
      {hasSource && (
        <p className='text-md md:text-lg lg:text-xl text-muted-foreground italic mt-6'>
          <span>—— </span>
          {hitokoto.fromCharacter && <span>{hitokoto.fromCharacter}</span>}
          {hitokoto.fromWork && (
            <span className='ml-2 italic'>
              {wrapper[0]}
              {hitokoto.fromWork}
              {wrapper[1]}
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default HitokotoPage;
