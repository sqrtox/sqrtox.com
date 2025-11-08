"use client";

import Box from "@mui/material/Box";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "material-symbols/dark_mode-fill.svg";
import LightModeIcon from "material-symbols/light_mode-fill.svg";
import Icon from "#src/component/icon";
import styles from "./landscape.module.scss";

export default function Landscape() {
  const { colorScheme } = useColorScheme();
  const Icon_ =
    colorScheme && colorScheme === "dark" ? DarkModeIcon : LightModeIcon;

  return (
    <Box
      borderRadius="4px"
      minHeight={100}
      position="relative"
      overflow="clip"
      bgcolor="sky.default"
    >
      {Icon_ && (
        <Box
          position="absolute"
          top={7}
          left={7}
          className={styles.naturalLight}
        >
          <Icon component={Icon_} className={styles.naturalLightIcon} />
        </Box>
      )}
      <Box
        maxHeight={60}
        width="100%"
        component="svg"
        position="absolute"
        bottom={-10}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        className={styles.waveBox}
      >
        <defs>
          <path
            id="wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <Box component="g" className={styles.waveInner}>
          <use xlinkHref="#wave" x="48" y="0" />
          <use xlinkHref="#wave" x="48" y="3" />
          <use xlinkHref="#wave" x="48" y="5" />
          <use xlinkHref="#wave" x="48" y="7" />
        </Box>
      </Box>
      <div className={styles.bird} />
    </Box>
  );
}
