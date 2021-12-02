import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Talk } from "../talk/TalkSlice";
import { formatDate } from "../../utils/dateUtil";

interface TalkItemProps {
  item: Talk;
  talkId: number;
}

export default function TalkItem({ item, talkId }: TalkItemProps) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {formatDate(item.talkDate)}
        </Typography>
        <Typography variant="h5" component="div">
          {item.talkName}
        </Typography>
        <Typography variant="body2">
          Partecipanti attesi{" "}
          {item.expectedParticipants?.length
            ? item.expectedParticipants?.length
            : 0}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`${talkId}`}>
          <Button size="small">Apri</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
