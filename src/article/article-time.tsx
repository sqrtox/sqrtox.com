import { TZDate } from "@date-fns/tz";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import Icon from "#src/component/icon";

export interface ArticleTimeProps {
  time: Date;
  // biome-ignore lint/suspicious/noExplicitAny: TODO: 定義不可
  icon: any;
}

export default function ArticleTime({ time, icon }: ArticleTimeProps) {
  const date = new TZDate(time, "Asia/Tokyo");

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      color="text.secondary"
    >
      <Icon component={icon} />
      <Typography
        variant="body2"
        component="time"
        dateTime={date.toISOString()}
      >
        {format(date, "yyyy.M.d")}
      </Typography>
    </Stack>
  );
}
