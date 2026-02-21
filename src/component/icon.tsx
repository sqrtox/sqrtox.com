import clsx from "clsx";
import type { SVGProps } from "react";
import styles from "./icon.module.css";

export interface IconOwnProps {
  // biome-ignore lint/suspicious/noExplicitAny: TODO: 定義不可
  component: any;
}

export type IconProps = SVGProps<SVGSVGElement> & IconOwnProps;

export default function Icon({ component: Component, ...props }: IconProps) {
  return (
    <Component {...props} className={clsx(styles.icon, props.className)} />
  );
}
