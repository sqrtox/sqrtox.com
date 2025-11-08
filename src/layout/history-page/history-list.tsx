import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "material-symbols/open_in_new.svg";
import type { Commit } from "#src/article/revision";
import Icon from "#src/component/icon";
import styles from "./history-list.module.css";
import HistoryTime from "./history-time";

export interface HistoryListProps {
  commits: Commit[];
}

export default function HistoryList({ commits }: HistoryListProps) {
  return (
    <Stack>
      {commits.map((commit) => (
        <Card key={commit.hash} variant="outlined" className={styles.card}>
          <CardActionArea
            LinkComponent="a"
            rel="noreferrer noopener"
            target="_blank"
            href={`https://github.com/sqrtox/sqrtox.vercel.app/commit/${commit.hash}#diff-${commit.pathHash}`}
          >
            <Stack
              component="span"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Stack padding={2} component="span">
                <Typography fontSize="1rem">{commit.message}</Typography>
                <HistoryTime timestamp={commit.timestamp} />
              </Stack>
              <Stack
                component="span"
                alignItems="center"
                justifyContent="center"
                padding={2}
                fontSize="1.5rem"
              >
                <Icon
                  className={styles.openInNewIcon}
                  component={OpenInNewIcon}
                />
              </Stack>
            </Stack>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
}
