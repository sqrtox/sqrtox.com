"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { MouseEventHandler } from "react";
import styles from "./note-card.module.css";
import type { CompiledNote } from "./note-card-list";
import NoteTime from "./note-time";

export interface NoteCardProps {
  note: CompiledNote;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <Card className={styles.card}>
      <CardActionArea onClick={onClick}>
        <Stack padding={2} spacing={1} width={250} height={300}>
          <NoteTime time={note.time} />
          <Typography
            className={styles.cardText}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {note.text}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
