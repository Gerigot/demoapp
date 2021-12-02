import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TalkItem from "./TalkItem";
import { addNewTalk, getTalkList } from "./TalkListSlice";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./TalkList.css";
import dayjs from "dayjs";

export default function TalkList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTalkList());
  }, [dispatch]);
  const talkList = useAppSelector((state) => state.talkList);

  const [openNewTalkDialog, setopenNewTalkDialog] = useState(false);
  const [newTalkName, setnewTalkName] = useState("");
  const [newTalkDate, setnewTalkDate] = useState("");

  const handleClose = () => {
    setnewTalkDate("");
    setnewTalkName("");
    setopenNewTalkDialog(false);
  };
  return (
    <div className="talkList-container">
      <Typography sx={{ textAlign: "center" }} variant="h1">
        TALKS
      </Typography>
      <div className="talkList-list">
        {talkList.talks.map((talk) => {
          return <TalkItem key={talk.id} item={talk} talkId={talk.id} />;
        })}
      </div>
      <Fab
        sx={{ position: "fixed" }}
        className="talkList-addButton"
        size="large"
        color="primary"
        aria-label="add"
        onClick={() => setopenNewTalkDialog(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog open={openNewTalkDialog} onClose={handleClose}>
        <DialogTitle>Nuovo talk</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Compila i campi qui sotto per aggiungere un nuovo talk
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="talkname"
            label="Nome del nuovo talk"
            type="text"
            fullWidth
            variant="standard"
            value={newTalkName}
            onChange={(event) => setnewTalkName(event.target.value)}
          />
          <TextField
            type="datetime-local"
            value={newTalkDate}
            onChange={(event) => {
              setnewTalkDate(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button
            onClick={() => {
              if (dayjs(newTalkDate).isValid()) {
                dispatch(
                  addNewTalk({
                    talkName: newTalkName,
                    talkDate: dayjs(newTalkDate).toISOString(),
                  })
                );
                handleClose();
              } else {
                console.log("wrooong");
              }
            }}
          >
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
