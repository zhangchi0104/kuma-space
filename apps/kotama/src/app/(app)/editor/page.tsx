/** @format */

import AuthGuard from '@/src/components/utils/auth-guard';
import MilkdownEditor from './_internals/editor';

const EditorPage = () => {
  return (
    <div className='flex size-full items-center justify-center'>
      <AuthGuard requiresAdmin>
        <MilkdownEditor />
      </AuthGuard>
    </div>
  );
};

export default EditorPage;
