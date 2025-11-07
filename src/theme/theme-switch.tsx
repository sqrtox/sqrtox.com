"use client";

import DarkModeIcon from "@material-symbols/svg-400/outlined/dark_mode-fill.svg";
import LightModeIcon from "@material-symbols/svg-400/outlined/light_mode-fill.svg";
import Switch from "@mui/material/Switch";
import { useColorScheme, useTheme } from "@mui/material/styles";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./theme-switch.module.scss";

export default function ThemeSwitch(): ReactNode {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isNotInitialized = colorScheme === undefined;
  const theme = useTheme();

  return (
    <Switch
      slotProps={{
        input: {
          "aria-label": "change theme",
        },
      }}
      disabled={isNotInitialized}
      checked={isNotInitialized || colorScheme === "dark"}
      onChange={(_event, checked) => {
        setColorScheme(checked ? "dark" : "light");
      }}
      className={clsx(isNotInitialized && styles.switchHidden, styles.switch)}
      disableRipple
      icon={
        <div className={styles.switchThumb}>
          <LightModeIcon fill={theme.vars.palette.sky.light} />
        </div>
      }
      checkedIcon={
        <div className={styles.switchThumb}>
          <DarkModeIcon fill={theme.vars.palette.sky.light} />
        </div>
      }
    />
  );
}
