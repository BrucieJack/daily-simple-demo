import { useCallback, useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import HeaderDesktop from "../HeaderDesktop/ui/HeaderDesktop";
import * as jwt from "jsonwebtoken";

const CALL_OPTIONS = {
  showLeaveButton: true,
  iframeStyle: {
    position: "absolute",
    top: "200px",
    left: "20%",
    height: "80%",
    width: "80%",
    aspectRatio: 16 / 9,
    minwidth: "400px",
    maxWidth: "920px",
    border: "0",
    borderRadius: "12px",
  },
};

export function Call({ room, setRoom, callFrame, setCallFrame, expiry }) {
  const callRef = useRef(null);

  function startLiveStreaming() {
    callFrame.startLiveStreaming({
      rtmpUrl: "rtmp://a.rtmp.youtube.com/live2/5sgt-9kqs-haga-79ce-ecze",
    });
  }

  function generateMeetingToken() {
    const payload = {
      r: "deep-movie",
      o: "is_owner",
    };
    try {
      const token = jwt.sign(
        payload,
        "9077ed00a57905223aea67fa7f92daf75a235e0a51285c790207884296800aa9",
        { expiresIn: "1h" }
      );
      return token;
    } catch (e) {
      throw new Error(`failed to create self-signed JWT: ${e.toString()}`);
    }
  }

  const createAndJoinCall = useCallback(() => {
    const newCallFrame = DailyIframe.createFrame(
      callRef?.current,
      CALL_OPTIONS
    );

    setCallFrame(newCallFrame);

    const token = generateMeetingToken();

    newCallFrame.join({ url: "https://nikitos.daily.co/deep-movie", token });

    newCallFrame.startLiveStreaming({
      rtmpUrl: "rtmp://a.rtmp.youtube.com/live2/5sgt-9kqs-haga-79ce-ecze",
      layout: {
        preset: "default",
        max_cam_streams: 5,
      },
    });

    const leaveCall = () => {
      setRoom(null);
      setCallFrame(null);
      callFrame.destroy();
    };

    newCallFrame.on("left-meeting", leaveCall);
  }, [room, setCallFrame]);

  /**
   * Initiate Daily iframe creation on component render if it doesn't already exist
   */
  useEffect(() => {
    if (callFrame) return;

    createAndJoinCall();
  }, [callFrame, createAndJoinCall]);

  return (
    <div>
      <HeaderDesktop />
      <button
        style={{ position: "absolute", top: 200 }}
        onClick={startLiveStreaming}
      >
        Начать трансляцию
      </button>
      <div className="call-container">
        <div ref={callRef} className="call" />

        <style jsx>{`
          .call-container {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
          }
          .call-container :global(.call) {
            width: 100%;
          }
          .call-container :global(.button) {
            margin-top: var(--spacing-md);
          }
          .call-container :global(.card) {
            max-width: 300px;
            max-height: 400px;
          }
          .call-container :global(.card-footer) {
            align-items: center;
            gap: var(--spacing-xxs);
          }
          .call-container :global(.countdown) {
            position: static;
            border-radius: var(--radius-sm);
          }
          @media only screen and (max-width: 750px) {
            .call-container {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Call;
