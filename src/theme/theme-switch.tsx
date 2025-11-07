"use client";

import DarkModeIcon from "@material-symbols/svg-400/outlined/dark_mode-fill.svg";
import LightModeIcon from "@material-symbols/svg-400/outlined/light_mode-fill.svg";
import Switch from "@mui/material/Switch";
import { useColorScheme, useTheme } from "@mui/material/styles";
import clsx from "clsx";
import type { ReactNode } from "react";
import ThemeSwitchThumb from "#src/theme/theme-switch-thumb";
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
        <ThemeSwitchThumb bgcolor={theme.vars.palette.sky.default}>
          <LightModeIcon fill={theme.vars.palette.sky.light} />
        </ThemeSwitchThumb>
      }
      checkedIcon={
        <ThemeSwitchThumb bgcolor={theme.vars.palette.sky.default}>
          <DarkModeIcon fill={theme.vars.palette.sky.light} />
        </ThemeSwitchThumb>
      }
    />
  );
}
