import { TZDate } from "@date-fns/tz";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

export interface HistoryTimeProps {
  timestamp: number;
}

export default function HistoryTime({ timestamp }: HistoryTimeProps) {
  const date = new TZDate(timestamp, "Asia/Tokyo");

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      component="time"
      dateTime={date.toISOString()}
    >
      {format(date, "yyyy/M/d HH:mm:ss")}
    </Typography>
  );
}
