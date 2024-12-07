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
    <div className='flex flex-col justify-center py-12 max-w-lg mx-auto'>
      <p className='italic self-start text-md lg:text-md text-foreground'>
        {hitokoto.content}
      </p>
      {hasSource && (
        <p className=' self-end text-sm lg:text-md text-muted-foreground mt-3'>
          <span>—— </span>
          {hitokoto.fromCharacter && <span>{hitokoto.fromCharacter}</span>}
          {hitokoto.fromWork && (
            <span className='ml-2'>
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
