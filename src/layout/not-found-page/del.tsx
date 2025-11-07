import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./del.module.scss";

export interface DelButtonProps {
  containerEl: HTMLElement;
}

export default function DelButton({ containerEl }: DelButtonProps) {
  const [deleted, setDeleted] = useState(false);

  return (
    <>
      {deleted &&
        createPortal(
          <Stack spacing={1} id={styles.delMessage}>
            <Typography
              fontSize="large"
              fontFamily="var(--primaryFont)"
              color="textSecondary"
              whiteSpace="nowrap"
            >
              $ del -rf /*
              <br />
              <Fade in>
                <span>ページ内の全削除が完了しました</span>
              </Fade>
            </Typography>
            <Box>
              <Button onClick={() => setDeleted(false)}>復元を試みる</Button>
            </Box>
          </Stack>,
          containerEl,
        )}
      <Box>
        <MuiLink
          fontSize="large"
          color="textSecondary"
          component="button"
          fontFamily="var(--primaryFont)"
          whiteSpace="nowrap"
          onClick={() => setDeleted(true)}
        >
          $ del -rf /*
        </MuiLink>
      </Box>
    </>
  );
}
