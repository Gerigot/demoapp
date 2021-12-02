import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewUser, getUsers } from "./UsersSlice";

interface Props {
  addParticipants: (userIds: number[]) => void;
  onClose: () => void;
  open: boolean;
}

export default function Users({
  addParticipants,
  open = false,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [username, setusername] = useState("");
  const [checkedUser, setcheckedUser] = useState<{ [key: number]: boolean }>(
    {}
  );

  const users = useAppSelector((state) => state.users.list);
  console.log(users);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setusername("");
        setcheckedUser([]);
        onClose();
      }}
    >
      <DialogTitle>Utenti</DialogTitle>
      <DialogContent>
        <div className="users-content">
          {users.map((user) => {
            return (
              <FormControlLabel
                key={user.id}
                control={
                  <Checkbox
                    checked={checkedUser[user.id] === true}
                    onChange={(event) => {
                      setcheckedUser({
                        ...checkedUser,
                        [user.id]: event.target.checked,
                      });
                    }}
                  />
                }
                label={user.username}
              />
            );
          })}
          <Button
            onClick={() => {
              addParticipants(
                Object.keys(checkedUser)
                  .filter((userId) => checkedUser[Number(userId)])
                  .map((id) => Number(id))
              );
            }}
          >
            Aggiungi ai partecipanti
          </Button>
        </div>
        <Divider />
        <div>
          <p>Crea un nuovo utente</p>
          <TextField
            label="username"
            value={username}
            onChange={(event) => {
              setusername(event?.target.value);
            }}
          />
          <Button
            onClick={() => {
              dispatch(addNewUser({ username: username }));
              setusername("");
            }}
          >
            Crea
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
