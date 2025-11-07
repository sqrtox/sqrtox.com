import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { useState } from "react";

export interface NekoButtonProps {
  containerEl: HTMLElement;
}

export default function NekoButton(_props: NekoButtonProps) {
  const [spawned, setSpawned] = useState(false);

  return (
    <Box>
      <MuiLink
        fontSize="large"
        color="textSecondary"
        component="button"
        fontFamily="var(--primaryFont)"
        whiteSpace="nowrap"
        onClick={() => {
          if (spawned) {
            setSpawned(false);
            document.getElementById("onekoScript")?.remove();
            document.getElementById("oneko")?.remove();
          } else {
            setSpawned(true);

            const script = document.createElement("script");

            script.src = "/oneko/oneko.js";
            script.dataset.cat = "/oneko/oneko.gif";
            script.id = "onekoScript";
            document.body.append(script);
          }
        }}
      >
        {spawned && "$ kill oneko"}
        {!spawned && "$ /usr/bin/oneko"}
      </MuiLink>
    </Box>
  );
}
