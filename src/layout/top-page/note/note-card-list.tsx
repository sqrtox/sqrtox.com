"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "material-symbols/chevron_left.svg";
import ChevronRightIcon from "material-symbols/chevron_right.svg";
import CloseIcon from "material-symbols/close.svg";
import { useState } from "react";
import type { Html } from "#src/article/markdown";
import Icon from "#src/component/icon";
import Content from "#src/layout/article-page/content/content";
import NoteCard from "./note-card";
import NoteTime from "./note-time";

export interface CompiledNote {
  slug: string;
  html: Html;
  text: string;
  time: Date;
}

export interface NoteCardListProps {
  notes: CompiledNote[];
}

export default function NoteCardList({ notes }: NoteCardListProps) {
  const [note, setNote] = useState<number>();

  return (
    <>
      {note !== undefined && (
        <Modal open onClose={() => setNote(undefined)} sx={{ zIndex: 9999 }}>
          <Paper
            sx={{
              flex: 1,
              height: "100%",
              maxHeight: "80%",
              spacing: 5,
              maxWidth: "90%",
              width: 400,
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Stack height="100%">
              <Stack padding={3} spacing={1} overflow="hidden" flex={1}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  justifyContent="space-between"
                >
                  <NoteTime time={notes[note].time} />
                  <IconButton onClick={() => setNote(undefined)}>
                    <Icon component={CloseIcon} />
                  </IconButton>
                </Stack>
                <Box flex={1} overflow="auto" paddingRight={2}>
                  <Content html={notes[note].html} />
                </Box>
              </Stack>
              {notes.length >= 2 && (
                <Stack
                  width="100%"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  padding={2}
                >
                  <IconButton
                    size="large"
                    disabled={note === 0}
                    onClick={() => setNote((prev = 0) => prev - 1)}
                  >
                    <Icon component={ChevronLeftIcon} />
                  </IconButton>
                  <Typography color="textSecondary">
                    {note + 1} / {notes.length}
                  </Typography>
                  <IconButton
                    size="large"
                    disabled={note >= notes.length - 1}
                    onClick={() => setNote((prev = 0) => prev + 1)}
                  >
                    <Icon component={ChevronRightIcon} />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Modal>
      )}
      <Stack
        direction="row"
        spacing={2}
        maxWidth="100%"
        overflow="auto"
        paddingY={3}
      >
        {notes.map((note, i) => (
          <NoteCard
            key={note.slug}
            note={note}
            onClick={() => {
              setNote(i);
            }}
          />
        ))}
      </Stack>
    </>
  );
}
