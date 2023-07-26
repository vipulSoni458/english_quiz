import useVideoContext from "../../hooks/useVideoContext/useVideoContext";

import { ParticipantAudioTracks } from "../ParticipantAudioTracks/ParticipantAudioTracks";

import useParticipantsContext from "../../hooks/useParticipantsContext/useParticipantsContext";
import styled from "styled-components";
import Participant from "../Participant/Participant";

import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import ParticipantsAnimationBar from "../ParticipantsAnimationBar/ParticipantsAnimationBar";
import { allExcludedParticipant } from "../../utils/participantIdentity";
import ScreenShareDraggable from "../DraggableComponent/ScreenShareDraggable";
import useLocalAudioToggle from "../../hooks/useLocalAudioToggle/useLocalAudioToggle";
import { useEffect } from "react";

interface remotePCountInterface {
  remotePCount: number;
}

const ContainerAllScreen = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 174px);
  overflow: hidden;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
  gap: 5px;
`;

const Item = styled.div<remotePCountInterface>`
  width: ${(props) =>
    props.remotePCount === 0
      ? "calc(100% - 5px)"
      : props.remotePCount === 1
      ? "calc(50% - 5px)"
      : props.remotePCount === 2 || props.remotePCount === 3
      ? "calc(50% - 5px)"
      : "calc(33% - 5px)"};
  max-height: ${(props) =>
    props.remotePCount === 0 || props.remotePCount === 1
      ? "100%"
      : props.remotePCount === 2 || props.remotePCount == 3
      ? "50%"
      : "100%"};
  position: relative;
`;

export default function Room() {
  const { room } = useVideoContext();
  const localParticipant = room!.localParticipant;
  const { speakerViewParticipants } = useParticipantsContext();

  const remotePCount = speakerViewParticipants.length;

  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();

  const currentSelectedScreen = useSelector(
    (state: RootState) => state.liveClassDetails.currentSelectedScreen
  );

  const screenShareState = useSelector(
    (state: RootState) => state.dataTrackStore.ShreenShareTracks
  );

  useEffect(() => {
    if (isAudioEnabled) {
      toggleAudioEnabled();
    }
  }, []);

  return (
    <>
      {/* 
        This ParticipantAudioTracks component will render the audio track for all participants in the room.
        It is in a separate component so that the audio tracks will always be rendered, and that they will never be 
        unnecessarily unmounted/mounted as the user switches between Gallery View and speaker View.
      */}

      <ParticipantAudioTracks />
      <>
        {screenShareState.identity !== room?.localParticipant.identity &&
          screenShareState.publishedState && <ScreenShareDraggable />}
        {currentSelectedScreen === "/allScreen" ? (
          <ContainerAllScreen>
            <Item remotePCount={remotePCount}>
              {!allExcludedParticipant({
                identity: localParticipant.identity,
              }) && (
                <>
                  <ParticipantsAnimationBar
                    localParticipant={localParticipant}
                    participant={localParticipant}
                  />
                </>
              )}
              <Participant
                participant={localParticipant}
                isLocalParticipant={true}
              />
            </Item>

            {speakerViewParticipants.map((participant) => {
              return (
                <>
                  <Item remotePCount={remotePCount}>
                    {!allExcludedParticipant({
                      identity: participant.identity,
                    }) && (
                      <ParticipantsAnimationBar
                        localParticipant={localParticipant}
                        participant={participant}
                      />
                    )}
                    <Participant
                      key={participant.sid}
                      participant={participant}
                    />
                  </Item>
                </>
              );
            })}
          </ContainerAllScreen>
        ) : (
          <>
            <h1>All other Screens Component</h1>
          </>

          /* <ContainerAllScreen>
              <Item remotePCount={remotePCount}>
                <Participant
                  participant={localParticipant}
                  isLocalParticipant={true}
                />
              </Item>

              {speakerViewParticipants.map((participant) => {
                return (
                  <Item remotePCount={remotePCount}>
                    <Participant
                      key={participant.sid}
                      participant={participant}
                    />
                  </Item>
                );
              })}
            </ContainerAllScreen> */
        )}
      </>
    </>
  );
}
