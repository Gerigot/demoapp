import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { formatDate } from "../../utils/dateUtil";
import Users from "../users/Users";
import {
  addTalkNewInvitation,
  getTalkInfo,
  getTalkRandomParticipant,
  setTalkInvitationState,
} from "./TalkSlice";

export default function Talk() {
  let params = useParams();
  const talkId = Number(params.talkid);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTalkInfo(talkId));
  }, [dispatch, talkId]);

  const [openUserPanel, setopenUserPanel] = useState(false);

  const talk = useAppSelector((state) => state.talk);
  if (!talk) {
    return (
      <div>
        <h1>Non ci sono Talk con questo id</h1>
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h2">{talk?.talk?.talkName}</Typography>
      <Typography variant="h4" gutterBottom>
        del {formatDate(talk?.talk?.talkDate)}
      </Typography>{" "}
      <Button
        onClick={() => {
          dispatch(getTalkRandomParticipant(talkId));
        }}
      >
        Seleziona un partecipante
      </Button>
      {talk.selectedParticipant ? (
        <h1>
          Il partecipante selezionato è {talk.selectedParticipant.user.username}
        </h1>
      ) : null}
      <Typography variant="h5">Lista partecipanti</Typography>
      {talk?.talk?.expectedParticipants
        .filter((partecipant) => !partecipant.absent)
        .map((participant) => {
          return (
            <div
              onClick={() => {
                dispatch(
                  setTalkInvitationState({
                    talkId,
                    invitationId: participant.id,
                    absent: true,
                  })
                );
              }}
              key={participant.id}
            >
              <Typography variant="body1">
                {participant.user.username}
              </Typography>
            </div>
          );
        })}
      <Button
        onClick={() => {
          setopenUserPanel(true);
        }}
      >
        Aggiungi partecipanti
      </Button>
      <Typography variant="h5">Lista assenti</Typography>
      {talk?.talk?.expectedParticipants
        .filter((partecipant) => partecipant.absent)
        .map((participant) => {
          return (
            <div
              onClick={() => {
                dispatch(
                  setTalkInvitationState({
                    talkId,
                    invitationId: participant.id,
                    absent: false,
                  })
                );
              }}
              key={participant.id}
            >
              <Typography variant="body1">
                {participant.user.username}
              </Typography>
              <Typography variant="caption">
                {formatDate(participant.updated)}
              </Typography>
            </div>
          );
        })}
      <Users
        onClose={() => {
          setopenUserPanel(false);
        }}
        open={openUserPanel}
        addParticipants={(usersIdToAdd: number[]) => {
          usersIdToAdd.forEach((userId) => {
            //TODO da spostare nel backend attualmente fatto qui per semplicità
            if (
              !talk.talk?.expectedParticipants.find(
                (participant) => participant.user.id === userId
              )
            ) {
              dispatch(addTalkNewInvitation({ userId, talkId }));
            }
          });
        }}
      />
    </div>
  );
}
