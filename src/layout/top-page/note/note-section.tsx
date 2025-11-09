import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NoteCardListRenderer from "./note-card-list-renderer";

export default function NoteSection() {
  return (
    <Stack component="section">
      <Typography component="h2" variant="h5">
        メモ
      </Typography>
      <NoteCardListRenderer />
    </Stack>
  );
}
