import Head from "next/head";
import Call from "../../src/pages/Call";
import { useState } from "react";

const VideoRoom = () => {
  const [callFrame, setCallFrame] = useState(null);
  return (
    <>
      <Head>
        <title>DeepMovie - Video</title>
      </Head>
      <Call setCallFrame={setCallFrame} callFrame={callFrame} />
    </>
  );
};

export default VideoRoom;
