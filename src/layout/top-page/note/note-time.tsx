import { TZDate } from "@date-fns/tz";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import EventNoteIcon from "material-symbols/event_note.svg";
import Icon from "#src/component/icon";
import styles from "./note-time.module.css";

export interface NoteTimeProps {
  time: Date;
}

export default function NoteTime({ time }: NoteTimeProps) {
  const date = new TZDate(time, "Asia/Tokyo");

  return (
    <Stack
      component="span"
      color="text.secondary"
      direction="row"
      spacing={0.5}
      alignItems="center"
    >
      <Icon className={styles.timeIcon} component={EventNoteIcon} />
      <Typography
        variant="caption"
        component="time"
        dateTime={time.toISOString()}
      >
        {format(date, "yyyy.M.d")}
      </Typography>
    </Stack>
  );
}
