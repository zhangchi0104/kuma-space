/** @format */

import { auth } from '~/auth';

const SessionPage = async () => {
  const session = await auth();
  return (
    <div>
      SessionPage: <p>{JSON.stringify(session, null, 2)}</p>
    </div>
  );
};

export default SessionPage;
