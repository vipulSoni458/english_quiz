import React from "react";
import ParticipantTracks from "../ParticipantTracks/ParticipantTracks";
import { Participant as IParticipant } from "twilio-video";
import ParticipantInfo from "../ParticipantInfo/ParticipantInfo";

interface ParticipantProps {
  participant: IParticipant;
  videoOnly?: boolean;
  enableScreenShare?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  isLocalParticipant?: boolean;
  hideParticipant?: boolean;
  isDominantSpeaker?: boolean;
  fromScreen?: string;
  localParticipantIdentity?: string;
  remoteParticipantIdentity?: string;
}

export function Participant({
  participant,
  videoOnly,
  enableScreenShare,
  isLocalParticipant,
  fromScreen,
  remoteParticipantIdentity,
}: ParticipantProps) {
  return (
    <ParticipantInfo
      participant={participant}
      isLocalParticipant={isLocalParticipant}
      screen={fromScreen}
      remoteParticipantIdentity={remoteParticipantIdentity}
    >
      <ParticipantTracks
        participant={participant}
        videoOnly={videoOnly}
        enableScreenShare={enableScreenShare}
        isLocalParticipant={isLocalParticipant}
      />
    </ParticipantInfo>
  );
}

export default React.memo(Participant);
