/** @format */

import { auth } from "~/auth";

const SessionPage = async () => {
  const session = await auth();
  return (
    <div>
      {/* @ts-ignore */}
      <elevenlabs-convai agent-id="yzoNyxVkvnDpFe7adBu6"></elevenlabs-convai>
      <script
        src="https://elevenlabs.io/convai-widget/index.js"
        async
        type="text/javascript"
      ></script>
      {/* @ts-ignore */}
      <elevenlabs-convai
        className="top-0 bottom-0"
        agent-id="UF1IU2PpNUdaF5rC9Ba0"
      >
        {/* @ts-ignore */}
      </elevenlabs-convai>
      <script
        src="https://elevenlabs.io/convai-widget/index.js"
        async
        type="text/javascript"
      ></script>
    </div>
  );
};

export default SessionPage;
